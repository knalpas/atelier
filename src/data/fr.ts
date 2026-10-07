import type { RoomId } from '../types'

export interface FrArtist {
  name?: string
  short?: string
  knownFor: string
  blurb: string
  notes?: Record<string, string>
}

export const FR_FEMALE = new Set([
  'artemisia',
  'morisot',
  'cassatt',
  'okeeffe',
  'kahlo',
  'krasner',
  'valadon',
  'vigee',
  'bonheur',
  'backer',
  'munter',
  'sonia-delaunay',
  'bergman',
])

export const FR_ROOMS: Record<RoomId, { title: string; short: string; span: string; intro: string }> = {
  renaissance: {
    title: 'La Renaissance',
    short: 'Renaissance',
    span: 'v. 1300 – 1600',
    intro:
      'Florence, Venise et la Flandre redécouvrent l’espace, le corps et la peinture à l’huile. Les ateliers transmettent le métier du maître à l’apprenti.',
  },
  baroque: {
    title: 'Le Baroque et le Siècle d’or',
    short: 'Baroque',
    span: 'v. 1590 – 1700',
    intro:
      'La lumière dramatique du Caravage gagne toute l’Europe, de Rome à Madrid, d’Anvers aux Provinces-Unies.',
  },
  revolution: {
    title: 'Révolution et romantisme',
    short: 'Romantisme',
    span: 'v. 1720 – 1860',
    intro:
      'Académies, révolutions et tempêtes. La ligne néoclassique contre la couleur romantique, et les premiers réalistes se tournent vers la vie ordinaire.',
  },
  modernlife: {
    title: 'La lumière et la vie moderne',
    short: 'Impressionnisme',
    span: 'v. 1860 – 1905',
    intro:
      'À Paris, une bande d’amis soudés peint en plein air et expose selon ses propres règles. Leurs élèves poussent la couleur plus loin encore.',
  },
  avantgarde: {
    title: 'Les avant-gardes',
    short: 'Avant-gardes',
    span: 'v. 1900 – 1945',
    intro:
      'Vienne, Paris, Munich et Mexico. Les mouvements se multiplient, entre manifestes, cafés et rivalités.',
  },
  american: {
    title: 'Le siècle américain',
    short: 'Amérique',
    span: 'v. 1920 – 1990',
    intro:
      'Après la guerre, le centre de gravité se déplace à New York. L’abstraction, puis le pop, puis la rue.',
  },
  present: {
    title: 'Notre temps',
    short: 'Notre temps',
    span: 'v. 1945 – aujourd’hui',
    intro:
      'L’Europe répond à New York avec ses propres voix : le noir comme lumière, la chair comme fait, et le retour de la figure sous bien des noms.',
  },
}

export const FR_MOVEMENTS: Record<string, string> = {
  'Proto-Renaissance': 'Pré-Renaissance',
  'Early Renaissance': 'Première Renaissance',
  'Northern Renaissance': 'Renaissance nordique',
  'High Renaissance': 'Haute Renaissance',
  'Venetian Renaissance': 'Renaissance vénitienne',
  Mannerism: 'Maniérisme',
  Baroque: 'Baroque',
  'Dutch Golden Age': 'Siècle d’or néerlandais',
  'French Classicism': 'Classicisme français',
  Rococo: 'Rococo',
  Neoclassicism: 'Néoclassicisme',
  Romanticism: 'Romantisme',
  'Barbizon School': 'École de Barbizon',
  'Ukiyo-e': 'Ukiyo-e',
  Realism: 'Réalisme',
  Impressionism: 'Impressionnisme',
  Tonalism: 'Tonalisme',
  'Society Portraiture': 'Portrait mondain',
  'Neo-Impressionism': 'Néo-impressionnisme',
  'Post-Impressionism': 'Postimpressionnisme',
  'Les Nabis': 'Nabis',
  Symbolism: 'Symbolisme',
  Expressionism: 'Expressionnisme',
  Fauvism: 'Fauvisme',
  Cubism: 'Cubisme',
  Suprematism: 'Suprématisme',
  'Naïve Art': 'Art naïf',
  'Der Blaue Reiter': 'Der Blaue Reiter',
  'De Stijl': 'De Stijl',
  Dada: 'Dada',
  Surrealism: 'Surréalisme',
  'School of Paris': 'École de Paris',
  'Mexican Modernism': 'Modernisme mexicain',
  'Kinetic Art': 'Art cinétique',
  'American Modernism': 'Modernisme américain',
  'American Realism': 'Réalisme américain',
  'Abstract Expressionism': 'Expressionnisme abstrait',
  'Pop Art': 'Pop art',
  'Neo-Expressionism': 'Néo-expressionnisme',
  Naturalism: 'Naturalisme',
  Orphism: 'Orphisme',
  'Art Informel': 'Art informel',
  'School of London': 'École de Londres',
  'Nouveau Réalisme': 'Nouveau réalisme',
  'Figuration Narrative': 'Figuration narrative',
  'Figuration Libre': 'Figuration libre',
  'Nordic Abstraction': 'Abstraction nordique',
  'Contemporary Painting': 'Peinture contemporaine',
}

export const FR_COUNTRIES: Record<string, string> = {
  Italy: 'Italie',
  Belgium: 'Belgique',
  Netherlands: 'Pays-Bas',
  Germany: 'Allemagne',
  Greece: 'Grèce',
  Spain: 'Espagne',
  England: 'Angleterre',
  France: 'France',
  Japan: 'Japon',
  'Danish West Indies': 'Antilles danoises',
  'United States': 'États-Unis',
  Austria: 'Autriche',
  Norway: 'Norvège',
  Russia: 'Russie',
  Romania: 'Roumanie',
  Switzerland: 'Suisse',
  Mexico: 'Mexique',
  Belarus: 'Biélorussie',
  Latvia: 'Lettonie',
  Ukraine: 'Ukraine',
  Sweden: 'Suède',
}

