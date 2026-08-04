export const lessonRoots = [
  {
    char: '日',
    pinyin: 'rì',
    meaning: 'sun · day',
    picture: 'sun',
    title: 'Why 日 looks like this',
    explanation: 'It began as the outline of the sun. A mark inside helped identify the shape as the sun, rather than an empty ring. Straight cuts were easier to carve on bone, so the round picture became more angular.',
    hook: 'See a sun with one bright mark inside.',
  },
  {
    char: '月',
    pinyin: 'yuè',
    meaning: 'moon · month',
    picture: 'moon',
    title: 'Why 月 looks like this',
    explanation: 'It began as the curved edge of a crescent moon, with a short mark suggesting the darker part inside. As writing became faster, the curve was straightened and fitted into a regular writing box.',
    hook: 'See a slim crescent standing on its side.',
  },
];

export const rootChapters = [
  {
    id: 'water',
    char: '水',
    pinyin: 'shuǐ',
    meaning: 'water',
    headline: 'How water became 水',
    lessonStep: 1,
    lessonSteps: 8,
    stages: [
      {
        id: 'picture',
        label: 'PICTURE',
        visual: 'water-picture',
        color: 'blue',
        accessibleLabel: 'A teaching picture of flowing water',
      },
      {
        id: 'seal',
        label: 'SEAL SCRIPT',
        visual: 'water-seal',
        color: 'coral',
        accessibleLabel: 'The small-seal-script form of water',
      },
      {
        id: 'today',
        label: 'TODAY',
        visual: 'modern-character',
        color: 'ink',
        accessibleLabel: 'The modern character 水',
      },
    ],
    note: 'The flowing lines became a regular written form, while the idea of moving water stayed visible.',
    primaryAction: 'Continue',
    nextStep: 'Next: see how 水 changes inside another character.',
    family: [
      {
        char: '河',
        pinyin: 'hé',
        meaning: 'river',
        chunks: [
          { text: '河流', pinyin: 'héliú', meaning: 'river' },
          { text: '黄河', pinyin: 'Huáng Hé', meaning: 'Yellow River' },
        ],
      },
      {
        char: '海',
        pinyin: 'hǎi',
        meaning: 'sea',
        chunks: [
          { text: '大海', pinyin: 'dàhǎi', meaning: 'the sea' },
          { text: '海边', pinyin: 'hǎibiān', meaning: 'seaside' },
        ],
      },
      {
        char: '洗',
        pinyin: 'xǐ',
        meaning: 'wash',
        chunks: [
          { text: '洗手', pinyin: 'xǐshǒu', meaning: 'wash hands' },
          { text: '洗衣服', pinyin: 'xǐ yīfu', meaning: 'wash clothes' },
        ],
      },
      {
        char: '池',
        pinyin: 'chí',
        meaning: 'pond',
        chunks: [
          { text: '水池', pinyin: 'shuǐchí', meaning: 'pool' },
          { text: '池塘', pinyin: 'chítáng', meaning: 'pond' },
        ],
      },
      {
        char: '泳',
        pinyin: 'yǒng',
        meaning: 'swim',
        chunks: [
          { text: '游泳', pinyin: 'yóuyǒng', meaning: 'to swim' },
          { text: '泳池', pinyin: 'yǒngchí', meaning: 'swimming pool' },
        ],
      },
    ],
    radicalQuestion: {
      prompt: 'Which shape does 水 use on the left side of a character?',
      options: ['氵', '冫', '灬'],
      answer: '氵',
      explanation: '水 becomes the compact form 氵 when it appears on the left.',
    },
    meaningQuestions: [
      { prompt: 'Which character means “river”?', answer: '河', options: ['河', '海', '洗'] },
      { prompt: 'Which character means “sea”?', answer: '海', options: ['池', '海', '泳'] },
      { prompt: 'Which character means “wash”?', answer: '洗', options: ['河', '洗', '池'] },
      { prompt: 'Which character means “pond”?', answer: '池', options: ['海', '泳', '池'] },
      { prompt: 'Which character means “swim”?', answer: '泳', options: ['洗', '河', '泳'] },
    ],
    wordQuestions: [
      { prompt: 'Choose “wash hands”.', answer: '洗手', options: ['洗手', '海边', '泳池'] },
      { prompt: 'Choose “seaside”.', answer: '海边', options: ['池塘', '黄河', '海边'] },
      { prompt: 'Choose “swimming pool”.', answer: '泳池', options: ['河流', '泳池', '大海'] },
      { prompt: 'Choose “Yellow River”.', answer: '黄河', options: ['水池', '黄河', '洗衣服'] },
      { prompt: 'Choose “pond”.', answer: '池塘', options: ['池塘', '游泳', '河流'] },
    ],
    sentenceQuestions: [
      {
        sentence: '我每天游泳。',
        pinyin: 'Wǒ měitiān yóuyǒng.',
        answer: 'I swim every day.',
        options: ['I swim every day.', 'I wash my hands every day.', 'I walk by the sea.'],
      },
      {
        sentence: '请洗手。',
        pinyin: 'Qǐng xǐshǒu.',
        answer: 'Please wash your hands.',
        options: ['Please wash your hands.', 'Please go to the river.', 'Please look at the pond.'],
      },
      {
        sentence: '鱼在池塘里。',
        pinyin: 'Yú zài chítáng lǐ.',
        answer: 'The fish are in the pond.',
        options: ['The fish are in the pond.', 'The fish are in the sea.', 'There is no water here.'],
      },
    ],
    buildQuestions: [
      {
        prompt: 'Build: “I swim every day.”',
        tokens: ['游泳', '我', '每天'],
        answer: ['我', '每天', '游泳'],
      },
      {
        prompt: 'Build: “Please wash your hands.”',
        tokens: ['洗手', '请'],
        answer: ['请', '洗手'],
      },
    ],
    source: {
      label: 'Dictionary of Chinese Character Variants — 水',
      url: 'https://dict.variants.moe.edu.tw/dictView.jsp?ID=23284&la=1&q=1',
    },
  },
];

