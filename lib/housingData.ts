// lib/housingData.ts

export const HOUSING_TYPES = [
  {
    id: "jeonse",
    nameEn: "Jeonse (전세)",
    nameKo: "전세",
    nameJa: "チョンセ（전세）",
    nameZhCN: "全税（전세）",
    nameZhTW: "全稅（전세）",
    namePt: "Jeonse (전세)",
    nameEs: "Jeonse (전세)",
    descEn:
      "Pay a large lump-sum deposit (usually 50–80% of property value). No monthly rent. You get the full deposit back when you leave.",
    descKo:
      "목돈을 보증금으로 맡기고 월세 없이 거주. 계약 종료 시 보증금 전액 반환.",
    descJa:
      "물건 가격의 50〜80%に相当する高額の保証金（チョンセ）を一括で預けます。月々の家賃はなく、契約終了時に全額返還されます。",
    descZhCN:
      "一次性支付大额保证金（通常为房产价值的50–80%），无需月租，合同结束时全额退还。",
    descZhTW:
      "一次性支付大額保證金（通常為房產價值的50–80%），無需月租，合約結束時全額退還。",
    descPt:
      "Pague um depósito único alto (geralmente 50–80% do valor do imóvel). Sem aluguel mensal. Você recebe o depósito integralmente ao sair.",
    descEs:
      "Paga un depósito único elevado (normalmente el 50–80% del valor del inmueble). Sin alquiler mensual. Recuperas el depósito íntegro al irte.",
    proEn: [
      "No monthly rent payments",
      "Deposit returned in full",
      "Popular for 1-2 year contracts",
    ],
    proKo: ["월세 없음", "보증금 전액 반환", "1-2년 계약에 인기"],
    proJa: ["毎月の家賃なし", "保証金全額返還", "1〜2年契約に人気"],
    proZhCN: ["无需月租", "保证金全额退还", "适合1-2年合同"],
    proZhTW: ["無需月租", "保證金全額退還", "適合1-2年合約"],
    proPt: ["Sem pagamentos mensais de aluguel", "Depósito devolvido integralmente", "Popular em contratos de 1-2 anos"],
    proEs: ["Sin pagos mensuales de alquiler", "Depósito devuelto íntegramente", "Popular en contratos de 1-2 años"],
    conEn: [
      "Requires large upfront capital",
      "Risk if landlord can't return deposit",
      "Less common recently as rates rise",
    ],
    conKo: [
      "큰 초기 자금 필요",
      "집주인 부채 시 반환 위험",
      "금리 상승으로 감소 추세",
    ],
    conJa: [
      "多額の初期資金が必要",
      "家主が返還できないリスクあり",
      "金利上昇で最近は減少傾向",
    ],
    conZhCN: [
      "需要大量启动资金",
      "房东无法退还时有风险",
      "利率上升后逐渐减少",
    ],
    conZhTW: [
      "需要大量啟動資金",
      "房東無法退還時有風險",
      "利率上升後逐漸減少",
    ],
    conPt: [
      "Requer grande capital inicial",
      "Risco se o proprietário não conseguir devolver o depósito",
      "Menos comum recentemente com a subida das taxas",
    ],
    conEs: [
      "Requiere un gran capital inicial",
      "Riesgo si el propietario no puede devolver el depósito",
      "Menos común últimamente con la subida de tipos",
    ],
    depositRange: "KRW 100M–500M+",
    monthlyRange: "₩0 / month",
    icon: "🏦",
  },
  {
    id: "wolse",
    nameEn: "Wolse (월세)",
    nameKo: "월세",
    nameJa: "ウォルセ（월세）",
    nameZhCN: "月租（월세）",
    nameZhTW: "月租（월세）",
    namePt: "Wolse (월세)",
    nameEs: "Wolse (월세)",
    descEn:
      "Pay a smaller security deposit plus monthly rent. More flexible, easier to enter. Most common for foreigners.",
    descKo:
      "소액 보증금과 함께 매달 월세 납부. 외국인에게 가장 일반적인 방식.",
    descJa:
      "少額の保証金と毎月の家賃を支払います。外国人に最もよく利用される方式で、柔軟性が高く始めやすいのが特徴です。",
    descZhCN:
      "支付较少的押金加每月租金。更灵活，更容易入住，是外国人最常用的方式。",
    descZhTW:
      "支付較少的押金加每月租金。更靈活，更容易入住，是外國人最常用的方式。",
    descPt:
      "Pague um depósito menor mais aluguel mensal. Mais flexível e fácil de entrar. O mais comum para estrangeiros.",
    descEs:
      "Paga un depósito menor más alquiler mensual. Más flexible y fácil de acceder. Es el más común entre extranjeros.",
    proEn: [
      "Lower initial investment",
      "More flexibility",
      "Easier for foreigners to get",
    ],
    proKo: ["초기 비용 적음", "유연한 거주", "외국인 계약 수월"],
    proJa: ["初期投資が少ない", "柔軟性が高い", "外国人でも借りやすい"],
    proZhCN: ["初始投入少", "灵活性高", "外国人更容易获批"],
    proZhTW: ["初始投入少", "靈活性高", "外國人更容易獲批"],
    proPt: ["Investimento inicial menor", "Mais flexibilidade", "Mais fácil para estrangeiros conseguirem"],
    proEs: ["Menor inversión inicial", "Más flexibilidad", "Más fácil de conseguir para extranjeros"],
    conEn: [
      "Monthly payments add up",
      "Deposit not invested",
      "Less negotiating power",
    ],
    conKo: ["월세 누적 부담", "보증금 수익 없음", "협상력 약함"],
    conJa: ["毎月の支払いが積み重なる", "保証金に利子はつかない", "交渉力が弱い"],
    conZhCN: ["月租累计负担较重", "押金没有收益", "议价能力较弱"],
    conZhTW: ["月租累計負擔較重", "押金沒有收益", "議價能力較弱"],
    conPt: ["Pagamentos mensais acumulam", "Depósito não rende", "Menor poder de negociação"],
    conEs: ["Los pagos mensuales se acumulan", "El depósito no genera rendimiento", "Menor poder de negociación"],
    depositRange: "KRW 1M–50M",
    monthlyRange: "KRW 400K–2M+/month",
    icon: "🏠",
  },
  {
    id: "short-term",
    nameEn: "Short-term / Officetel",
    nameKo: "단기 / 오피스텔",
    nameJa: "短期／オフィステル",
    nameZhCN: "短租／商务公寓",
    nameZhTW: "短租／商務公寓",
    namePt: "Curto prazo / Officetel",
    nameEs: "Corto plazo / Officetel",
    descEn:
      "Furnished short-term rentals or officetels (studio apartments). Higher monthly cost but fully furnished and flexible.",
    descKo:
      "가구 포함 단기 임대 또는 오피스텔. 비용은 높지만 유연하고 편리.",
    descJa:
      "家具付きの短期賃貸またはオフィステル（ワンルームマンション）です。月額費用は高めですが、すぐ住めて柔軟性があります。",
    descZhCN:
      "带家具的短租公寓或商务公寓（类似单身公寓）。月租较高，但配套齐全，入住灵活。",
    descZhTW:
      "帶家具的短租公寓或商務公寓（類似單身公寓）。月租較高，但配套齊全，入住靈活。",
    descPt:
      "Aluguéis de curto prazo mobiliados ou officetels (estúdios). Custo mensal mais alto, mas totalmente mobilados e flexíveis.",
    descEs:
      "Alquileres de corta duración amueblados u officetels (estudios). Coste mensual más alto pero completamente amueblados y flexibles.",
    proEn: [
      "Fully furnished",
      "Short lease terms available",
      "No setup hassle",
    ],
    proKo: ["가구 완비", "단기 계약 가능", "입주 즉시 편리"],
    proJa: ["家具完備", "短期契約が可能", "すぐに入居できる"],
    proZhCN: ["家具齐全", "可签短期合同", "即拎即住"],
    proZhTW: ["家具齊全", "可簽短期合約", "即拎即住"],
    proPt: ["Totalmente mobilado", "Contratos de curto prazo disponíveis", "Sem complicações de instalação"],
    proEs: ["Totalmente amueblado", "Contratos de corta duración disponibles", "Sin complicaciones de instalación"],
    conEn: [
      "Most expensive per month",
      "Smaller spaces",
      "Less authentic neighborhood feel",
    ],
    conKo: ["월 비용 높음", "좁은 공간", "주거 환경 덜 현지적"],
    conJa: ["月額費用が最も高い", "スペースが狭い", "地元の雰囲気が薄い"],
    conZhCN: ["月租最贵", "空间较小", "生活氛围不够本地化"],
    conZhTW: ["月租最貴", "空間較小", "生活氛圍不夠本地化"],
    conPt: ["Mais caro por mês", "Espaços menores", "Menos sensação de bairro autêntico"],
    conEs: ["El más caro por mes", "Espacios más pequeños", "Menos sensación de barrio auténtico"],
    depositRange: "KRW 500K–10M",
    monthlyRange: "KRW 700K–3M+/month",
    icon: "🏢",
  },
];

