import type { Dictionary } from "./types";

export const pt: Dictionary = {
  navbar: {
    joinUs: "Junte-se a nós",
    langToggle: "EN",
    ourStory: "Nossa História",
    events: "Eventos",
    guides: "Guias",
    tools: "Ferramentas",
  },
  hero: {
    tagline: "Pra você se sentir em casa, mesmo estando longe de casa. A gente tá sempre aqui.",
    learnMore: "Saiba mais",
  },
  mission: {
    phase1: "Você acabou de se mudar para Seul.",
    knockKnock: "Toc toc.",
    hiNeighbors: "Oi, somos seus vizinhos :)",
    worries: [
      "\"Pedi comida e não sabia o que havia chegado.\"",
      "\"Faz semanas que não tenho uma conversa de verdade.\"",
      "\"Todo mundo me olha fixo no metrô.\"",
      "\"Meus colegas saem pra almoçar juntos e eu fico pra trás.\"",
      "\"Não consigo nem ler as placas.\"",
      "\"Liguei para minha mãe chorando ontem à noite.\"",
      "\"Ninguém me avisou que ia ser tão solitário assim.\"",
      "\"Não sei como fazer amigos coreanos.\"",
      "\"Todo fim de semana é a mesma coisa — eu sozinho.\"",
      "\"Me sinto invisível aqui.\"",
      "\"Me perdi e não conseguia pedir ajuda a ninguém.\"",
      "\"Será que vai ser sempre assim?\"",
      "\"Jantar sozinho. De novo.\"",
      "\"Achei que ficaria mais fácil.\"",
      "\"Tem dias que eu me pergunto por que vim pra cá.\"",
      "\"O silêncio no apartamento é ensurdecedor.\"",
      "\"Tô com saudade de ter pessoas que me entendam de verdade.\"",
      "\"Já faz um ano e meu coreano ainda é um lixo.\"",
    ],
    pillars: [
      {
        icon: "🏙️",
        title: "Só vizinhos",
        body: "A gente não é uma organização formal nem agência de turismo. É só um grupo de amigos que acredita que hospitalidade transforma uma cidade estranha num lar.",
      },
      {
        icon: "🌍",
        title: "Aberto a todos",
        body: "Não importa de onde você vem, no que acredita ou há quanto tempo tá aqui. Aparece que você já é um de nós.",
      },
      {
        icon: "💛",
        title: "Sem agendas ocultas",
        body: "A gente não esquece o que é ser bem recebido num país estranho. Queremos ser esses vizinhos pra você.",
      },
    ],
  },
  events: {
    label: "O que fazemos",
    heading: "Coisas que fizemos juntos",
    subheading:
      "A gente ainda tá descobrindo no caminho — e essa é a parte boa. Uma provinha do que vem por aí.",
    cards: [
      {
        emoji: "🥢",
        type: "Troca Cultural",
        title: "Festa de Tteokguk do Seollal",
        date: "Janeiro 2026",
        description:
          "Fizemos bolinhos juntos, compartilhamos uma tigela de tteokguk e jogamos Yut Nori — celebrando o Ano Novo coreano com novos amigos.",
      },
      {
        emoji: "⛰️",
        type: "Natureza e Aventura",
        title: "Trilha Noturna ao Gwanaksan",
        date: "Fevereiro 2026",
        description:
          "A gente calçou os tênis e subiu o Gwanaksan de noite — Seul iluminada lá embaixo e boa companhia em todo lugar.",
      },
      {
        emoji: "🗣️",
        type: "Intercâmbio de Idiomas",
        title: "Noites de Intercâmbio de Idiomas",
        date: "Último sábado de cada mês",
        description:
          "Praticando coreano e inglês com jogos em grupo, muita risada e aquele erro de gramática constrangedor que todo mundo comete. Pode chegar sem saber nada — tá todo mundo aprendendo.",
      },
      {
        emoji: "☕",
        type: "Encontros Casuais",
        title: "Café e Conversa",
        date: "Contínuo",
        description:
          "Às vezes é só isso: tomar um café, comer uma coisa boa e ter papo de verdade. Sem roteiro — só gente se conhecendo.",
      },
    ],
  },
  impact: {
    metrics: [
      { label: "países representados" },
      { label: "vizinhos recebidos" },
      { label: "eventos realizados" },
      { label: "uma grande família" },
    ],
  },
  upcoming: {
    label: "O que vem aí",
    heading: "Próximos eventos",
    subheading: "Todos os eventos são gratuitos e abertos a todos. É só aparecer.",
  },
  gallery: {
    label: "Momentos juntos",
    heading: "Um vislumbre do nosso bairro",
    subheading: "Pessoas reais, momentos reais, conexões reais.",
  },
  testimonials: {
    label: "Da nossa vizinhança",
    heading: "O que as pessoas dizem",
  },
  globe: {
    label: "Nossa comunidade",
    heading: "De todos os cantos do mundo",
    subheading: "Nossos vizinhos vêm de todos os cantos do globo.",
    addPin: "+ Adicionar meu marcador",
    beFirst: "Seja o primeiro a adicionar seu marcador!",
    modalTitle: "Adicionar meu marcador",
    modalSubtitle: "Você vai aparecer no globo na hora.",
    formName: "Nome",
    formNamePlaceholder: "Seu primeiro nome",
    formCity: "Cidade",
    formCityPlaceholder: "Buscar qualquer cidade do mundo...",
    formNote: "Uma frase sobre você",
    formNotePlaceholder: "ex: Vim a trabalho, fiquei pela comida",
    formInstagram: "Instagram",
    formInstagramOptional: "(opcional)",
    formSubmit: "Adicionar marcador",
    formSubmitting: "Enviando...",
    formError: "Algo deu errado. Tente de novo!",
    successTitle: "Você está no mapa!",
    successSubtitle: "Você está no globo. Bem-vindo, vizinho.",
    noCitiesFound: "Nenhuma cidade encontrada — tente outro nome",
    neighborCount: "{count} vizinhos de todos os cantos do mundo",
  },
  survivalKit: {
    label: "Kit de sobrevivência em Seul",
    heading: "Coisas que vale saber",
    subheading: "Coisas que seus vizinhos gostariam de ter sabido quando chegaram na Coreia.",
    categories: [
      {
        title: "Como se locomover",
        items: [
          { note: "Rotas de metrô e chegadas em tempo real" },
          { note: "Navegação — melhor que o Google Maps aqui" },
          { note: "Cartão de transporte pré-pago, compre em qualquer conveniência" },
        ],
      },
      {
        title: "Alimentação e vida diária",
        items: [
          { note: "Aplicativo de delivery mais popular" },
          { note: "Entrega rápida, frequentemente com promoções" },
          { note: "Tudo que você precisa por menos de ₩5.000" },
        ],
      },
      {
        title: "Comunicação",
        items: [
          { note: "Como todo mundo na Coreia se comunica" },
          { note: "Melhor aplicativo de tradução coreano ↔ inglês" },
          { note: "Vocabulário rico e exemplos de frases" },
        ],
      },
      {
        title: "Aplicativos úteis",
        items: [
          { note: "Principal mecanismo de busca e mapas da Coreia" },
          { note: "Marketplace local e aplicativo de bairro" },
          { note: "Compras online com entrega no dia seguinte" },
        ],
      },
      {
        title: "Saúde",
        items: [
          { note: "Encontre a farmácia mais próxima" },
          { note: "Busca de médicos que falam inglês" },
          { note: "Cadastre-se dentro de 6 meses após a chegada" },
        ],
      },
      {
        title: "Números de emergência",
        items: [
          { note: "Polícia" },
          { note: "Bombeiros e ambulância" },
          { note: "Linha de ajuda ao turista na Coreia (inglês)" },
        ],
      },
    ],
  },
  faq: {
    label: "Perguntas",
    heading: "O que as pessoas perguntam",
    items: [
      { q: "Esses eventos são religiosos?" },
      {
        q: "Preciso falar coreano para participar?",
        a: "Não. Muita gente aqui ainda tá aprendendo também. Os eventos são bilíngues — inglês e coreano — e nossas noites de intercâmbio são abertas a quem tá começando do zero. A gente também tem membros coreanos que falam espanhol, português, japonês e mandarim — então não precisa ter vergonha mesmo que inglês ou coreano não sejam o seu forte. Sem pressão nenhuma.",
      },
      {
        q: "Há alguma taxa ou requisito de associação?",
        a: "Associação? Nunca vai existir isso aqui. Nossos eventos de intercâmbio e alguns eventos especiais podem ter uma taxa pequena (menos de ₩10.000), que vai tudo pra lanches e materiais. Pra jantares ou atividades, não tem taxa extra — só leva o suficiente pra cobrir o que você consumir.",
      },
      { q: "Como fico sabendo dos próximos eventos?" },
      {
        q: "Quem organiza o KND?",
        a: "Um grupo pequeno de amigos da Sigwang Church. Alguns da gente já morou fora do país. Alguns estudaram lá fora. Mas todo mundo, de um jeito ou de outro, já sabe o que é não se sentir em casa — e também sabe o que é ser bem recebido. A gente só quer ser os vizinhos que tornam o desconhecido um pouquinho mais parecido com um lar.",
      },
      { q: "Posso trazer um amigo?", a: "Por favor. Quanto mais, melhor." },
    ],
  },
  contact: {
    heading: "Junte-se ao bairro",
    subheading:
      "Vem como convidado, fica como vizinho. Segue a gente no Instagram ou entra no nosso grupo do KakaoTalk pra ficar por dentro de tudo.",
    instagram: "Instagram",
    kakao: "KakaoTalk Open Chat",
  },
  phraseOfDay: {
    label: "Coreano do dia",
    phrases: [
      { english: "Obrigado", context: "A palavra mais útil na Coreia" },
      { english: "Esse aqui, por favor", context: "Aponte para o cardápio e diga isso" },
      { english: "Quanto custa?", context: "Essencial em mercados e feiras" },
      { english: "Onde fica o banheiro?", context: "Você vai precisar disso — confie em nós" },
      { english: "Tudo bem", context: "Também significa 'Você está bem?'" },
      { english: "Olá", context: "Use essa saudação em qualquer lugar" },
      { english: "Desculpe", context: "Pedido de desculpas educado para qualquer situação" },
      { english: "Gostaria de pedir", context: "Diga isso para chamar a atenção do garçom" },
      { english: "Está delicioso!", context: "Elogie o chef — eles adoram" },
      { english: "A conta, por favor", context: "Faça um sinal e diga isso quando terminar" },
      { english: "Sim", context: "Também pronunciado 'de' — os dois funcionam" },
      { english: "Não", context: "Maneira educada de recusar" },
      { english: "Um momento", context: "Ganha tempo em qualquer situação" },
      {
        english: "Com licença! (Por aqui!)",
        context: "Para chamar o atendente no restaurante — completamente normal",
      },
      { english: "Água, por favor", context: "A água geralmente é gratuita nos restaurantes" },
      { english: "Mais um, por favor", context: "Funciona para refis, acompanhamentos extras, qualquer coisa" },
      { english: "Posso pagar com cartão?", context: "Quase todo lugar aceita cartão na Coreia" },
      { english: "Qual é a senha do Wi-Fi?", context: "Geralmente está numa placa ou no recibo" },
      { english: "Por favor, tire uma foto minha", context: "Entregue seu celular e peça" },
      { english: "O que é isso?", context: "Aponte para algo e pergunte" },
      {
        english: "Por favor, me recomende algo",
        context: "Ótimo em restaurantes quando o cardápio é enorme",
      },
      { english: "Para viagem, por favor", context: "Para pedir para levar" },
      { english: "Por favor, me ajude", context: "Os coreanos são incrivelmente prestativos com novos vizinhos" },
      { english: "Fale mais devagar, por favor", context: "Salva-vidas quando falam rápido demais" },
      {
        english: "Não falo coreano",
        context: "Ironicamente, dizer isso em coreano impressiona as pessoas",
      },
      {
        english: "Tem alguma conveniência perto daqui?",
        context: "Tem uma a cada 50 metros — mas por via das dúvidas",
      },
      { english: "Onde eu embarco?", context: "Para ônibus, metrô e trens" },
      { english: "Uma garrafa de soju, por favor", context: "Desbloqueie a experiência completa de jantar coreano" },
      { english: "Sério?", context: "Reaja como um local — funciona em qualquer conversa" },
      { english: "É divertido / interessante", context: "Ótima reação a qualquer coisa animada" },
    ],
  },
  footer: {
    copyright: "Koreans Next Door · Seul, Coreia",
  },
  worriesSection: {
    label: "Parece familiar?",
    heading: "Morar fora não é fácil.",
    subheading: "Você não tá sozinho nisso.",
    bubbles: [
      "Já faz 3 meses que tô aqui e ainda não tenho amigos de verdade... 😔",
      "Todo mundo fala coreano tão rápido, eu não consigo acompanhar nada 😰",
      "Tô com saudade de casa mas não quero admitir 🥺",
      "É assim tão difícil fazer amigos coreanos? 🤔",
      "Não sei pra onde ir no fim de semana... fico em casa mesmo 😞",
    ],
    tags: ["Saudade de casa", "Barreira do idioma", "Fazer amizades", "Choque cultural", "Solidão", "Visto & burocracia"],
  },
  missionAbout: {
    whoWeAre: "Quem somos",
    heading1: "Mudar pra um país novo é empolgante.",
    heading2: "Mas também pode ser solitário.",
    body: "A gente sabe o que é não se sentir em casa numa terra estranha, sentir que não pertence. E também não esquece o que é ser bem recebido. Nossa missão é simples: caminhar do seu lado pra que todo mundo possa se sentir em casa.",
  },
  seoulSkyline: {
    label: "Seu bairro",
    heading1: "Seul é grande.",
    heading2: "A gente te guia.",
    subheading: "Clique em qualquer prédio e encontre o guia certo pra você.",
    browseAll: "Ver todos os guias",
  },
  guideSection: {
    label: "Guia de Seul",
    heading: "O Manual do Vizinho",
    desc: "Tudo que você queria que alguém tivesse te falado quando chegou na Coreia.",
    descHub: "Tudo que você queria que alguém tivesse te falado quando chegou na Coreia. Escolhe um tema e vai explorando.",
    open: "Abrir",
    toolPhrasebookLabel: "Guia de Frases",
    toolPhrasebookDesc: "Frases em coreano pra situações reais — é só mostrar a tela do celular pra qualquer coreano.",
    toolFormDecoderLabel: "Decodificador de Formulários",
    toolFormDecoderDesc: "Formulários burocráticos coreanos explicados campo por campo, em linguagem simples.",
  },
};