export const commonPictureRoots = [
  { char: '日', pinyin: 'rì', meaning: 'sun', icon: '☀', examples: '明 · 晴 · 时' },
  { char: '月', pinyin: 'yuè', meaning: 'moon', icon: '☾', examples: '明 · 期 · 朝' },
  { char: '水', pinyin: 'shuǐ', meaning: 'water', icon: '≈', examples: '河 · 海 · 洗', note: 'Often becomes 氵.' },
  { char: '火', pinyin: 'huǒ', meaning: 'fire', icon: '♨', examples: '灯 · 热 · 照', note: 'Can become 灬 below a character.' },
  { char: '木', pinyin: 'mù', meaning: 'tree', icon: '♧', examples: '林 · 森 · 树' },
  { char: '山', pinyin: 'shān', meaning: 'mountain', icon: '▲', examples: '岩 · 峰 · 岛' },
  { char: '人', pinyin: 'rén', meaning: 'person', icon: '人', examples: '你 · 休 · 住', note: 'Often becomes 亻.' },
  { char: '口', pinyin: 'kǒu', meaning: 'mouth', icon: '□', examples: '吃 · 喝 · 唱' },
  { char: '目', pinyin: 'mù', meaning: 'eye', icon: '◉', examples: '看 · 眼 · 睛' },
  { char: '手', pinyin: 'shǒu', meaning: 'hand', icon: '✋', examples: '打 · 提 · 找', note: 'Often becomes 扌.' },
  { char: '心', pinyin: 'xīn', meaning: 'heart', icon: '♥', examples: '想 · 情 · 怕', note: 'Often becomes 忄.' },
  { char: '女', pinyin: 'nǚ', meaning: 'woman', icon: '女', examples: '妈 · 姐 · 好' },
  { char: '子', pinyin: 'zǐ', meaning: 'child', icon: '子', examples: '字 · 孩 · 孙' },
  { char: '田', pinyin: 'tián', meaning: 'field', icon: '▦', examples: '男 · 界 · 留' },
  { char: '雨', pinyin: 'yǔ', meaning: 'rain', icon: '☂', examples: '雪 · 雷 · 霜' },
  { char: '牛', pinyin: 'niú', meaning: 'ox', icon: '牛', examples: '物 · 特 · 牧', note: 'Often becomes 牜.' },
  { char: '羊', pinyin: 'yáng', meaning: 'sheep', icon: '羊', examples: '美 · 群 · 善' },
  { char: '鸟', pinyin: 'niǎo', meaning: 'bird', icon: '♩', examples: '鸣 · 鸡 · 鸭' },
  { char: '鱼', pinyin: 'yú', meaning: 'fish', icon: '><>', examples: '鲜 · 鲸 · 鲤' },
  { char: '门', pinyin: 'mén', meaning: 'door', icon: 'Π', examples: '问 · 间 · 闻' },
];