export const NEIGHBORHOODS = [
  {
    id: "hongdae",
    name: "Hongdae (홍대)",
    nameKo: "홍대",
    nameJa: "ホンデ（홍대）",
    nameZhCN: "弘大（홍대）",
    nameZhTW: "弘大（홍대）",
    namePt: "Hongdae (홍대)",
    nameEs: "Hongdae (홍대)",
    emoji: "🎨",
    avgRentKRW: 900000,
    vibe: "Artsy, young, always buzzing",
    vibeKo: "예술적이고 젊고 활기찬",
    vibeJa: "アート系、若者が集まる活気あるエリア",
    vibeZhCN: "艺术氛围浓厚，年轻有活力",
    vibeZhTW: "藝術氛圍濃厚，年輕有活力",
    vibePt: "Artístico, jovem, sempre agitado",
    vibeEs: "Artístico, joven, siempre animado",
    pros: [
      "Tons of cafes & restaurants",
      "Great nightlife",
      "Young international crowd",
      "Lots of English-friendly spots",
    ],
    prosKo: [
      "카페와 식당 풍부",
      "활발한 나이트라이프",
      "젊은 외국인 많음",
      "영어 통하는 곳 많음",
    ],
    prosJa: [
      "カフェや飲食店が豊富",
      "ナイトライフが充実",
      "若い外国人が多い",
      "英語対応の店舗多数",
    ],
    prosZhCN: [
      "咖啡厅和餐厅众多",
      "夜生活丰富",
      "年轻外国人聚集",
      "英语友好场所多",
    ],
    prosZhTW: [
      "咖啡廳和餐廳眾多",
      "夜生活豐富",
      "年輕外國人聚集",
      "英語友好場所多",
    ],
    prosPt: [
      "Muitos cafés e restaurantes",
      "Ótima vida noturna",
      "Multidão jovem e internacional",
      "Muitos lugares com atendimento em inglês",
    ],
    prosEs: [
      "Muchos cafés y restaurantes",
      "Excelente vida nocturna",
      "Ambiente joven e internacional",
      "Muchos lugares donde hablan inglés",
    ],
    cons: ["Noisy, especially weekends", "Pricier than average", "Crowded"],
    consKo: ["주말 소음 심함", "평균보다 비쌈", "혼잡"],
    consJa: ["特に週末は騒がしい", "平均より家賃が高め", "混雑している"],
    consZhCN: ["周末噪音大", "租金高于平均", "人流拥挤"],
    consZhTW: ["週末噪音大", "租金高於平均", "人流擁擠"],
    consPt: ["Barulhento, especialmente nos fins de semana", "Mais caro que a média", "Movimentado"],
    consEs: ["Ruidoso, especialmente los fines de semana", "Más caro que la media", "Concurrido"],
    stations: ["Hongdae (2, Airport, Gyeongui)", "Hapjeong (2, 6)"],
    foreignFriendly: true,
    bestFor: [
      "Young professionals",
      "Artists",
      "English teachers",
      "First-time Seoul residents",
    ],
    bestForKo: ["젊은 직장인", "예술가", "영어 강사", "처음 서울 온 외국인"],
    bestForJa: ["若い社会人", "アーティスト", "英語教師", "ソウル初心者"],
    bestForZhCN: ["年轻职场人", "艺术家", "英语教师", "初来首尔的外国人"],
    bestForZhTW: ["年輕職場人", "藝術家", "英語教師", "初來首爾的外國人"],
    bestForPt: ["Jovens profissionais", "Artistas", "Professores de inglês", "Primeiros residentes em Seul"],
    bestForEs: ["Jóvenes profesionales", "Artistas", "Profesores de inglés", "Primeros residentes en Seúl"],
  },
  {
    id: "itaewon",
    name: "Itaewon (이태원)",
    nameKo: "이태원",
    nameJa: "イテウォン（이태원）",
    nameZhCN: "梨泰院（이태원）",
    nameZhTW: "梨泰院（이태원）",
    namePt: "Itaewon (이태원)",
    nameEs: "Itaewon (이태원)",
    emoji: "🌍",
    avgRentKRW: 1100000,
    vibe: "International hub, diverse food, Western comforts",
    vibeKo: "국제적, 다양한 음식, 서양식 생활",
    vibeJa: "国際的な拠点、多彩な料理、西洋的な快適さ",
    vibeZhCN: "国际化聚集地，美食多样，西式生活便利",
    vibeZhTW: "國際化聚集地，美食多樣，西式生活便利",
    vibePt: "Hub internacional, culinária diversa, confortos ocidentais",
    vibeEs: "Hub internacional, gastronomía diversa, comodidades occidentales",
    pros: [
      "Most foreigner-friendly neighborhood",
      "International grocery stores",
      "Diverse restaurant scene",
      "Many English speakers",
    ],
    prosKo: [
      "외국인 가장 친화적",
      "국제 식재료 마트",
      "다양한 식당",
      "영어 구사자 많음",
    ],
    prosJa: [
      "最も外国人に優しいエリア",
      "国際的なスーパーマーケット",
      "多彩なレストラン",
      "英語を話す人が多い",
    ],
    prosZhCN: [
      "最适合外国人的社区",
      "国际食品超市",
      "餐厅种类多样",
      "英语使用者众多",
    ],
    prosZhTW: [
      "最適合外國人的社區",
      "國際食品超市",
      "餐廳種類多樣",
      "英語使用者眾多",
    ],
    prosPt: [
      "Bairro mais amigável para estrangeiros",
      "Mercearias internacionais",
      "Grande variedade de restaurantes",
      "Muitos falantes de inglês",
    ],
    prosEs: [
      "Barrio más amigable para extranjeros",
      "Supermercados internacionales",
      "Gran variedad de restaurantes",
      "Muchos angloparlantes",
    ],
    cons: [
      "Can feel like a bubble",
      "More expensive",
      "Some areas feel touristy",
    ],
    consKo: ["버블 느낌 있음", "비쌈", "관광지 느낌"],
    consJa: ["バブルのように感じることも", "家賃が高め", "観光地っぽい雰囲気の場所もある"],
    consZhCN: ["容易产生与外界隔离的感觉", "租金较贵", "部分区域旅游气息浓"],
    consZhTW: ["容易產生與外界隔離的感覺", "租金較貴", "部分區域旅遊氣息濃"],
    consPt: ["Pode parecer uma bolha", "Mais caro", "Algumas áreas parecem turísticas"],
    consEs: ["Puede sentirse como una burbuja", "Más caro", "Algunas zonas parecen turísticas"],
    stations: ["Itaewon (6)", "Noksapyeong (6)"],
    foreignFriendly: true,
    bestFor: [
      "Families",
      "Those who want Western comforts",
      "Diplomats",
      "Corporate expats",
    ],
    bestForKo: ["가족", "서양 편의 원하는 분", "외교관", "기업 주재원"],
    bestForJa: ["家族連れ", "西洋的な快適さを求める方", "外交官", "企業駐在員"],
    bestForZhCN: ["家庭", "追求西式生活的人", "外交官", "企业外派人员"],
    bestForZhTW: ["家庭", "追求西式生活的人", "外交官", "企業外派人員"],
    bestForPt: ["Famílias", "Quem quer confortos ocidentais", "Diplomatas", "Expatriados corporativos"],
    bestForEs: ["Familias", "Quienes quieren comodidades occidentales", "Diplomáticos", "Expatriados corporativos"],
  },
  {
    id: "mapo",
    name: "Mapo / Sinchon (마포/신촌)",
    nameKo: "마포/신촌",
    nameJa: "麻浦／新村（마포/신촌）",
    nameZhCN: "麻浦／新村（마포/신촌）",
    nameZhTW: "麻浦／新村（마포/신촌）",
    namePt: "Mapo / Sinchon (마포/신촌)",
    nameEs: "Mapo / Sinchon (마포/신촌)",
    emoji: "📚",
    avgRentKRW: 750000,
    vibe: "University area, studious by day, lively by night",
    vibeKo: "대학가, 낮엔 조용 밤엔 활기",
    vibeJa: "大学街、昼は静か、夜は活気あふれる",
    vibeZhCN: "大学区，白天安静学术，夜晚热闹",
    vibeZhTW: "大學區，白天安靜學術，夜晚熱鬧",
    vibePt: "Área universitária, estudioso de dia, animado à noite",
    vibeEs: "Zona universitaria, tranquila de día, animada de noche",
    pros: [
      "Affordable rent",
      "Great food scene",
      "Near Hongdae",
      "Many young Koreans",
    ],
    prosKo: ["저렴한 월세", "맛집 많음", "홍대 가까움", "젊은 한국인 많음"],
    prosJa: ["手頃な家賃", "グルメスポットが多い", "ホンデに近い", "若い韓国人が多い"],
    prosZhCN: ["租金实惠", "美食丰富", "靠近弘大", "年轻韩国人多"],
    prosZhTW: ["租金實惠", "美食豐富", "靠近弘大", "年輕韓國人多"],
    prosPt: ["Aluguel acessível", "Ótima cena gastronômica", "Perto de Hongdae", "Muitos jovens coreanos"],
    prosEs: ["Alquiler asequible", "Gran oferta gastronómica", "Cerca de Hongdae", "Muchos jóvenes coreanos"],
    cons: [
      "Fewer English speakers than Itaewon/Hongdae",
      "Can be rowdy on weekends",
    ],
    consKo: ["영어 구사자 적음", "주말 시끄러울 수 있음"],
    consJa: ["イテウォン/ホンデより英語話者が少ない", "週末は騒がしくなることも"],
    consZhCN: ["英语使用者少于梨泰院/弘大", "周末可能较吵闹"],
    consZhTW: ["英語使用者少於梨泰院/弘大", "週末可能較吵鬧"],
    consPt: ["Menos falantes de inglês que Itaewon/Hongdae", "Pode ser agitado nos fins de semana"],
    consEs: ["Menos angloparlantes que Itaewon/Hongdae", "Puede ser ruidoso los fines de semana"],
    stations: ["Sinchon (2)", "Mapo (5)", "Hapjeong (2, 6)"],
    foreignFriendly: true,
    bestFor: [
      "Students",
      "Language learners wanting Korean immersion",
      "Budget-conscious",
    ],
    bestForKo: ["학생", "한국어 학습자", "저예산"],
    bestForJa: ["学生", "韓国語を学びたい方", "予算重視の方"],
    bestForZhCN: ["学生", "想沉浸于韩语环境的语言学习者", "预算有限者"],
    bestForZhTW: ["學生", "想沉浸於韓語環境的語言學習者", "預算有限者"],
    bestForPt: ["Estudantes", "Aprendizes de idioma que querem imersão coreana", "Quem tem orçamento limitado"],
    bestForEs: ["Estudiantes", "Aprendices de idiomas que quieren inmersión coreana", "Quienes tienen presupuesto limitado"],
  },
  {
    id: "gangnam",
    name: "Gangnam (강남)",
    nameKo: "강남",
    nameJa: "江南（강남）",
    nameZhCN: "江南（강남）",
    nameZhTW: "江南（강남）",
    namePt: "Gangnam (강남)",
    nameEs: "Gangnam (강남)",
    emoji: "💎",
    avgRentKRW: 1500000,
    vibe: "Upscale, polished, business-oriented",
    vibeKo: "고급스럽고 비즈니스 중심",
    vibeJa: "高級感あり、洗練されたビジネスエリア",
    vibeZhCN: "高档精致，商务导向",
    vibeZhTW: "高檔精緻，商務導向",
    vibePt: "Sofisticado, refinado, orientado para negócios",
    vibeEs: "Exclusivo, pulido, orientado a los negocios",
    pros: [
      "High-end amenities",
      "English-friendly banks & services",
      "Great transport links",
      "Safe",
    ],
    prosKo: [
      "고급 편의시설",
      "영어 가능 금융/서비스",
      "교통 편리",
      "안전",
    ],
    prosJa: [
      "高級アメニティ",
      "英語対応の銀行・サービス",
      "交通アクセス良好",
      "安全",
    ],
    prosZhCN: [
      "高端生活设施",
      "英语友好的银行与服务",
      "交通便利",
      "安全",
    ],
    prosZhTW: [
      "高端生活設施",
      "英語友好的銀行與服務",
      "交通便利",
      "安全",
    ],
    prosPt: [
      "Comodidades de alto padrão",
      "Bancos e serviços com atendimento em inglês",
      "Ótimas ligações de transporte",
      "Seguro",
    ],
    prosEs: [
      "Comodidades de alto nivel",
      "Bancos y servicios con atención en inglés",
      "Excelentes conexiones de transporte",
      "Seguro",
    ],
    cons: [
      "Very expensive",
      "Less character than older neighborhoods",
      "Far from most expat social scenes",
    ],
    consKo: [
      "매우 비쌈",
      "올드 동네보다 개성 없음",
      "외국인 소셜 씬과 거리 있음",
    ],
    consJa: [
      "家賃がとても高い",
      "古い街より個性が薄い",
      "外国人の社交の場から遠い",
    ],
    consZhCN: [
      "租金非常贵",
      "个性不如老街区",
      "远离大多数外国人社交圈",
    ],
    consZhTW: [
      "租金非常貴",
      "個性不如老街區",
      "遠離大多數外國人社交圈",
    ],
    consPt: [
      "Muito caro",
      "Menos caráter do que bairros mais antigos",
      "Longe da maioria das cenas sociais de expatriados",
    ],
    consEs: [
      "Muy caro",
      "Menos carácter que los barrios más antiguos",
      "Lejos de la mayoría de las escenas sociales de expatriados",
    ],
    stations: ["Gangnam (2)", "Sinnonhyeon (9)", "Samsung (2)"],
    foreignFriendly: true,
    bestFor: [
      "Corporate expats",
      "Families with school-age kids",
      "Those with larger budgets",
    ],
    bestForKo: ["기업 주재원", "자녀 있는 가족", "예산 여유 있는 분"],
    bestForJa: ["企業駐在員", "学齢期の子供がいる家族", "予算に余裕のある方"],
    bestForZhCN: ["企业外派人员", "有学龄儿童的家庭", "预算充足者"],
    bestForZhTW: ["企業外派人員", "有學齡兒童的家庭", "預算充足者"],
    bestForPt: ["Expatriados corporativos", "Famílias com filhos em idade escolar", "Quem tem orçamento maior"],
    bestForEs: ["Expatriados corporativos", "Familias con hijos en edad escolar", "Quienes tienen mayor presupuesto"],
  },
  {
    id: "yongsan",
    name: "Yongsan / Hannam (용산/한남)",
    nameKo: "용산/한남",
    nameJa: "龍山／漢南（용산/한남）",
    nameZhCN: "龙山／汉南（용산/한남）",
    nameZhTW: "龍山／漢南（용산/한남）",
    namePt: "Yongsan / Hannam (용산/한남)",
    nameEs: "Yongsan / Hannam (용산/한남)",
    emoji: "🛍️",
    avgRentKRW: 1300000,
    vibe: "Trendy, upscale but cooler than Gangnam",
    vibeKo: "트렌디하고 고급스럽지만 강남보다 쿨함",
    vibeJa: "トレンディで高級、でも江南よりクール",
    vibeZhCN: "时尚高档，比江南更有腔调",
    vibeZhTW: "時尚高檔，比江南更有腔調",
    vibePt: "Tendência, sofisticado mas mais cool que Gangnam",
    vibeEs: "Moderno, exclusivo pero más cool que Gangnam",
    pros: [
      "Near Itaewon",
      "Great parks and Han River access",
      "Trendy dining",
      "International schools nearby",
    ],
    prosKo: [
      "이태원 근처",
      "공원과 한강 가까움",
      "트렌디한 식당",
      "국제학교 근처",
    ],
    prosJa: [
      "イテウォンに近い",
      "公園と漢江へのアクセス良好",
      "おしゃれな飲食店",
      "インターナショナルスクールが近い",
    ],
    prosZhCN: [
      "靠近梨泰院",
      "公园与汉江近在咫尺",
      "时尚餐饮",
      "附近有国际学校",
    ],
    prosZhTW: [
      "靠近梨泰院",
      "公園與漢江近在咫尺",
      "時尚餐飲",
      "附近有國際學校",
    ],
    prosPt: [
      "Perto de Itaewon",
      "Ótimos parques e acesso ao Rio Han",
      "Gastronomia trendy",
      "Escolas internacionais nas proximidades",
    ],
    prosEs: [
      "Cerca de Itaewon",
      "Grandes parques y acceso al Río Han",
      "Gastronomía de moda",
      "Colegios internacionales cerca",
    ],
    cons: ["Expensive", "Some areas under redevelopment"],
    consKo: ["비쌈", "일부 지역 재개발 중"],
    consJa: ["家賃が高い", "一部エリアで再開発中"],
    consZhCN: ["租金贵", "部分区域正在重建"],
    consZhTW: ["租金貴", "部分區域正在重建"],
    consPt: ["Caro", "Algumas áreas em reurbanização"],
    consEs: ["Caro", "Algunas zonas en reurbanización"],
    stations: [
      "Itaewon (6)",
      "Hannam (경의중앙)",
      "Noksapyeong (6)",
    ],
    foreignFriendly: true,
    bestFor: [
      "Families",
      "Those who want trendy but quieter than Itaewon",
      "Art & design lovers",
    ],
    bestForKo: [
      "가족",
      "이태원보다 조용한 트렌디 원하는 분",
      "예술/디자인 관심자",
    ],
    bestForJa: [
      "家族連れ",
      "イテウォンより静かなトレンドエリアを求める方",
      "アート・デザイン好き",
    ],
    bestForZhCN: [
      "家庭",
      "喜欢时尚但比梨泰院安静的人",
      "艺术/设计爱好者",
    ],
    bestForZhTW: [
      "家庭",
      "喜歡時尚但比梨泰院安靜的人",
      "藝術/設計愛好者",
    ],
    bestForPt: [
      "Famílias",
      "Quem quer trendy mas mais tranquilo que Itaewon",
      "Amantes de arte e design",
    ],
    bestForEs: [
      "Familias",
      "Quienes quieren tendencia pero más tranquilo que Itaewon",
      "Amantes del arte y el diseño",
    ],
  },
  {
    id: "jongno",
    name: "Jongno / Insadong (종로/인사동)",
    nameKo: "종로/인사동",
    nameJa: "鐘路／仁寺洞（종로/인사동）",
    nameZhCN: "钟路／仁寺洞（종로/인사동）",
    nameZhTW: "鐘路／仁寺洞（종로/인사동）",
    namePt: "Jongno / Insadong (종로/인사동)",
    nameEs: "Jongno / Insadong (종로/인사동)",
    emoji: "🏯",
    avgRentKRW: 800000,
    vibe: "Historic, cultural, traditional Korea vibe",
    vibeKo: "역사적이고 문화적인 전통 한국 느낌",
    vibeJa: "歴史的・文化的、伝統的な韓国の雰囲気",
    vibeZhCN: "历史文化浓厚，传统韩国风情",
    vibeZhTW: "歷史文化濃厚，傳統韓國風情",
    vibePt: "Histórico, cultural, ambiente tradicional coreano",
    vibeEs: "Histórico, cultural, ambiente tradicional coreano",
    pros: [
      "Rich in culture and history",
      "Affordable",
      "Unique neighborhood character",
      "Central location",
    ],
    prosKo: [
      "문화/역사 풍부",
      "저렴함",
      "독특한 동네 개성",
      "중심가",
    ],
    prosJa: [
      "文化・歴史が豊か",
      "手頃な家賃",
      "個性的な街並み",
      "都心部に位置",
    ],
    prosZhCN: [
      "文化历史丰富",
      "租金实惠",
      "独特的街区个性",
      "地理位置居中",
    ],
    prosZhTW: [
      "文化歷史豐富",
      "租金實惠",
      "獨特的街區個性",
      "地理位置居中",
    ],
    prosPt: [
      "Rico em cultura e história",
      "Acessível",
      "Carácter único do bairro",
      "Localização central",
    ],
    prosEs: [
      "Rico en cultura e historia",
      "Asequible",
      "Carácter único del barrio",
      "Ubicación central",
    ],
    cons: [
      "Fewer English speakers",
      "Quieter nightlife",
      "Older building stock",
    ],
    consKo: ["영어 구사자 적음", "나이트라이프 부족", "노후 건물 많음"],
    consJa: ["英語を話す人が少ない", "ナイトライフが静か", "古い建物が多い"],
    consZhCN: ["英语使用者少", "夜生活较少", "老旧建筑多"],
    consZhTW: ["英語使用者少", "夜生活較少", "老舊建築多"],
    consPt: ["Menos falantes de inglês", "Vida noturna mais tranquila", "Edifícios mais antigos"],
    consEs: ["Menos angloparlantes", "Vida nocturna más tranquila", "Edificios más antiguos"],
    stations: ["Jongno 3-ga (1, 3, 5)", "Anguk (3)"],
    foreignFriendly: false,
    bestFor: [
      "Culture enthusiasts",
      "Those seeking authentic Korean life",
      "Older expats",
    ],
    bestForKo: [
      "문화 애호가",
      "진짜 한국 생활 원하는 분",
      "중장년층 외국인",
    ],
    bestForJa: [
      "文化愛好家",
      "本物の韓国生活を求める方",
      "年配の外国人",
    ],
    bestForZhCN: [
      "文化爱好者",
      "寻找真实韩国生活的人",
      "年长的外国人",
    ],
    bestForZhTW: [
      "文化愛好者",
      "尋找真實韓國生活的人",
      "年長的外國人",
    ],
    bestForPt: [
      "Entusiastas da cultura",
      "Quem busca a vida coreana autêntica",
      "Expatriados mais velhos",
    ],
    bestForEs: [
      "Entusiastas de la cultura",
      "Quienes buscan la vida coreana auténtica",
      "Expatriados mayores",
    ],
  },
];

