export default {
  skip: 'OMITIR',
  start: 'Empezar',

  error: {
    share:
      'Ha ocurrido un error mientras se intentaba compartir el hexagram. Asegurate de aceptar los permisos de la aplicación.',
  },

  share: {
    title: 'Compartir respuesta del Oráculo',
    text: 'Le he hecho la siguiente pregunta al Oráculo I-Ching\n\n"{question}"\n\nY esta es la respuesta: {link}',
  },

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

  help: {
    title: 'Ayuda',

    iching: {
      title: 'I-Ching',

      description: {
        0: 'El I Ching, Yijing o I King (en chino tradicional: 易經; en chino simplificado: 易经; en pinyin: yì jīng) es un libro oracular chino cuyos primeros textos se suponen escritos hacia el 1200 a. C. Es uno de los Cinco Clásicos confucianos.',
        1: 'El término i ching significa ‘libro de las mutaciones’. El texto fue aumentado durante la dinastía Zhou y posteriormente por comentaristas de la escuela de Confucio, pero su contenido original es de procedencia taoísta y no confucianista. Se cree que describe o interpreta la situación presente de quien lo consulta y aconseja el modo en que se puede resolver el futuro si se adopta ante él la posición correcta. Es un libro oracular, sapiencial y moral, a la vez que por su estructura y simbología es un libro filosófico y cosmogónico.',
      },

      moreInfo: {
        label: 'Más información en Wikipedia',
        link: 'https://es.wikipedia.org/wiki/I_Ching',
      },
    },

    question: {
      title: 'Pregunta',

      description: {
        0: 'Es importante que piense en su pregunta durante todo el proceso.',
        1: 'Algunos consejos:',
      },
    },
    coins: {
      title: 'Monedas',

      description: {
        0: 'Para consultar el I-Ching hay que lanzar 3 monedas 6 veces. Estas son las monedas que usamos en esta aplicación.',
        1: 'Para lanzarlos, simplemente haga clic en ellos o en el botón azul de arriba.',
        2: 'Las monedas resultantes determinarán las líneas del hexagrama:',
      },

      table: {
        combo: 'Combinación de monedas',
        number: 'Número',
        line: 'Línea',

        mutableYang: '3 Caras',
        yin: '2 Caras, 1 Cruz',
        mutableYin: '1 Cara, 2 Cruz',
        yang: '3 Cruces',
      },
    },
    hexagram: {
      title: 'Hexagrama',

      description: {
        0: 'Los hexagramas que identifiques se pueden llamar "Hexagrama primario" (o "Hexagrama actual"). Para producir un "Hexagrama secundario" (o "Hexagrama futuro"), simplemente hay que cambiar todas las líneas marcadas con una "x" o una "o" por su opuesto. Cualquier línea discontinua (Yin) marcada con una "x" se convierte en su opuesto, una línea continua (Yang), y las líneas continuas Yang marcadas con una "o" se convierten en las líneas discontinuas de Yin.',
        1: 'El I Ching significa "Libro de los cambios" en chino y tiene que ver con el Cambio, que es la única constante en la vida. Si no obtienes líneas cambiantes cuando lanza un hexagrama (es decir, número 6 o un valor de 9), eso significa que las condiciones relacionadas con su tema son relativamente estables o no están en gran cambio en este momento en particular.',
        2: 'Una vez que hayas identificado los hexagrama(s), esta aplicación le mostrará el significado:',
        3: 'Descripción: una descripción general del hexagrama.',
        4: 'Juicio: una interpretación del hexagrama. Incluye la cita del libro original y una explicación.',
        5: 'Imagen: Una interpretación de la figura visual. Incluye la cita del libro original y una explicación.',
        6: 'Mutations: an interpretation of the mutated lines. Includes the quote from the original book, and an explanation.',
        7: 'Los textos de los hexagramas presentados en esta aplicación son una traducción gratuita al Castellano del I Ching realizada por Richard Wilhelm, cuya primera versión data de 1924.',
      },
    },
  },

  journal: {
    tabs: {
      all: 'Todas',
      tags: 'Por etiqueta',
    },

    selectTag: 'Elige una etiqueta',
  },

  oracle: {
    title: 'Pregunta al Oráculo',

    question: {
      title: 'Piensa tu pregunta...',
      name: 'Pregunta realizada el {date}',
    },

    toss: {
      title: 'Lanza las monedas ({step}/6)',
      button: 'Lanzar',
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
      darkMode: 'Modo oscuro',
      wrapTitle: 'Mostrar pregunta completa',
      wrapTitleDescription:
        'Activa esta opción para mostrar el título de las preguntas completo en la lista de consultas.',

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

    tags: {
      title: 'Etiquetas',
      new: 'Añade una etiqueta',
    },
    about: {
      thanks: 'Gracias por usar mi app :)',

      android: {
        download: 'Bájate la App para Android',
        rate: 'Puntúa la app si te gusta :)',
      },
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

    title: 'Pregunta',

    tags: {
      title: 'Etiquetas',
      label: 'Elige las etiquetas',
      placeholder: 'Añade etiquetas para clasificar los resultados.',
      noTags: 'Aún no tienes etiquetas, accede a "gestionar etiquetas" para crear algunas.',
      manage: 'Gestionar etiquetas',
    },

    notes: {
      title: 'Notas',
      placeholder: 'Puedes añadir notas personales, o la interpretación que le das al resultado.',
    },
  },

  delete: {
    title: 'Confirmar',
    message: '¿Estás seguro de que deseas eliminar esta respuesta del Oráculo?',
    cancel: 'Cancelal',
    accept: 'Sí',
  },

  showMore: 'Mostrar más',
  close: 'Cerrar',
  cancel: 'Cancelar',
  ok: 'Aceptar',
}
