"use client";

import confetti from "canvas-confetti";

const handleConfetti = () =>
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.75 },
    colors: ["#ffd966", "#1a1a1a", "#ffffff"],
  });

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#ffd966] px-6 py-10 text-center md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          Join the neighborhood
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-[#1a1a1a]/70">
          Come as a guest, stay as a neighbor.<br className="hidden md:block" /> Follow us on Instagram or join
          our KakaoTalk group to find out what's up.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://www.instagram.com/koreansnextdoor/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConfetti}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1a1a1a] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-75 sm:w-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>

          <a
            href="https://open.kakao.com/o/gWb1KOci"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConfetti}
            className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#1a1a1a] px-8 py-4 text-base font-semibold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white sm:w-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.477 3 2 6.82 2 11.5c0 2.91 1.782 5.467 4.5 7.03L5.25 21l3.563-1.781A11.8 11.8 0 0 0 12 20c5.523 0 10-3.82 10-8.5S17.523 3 12 3z" />
            </svg>
            KakaoTalk Open Chat
          </a>
        </div>
      </div>
    </section>
  );
}