export const LEASE_SECTIONS = [
  {
    id: "parties",
    koreanLabel: "임대인 / 임차인",
    fieldEn: "Landlord (임대인) / Tenant (임차인)",
    explanationEn:
      "The landlord is '임대인' and you (the tenant) are '임차인'. Check that the landlord's name matches the property registration document (등기부등본).",
    explanationKo:
      "집주인은 임대인, 세입자(당신)는 임차인입니다. 집주인 이름이 등기부등본과 일치하는지 확인하세요.",
    redFlag:
      "If the name on the contract doesn't match the property registration, the real owner could evict you.",
  },
  {
    id: "property",
    koreanLabel: "부동산 표시",
    fieldEn: "Property Description (부동산 표시)",
    explanationEn:
      "The address and property details. Cross-reference with the property registration document to ensure the landlord actually owns what they're renting to you.",
    explanationKo:
      "주소와 부동산 정보입니다. 등기부등본으로 집주인이 실제 소유자인지 확인하세요.",
    redFlag:
      "Ask for a copy of the 등기부등본 (property registration) before signing anything.",
  },
  {
    id: "deposit",
    koreanLabel: "보증금",
    fieldEn: "Deposit Amount (보증금)",
    explanationEn:
      "The security deposit amount. For wolse this is typically 1M–50M KRW. For jeonse this can be hundreds of millions. Get it in writing exactly.",
    explanationKo:
      "보증금 금액입니다. 월세는 보통 100만~5000만원, 전세는 수억원까지 될 수 있습니다.",
    redFlag:
      "If the property has a mortgage, your deposit may be at risk. Check 근저당 (mortgage) on the registration document.",
  },
  {
    id: "monthly-rent",
    koreanLabel: "월세",
    fieldEn: "Monthly Rent (월세)",
    explanationEn:
      "How much you pay each month and by what date. Paying late can result in penalties or even contract termination.",
    explanationKo:
      "매달 내는 월세와 납부일입니다. 연체 시 위약금이나 계약 해지의 원인이 될 수 있습니다.",
    redFlag:
      "Confirm payment method. Most landlords want bank transfer, not cash.",
  },
  {
    id: "term",
    koreanLabel: "임대차 기간",
    fieldEn: "Lease Term (임대차 기간)",
    explanationEn:
      "Start and end date of your tenancy. By Korean law, the minimum protected lease term is 2 years — even if you sign for 1 year, you can legally stay for 2.",
    explanationKo:
      "계약 시작일과 종료일입니다. 한국법상 최소 2년 거주권이 보장됩니다 (묵시적 갱신 포함).",
    redFlag:
      "Make sure the start date is before your visa requires an address.",
  },
  {
    id: "maintenance",
    koreanLabel: "관리비",
    fieldEn: "Maintenance Fee (관리비)",
    explanationEn:
      "Monthly building maintenance fee — covers elevator, cleaning, parking, security. This is on top of rent. Can range from 50,000–200,000 KRW/month.",
    explanationKo:
      "매달 납부하는 관리비입니다. 엘리베이터, 청소, 주차, 경비 포함. 월 5만~20만원 수준.",
    redFlag:
      "Always ask: '관리비가 얼마예요?' before signing. This is often omitted from the headline price.",
  },
  {
    id: "special-terms",
    koreanLabel: "특약사항",
    fieldEn: "Special Terms (특약사항)",
    explanationEn:
      "This is the most important section. Any custom terms go here — repairs, pets, subletting, who pays for appliance breakdowns. Read every line carefully.",
    explanationKo:
      "가장 중요한 항목입니다. 수리, 반려동물, 전대, 가전 고장 책임 등 특별 조항이 여기 들어갑니다.",
    redFlag:
      "If something is agreed verbally, insist it goes in the 특약사항 in writing. Verbal agreements are hard to enforce.",
  },
];

