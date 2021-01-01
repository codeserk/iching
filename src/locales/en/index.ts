export default {
  skip: 'SKIP',
  start: 'Start',

  sections: {
    journal: {
      tab: 'Journal',
    },

    oracle: {
      tab: 'Oracle',
    },

    settings: {
      tab: 'Settings',
    },
  },

  trigrams: {
    1: {
      name: 'Heaven',
      image: 'the Creative',
    },
    2: {
      name: 'Lake',
      image: 'the Joyous',
    },
    3: {
      name: 'Fire',
      image: 'the Clinging',
    },
    4: {
      name: 'Thunder',
      image: 'the Arousing',
    },
    5: {
      name: 'Wind',
      image: 'the Gentle',
    },
    6: {
      name: 'Water',
      image: 'the Abysmal',
    },
    7: {
      name: 'Mountain',
      image: 'Keeping Still',
    },
    8: {
      name: 'Earth',
      image: 'the Receptive',
    },
  },

  introduction: {
    slides: {
      1: {
        title: 'Welcome!',
        description: `This app will let you consult the <em>I Ching</em> oracle easily, without carrying coins around :)`,
      },
      2: {
        title: 'Think your questions',
        description: `The first thing you need to do is think a question...`,
      },
      3: {
        title: 'Toss the coins!',
        description: `The resulting coins highly depend on the <strong>exact moment</strong> when you toss them. You have <em>impact</em> on the final result.`,
      },
      4: {
        title: 'Customize your experience',
        description: `Decide what information you want to display (trigrams, quotes, descriptions).`,
      },
      5: {
        title: 'Check your journal!',
        description: 'You can always check previous answers from the oracle.',
      },
    },
  },

  questions: {
    tip: {
      0: `Ask about one thing at a time. Instead of <em>Should I do this, or that?</em> ask
      <em>What if I do this?</em>`,
      1: `Don’t ask for a <em>yes</em> or <em>no</em>. Instead of <em>Should I…?</em> ask
      <em>What if I…?</em> Instead of <em>Will it happen?</em> you could ask <em>What will happen?</em>.`,
      2: `Make a habit of asking about your own choices and feelings, not other people’s.`,
      3: `Write your question down before you cast the reading, and keep thinking about it while you are tossing
      the coins.`,
    },
  },

  help: {
    title: 'Help',

    iching: {
      title: 'I-Ching',

      description: {
        0: 'The I Ching or Yi Jing (Chinese: 易經, Mandarin: [î tɕíŋ]), usually translated as Book of Changes or Classic of Changes, is an ancient Chinese divination text and among the oldest of the Chinese classics. Originally a divination manual in the Western Zhou period (1000–750 BC), over the course of the Warring States period and early imperial period (500–200 BC) it was transformed into a cosmological text with a series of philosophical commentaries known as the "Ten Wings".[1] After becoming part of the Five Classics in the 2nd century BC, the I Ching was the subject of scholarly commentary and the basis for divination practice for centuries across the Far East, and eventually took on an influential role in Western understanding of Eastern thought.',
        1: 'The I Ching is used in a type of divination called cleromancy, which uses apparently random numbers. Six numbers between 6 and 9 are turned into a hexagram, which can then be looked up in the text, in which hexagrams are arranged in an order known as the King Wen sequence. The interpretation of the readings found in the I Ching is a matter which has been endlessly discussed and debated over in the centuries following its compilation, and many commentators have used the book symbolically, often to provide guidance for moral decision making as informed by Confucianism, Taoism and Buddhism. The hexagrams themselves have often acquired cosmological significance and been paralleled with many other traditional names for the processes of change such as yin and yang and Wu Xing.',
      },

      moreInfo: {
        label: 'More info from Wikipedia',
        link: 'https://en.wikipedia.org/wiki/I_Ching',
      },
    },

    question: {
      title: 'Question',

      description: {
        0: "It's important that you think about your question during the whole process.",
        1: 'Some tips:',
      },
    },
    coins: {
      title: 'Coins',

      description: {
        0: 'To consult the I-Ching, you have to toss 3 coins 6 times. These are the coins that we are using in this app.',
        1: 'To toss them, simply click on them, or on the blue button above.',
        2: 'The resulting coins will determine the lines of the hexagram:',
      },

      table: {
        combo: 'Coins Combo',
        number: 'Number',
        line: 'Line',

        mutableYang: '3 Heads',
        yin: '2 Heads, 1 Tail',
        mutableYin: '1 Head, 2 Tails',
        yang: '3 Tails',
      },
    },
    hexagram: {
      title: 'Hexagram',

      description: {
        0: 'The hexagrams you identify can be called your “Primary hexagram” (or "Present hexagram"). In order to produce a “Secondary hexagram” (or "Future hexagram"), just change all the lines marked with an ‘x’ or an ‘o’ into their opposite. Any broken lines (Yin) marked with an ‘x’ flip into their opposite - a solid line (Yang) — and solid Yang lines marked with an ‘o’ turn into the broken Yin lines.',
        1: 'The I Ching means “Book of Changes” in Chinese and is all about Change, which is the one constant in life. If you get no changing lines when you cast a hexagram (i.e. number 6 or a 9 value), that signifies that conditions related to your topic are relatively stable or not in great flux at this particular time.',
        2: 'Once you have identified your hexagram(s), this app will show you the meaning:',
        3: 'Description: A general description of the hexagram',
        4: 'Judgement: An interpretation of the Hexagram. Includes the quote from the original book, and an explanation.',
        5: 'Image: An interpretation of the visual figure. Includes the quote from the original book, and an explanation.',
        6: 'Mutations: an interpretation of the mutated lines. Includes the quote from the original book, and an explanation.',
        7: 'The texts of the hexagrams presented on this app are a free translation into English from the of the I Ching made by Richard Wilhelm, the first version of which dates from 1924.',
      },
    },
  },

  oracle: {
    title: 'Ask the Oracle',

    question: {
      title: 'Think about your question...',
      name: 'Question from {date}',
    },

    toss: {
      title: 'Toss the coins',
    },
  },

  settings: {
    title: 'Settings',

    tabs: {
      config: 'Config',
      about: 'About',
    },

    config: {
      language: {
        label: 'Language',
        placeholder: 'Pick a language',

        en: 'English',
        es: 'Spanish',
      },

      quote: 'Quote',
      description: 'Description',
      explanation: 'Explanation',

      display: 'Display',
      hexagramHeader: 'Hexagram Header',
      chineseName: 'Chinese name',
      pinyinName: 'Pinyin name',
      trigrams: 'Trigrams',

      judgement: 'Judgement',
      image: 'Image',
      mutations: 'Mutations',

      journal: 'Journal',
      confirmDeletion: 'Confirm deletion',
    },

    about: {
      thanks: 'Thanks for using my app :)',

      website: 'Website',
      privacyPolicy: 'Privacy Policy',
      coffee: 'Buy me a coffee!',
      free: 'This app is (and will always be) completely free, but support is always welcomed!',
    },
  },

  hexagram: {
    primary: 'Primary',
    secondary: 'Secondary',

    judgement: 'Judgement',
    image: 'Image',
    mutations: 'Mutations',
    lines: {
      1: 'Bottom Line',
      2: 'Second Line',
      3: 'Third Line',
      4: 'Fourth Line',
      5: 'Fifth Line',
      6: 'Top Line',
    },
  },

  delete: {
    title: 'Confirm deletion',
    message: 'Are you sure you want to delete this answer from the Oracle?',
    cancel: 'Cancel',
    accept: 'Yes',
  },

  close: 'Close',
  cancel: 'Cancel',
  ok: 'OK',
}
