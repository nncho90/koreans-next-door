import type { Dictionary } from "./types";

export const es: Dictionary = {
  navbar: {
    joinUs: "Únete",
    langToggle: "EN",
    ourStory: "Nuestra Historia",
    events: "Eventos",
    guides: "Guías",
    tools: "Herramientas",
  },
  hero: {
    tagline:
      "Caminando a tu lado para que todos podamos sentirnos en casa en tierra extraña.",
    learnMore: "Saber más",
  },
  mission: {
    phase1: "Acabas de mudarte a Seúl.",
    knockKnock: "Toc toc.",
    hiNeighbors: "Hola, somos tus vecinos :)",
    worries: [
      "\"Pedí comida y no tenía idea de lo que llegó.\"",
      "\"No he tenido una conversación de verdad en semanas.\"",
      "\"Todos me miran fijo en el metro.\"",
      "\"Mis compañeros de trabajo almuerzan juntos y yo me quedo solo.\"",
      "\"Ni siquiera puedo leer los letreros.\"",
      "\"Anoche llamé a mi mamá llorando.\"",
      "\"Nadie me avisó que sería tan solitario.\"",
      "\"No sé cómo hacer amigos coreanos.\"",
      "\"Paso todos los fines de semana solo.\"",
      "\"Me siento invisible aquí.\"",
      "\"Me perdí y no podía pedirle ayuda a nadie.\"",
      "\"¿Siempre va a ser así?\"",
      "\"Cené solo. De nuevo.\"",
      "\"Pensé que se pondría más fácil.\"",
      "\"Algunos días me pregunto por qué vine.\"",
      "\"El silencio en mi apartamento es ensordecedor.\"",
      "\"Extraño tener personas que me entiendan.\"",
      "\"Mi coreano sigue siendo terrible después de un año.\"",
    ],
    pillars: [
      {
        icon: "🏙️",
        title: "Solo vecinos",
        body: "No somos una organización formal ni una agencia de turismo. Solo un grupo de amigos que cree que la hospitalidad convierte una ciudad desconocida en un hogar familiar.",
      },
      {
        icon: "🌍",
        title: "Abierto a todos",
        body: "No importa de dónde vengas, qué creas o cuánto tiempo llevas aquí. Aparece y ya eres uno de nosotros.",
      },
      {
        icon: "💛",
        title: "Sin agendas ocultas",
        body: "No olvidamos lo que se siente al ser bienvenido en un país extranjero. Solo queremos ser esos vecinos para ti.",
      },
    ],
  },
  events: {
    label: "Lo que hacemos",
    heading: "Cosas que hemos hecho juntos",
    subheading:
      "Todavía lo vamos descubriendo sobre la marcha — y eso es parte de la diversión. Aquí un adelanto de lo que te espera.",
    cards: [
      {
        emoji: "🥢",
        type: "Intercambio Cultural",
        title: "Fiesta de Tteokguk en Seollal",
        date: "Enero 2026",
        description:
          "Hicimos dumplings juntos, compartimos un bowl de tteokguk y jugamos Yut Nori — celebrando el Año Nuevo coreano con nuevos amigos.",
      },
      {
        emoji: "⛰️",
        type: "Naturaleza y Aventura",
        title: "Caminata Nocturna al Gwanaksan",
        date: "Febrero 2026",
        description:
          "Nos atamos los zapatos y subimos al 관악산 de noche — Seúl brillando debajo de nosotros y buena compañía por todos lados.",
      },
      {
        emoji: "🗣️",
        type: "Intercambio de Idiomas",
        title: "Noches de Intercambio de Idiomas",
        date: "Último sábado de cada mes",
        description:
          "Practicando coreano e inglés con juegos en grupo, risas y algún que otro error gramatical. Todos son bienvenidos, sin necesidad de ser fluente.",
      },
      {
        emoji: "☕",
        type: "Encuentros Casuales",
        title: "Café y Conversación",
        date: "Continuamente",
        description:
          "A veces es solo tomar un café, comer algo rico y tener conversaciones de verdad. Sin agenda — solo personas conociéndose.",
      },
    ],
  },
  impact: {
    metrics: [
      { label: "países representados" },
      { label: "vecinos recibidos" },
      { label: "eventos organizados" },
      { label: "una gran familia" },
    ],
  },
  upcoming: {
    label: "Lo que viene",
    heading: "Próximos eventos",
    subheading: "Todos los eventos son gratuitos y abiertos a todos. Solo aparece.",
  },
  gallery: {
    label: "Momentos juntos",
    heading: "Una mirada a nuestro barrio",
    subheading: "Personas reales, momentos reales, conexiones reales.",
  },
  testimonials: {
    label: "De nuestros vecinos",
    heading: "Lo que dicen",
  },
  globe: {
    label: "Nuestra comunidad",
    heading: "De todo el mundo",
    subheading: "Nuestros vecinos vienen de todos los rincones del globo.",
    addPin: "+ Añadir mi marcador",
    beFirst: "¡Sé el primero en añadir tu marcador!",
    modalTitle: "Añadir mi marcador",
    modalSubtitle: "Aparecerás en el globo de inmediato.",
    formName: "Nombre",
    formNamePlaceholder: "Tu nombre",
    formCity: "Ciudad",
    formCityPlaceholder: "Busca cualquier ciudad del mundo...",
    formNote: "Una frase sobre ti",
    formNotePlaceholder: "ej. Vine por trabajo, me quedé por la comida",
    formInstagram: "Instagram",
    formInstagramOptional: "(opcional)",
    formSubmit: "Añadir marcador",
    formSubmitting: "Enviando...",
    formError: "Algo salió mal. ¡Inténtalo de nuevo!",
    successTitle: "¡Estás en el mapa!",
    successSubtitle: "Estás en el globo. Bienvenido, vecino.",
    noCitiesFound: "No se encontraron ciudades — prueba con otro nombre",
    neighborCount: "{count} vecinos de todo el mundo",
  },
  survivalKit: {
    label: "Kit de supervivencia en Seúl",
    heading: "Cosas que vale la pena saber",
    subheading: "Cosas que tus vecinos desearían haber sabido cuando llegaron a Corea.",
    categories: [
      {
        title: "Cómo moverse",
        items: [
          { note: "Rutas de metro y llegadas en tiempo real" },
          { note: "Navegación — mejor que Google Maps aquí" },
          { note: "Tarjeta de transporte recargable, cómprala en cualquier tienda de conveniencia" },
        ],
      },
      {
        title: "Comida y vida diaria",
        items: [
          { note: "La app de delivery más popular" },
          { note: "Entrega rápida, frecuentemente con promociones" },
          { note: "Todo lo que necesitas por menos de ₩5.000" },
        ],
      },
      {
        title: "Comunicación",
        items: [
          { note: "Cómo se comunica todo el mundo en Corea" },
          { note: "La mejor app de traducción coreano ↔ inglés" },
          { note: "Vocabulario rico y frases de ejemplo" },
        ],
      },
      {
        title: "Apps útiles",
        items: [
          { note: "El principal motor de búsqueda y mapas de Corea" },
          { note: "Mercado local y app de barrio" },
          { note: "Compras online con entrega al día siguiente" },
        ],
      },
      {
        title: "Salud",
        items: [
          { note: "Encuentra la farmacia más cercana" },
          { note: "Búsqueda de médicos que hablan inglés" },
          { note: "Regístrate dentro de los 6 meses de llegada" },
        ],
      },
      {
        title: "Números de emergencia",
        items: [
          { note: "Policía" },
          { note: "Bomberos y ambulancia" },
          { note: "Línea de ayuda al turista en Corea (inglés)" },
        ],
      },
    ],
  },
  faq: {
    label: "Preguntas",
    heading: "Lo que la gente pregunta",
    items: [
      { q: "¿Estos eventos son religiosos?" },
      {
        q: "¿Necesito hablar coreano para unirme?",
        a: "Para nada. Muchos de nosotros también estamos aprendiendo. Los eventos son bilingües — inglés y coreano — y nuestras noches de intercambio de idiomas están abiertas a principiantes totales. También tenemos miembros coreanos que hablan español, portugués, japonés y mandarín, así que no dudes en venir aunque el inglés o el coreano no sean lo tuyo. Sin presión alguna.",
      },
      {
        q: "¿Hay algún costo o requisito de membresía?",
        a: "No hay cuota de membresía — nunca. Nuestros eventos regulares de intercambio de idiomas y algunos eventos especiales pueden tener una pequeña tarifa de participación (menos de ₩10.000), que va íntegramente a snacks y materiales. Para cenas o actividades, no hay tarifa extra — solo trae suficiente para cubrir tu propia comida o actividad.",
      },
      { q: "¿Cómo me entero de los próximos eventos?" },
      {
        q: "¿Quién organiza KND?",
        a: "Un pequeño grupo de amigos de Sigwang Church. Algunos de nosotros hemos vivido en el extranjero. Algunos hemos estudiado fuera. Pero todos nosotros, de alguna manera, hemos sentido lo que es no sentirse en casa — y también hemos sido bienvenidos. Solo queremos ser los vecinos que ayuden a que lo desconocido se sienta un poco más como un hogar.",
      },
      { q: "¿Puedo traer a un amigo?", a: "Por favor. Cuantos más, mejor." },
    ],
  },
  contact: {
    heading: "Únete al barrio",
    subheading:
      "Ven como invitado, quédate como vecino. Síguenos en Instagram o únete a nuestro grupo de KakaoTalk para enterarte de lo que hay.",
    instagram: "Instagram",
    kakao: "KakaoTalk Open Chat",
  },
  phraseOfDay: {
    label: "Coreano del día",
    phrases: [
      { english: "Gracias", context: "La palabra más útil en Corea" },
      { english: "Esto, por favor", context: "Señala el menú y di esto" },
      { english: "¿Cuánto cuesta?", context: "Esencial en mercados y puestos callejeros" },
      { english: "¿Dónde está el baño?", context: "Lo necesitarás — créenos" },
      { english: "Está bien", context: "También significa '¿Estás bien?'" },
      { english: "Hola", context: "Úsalo como saludo en cualquier lugar" },
      { english: "Lo siento", context: "Disculpa educada para cualquier situación" },
      { english: "Quisiera ordenar", context: "Di esto para llamar la atención del mesero" },
      { english: "¡Está delicioso!", context: "Elogia al chef — les encanta" },
      { english: "La cuenta, por favor", context: "Haz un gesto y di esto cuando termines" },
      { english: "Sí", context: "También se pronuncia 'de' — ambos funcionan" },
      { english: "No", context: "Manera educada de declinar" },
      { english: "Un momento", context: "Te gana tiempo en cualquier situación" },
      {
        english: "¡Perdón! (¡Aquí!)",
        context: "Para llamar al personal en restaurantes — completamente normal",
      },
      { english: "Agua, por favor", context: "El agua suele ser gratis en los restaurantes" },
      { english: "Uno más, por favor", context: "Sirve para recargas, acompañamientos extra, cualquier cosa" },
      { english: "¿Puedo pagar con tarjeta?", context: "Casi todos los lugares aceptan tarjeta en Corea" },
      { english: "¿Cuál es la contraseña del Wi-Fi?", context: "Suele estar en un cartel o en el recibo" },
      { english: "¿Puedes tomarme una foto?", context: "Entrega tu teléfono y pregunta" },
      { english: "¿Qué es esto?", context: "Señala algo y pregunta" },
      {
        english: "Por favor, recomiéndame algo",
        context: "Genial en restaurantes cuando el menú es abrumador",
      },
      { english: "Para llevar, por favor", context: "Para pedir que te lo empaquen" },
      { english: "Por favor, ayúdame", context: "Los coreanos son increíblemente serviciales con los nuevos vecinos" },
      { english: "Habla más despacio, por favor", context: "Un salvavidas cuando hablan demasiado rápido" },
      {
        english: "No hablo coreano",
        context: "Irónicamente, decir esto en coreano impresiona a la gente",
      },
      {
        english: "¿Hay una tienda de conveniencia cerca?",
        context: "Hay una cada 50 metros — pero por si acaso",
      },
      { english: "¿Dónde me subo?", context: "Para autobuses, metro y trenes" },
      { english: "Una botella de soju, por favor", context: "Desbloquea la experiencia completa de cena coreana" },
      { english: "¿En serio?", context: "Reacciona como un local — funciona en cualquier conversación" },
      { english: "Es divertido / interesante", context: "Buena reacción ante cualquier cosa entretenida" },
    ],
  },
  footer: {
    copyright: "Koreans Next Door · Seúl, Corea",
  },
  worriesSection: {
    label: "¿Te suena familiar?",
    heading: "Vivir en el extranjero es difícil.",
    subheading: "No eres el único que se siente así.",
    bubbles: [
      "Llevo 3 meses aquí y todavía no tengo amigos de verdad... 😔",
      "Todos hablan coreano tan rápido, no puedo seguirles el ritmo 😰",
      "Extraño mi hogar pero no quiero admitirlo 🥺",
      "¿De verdad es tan difícil hacer amigos coreanos? 🤔",
      "No sé adónde ir los fines de semana... me quedo en casa 😞",
    ],
    tags: ["Añoranza del hogar", "Barrera del idioma", "Hacer amigos", "Choque cultural", "Soledad", "Visa & trámites"],
  },
  missionAbout: {
    whoWeAre: "Quiénes somos",
    heading1: "Mudarse a un nuevo país es emocionante.",
    heading2: "Pero también puede ser solitario.",
    body: "Sabemos lo que es no sentirse en casa en tierra extraña, sentir que no encajas del todo. También recordamos cómo se siente ser bienvenido. Nuestra misión es simple: caminar a tu lado para que todos podamos sentirnos en casa.",
  },
  seoulSkyline: {
    label: "Tu Barrio",
    heading1: "Todo lo que necesitas,",
    heading2: "a un skyline de distancia",
    subheading: "Seúl es grande. Haz clic en cualquier edificio para encontrar tu guía.",
    browseAll: "Ver todas las guías",
  },
  guideSection: {
    label: "Guía de Seúl",
    heading: "El Manual del Vecino",
    desc: "Todo lo que desearías que alguien te hubiera contado cuando llegaste a Corea.",
    descHub: "Todo lo que desearías que alguien te hubiera contado cuando llegaste a Corea. Elige un tema y explora.",
    open: "Abrir",
    toolPhrasebookLabel: "Guía de Frases",
    toolPhrasebookDesc: "Scripts en coreano para situaciones reales — muestra la pantalla a cualquier hablante de coreano.",
    toolFormDecoderLabel: "Decodificador de Formularios",
    toolFormDecoderDesc: "Formularios burocráticos coreanos explicados campo a campo en lenguaje simple.",
  },
};