export const RED_FLAGS = [
  {
    icon: "🚩",
    title: "Landlord is heavily in debt",
    titleKo: "집주인 부채 과다",
    titleJa: "家主が多額の借金を抱えている",
    titleZhCN: "房东负债过多",
    titleZhTW: "房東負債過多",
    titlePt: "Proprietário com muitas dívidas",
    titleEs: "Propietario con muchas deudas",
    description:
      "If the property has a large mortgage (근저당) that exceeds your deposit, you may not get your money back. Always request the 등기부등본 (property registration document) from the real estate agent.",
    descriptionKo:
      "부동산에 근저당이 보증금보다 많으면 보증금을 못 받을 수 있습니다. 계약 전 반드시 등기부등본을 확인하세요.",
    descriptionJa:
      "物件に保証金を超える多額の抵当権（근저당）が設定されている場合、お金が戻ってこない可能性があります。不動産業者に등기부등본（登記事項証明書）を必ず請求してください。",
    descriptionZhCN:
      "如果房产上有超过押金的大额抵押（근저당），您可能无法收回押金。始终向房产中介索取등기부등본（房产登记证明）。",
    descriptionZhTW:
      "如果房產上有超過押金的大額抵押（근저당），您可能無法收回押金。始終向房產中介索取등기부등본（房產登記證明）。",
    descriptionPt:
      "Se o imóvel tem uma hipoteca grande (근저당) que excede o seu depósito, pode não recuperar o dinheiro. Solicite sempre o 등기부등본 (documento de registo do imóvel) ao agente imobiliário.",
    descriptionEs:
      "Si el inmueble tiene una hipoteca grande (근저당) que supera tu depósito, puede que no recuperes el dinero. Solicita siempre el 등기부등본 (documento de registro de la propiedad) al agente inmobiliario.",
    whatToDo:
      "Get the 등기부등본 from the 부동산 and check '근저당권 설정' (mortgage). If it's more than 60-70% of property value, walk away.",
    whatToDoKo:
      "부동산에서 등기부등본을 발급받아 근저당권 설정 금액을 확인하세요. 주택가격의 60-70% 초과 시 계약하지 마세요.",
    whatToDoJa:
      "부동산（不動産業者）から등기부등본を発行してもらい、근저당권 설정（抵当権設定）金額を確認してください。物件価格の60〜70%を超える場合は契約を見合わせましょう。",
    whatToDoZhCN:
      "请房产中介出具등기부등본，检查근저당권 설정（抵押权设定）金额。如超过房产价值的60-70%，请放弃该物业。",
    whatToDoZhTW:
      "請房產中介出具등기부등본，檢查근저당권 설정（抵押權設定）金額。如超過房產價值的60-70%，請放棄該物業。",
    whatToDoPt:
      "Obtenha o 등기부등본 na 부동산 e verifique o '근저당권 설정' (hipoteca). Se for mais de 60-70% do valor do imóvel, desista.",
    whatToDoEs:
      "Obtén el 등기부등본 en la 부동산 y verifica el '근저당권 설정' (hipoteca). Si supera el 60-70% del valor del inmueble, aléjate.",
  },
  {
    icon: "🚩",
    title: "Landlord who isn't on the property registration",
    titleKo: "등기부등본과 다른 집주인",
    titleJa: "登記書類と家主が一致しない",
    titleZhCN: "房东与产权登记不符",
    titleZhTW: "房東與產權登記不符",
    titlePt: "Proprietário não consta no registo do imóvel",
    titleEs: "El propietario no figura en el registro del inmueble",
    description:
      "If the person renting to you is not listed as the owner on the 등기부등본, there may be fraud involved. The real owner can kick you out even if you paid the fake landlord.",
    descriptionKo:
      "등기부등본에 등록된 소유자가 계약 당사자와 다르면 사기일 수 있습니다. 실 소유자가 퇴거 요청도 가능합니다.",
    descriptionJa:
      "賃貸している相手が등기부등본の所有者と異なる場合、詐欺の可能性があります。偽の家主に支払っていても、本当の所有者から退去を求められることがあります。",
    descriptionZhCN:
      "如果向您出租的人不是등기부등본上登记的所有者，可能存在欺诈。即使您付款给了假房东，真正的所有者也可以要求您搬出。",
    descriptionZhTW:
      "如果向您出租的人不是등기부등본上登記的所有者，可能存在欺詐。即使您付款給了假房東，真正的所有者也可以要求您搬出。",
    descriptionPt:
      "Se a pessoa que lhe está a arrendar não consta como proprietário no 등기부등본, pode haver fraude. O verdadeiro proprietário pode expulsá-lo mesmo que tenha pago ao proprietário falso.",
    descriptionEs:
      "Si la persona que te alquila no figura como propietario en el 등기부등본, puede haber fraude. El propietario real puede echarte aunque hayas pagado al propietario falso.",
    whatToDo:
      "Always verify the landlord's ID matches the 등기부등본. If subletting, get written permission from the actual owner.",
    whatToDoKo:
      "집주인 신분증과 등기부등본의 이름이 일치하는지 확인하세요. 전대차인 경우 실소유자의 동의서를 받으세요.",
    whatToDoJa:
      "家主の身分証明書と등기부등본の名前が一致するか必ず確認してください。転貸の場合は、実際の所有者からの書面による許可を得てください。",
    whatToDoZhCN:
      "务必核实房东证件与등기부등본上的名字是否一致。如为转租，需获得实际业主的书面同意。",
    whatToDoZhTW:
      "務必核實房東證件與등기부등본上的名字是否一致。如為轉租，需獲得實際業主的書面同意。",
    whatToDoPt:
      "Verifique sempre se o ID do proprietário corresponde ao 등기부등본. Se for subarrendamento, obtenha permissão escrita do proprietário real.",
    whatToDoEs:
      "Verifica siempre que el DNI del propietario coincide con el 등기부등본. Si es subarriendo, obtén permiso escrito del propietario real.",
  },
  {
    icon: "🚩",
    title: "Pressure to decide immediately",
    titleKo: "즉각 결정 압박",
    titleJa: "すぐに決断するよう迫られる",
    titleZhCN: "被催促立即做决定",
    titleZhTW: "被催促立即做決定",
    titlePt: "Pressão para decidir imediatamente",
    titleEs: "Presión para decidir de inmediato",
    description:
      "Legitimate landlords don't demand you sign today. High-pressure tactics are a red flag for scams or hiding something about the property.",
    descriptionKo:
      "정상적인 집주인은 즉각 계약을 강요하지 않습니다. 압박이 심하면 사기이거나 숨기는 것이 있을 수 있습니다.",
    descriptionJa:
      "まともな家主は今日中に署名するよう迫ることはありません。高圧的な戦術は詐欺や物件の問題を隠そうとしているサインです。",
    descriptionZhCN:
      "正规的房东不会强迫您当天签合同。高压手段是诈骗或隐藏房屋问题的警示信号。",
    descriptionZhTW:
      "正規的房東不會強迫您當天簽合同。高壓手段是詐騙或隱藏房屋問題的警示信號。",
    descriptionPt:
      "Proprietários legítimos não exigem que assine hoje. Táticas de alta pressão são um sinal de alerta para fraudes ou algo escondido sobre o imóvel.",
    descriptionEs:
      "Los propietarios legítimos no te exigen que firmes hoy. Las tácticas de alta presión son una señal de alerta de estafas o de que están ocultando algo sobre la propiedad.",
    whatToDo:
      "Walk away from any agent or landlord who pressures you. Take 24-48 hours minimum before signing any contract.",
    whatToDoKo:
      "압박하는 부동산이나 집주인은 피하세요. 계약 전 최소 24-48시간 생각하는 시간을 가지세요.",
    whatToDoJa:
      "急かす業者や家主からは距離を置きましょう。いかなる契約にも署名する前に、最低24〜48時間の検討時間を設けてください。",
    whatToDoZhCN:
      "远离任何向您施压的中介或房东。签署任何合同前，至少留出24-48小时考虑时间。",
    whatToDoZhTW:
      "遠離任何向您施壓的中介或房東。簽署任何合同前，至少留出24-48小時考慮時間。",
    whatToDoPt:
      "Afaste-se de qualquer agente ou proprietário que o pressione. Espere no mínimo 24-48 horas antes de assinar qualquer contrato.",
    whatToDoEs:
      "Aléjate de cualquier agente o propietario que te presione. Espera mínimo 24-48 horas antes de firmar cualquier contrato.",
  },
  {
    icon: "🚩",
    title: "Unusually cheap rent in a popular area",
    titleKo: "인기 지역의 비정상적으로 싼 월세",
    titleJa: "人気エリアで異常に安い家賃",
    titleZhCN: "热门地区租金异常低廉",
    titleZhTW: "熱門地區租金異常低廉",
    titlePt: "Aluguel incomumente barato numa área popular",
    titleEs: "Alquiler inusualmente barato en una zona popular",
    description:
      "If it seems too good to be true, it probably is. Scammers often post fake listings with below-market prices to get deposits before disappearing.",
    descriptionKo:
      "너무 싸 보이면 의심하세요. 사기범들은 시세보다 낮은 가격으로 허위 매물을 올리고 보증금을 받고 잠적합니다.",
    descriptionJa:
      "良すぎる話には裏があります。詐欺師は相場より低い価格で偽の物件情報を掲載し、保証金を受け取って姿を消すことがよくあります。",
    descriptionZhCN:
      "看起来好得不像真的，通常就是假的。诈骗者常以低于市场价的价格发布虚假房源，收取押金后消失。",
    descriptionZhTW:
      "看起來好得不像真的，通常就是假的。詐騙者常以低於市場價的價格發布虛假房源，收取押金後消失。",
    descriptionPt:
      "Se parece bom demais para ser verdade, provavelmente é. Os golpistas costumam publicar anúncios falsos com preços abaixo do mercado para receber depósitos antes de desaparecerem.",
    descriptionEs:
      "Si parece demasiado bueno para ser verdad, probablemente lo es. Los estafadores suelen publicar anuncios falsos con precios por debajo del mercado para cobrar depósitos y luego desaparecer.",
    whatToDo:
      "Cross-check prices on Naver Real Estate (네이버 부동산) and Zigbang (직방). If the price is more than 15-20% below average, investigate thoroughly.",
    whatToDoKo:
      "네이버 부동산과 직방에서 시세를 비교하세요. 시세보다 15-20% 이상 저렴하면 꼼꼼히 확인하세요.",
    whatToDoJa:
      "ネイバー不動産（네이버 부동산）とジクバン（직방）で価格を照合してください。平均より15〜20%以上安い場合は徹底的に調査しましょう。",
    whatToDoZhCN:
      "在Naver房产（네이버 부동산）和直房（직방）上核对价格。如果低于平均价格15-20%以上，务必深入调查。",
    whatToDoZhTW:
      "在Naver房產（네이버 부동산）和直房（직방）上核對價格。如果低於平均價格15-20%以上，務必深入調查。",
    whatToDoPt:
      "Verifique preços no Naver Real Estate (네이버 부동산) e no Zigbang (직방). Se o preço for mais de 15-20% abaixo da média, investigue a fundo.",
    whatToDoEs:
      "Comprueba precios en Naver Real Estate (네이버 부동산) y Zigbang (직방). Si el precio está más de un 15-20% por debajo de la media, investiga a fondo.",
  },
  {
    icon: "🚩",
    title: "No written contract",
    titleKo: "서면 계약서 없음",
    titleJa: "書面による契約書がない",
    titleZhCN: "没有书面合同",
    titleZhTW: "沒有書面合同",
    titlePt: "Sem contrato escrito",
    titleEs: "Sin contrato escrito",
    description:
      "In Korea, verbal rental agreements have limited legal protection. Always insist on a written 임대차계약서. If they refuse, leave.",
    descriptionKo:
      "구두 계약은 법적 보호가 약합니다. 반드시 서면 임대차계약서를 요구하세요. 거부하면 그냥 나오세요.",
    descriptionJa:
      "韓国では、口頭の賃貸契約は法的保護が限られています。書面による임대차계약서（賃貸借契約書）を必ず求めてください。拒否された場合はその場を立ち去りましょう。",
    descriptionZhCN:
      "在韩国，口头租赁协议的法律保护有限。务必坚持要求书面임대차계약서（租赁合同）。如果对方拒绝，请离开。",
    descriptionZhTW:
      "在韓國，口頭租賃協議的法律保護有限。務必堅持要求書面임대차계약서（租賃合同）。如果對方拒絕，請離開。",
    descriptionPt:
      "Na Coreia, acordos verbais de arrendamento têm proteção legal limitada. Exija sempre um 임대차계약서 escrito. Se recusarem, vá embora.",
    descriptionEs:
      "En Corea, los acuerdos verbales de alquiler tienen protección legal limitada. Exige siempre un 임대차계약서 escrito. Si se niegan, vete.",
    whatToDo:
      "Use a licensed real estate agent (공인중개사) who is legally required to provide a written contract and explain the terms.",
    whatToDoKo:
      "공인중개사 사무소를 이용하세요. 공인중개사는 서면 계약서 작성과 설명이 법적 의무입니다.",
    whatToDoJa:
      "公認仲介士（공인중개사）を利用しましょう。公認仲介士は書面による契約書の作成と内容説明が法的義務となっています。",
    whatToDoZhCN:
      "使用持牌房产中介（공인중개사），他们依法必须提供书面合同并解释条款。",
    whatToDoZhTW:
      "使用持牌房產中介（공인중개사），他們依法必須提供書面合同並解釋條款。",
    whatToDoPt:
      "Use um agente imobiliário licenciado (공인중개사) que é legalmente obrigado a fornecer um contrato escrito e explicar os termos.",
    whatToDoEs:
      "Usa un agente inmobiliario con licencia (공인중개사) que está legalmente obligado a proporcionar un contrato escrito y explicar los términos.",
  },
];