export const FR_PLACES: Record<string, string> = {
  Venice: 'Venise',
  "'s-Hertogenbosch": 'Bois-le-Duc',
  Crete: 'Crète',
  Pisa: 'Pise',
  Seville: 'Séville',
  Antwerp: 'Anvers',
  Leiden: 'Leyde',
  London: 'Londres',
  'Baumgarten, Vienna': 'Baumgarten, Vienne',
  Moscow: 'Moscou',
  Livorno: 'Livourne',
  Barcelona: 'Barcelone',
  Augsburg: 'Augsbourg',
  Aschaffenburg: 'Aschaffenbourg',
  Strasbourg: 'Strasbourg',
  Bordeaux: 'Bordeaux',
  Ferrara: 'Ferrare',
  Lausanne: 'Lausanne',
  'Le Havre': 'Le Havre',
  Berlin: 'Berlin',
  Tokyo: 'Tokyo',
  Stockholm: 'Stockholm',
  Dresden: 'Dresde',
  'New York': 'New York',
  Smilavičy: 'Smilavitchy',
  Hradyzk: 'Hradyzk',
  Rodez: 'Rodez',
  'Golfe-Juan': 'Golfe-Juan',
}

export const FR_ARTISTS: Record<string, FrArtist> = {
  giotto: {
    knownFor: 'Fresques de la chapelle Scrovegni',
    blurb:
      'Il a arraché la peinture aux icônes byzantines plates pour lui donner poids, espace et émotion. Florence se souvint de lui comme du peintre par qui tout avait commencé.',
  },
  'van-eyck': {
    knownFor: 'Les Époux Arnolfini',
    blurb:
      'Ses glacis à l’huile rendent le velours, le métal et la peau avec une précision éblouissante. Il fit de la Flandre la seconde capitale de la Renaissance.',
  },
  masaccio: {
    knownFor: 'La Trinité',
    blurb:
      'L’un des premiers à employer la perspective linéaire. Mort à 26 ans, il laissa avec les fresques de la chapelle Brancacci une école pour les générations suivantes.',
  },
  bellini: {
    knownFor: 'Retable de San Zaccaria',
    blurb:
      'Le patriarche de la peinture vénitienne. Sa lumière douce et sa couleur riche formèrent la génération de Giorgione et de Titien.',
  },
  verrocchio: {
    knownFor: 'Le Baptême du Christ',
    blurb:
      'Sculpteur, peintre et chef de l’atelier le plus actif de Florence. Parmi ses apprentis figurait le jeune Léonard.',
  },
  botticelli: {
    knownFor: 'La Naissance de Vénus',
    blurb:
      'Peintre des lignes gracieuses et des mythes païens dans la Florence des Médicis. Presque oublié, il fut redécouvert par les Victoriens.',
  },
  bosch: {
    name: 'Jérôme Bosch',
    knownFor: 'Le Jardin des délices',
    blurb:
      'Il peupla ses panneaux de monstres, de pécheurs et d’étranges plaisirs. Cinq siècles plus tard, ses visions semblent toujours modernes.',
  },
  leonardo: {
    name: 'Léonard de Vinci',
    short: 'Léonard',
    knownFor: 'La Joconde',
    blurb:
      'Peintre, ingénieur et anatomiste. Son sfumato vaporeux et sa curiosité insatiable ont défini l’idée même du génie de la Renaissance.',
    notes: {
      verrocchio:
        'Léonard peignit un ange dans Le Baptême du Christ de Verrocchio ; selon la légende, le maître renonça alors pour de bon au pinceau.',
      michelangelo:
        'En 1504, tous deux furent chargés de peindre des batailles sur des murs se faisant face au Palazzo Vecchio de Florence.',
    },
  },
  durer: {
    knownFor: 'Autoportrait à la fourrure',
    blurb:
      'Il apporta les idées italiennes au Nord et fit de la gravure un art majeur. Il fut le premier artiste célèbre dans toute l’Europe.',
    notes: {
      bellini:
        'Lors de son séjour à Venise, Dürer écrivit que le vieux Bellini était « toujours le meilleur en peinture ».',
      raphael: 'Les deux hommes échangèrent des dessins en gage d’admiration mutuelle.',
    },
  },
  michelangelo: {
    name: 'Michel-Ange',
    short: 'Michel-Ange',
    knownFor: 'Plafond de la chapelle Sixtine',
    blurb:
      'Un sculpteur qui peignit à contrecœur le plafond de la Sixtine. Ses corps héroïques et tordus ont façonné le siècle suivant.',
    notes: {
      masaccio: 'Adolescent, il copia les fresques de Masaccio dans la chapelle Brancacci.',
      raphael:
        'Ils se disputaient les commandes pontificales à Rome, et Michel-Ange accusait Raphaël de lui emprunter ses idées.',
    },
  },
  giorgione: {
    knownFor: 'La Tempête',
    blurb:
      'Un poète de l’atmosphère et de l’émotion, emporté jeune par la peste. Seule une poignée de tableaux lui est attribuée avec certitude.',
  },
  raphael: {
    name: 'Raphaël',
    short: 'Raphaël',
    knownFor: 'L’École d’Athènes',
    blurb:
      'Il fondit la douceur de Léonard et la puissance de Michel-Ange en des compositions parfaitement équilibrées. Les académies en firent leur modèle pendant 300 ans.',
  },
  titian: {
    name: 'Titien',
    short: 'Titien',
    knownFor: 'La Vénus d’Urbin',
    blurb:
      'Le plus grand coloriste de Venise, peintre des papes et des empereurs. La touche libre de ses dernières années influença Rubens, Vélasquez et bien d’autres.',
    notes: {
      giorgione:
        'Ensemble, ils peignirent les fresques du Fondaco dei Tedeschi à Venise. Certains tableaux sont encore disputés entre eux.',
    },
  },
  tintoretto: {
    name: 'Le Tintoret',
    short: 'Le Tintoret',
    knownFor: 'La Cène (San Giorgio Maggiore)',
    blurb:
      'Rapide, théâtral et ambitieux. La devise de son atelier aurait été « le dessin de Michel-Ange et la couleur de Titien ».',
  },
  bruegel: {
    name: 'Pieter Brueghel l’Ancien',
    short: 'Brueghel',
    knownFor: 'Chasseurs dans la neige',
    blurb:
      'Il peignit paysans, proverbes et saisons avec esprit et humanité. Il fonda une dynastie de peintres.',
  },
  'el-greco': {
    name: 'Le Greco',
    short: 'Le Greco',
    knownFor: 'L’Enterrement du comte d’Orgaz',
    blurb:
      'Un peintre d’icônes crétois formé à Venise et installé à Tolède. Ses figures étirées et vacillantes furent redécouvertes par les modernes.',
  },
  orazio: {
    knownFor: 'Le Joueur de luth',
    blurb:
      'L’un des premiers disciples du Caravage, qui travailla ensuite pour la cour d’Angleterre. Père et premier maître d’Artemisia.',
  },
  caravaggio: {
    name: 'Le Caravage',
    short: 'Le Caravage',
    knownFor: 'La Vocation de saint Matthieu',
    blurb:
      'Il peignit les saints sous les traits de gens de la rue, frappés par une lumière crue dans des pièces sombres. Bagarreur et fugitif, il vit son style déferler sur l’Europe.',
  },
  rubens: {
    name: 'Pierre Paul Rubens',
    knownFor: 'L’Érection de la Croix',
    blurb:
      'Diplomate, érudit et peintre d’une énergie charnelle et tourbillonnante. Il dirigeait un immense atelier à Anvers et fut anobli par deux rois.',
    notes: {
      velazquez:
        'Lors du séjour diplomatique de Rubens à Madrid en 1628, le jeune Vélasquez l’accompagna et fut encouragé à partir pour l’Italie.',
    },
  },
  artemisia: {
    knownFor: 'Judith décapitant Holopherne',
    blurb:
      'La première femme admise à l’Académie du dessin de Florence. Elle peignit des héroïnes d’une force sans égale.',
  },
  'van-dyck': {
    name: 'Antoine van Dyck',
    knownFor: 'Portrait de Charles Ier à la chasse',
    blurb:
      'Le plus brillant assistant de Rubens, devenu peintre de la cour de Charles Ier. Il inventa le portrait aristocratique élégant.',
  },
  velazquez: {
    name: 'Diego Vélasquez',
    short: 'Vélasquez',
    knownFor: 'Les Ménines',
    blurb:
      'Peintre de la cour de Philippe IV, il posait le même regard honnête sur les rois et sur les nains. Manet l’appelait « le peintre des peintres ».',
  },
  rembrandt: {
    knownFor: 'La Ronde de nuit',
    blurb:
      'Près d’une centaine d’autoportraits retracent une vie, du succès à la faillite. Aucun peintre n’a rendu la vie intérieure avec autant de tendresse.',
  },
  vermeer: {
    knownFor: 'La Jeune Fille à la perle',
    blurb:
      'Environ 35 tableaux silencieux où la lumière du jour entre dans des intérieurs de Delft. Oublié pendant deux siècles, il fut ensuite célébré comme le maître du silence.',
    notes: {
      rembrandt:
        'L’influence de Rembrandt lui parvint sans doute par Carel Fabritius, élève de Rembrandt installé à Delft.',
    },
  },
  reynolds: {
    knownFor: 'Lady Caroline Howard',
    blurb:
      'Premier président de la Royal Academy, il prêchait le « grand style » des maîtres italiens.',
  },
  gainsborough: {
    knownFor: 'Le Garçon en bleu',
    blurb:
      'Il aurait préféré peindre des paysages plutôt que des portraits. Sa touche légère disputait à Reynolds la clientèle londonienne.',
    notes: {
      reynolds:
        'Rivaux pendant des décennies. Reynolds rendit pourtant hommage à Gainsborough dans un célèbre discours après sa mort.',
    },
  },
  goya: {
    knownFor: 'Tres de mayo',
    blurb:
      'Un peintre de cour devenu témoin de la guerre et de la folie. Ses Peintures noires troublent encore.',
    notes: {
      velazquez: 'Goya disait avoir eu trois maîtres : « la Nature, Vélasquez et Rembrandt ».',
    },
  },
  david: {
    knownFor: 'La Mort de Marat',
    blurb:
      'Le peintre de la Révolution française, puis de Napoléon. Son classicisme sévère domina l’art français pendant une génération.',
  },
  hokusai: {
    knownFor: 'La Grande Vague de Kanagawa',
    blurb:
      'Un graveur japonais dont les estampes atteignirent Paris dans les années 1860. L’engouement qu’elles suscitèrent, le japonisme, transforma la peinture occidentale.',
  },
  friedrich: {
    knownFor: 'Le Voyageur contemplant une mer de nuages',
    blurb:
      'Des silhouettes solitaires face aux montagnes, aux lunes et aux mers gelées. La voix la plus pure du romantisme allemand.',
  },
  turner: {
    knownFor: 'Le Dernier Voyage du Téméraire',
    blurb:
      'Il dissout navires et tempêtes dans la lumière et la vapeur. Les critiques se moquaient de lui ; les impressionnistes l’étudièrent.',
    notes: {
      constable:
        'À l’exposition de la Royal Academy de 1832, Turner ajouta une unique bouée rouge à sa marine pour éclipser le tableau de Constable accroché à côté.',
    },
  },
  constable: {
    knownFor: 'La Charrette de foin',
    blurb:
      'Il peignit les champs du Suffolk de son enfance, et étudia les nuages en scientifique.',
  },
  ingres: {
    knownFor: 'La Grande Odalisque',
    blurb:
      'L’élève vedette de David et le champion de la ligne pure. Il se voyait en héritier de Raphaël et en ennemi de Delacroix.',
    notes: {
      delacroix:
        'La ligne contre la couleur : Paris se divisa entre ingristes et partisans de Delacroix. Ingres aurait aéré les pièces après le départ de Delacroix.',
    },
  },
  delacroix: {
    knownFor: 'La Liberté guidant le peuple',
    blurb:
      'Le grand coloriste romantique de la passion, de la politique et de l’Afrique du Nord. Cézanne, Van Gogh et Seurat ont tous appris de sa couleur.',
    notes: {
      constable:
        'La découverte de La Charrette de foin de Constable à Paris en 1824 poussa Delacroix à repeindre le ciel de l’une de ses propres toiles.',
    },
  },
  courbet: {
    knownFor: 'Un enterrement à Ornans',
    blurb:
      '« Montrez-moi un ange et j’en peindrai un. » Il peignit ouvriers et villageois au format des tableaux d’histoire.',
  },
  pissarro: {
    knownFor: 'Boulevard Montmartre, la nuit',
    blurb:
      'Le seul peintre présent aux huit expositions impressionnistes. Un mentor généreux pour les plus jeunes.',
    notes: {
      corot:
        'Il signa ses premiers envois au Salon « élève de Corot », qui l’avait conseillé sur la peinture en plein air.',
    },
  },
  manet: {
    knownFor: 'Olympia',
    blurb:
      'Ses scènes franches et plates du Paris moderne scandalisèrent le Salon et firent de lui le héros malgré lui des impressionnistes.',
    notes: {
      titian: 'Olympia (1863) reprend directement la Vénus d’Urbin de Titien.',
      velazquez:
        'Après sa visite du Prado en 1865, il appela Vélasquez « le peintre des peintres ».',
    },
  },
  degas: {
    knownFor: 'La Classe de danse',
    blurb:
      'Il préférait se dire réaliste. Il peignit danseuses, blanchisseuses et chevaux de course avec l’exactitude d’un dessinateur.',
    notes: {
      ingres:
        'Jeune homme, il rencontra Ingres, qui lui dit : « Faites des lignes, jeune homme, beaucoup de lignes. »',
      cassatt:
        'Degas invita Cassatt à exposer avec les impressionnistes. Leur amitié épineuse dura 40 ans.',
    },
  },
  cezanne: {
    knownFor: 'La Montagne Sainte-Victoire',
    blurb:
      'Il reconstruisit la nature par blocs de couleur. Picasso comme Matisse l’appelaient « notre père à tous ».',
    notes: {
      pissarro:
        'Ils peignirent côte à côte à Pontoise dans les années 1870. Cézanne signa plus tard « élève de Pissarro ».',
      poussin: 'Il disait vouloir « refaire Poussin sur nature ».',
    },
  },
  monet: {
    knownFor: 'Impression, soleil levant',
    blurb:
      'Son tableau Impression, soleil levant donna son nom au mouvement. Il consacra ses dernières décennies aux nymphéas de Giverny.',
    notes: {
      turner:
        'Réfugié à Londres en 1870 pour fuir la guerre franco-prussienne, il étudia Turner de près.',
      hokusai:
        'Monet collectionna plus de 200 estampes japonaises, toujours accrochées dans sa maison de Giverny.',
      renoir:
        'En 1869, ils posèrent leurs chevalets côte à côte à La Grenouillère, l’un des berceaux de l’impressionnisme.',
    },
  },
  morisot: {
    knownFor: 'Le Berceau',
    blurb:
      'Une impressionniste de la première heure, à la touche vive et aérienne, qui peignit la vie privée des femmes.',
    notes: {
      corot: 'Corot lui enseigna le paysage en plein air au début des années 1860.',
      manet: 'Elle posa pour Manet et épousa son frère Eugène.',
    },
  },
  renoir: {
    knownFor: 'Bal du moulin de la Galette',
    blurb:
      'Ancien peintre sur porcelaine devenu l’impressionniste du plaisir : bals, déjeuners champêtres et peaux lumineuses.',
  },
  cassatt: {
    knownFor: 'La Toilette de l’enfant',
    blurb:
      'Une Américaine à Paris qui rejoignit les impressionnistes. Elle peignit mères et enfants sans sentimentalisme.',
  },
  gauguin: {
    knownFor: 'D’où venons-nous ?',
    blurb:
      'Agent de change devenu peintre, il partit pour la Bretagne puis Tahiti. Ses couleurs plates et symboliques ouvrirent la voie au fauvisme.',
    notes: {
      'van-gogh':
        'Neuf semaines intenses ensemble à Arles en 1888. Elles s’achevèrent après une violente dispute, quand Van Gogh se coupa une partie de l’oreille.',
    },
  },
  'van-gogh': {
    knownFor: 'La Nuit étoilée',
    blurb:
      'Environ 900 tableaux en une décennie, et presque aucun de vendu. Ses lettres à son frère Théo comptent parmi les grands documents de l’art.',
    notes: {
      millet: 'Il peignit plus de 20 copies d’après les scènes paysannes de Millet.',
      hokusai: 'Il collectionna des centaines d’estampes japonaises et en copia plusieurs à l’huile.',
      signac: 'Signac lui rendit visite à Arles en 1889, peu après sa crise.',
    },
  },
  seurat: {
    knownFor: 'Un dimanche après-midi à l’Île de la Grande Jatte',
    blurb:
      'Il fit de l’impressionnisme une méthode : le pointillisme, des points de couleur pure que l’œil mélange. Il mourut à 31 ans.',
  },
  signac: {
    knownFor: 'Portrait de Félix Fénéon',
    blurb:
      'Partenaire de Seurat dans le pointillisme et son infatigable promoteur. Il accueillit le jeune Matisse à Saint-Tropez.',
  },
  toulouse: {
    knownFor: 'Au Moulin Rouge',
    blurb:
      'Un aristocrate parmi les danseuses et les buveurs de Montmartre. Ses affiches firent la gloire du Moulin Rouge.',
  },
  klimt: {
    knownFor: 'Le Baiser',
    blurb:
      'Il mena la Sécession viennoise dans sa rupture avec l’académie. Feuille d’or, motifs de mosaïque et érotisme assumé.',
  },
  munch: {
    knownFor: 'Le Cri',
    blurb:
      'Il peignit l’amour, la jalousie, la maladie et la mort comme des états de l’âme. Un père de l’expressionnisme.',
    notes: {
      krohg:
        'Jeune peintre à Kristiania, il étudia auprès de Krohg, qui défendit ses premières œuvres.',
    },
  },
  kandinsky: {
    name: 'Vassily Kandinsky',
    knownFor: 'Composition VII',
    blurb:
      'Professeur de droit devenu peintre, pionnier de l’abstraction pure. Il entendait les couleurs comme de la musique.',
    notes: {
      monet:
        'Découvrant les Meules de Monet à Moscou en 1896, il fut stupéfait de ne pas reconnaître d’abord ce qu’elles représentaient.',
      marc: 'Ensemble, ils fondèrent Der Blaue Reiter (Le Cavalier bleu) à Munich en 1911.',
      klee: 'Collègues au Bauhaus, ils habitaient deux maisons voisines à Dessau.',
      munter:
        'Ils vécurent et travaillèrent ensemble à Murnau à partir de 1908. Münter accueillit le cercle du Blaue Reiter dans sa maison.',
    },
  },
  matisse: {
    knownFor: 'La Danse',
    blurb:
      'Chef de file des Fauves. La couleur comme joie pure, des premiers chocs aux papiers découpés de la fin.',
    notes: {
      signac: 'L’été 1904 dans la villa de Signac à Saint-Tropez mena tout droit au fauvisme.',
      cezanne:
        'Il s’endetta pour acheter un petit Cézanne, Trois Baigneuses, qu’il garda 37 ans.',
      dufy: 'Camarades fauves ; la couleur décorative et légère de Dufy naquit du même choc de 1905.',
    },
  },
  mondrian: {
    knownFor: 'Composition en rouge, bleu et jaune',
    blurb:
      'Des paysages hollandais aux grilles noires et aux couleurs primaires, en quête d’une harmonie universelle.',
  },
  brancusi: {
    name: 'Constantin Brancusi',
    short: 'Brancusi',
    knownFor: 'L’Oiseau dans l’espace',
    blurb:
      'Un sculpteur roumain qui aurait gagné Paris en grande partie à pied. Il réduisit les formes à leur essence.',
    notes: {
      modigliani: 'Brancusi encouragea Modigliani à tailler directement la pierre.',
    },
  },
  klee: {
    knownFor: 'La Machine à gazouiller',
    blurb:
      'Violoniste et poète des petits tableaux pleins d’esprit. « Une ligne est un point qui part se promener. »',
  },
  marc: {
    knownFor: 'Les Grands Chevaux bleus',
    blurb:
      'Il peignit chevaux bleus et chevreuils rouges comme des êtres spirituels. Il fut tué à Verdun à 36 ans.',
  },
  kirchner: {
    knownFor: 'Rue, Berlin',
    blurb:
      'Un fondateur de Die Brücke. Gravures sur bois anguleuses et rues de Berlin aux couleurs de néon.',
  },
  picasso: {
    knownFor: 'Les Demoiselles d’Avignon',
    blurb:
      'Période bleue, période rose, cubisme, Guernica et plus encore. Pendant 75 ans, il se réinventa, et l’art moderne avec lui.',
    notes: {
      braque:
        'De 1908 à 1914, ils travaillèrent si étroitement, « comme deux alpinistes encordés », que leurs toiles cubistes sont difficiles à distinguer.',
      matisse:
        'Ils échangèrent tableaux et piques pendant 50 ans. « Personne n’a jamais regardé la peinture de Matisse plus attentivement que moi », disait Picasso.',
      velazquez: 'En 1957, il peignit 58 variations sur Les Ménines.',
    },
  },
  braque: {
    knownFor: 'Violon et chandelier',
    blurb:
      'Co-inventeur du cubisme et du papier collé. Après la guerre, il se tourna vers de paisibles natures mortes et des oiseaux.',
  },
  hopper: {
    knownFor: 'Nighthawks',
    blurb:
      'Diners, stations-service et chambres d’hôtel. Il peignit la solitude américaine dans une lumière dure.',
  },
  modigliani: {
    knownFor: 'Nu couché',
    blurb: 'Des visages allongés aux yeux en amande. La légende de Montparnasse, mort à 35 ans.',
    notes: {
      rivera: 'Voisins à Montparnasse. Modigliani dessina un portrait de Rivera en 1914.',
      soutine:
        'Amis proches à Montparnasse. Modigliani peignit le portrait de Soutine vers 1916.',
      foujita: 'Compagnons de café à Montparnasse dans les années 1920, parmi l’École de Paris.',
    },
  },
  rivera: {
    knownFor: 'Fresques de l’industrie de Detroit',
    blurb:
      'Cubiste à Paris, il rentra au pays peindre l’histoire du Mexique sur les murs publics.',
    notes: {
      giotto:
        'Un voyage en Italie en 1920 pour étudier la fresque, notamment Giotto, façonna ses peintures murales.',
    },
  },
  okeeffe: {
    knownFor: 'Jimson Weed',
    blurb:
      'Fleurs agrandies, os blanchis et désert du Nouveau-Mexique. La mère du modernisme américain.',
  },
  chagall: {
    knownFor: 'Moi et le village',
    blurb:
      'Amoureux volants, violonistes et chèvres, tirés de la vie juive du village de sa jeunesse, dans des couleurs de rêve.',
  },
  duchamp: {
    knownFor: 'Fontaine',
    blurb:
      'Il abandonna la peinture pour interroger l’art lui-même. Un urinoir signé devint l’œuvre la plus influente du XXe siècle.',
  },
  schiele: {
    knownFor: 'Nu masculin assis',
    blurb:
      'Des corps tordus, crus, impudiques. Il mourut de la grippe espagnole à 28 ans, trois jours après sa femme.',
    notes: {
      klimt:
        'Klimt prit sous son aile le jeune Schiele, acheta ses dessins et le présenta à des mécènes et à des modèles.',
    },
  },
  miro: {
    knownFor: 'Le Carnaval d’Arlequin',
    blurb: 'Étoiles, yeux et signes flottants. Un Catalan qui voulait « assassiner la peinture ».',
    notes: {
      picasso:
        'Picasso, son compatriote, l’accueillit à Paris et acheta l’un de ses premiers autoportraits.',
      calder:
        'Amis pendant près de 50 ans après leur rencontre en 1928. Chacun a façonné les formes flottantes de l’autre.',
    },
  },
  magritte: {
    knownFor: 'La Trahison des images',
    blurb:
      'Chapeaux melon, nuages et une pipe qui n’est « pas une pipe ». Il peignit des énigmes dans le style le plus simple possible.',
    notes: {
      dali: 'Magritte passa l’été 1929 avec Dalí à Cadaqués.',
    },
  },
  calder: {
    knownFor: 'Mobiles',
    blurb:
      'Inventeur du mobile, une sculpture qui bouge. Son cirque en fil de fer charma Paris dans les années 1920.',
    notes: {
      mondrian:
        'Une visite à l’atelier de Mondrian en 1930 fut, dit-il, « le choc qui a tout déclenché ». Il voulait faire bouger des Mondrian.',
    },
  },
  rothko: {
    knownFor: 'Peintures murales Seagram',
    blurb:
      'Des rectangles de couleur lumineux et flottants, conçus pour émouvoir jusqu’aux larmes.',
    notes: {
      matisse: 'Il passa des heures devant L’Atelier rouge de Matisse quand le MoMA l’acquit en 1949.',
    },
  },
  dali: {
    knownFor: 'La Persistance de la mémoire',
    blurb:
      'Montres molles et moustache de showman. Le visage le plus célèbre du surréalisme, peint avec une précision de maître ancien.',
    notes: {
      miro: 'Miró aida le jeune Dalí à entrer dans le cercle surréaliste parisien en 1929.',
      vermeer: 'Dalí vénérait Vermeer et consacra plusieurs tableaux à La Dentellière.',
    },
  },
  'de-kooning': {
    knownFor: 'Woman I',
    blurb:
      'Passager clandestin vers l’Amérique, il garda la figure vivante au cœur d’une abstraction violente.',
    notes: {
      pollock:
        'Rivaux amicaux pour la couronne de l’École de New York, ils buvaient ensemble à la Cedar Tavern.',
    },
  },
  kahlo: {
    knownFor: 'Les Deux Frida',
    blurb:
      'Elle peignit sa douleur, son identité et le Mexique. « Je n’ai jamais peint de rêves. J’ai peint ma propre réalité. »',
    notes: {
      rivera: 'Mariés en 1929, divorcés en 1939, remariés en 1940.',
    },
  },
  krasner: {
    knownFor: 'The Seasons',
    blurb:
      'Une expressionniste abstraite farouche qui découpait et réinventait souvent ses propres œuvres. Longtemps éclipsée, aujourd’hui célébrée.',
    notes: {
      pollock: 'Mariés en 1945, ils partageaient une ferme-atelier à Springs, sur Long Island.',
    },
  },
  pollock: {
    knownFor: 'Autumn Rhythm',
    blurb: '« Jack the Dripper ». Il posait ses toiles au sol et y faisait danser la peinture.',
  },
  warhol: {
    knownFor: 'Campbell’s Soup Cans',
    blurb:
      'Boîtes de soupe, Marilyn et la Factory. Il fit de la célébrité et de la répétition un art.',
    notes: {
      basquiat:
        'Ils peignirent environ 160 toiles à quatre mains en 1984–85, échangeant coups de pinceau et sérigraphies.',
      lichtenstein:
        'Les deux visages du pop américain. Ils exposaient dans le même circuit new-yorkais du début des années 1960.',
    },
  },
  basquiat: {
    knownFor: 'Untitled (Skull)',
    blurb:
      'Des graffitis de SAMO à la gloire en quelques années : couronnes, mots et anatomie. Il mourut à 27 ans.',
    notes: {
      leonardo:
        'Enfant, convalescent après un accident de voiture, il se plongea dans le Gray’s Anatomy. Les dessins anatomiques de Léonard reviennent dans son œuvre.',
    },
  },
  piero: {
    knownFor: 'La Flagellation du Christ',
    blurb:
      'Peintre et mathématicien d’un ordre calme et géométrique, baigné de lumière pâle. Il écrivit aussi des traités de perspective.',
  },
  holbein: {
    name: 'Hans Holbein le Jeune',
    knownFor: 'Les Ambassadeurs',
    blurb:
      'Peintre de la cour d’Henri VIII. Ses portraits de l’Angleterre des Tudor sont précis jusqu’à la dernière bordure de fourrure.',
  },
  hals: {
    knownFor: 'Le Cavalier souriant',
    blurb:
      'Le portraitiste de Haarlem, à la touche vive et hachée qui saisit un rire en plein souffle. Les impressionnistes saluèrent en lui un précurseur.',
  },
  poussin: {
    knownFor: 'Les Bergers d’Arcadie',
    blurb:
      'Un Français à Rome qui bâtit des compositions calmes et raisonnées à partir de l’Antiquité et de Raphaël. Il devint le modèle de l’Académie.',
  },
  watteau: {
    knownFor: 'Pèlerinage à l’île de Cythère',
    blurb:
      'Inventeur de la fête galante : amoureux vêtus de soie dans des parcs rêveurs. Il lança le rococo et mourut de la tuberculose à 36 ans.',
    notes: {
      rubens: 'Il étudia le cycle de Marie de Médicis de Rubens au palais du Luxembourg.',
    },
  },
  fragonard: {
    knownFor: 'L’Escarpolette',
    blurb:
      'Il peignit badinages, jupons mousseux et jardins tachetés de lumière avec une rapidité éblouissante. La Révolution balaya son monde.',
  },
  corot: {
    knownFor: 'Souvenir de Mortefontaine',
    blurb:
      'Il peignit en plein air en Italie et en forêt de Fontainebleau, et conseilla généreusement les jeunes peintres. Un pont vers l’impressionnisme.',
  },
  millet: {
    knownFor: 'Des glaneuses',
    blurb: 'Fils de paysans normands, il peignit les paysans avec la dignité des saints.',
  },
  whistler: {
    knownFor: 'La Mère de l’artiste',
    blurb:
      'Un dandy américain à Londres et à Paris, qui intitulait ses tableaux comme de la musique : Arrangements, Nocturnes, Symphonies.',
    notes: {
      courbet: 'En 1865, ils peignirent la mer côte à côte à Trouville.',
    },
  },
  sisley: {
    knownFor: 'L’Inondation à Port-Marly',
    blurb:
      'Le plus fidèle paysagiste de l’impressionnisme : rivières, ciels et villages autour de Paris. Il mourut pauvre, juste avant l’envolée des prix.',
    notes: {
      monet: 'Condisciples dans l’atelier de Charles Gleyre au début des années 1860, avec Renoir.',
    },
  },
  rousseau: {
    knownFor: 'La Bohémienne endormie',
    blurb:
      'Un employé de l’octroi autodidacte (« le Douanier ») qui peignit des jungles qu’il n’avait jamais vues. L’avant-garde l’adorait.',
    notes: {
      picasso: 'En 1908, Picasso donna en son honneur un banquet resté célèbre au Bateau-Lavoir.',
    },
  },
  caillebotte: {
    knownFor: 'Rue de Paris, temps de pluie',
    blurb:
      'Un peintre fortuné des boulevards haussmanniens, à l’œil de photographe. Il finança les expositions de ses amis.',
    notes: {
      monet:
        'Il payait le loyer de Monet et achetait les tableaux de ses amis. Son legs fit entrer l’impressionnisme dans les musées nationaux.',
    },
  },
  sargent: {
    knownFor: 'Portrait de Madame X',
    blurb:
      'Un Américain né à Florence, le portraitiste le plus en vogue de son temps et un brillant aquarelliste.',
    notes: {
      monet: 'Il rendit visite à Monet à Giverny et le peignit à son chevalet, en plein air.',
      boldini:
        'Portraitistes mondains rivaux à Paris et à Londres ; ils courtisaient les mêmes modèles étincelants.',
    },
  },
  valadon: {
    knownFor: 'La Chambre bleue',
    blurb:
      'Acrobate de cirque devenue modèle à Montmartre, puis peintre de nus francs aux contours appuyés. En 1894, elle fut la première femme admise à la Société nationale des beaux-arts.',
    notes: {
      degas:
        'Degas acheta ses premiers dessins, lui apprit le vernis mou et la comptait « des nôtres ».',
      renoir: 'C’est elle la danseuse de la Danse à Bougival de Renoir (1883).',
      toulouse:
        'Elle posa pour Gueule de bois de Toulouse-Lautrec et fut sa maîtresse. Il l’encouragea à montrer ses dessins à Degas.',
    },
  },
  bonnard: {
    knownFor: 'Nu dans le bain',
    blurb:
      'Il peignit de mémoire la vie domestique dans une couleur saturée et chatoyante : tables du petit-déjeuner, jardins, sa femme Marthe au bain.',
    notes: {
      matisse: 'Matisse et Bonnard ont correspondu et se sont rendu visite pendant 40 ans.',
      vallotton:
        'Camarades nabis ; les intérieurs aux contours durs de Vallotton côtoyaient ceux, plus doux, de Bonnard.',
    },
  },
  malevich: {
    name: 'Kasimir Malevitch',
    short: 'Malevitch',
    knownFor: 'Carré noir',
    blurb:
      'En 1915, il peignit un carré noir sur fond blanc et l’appela le « zéro des formes ». Il fonda le suprématisme.',
  },
  utrillo: {
    knownFor: 'La Maison Bernot',
    blurb:
      'Le peintre des rues, des églises et des murs blanchis de Montmartre. Il travaillait souvent d’après des cartes postales ; sa « période blanche » est la plus recherchée.',
    notes: {
      valadon:
        'Son fils. Elle lui apprit à peindre à l’adolescence, en partie pour soigner son alcoolisme, et ils partagèrent un atelier pendant des décennies.',
      modigliani: 'Célèbres compagnons de beuverie à Montmartre, et parfois de bagarre.',
    },
  },
  greuze: {
    knownFor: 'L’Accordée de village',
    blurb:
      'Peintre de scènes morales larmoyantes qui firent pleurer Paris. Son sentimentalisme passa de mode, puis revint comme une clé de l’âge du sentiment.',
  },
  vigee: {
    name: 'Élisabeth Vigée Le Brun',
    short: 'Vigée Le Brun',
    knownFor: 'Marie-Antoinette en gaulle',
    blurb:
      'Portraitiste favorite de Marie-Antoinette, et l’une des rares femmes admises à l’Académie royale. L’exil après la Révolution porta son pinceau à travers l’Europe.',
    notes: {
      greuze: 'Elle admirait les têtes expressives de Greuze et apprit de son naturalisme sentimental.',
    },
  },
  'theodore-rousseau': {
    knownFor: 'La Forêt de Fontainebleau',
    blurb:
      'Chef de file des paysagistes de Barbizon. Il peignit la forêt de Fontainebleau comme un monde vivant, luttant des années pour accrocher au Salon.',
    notes: {
      millet: 'Voisins et alliés à Barbizon ; Rousseau aida Millet dans les années difficiles.',
      corot: 'Camarades paysagistes de l’école de Fontainebleau, même si la touche de Corot resta plus légère.',
    },
  },
  bonheur: {
    knownFor: 'Le Marché aux chevaux',
    blurb:
      'La femme peintre la plus célèbre du XIXe siècle. Elle peignit les animaux avec l’œil d’une naturaliste et obtint une permission de police pour porter le pantalon aux abattoirs.',
  },
  dore: {
    knownFor: 'Illustrations de l’Enfer de Dante',
    blurb:
      'Prodige de l’illustration qui peupla les livres d’Europe de visions sombres et foisonnantes. Ses planches de Dante, de la Bible et de Cervantès fixèrent ces récits pour des millions de lecteurs.',
  },
  redon: {
    knownFor: 'Le Cyclope',
    blurb:
      'Des « noirs » au pastel lumineux, il peignit rêves, yeux et têtes flottantes. Les surréalistes le revendiquèrent ensuite comme un ancêtre.',
    notes: {
      gauguin:
        'Ils se rencontrèrent en Bretagne ; le rêve symboliste de Redon offrit à Gauguin une autre voie hors de l’impressionnisme.',
    },
  },
  boldini: {
    knownFor: 'Portrait de Madame de Florian',
    blurb:
      'Le « maître du swish » : le Paris de la Belle Époque en touches tourbillonnantes et élégance allongée.',
  },
  backer: {
    knownFor: 'Intérieur bleu',
    blurb:
      'Grande peintre norvégienne des intérieurs et de la lumière des églises. Formée à Munich et à Paris, elle ramena un naturalisme exact et silencieux.',
  },
  krohg: {
    knownFor: 'Albertine au poste de police',
    blurb:
      'Peintre et écrivain des pauvres et des exclus de Kristiania. Champion du naturalisme, et premier défenseur du jeune Edvard Munch.',
  },
  vallotton: {
    name: 'Félix Vallotton',
    short: 'Vallotton',
    knownFor: 'Le Mensonge',
    blurb:
      'Un Nabi suisse aux contours durs et aux intérieurs froids. Ses bois gravés de la vie parisienne sont aussi tranchants que ses scènes domestiques tendues.',
  },
  dufy: {
    knownFor: 'La Fée Électricité',
    blurb:
      'Un fauve qui fit de la vie moderne une joie légère et calligraphique : régates, orchestres et le grand pavillon de l’Électricité de 1937.',
  },
  munter: {
    name: 'Gabriele Münter',
    short: 'Münter',
    knownFor: 'Portrait de Marianne von Werefkin',
    blurb:
      'Voix fondatrice du Blaue Reiter. Ses paysages de Murnau et ses portraits ont une couleur hardie et simplifiée qui lui appartient.',
    notes: {
      kandinsky:
        'Compagne et collaboratrice de 1902 à 1916. Sa maison de Murnau devint un lieu de rencontre du Blaue Reiter.',
    },
  },
  'robert-delaunay': {
    knownFor: 'Fenêtres simultanées',
    blurb:
      'Il brisa la tour Eiffel et mit le soleil en disques de couleur pure. Apollinaire nomma le style orphisme.',
    notes: {
      'sonia-delaunay':
        'Mariés en 1910, ils bâtirent l’orphisme ensemble, en peinture, en mode et en design.',
    },
  },
  'sonia-delaunay': {
    knownFor: 'Prismes électriques',
    blurb:
      'Peintre, designer et pionnière de la couleur dans la vie quotidienne. Elle porta l’orphisme de la toile au tissu, au livre et à la scène.',
    notes: {
      'robert-delaunay':
        'Leurs couleurs « simultanées » furent une collaboration de toute une vie, entre peinture et arts appliqués.',
    },
  },
  foujita: {
    knownFor: 'Nu couché à la toile de Jouy',
    blurb:
      'Star japonaise de Montparnasse, célèbre pour ses fonds laiteux, son fin contour noir et ses chats. Il relia l’encre de Tokyo à l’huile de Paris.',
  },
  soutine: {
    name: 'Chaïm Soutine',
    short: 'Soutine',
    knownFor: 'Le Bœuf écorché',
    blurb:
      'Paysages tordus et chairs tremblantes. Un peintre litvak à Paris dont l’expression brute hanta plus tard Lucian Freud.',
    notes: {
      rembrandt: 'Ses carcasses répondent au Bœuf écorché de Rembrandt, qu’il étudia au Louvre.',
      modigliani:
        'Amis à Montparnasse ; Modigliani peignit son portrait et l’aida à trouver des marchands.',
    },
  },
  bergman: {
    knownFor: 'Horizons d’or et d’argent',
    blurb:
      'Peintre abstraite norvégéo-suédoise des horizons, des montagnes et de la lumière métallique. Longtemps éclipsée, aujourd’hui centrale dans le modernisme nordique.',
  },
  soulages: {
    knownFor: 'Outrenoir',
    blurb:
      '« Le peintre du noir. » Il traita le noir comme une couleur qui réfléchit la lumière — l’Outrenoir — et devint l’un des maîtres modernes les plus célèbres de France.',
  },
  freud: {
    knownFor: 'Benefits Supervisor Sleeping',
    blurb:
      'Petit-fils de Sigmund Freud, et le grand peintre britannique de la chair sans idéal. Ses modèles enduraient des dizaines de séances sous une froide lumière du nord.',
    notes: {
      soutine:
        'Freud prisait la touche crue de Soutine sur la viande ; la dette se lit dans sa propre peinture de la chair.',
    },
  },
  lichtenstein: {
    knownFor: 'Whaam!',
    blurb:
      'Points Benday, baisers de bande dessinée et explosions. Il fit de l’imprimerie de masse un grand art, froid là où Warhol était impassible.',
  },
  richter: {
    knownFor: 'Abstrakte Bilder',
    blurb:
      'Toujours à l’œuvre : peintures d’après photo, nuanciers et vastes abstractions à la raclette. Il demande encore ce que la peinture peut faire.',
  },
  raysse: {
    knownFor: 'Made in Japan – La Grande Odalisque',
    blurb:
      'Nouveau réaliste qui néonisa la beauté classique et la couleur de consommation, avant de revenir à une figuration plus libre et mythique.',
  },
  fromanger: {
    name: 'Gérard Fromanger',
    short: 'Fromanger',
    knownFor: 'Série du Boulevard des Italiens',
    blurb:
      'Figure majeure de la figuration narrative. Il inonda de couleur plate et politique les photographies de la rue.',
  },
  garouste: {
    name: 'Gérard Garouste',
    short: 'Garouste',
    knownFor: 'Tableaux mythologiques et bibliques',
    blurb:
      'Figure majeure de la figuration française depuis les années 1980. Il peignit mythes, Écritures et ânes d’une main classique et inquiète.',
  },

}
