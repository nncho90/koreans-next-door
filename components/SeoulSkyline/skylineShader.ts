/**
 * "Living dusk" sky for the Seoul skyline section.
 *
 * Draws the three background layers that SkylineBackground.tsx draws in SVG —
 * sky with stars and moon, two mountain ranges, ground strip and Han River —
 * but animated: stars twinkle, haze drifts, the river ripples.
 *
 * Layout constants match SkylineBackground.tsx so the buildings keep sitting on
 * the same ground line: the scene is 400px tall, the river block is the bottom
 * 94px, and its water starts 28px below the ground line.
 */
export const GROUND = 1 - 94 / 400; // 0.765 — base line the buildings stand on
export const RIVER = 1 - 66 / 400; // 0.835 — water surface

export const skylineShader = /* wgsl */ `
struct Params {
  time: f32,
  width: f32,
  height: f32,
  mouseX: f32,   // -1 .. 1, matches the mouse parallax of the SVG version
  scroll: f32,   // 0 .. 1 scroll progress through the section
  pad0: f32,
  pad1: f32,
  pad2: f32,
}
@group(0) @binding(0) var<uniform> params: Params;

const GROUND: f32 = ${GROUND};
const RIVER: f32 = ${RIVER};

fn hash(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2f(1.0, 0.0)), u.x),
             mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x), u.y);
}

fn fbm(p0: vec2f) -> f32 {
  var p = p0;
  var v = 0.0;
  var a = 0.5;
  for (var i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2f(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// Ridge line height in uv space. Smaller y means a higher peak.
fn ridge(x: f32, seed: f32, amp: f32, base: f32) -> f32 {
  let n = 0.5 + 0.30 * sin(x * 4.1 + seed) + 0.22 * sin(x * 9.3 + seed * 2.1)
        + 0.18 * noise(vec2f(x * 6.0 + seed, seed));
  return base - amp * n;
}

fn stars(uv: vec2f, t: f32) -> f32 {
  let s = uv * vec2f(150.0, 85.0);
  let g = floor(s);
  let f = fract(s);
  let h = hash(g);
  if (h < 0.984) { return 0.0; }
  let c = vec2f(hash(g + 1.3), hash(g + 2.7));
  let d = length((f - c) * vec2f(1.0, 150.0 / 85.0));
  let dot = 1.0 - smoothstep(0.06, 0.34, d);
  let twinkle = 0.55 + 0.45 * sin(t * 1.6 + h * 90.0);
  return dot * twinkle * smoothstep(0.62, 0.15, uv.y);
}

// Distant city lights sitting along the far silhouette
fn cityGlow(uv: vec2f) -> f32 {
  let band = smoothstep(GROUND - 0.10, GROUND, uv.y)
           * smoothstep(GROUND + 0.02, GROUND - 0.02, uv.y);
  return band * (0.35 + 0.65 * noise(vec2f(uv.x * 60.0, 3.0)));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.time;
  let asp = params.width / max(params.height, 1.0);

  // Parallax offsets, mirroring the SVG layers: far layers drift least.
  let starShift = vec2f(0.0, (params.scroll - 0.5) * 0.06);
  let mtShift = vec2f(params.mouseX * 0.004, (params.scroll - 0.5) * -0.075);

  var col = mix(vec3f(0.008, 0.031, 0.067), vec3f(0.067, 0.125, 0.251),
                smoothstep(0.0, GROUND, uv.y));

  col += vec3f(1.0, 0.97, 0.88) * stars(uv + starShift, t);

  // Moon with a soft halo, roughly where the SVG moon sits
  let moon = vec2f(0.80 * asp, 0.19);
  let dm = length(vec2f(uv.x * asp, uv.y) - moon);
  col += vec3f(1.0, 0.93, 0.78) * (1.0 - smoothstep(0.017, 0.020, dm)) * 0.9;
  col += vec3f(1.0, 0.85, 0.4) * 0.03 / (dm * 3.2 + 0.12);

  // Slow haze drifting across the sky
  let haze = fbm(vec2f(uv.x * 2.4 + t * 0.012, uv.y * 4.0));
  col += vec3f(0.18, 0.22, 0.34)
       * smoothstep(0.45, 0.85, haze) * smoothstep(0.10, 0.62, uv.y) * 0.5;

  // Golden hour settling behind the city
  col += vec3f(1.0, 0.85, 0.4) * pow(smoothstep(0.42, GROUND, uv.y), 3.0) * 0.20;

  // Bukhansan, then the nearer range
  let mv = uv + mtShift;
  let far = ridge(mv.x, 1.3, 0.13, GROUND - 0.02);
  let near = ridge(mv.x, 5.7, 0.07, GROUND + 0.01);
  col = mix(col, vec3f(0.035, 0.078, 0.133), step(far, mv.y));
  col = mix(col, vec3f(0.043, 0.094, 0.149), step(near, mv.y));
  col += vec3f(1.0, 0.85, 0.4) * cityGlow(uv) * 0.5;

  // Ground strip
  if (uv.y > GROUND) {
    col = vec3f(0.031, 0.055, 0.110);
  }

  // Han River
  if (uv.y > RIVER) {
    let depth = (uv.y - RIVER) / (1.0 - RIVER);
    let ripple = fbm(vec2f(uv.x * 9.0, depth * 14.0 - t * 0.5));
    col = mix(vec3f(0.043, 0.082, 0.141), vec3f(0.023, 0.047, 0.094), depth);
    col += vec3f(1.0, 0.85, 0.4) * smoothstep(0.55, 0.78, ripple) * (1.0 - depth * 0.55) * 0.30;
    col += vec3f(1.0, 0.93, 0.78) * smoothstep(0.80, 0.95, ripple) * 0.12;
  }

  return vec4f(col, 1.0);
}
`;