export const MOVING_CHECKLIST = [
  {
    step: 1,
    category: "Before signing",
    categoryKo: "계약 전",
    categoryJa: "署名前",
    categoryZhCN: "签约前",
    categoryZhTW: "簽約前",
    categoryPt: "Antes de assinar",
    categoryEs: "Antes de firmar",
    task: "Get 등기부등본 (property registration document)",
    taskKo: "등기부등본 발급",
    taskJa: "등기부등본（登記事項証明書）を取得する",
    taskZhCN: "获取등기부등본（房产登记证明）",
    taskZhTW: "獲取등기부등본（房產登記證明）",
    taskPt: "Obter o 등기부등본 (documento de registo do imóvel)",
    taskEs: "Obtener el 등기부등본 (documento de registro del inmueble)",
    detail:
      "Ask your 부동산 agent. Costs around 1,000 KRW and verifies the owner and any mortgages.",
  },
  {
    step: 2,
    category: "Before signing",
    categoryKo: "계약 전",
    categoryJa: "署名前",
    categoryZhCN: "签约前",
    categoryZhTW: "簽約前",
    categoryPt: "Antes de assinar",
    categoryEs: "Antes de firmar",
    task: "Verify landlord's ID matches the registration",
    taskKo: "집주인 신분증 확인",
    taskJa: "家主の身分証が登記と一致することを確認する",
    taskZhCN: "核实房东身份证与登记信息一致",
    taskZhTW: "核實房東身份證與登記信息一致",
    taskPt: "Verificar se o ID do proprietário corresponde ao registo",
    taskEs: "Verificar que el DNI del propietario coincide con el registro",
    detail:
      "Ask to see their ID card (주민등록증 or 운전면허증) and confirm the name matches.",
  },
  {
    step: 3,
    category: "Before signing",
    categoryKo: "계약 전",
    categoryJa: "署名前",
    categoryZhCN: "签约前",
    categoryZhTW: "簽約前",
    categoryPt: "Antes de assinar",
    categoryEs: "Antes de firmar",
    task: "Confirm total monthly costs (rent + 관리비)",
    taskKo: "월 총 비용 확인 (월세 + 관리비)",
    taskJa: "月額合計費用を確認する（家賃＋管理費）",
    taskZhCN: "确认每月总费用（房租 + 관리비管理费）",
    taskZhTW: "確認每月總費用（房租 + 관리비管理費）",
    taskPt: "Confirmar custos mensais totais (renda + 관리비)",
    taskEs: "Confirmar costos mensuales totales (alquiler + 관리비)",
    detail:
      "Ask: 관리비 포함해서 총 얼마예요? (How much is it all in including maintenance fee?)",
  },
  {
    step: 4,
    category: "Signing day",
    categoryKo: "계약 당일",
    categoryJa: "署名当日",
    categoryZhCN: "签约当天",
    categoryZhTW: "簽約當天",
    categoryPt: "Dia da assinatura",
    categoryEs: "Día de la firma",
    task: "Read ALL sections of the 임대차계약서",
    taskKo: "임대차계약서 전체 읽기",
    taskJa: "임대차계약서（賃貸借契約書）を全項目読む",
    taskZhCN: "阅读임대차계약서（租赁合同）全部条款",
    taskZhTW: "閱讀임대차계약서（租賃合同）全部條款",
    taskPt: "Ler TODAS as secções do 임대차계약서",
    taskEs: "Leer TODAS las secciones del 임대차계약서",
    detail:
      "Especially the 특약사항 (special terms). Use Google Translate or bring a Korean-speaking friend.",
  },
  {
    step: 5,
    category: "Signing day",
    categoryKo: "계약 당일",
    categoryJa: "署名当日",
    categoryZhCN: "签约当天",
    categoryZhTW: "簽約當天",
    categoryPt: "Dia da assinatura",
    categoryEs: "Día de la firma",
    task: "Get a copy of the signed contract",
    taskKo: "계약서 사본 수령",
    taskJa: "署名済み契約書のコピーを受け取る",
    taskZhCN: "获取已签合同的副本",
    taskZhTW: "獲取已簽合同的副本",
    taskPt: "Obter uma cópia do contrato assinado",
    taskEs: "Obtener una copia del contrato firmado",
    detail: "You are legally entitled to a copy. Never leave without one.",
  },
  {
    step: 6,
    category: "Move-in day",
    categoryKo: "이사 당일",
    categoryJa: "入居当日",
    categoryZhCN: "入住当天",
    categoryZhTW: "入住當天",
    categoryPt: "Dia da mudança",
    categoryEs: "Día de la mudanza",
    task: "Register your address at the local 주민센터",
    taskKo: "주민센터 전입신고",
    taskJa: "地域の주민센터（住民センター）で住所登録をする",
    taskZhCN: "在附近的주민센터（居民中心）登记地址",
    taskZhTW: "在附近的주민센터（居民中心）登記地址",
    taskPt: "Registar a morada no 주민센터 local",
    taskEs: "Registrar tu dirección en el 주민센터 local",
    detail:
      "This activates the '확정일자' (priority date) which protects your deposit in court if needed.",
  },
  {
    step: 7,
    category: "Move-in day",
    categoryKo: "이사 당일",
    categoryJa: "入居当日",
    categoryZhCN: "入住当天",
    categoryZhTW: "入住當天",
    categoryPt: "Dia da mudança",
    categoryEs: "Día de la mudanza",
    task: "Document existing damage with photos/video",
    taskKo: "기존 파손 사진/영상 기록",
    taskJa: "既存の損傷を写真・動画で記録する",
    taskZhCN: "用照片/视频记录现有损坏情况",
    taskZhTW: "用照片/視頻記錄現有損壞情況",
    taskPt: "Documentar danos existentes com fotos/vídeo",
    taskEs: "Documentar daños existentes con fotos/vídeo",
    detail:
      "Send them to your landlord via KakaoTalk to create a timestamp. Prevents disputes when leaving.",
  },
  {
    step: 8,
    category: "Move-in day",
    categoryKo: "이사 당일",
    categoryJa: "入居当日",
    categoryZhCN: "入住当天",
    categoryZhTW: "入住當天",
    categoryPt: "Dia da mudança",
    categoryEs: "Día de la mudanza",
    task: "Check all appliances and facilities",
    taskKo: "모든 가전 및 시설 확인",
    taskJa: "すべての家電・設備を確認する",
    taskZhCN: "检查所有家电及设施",
    taskZhTW: "檢查所有家電及設施",
    taskPt: "Verificar todos os eletrodomésticos e instalações",
    taskEs: "Verificar todos los electrodomésticos e instalaciones",
    detail:
      "Test water heater, air conditioner, washing machine, oven. Report issues within the first week.",
  },
];

