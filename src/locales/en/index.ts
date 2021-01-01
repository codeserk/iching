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
}
