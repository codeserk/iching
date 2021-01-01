export default {
  skip: 'OMITIR',
  start: 'Empezar',

  sections: {
    journal: {
      tab: 'Consultas',
    },

    oracle: {
      tab: 'Oráculo',
    },

    settings: {
      tab: 'Opciones',
    },
  },

  trigrams: {
    1: {
      name: 'Cielo',
      image: 'Lo Creativo',
    },
    2: {
      name: 'Lago',
      image: 'Lo Placentero',
    },
    3: {
      name: 'Llama',
      image: 'Lo Oscilante',
    },
    4: {
      name: 'Trueno',
      image: 'Lo que Despierta',
    },
    5: {
      name: 'Viento',
      image: 'Lo Suave',
    },
    6: {
      name: 'Agua',
      image: 'El Abismo',
    },
    7: {
      name: 'la Montaña',
      image: 'La Inmovilidad',
    },
    8: {
      name: 'Tierra',
      image: 'Lo Receptivo',
    },
  },

  introduction: {
    slides: {
      1: {
        title: '¡Bienvenido!',
        description: `Esta aplicación te permitirá consultar el oráculo <em> I Ching </em> fácilmente, sin llevar monedas encima :)        `,
      },
      2: {
        title: 'Piensa tu pregunta',
        description: `Lo primero que tienes que hacer es pensar tu pregunta...`,
      },
      3: {
        title: '¡Tira las monedas!',
        description: `Las monedas resultantes dependen en gran medida del <strong> momento exacto </strong> en que las lanzas. Tienes <em>impacto</em> en el resultado final.`,
      },
      4: {
        title: 'Personaliza tu experiencia',
        description: `Decide qué información desea mostrar (trigramas, citas, descripciones).`,
      },
      5: {
        title: '¡Revisa tus consultas!',
        description: 'Siempre puede consultar las respuestas anteriores del oráculo.',
      },
    },
  },

  questions: {
    tip: {
      0: `Pregunta sobre una cosa a la vez. En lugar de <em> ¿Debería hacer esto o aquello? </em> pregunta
      <em> ¿Qué pasa si hago esto? </em>`,
      1: `No pidas un <em> sí </em> o un <em> no </em>. En lugar de <em> ¿Debería…? </em> pregunta
      <em> ¿Y si yo…? </em> En lugar de <em> ¿Sucederá? </em>, podrías preguntar <em> ¿Qué pasará? </em>.`,
      2: `Adquiere el hábito de preguntar sobre sus propias elecciones y sentimientos, no sobre los de otras personas.`,
      3: `Escribe su pregunta antes de lanzar la lectura, y sigue pensando en ella mientras lanza las monedas.`,
    },
  },

  oracle: {
    title: 'Pregunta al Oráculo',

    question: {
      title: 'Piensa tu pregunta...',
      name: 'Pregunta realizada el {date}',
    },

    toss: {
      title: 'Lanza las monedas',
    },
  },

  settings: {
    title: 'Opciones',

    tabs: {
      config: 'Opciones',
      about: 'Créditos',
    },

    config: {
      language: {
        label: 'Idioma',
        placeholder: 'Elige el idioma',

        en: 'Inglés',
        es: 'Castellano',
      },

      quote: 'Cita',
      description: 'Descripción',
      explanation: 'Explicación',

      display: 'Visualización',
      hexagramHeader: 'Cabecera del Hexagrama',
      chineseName: 'Nombre en Chino',
      pinyinName: 'Nomnbre en Pinyin',
      trigrams: 'Trigramas',

      judgement: 'Juicio',
      image: 'Imagen',
      mutations: 'Mutaciones',

      journal: 'Consultas',
      confirmDeletion: 'Preguntar antes de borrar una consulta',
    },

    about: {
      thanks: 'Gracias por usar mi app :)',

      website: 'Página web',
      privacyPolicy: 'Política de privacidad',
      coffee: '¡Cómprame un café!',
      free: 'Esta app es (y siempre será) completamente gratis, ¡pero también acepto soporte!',
    },
  },

  hexagram: {
    primary: 'Principal',
    secondary: 'Secundario',

    judgement: 'Juicio',
    image: 'Imagen',
    mutations: 'Mutaciones',
    lines: {
      1: 'Primera Línea',
      2: 'Segunda Línea',
      3: 'Tercera Línea',
      4: 'Cuarta Línea',
      5: 'Quinta Línea',
      6: 'Sexta Línea',
    },
  },

  delete: {
    title: 'Confirmar',
    message: '¿Estás seguro de que deseas eliminar esta respuesta del Oráculo?',
    cancel: 'Cancelal',
    accept: 'Sí',
  },

  cancel: 'Cancelar',
  ok: 'Aceptar',
}