export const BUDONGSAN_PHRASES = [
  {
    situation: "Asking about rent",
    situationKo: "월세 문의",
    korean: "월세로 찾고 있어요",
    romanization: "Wolse-ro chatgo isseoyo",
    english: "I'm looking for a wolse apartment",
  },
  {
    situation: "Asking total cost",
    situationKo: "총 비용 문의",
    korean: "관리비 포함해서 총 얼마예요?",
    romanization: "Gwallibe pohamhaeseo chong eolmaeyo?",
    english: "How much in total including maintenance fee?",
  },
  {
    situation: "Requesting documents",
    situationKo: "서류 요청",
    korean: "등기부등본 보여주세요",
    romanization: "Deunggibuedeungbon boyeojuseyo",
    english: "Please show me the property registration document",
  },
  {
    situation: "Asking about duration",
    situationKo: "계약 기간 문의",
    korean: "계약 기간이 얼마예요?",
    romanization: "Gyeyak gigani eolmaeyo?",
    english: "What is the lease term?",
  },
  {
    situation: "Asking about pets",
    situationKo: "반려동물 문의",
    korean: "반려동물 키울 수 있나요?",
    romanization: "Ballyeodongmul kiwul su innayo?",
    english: "Can I have pets?",
  },
  {
    situation: "Reporting maintenance issue",
    situationKo: "수리 요청",
    korean: "수리가 필요해요",
    romanization: "Suriga piryohaeyo",
    english: "I need a repair",
  },
];
