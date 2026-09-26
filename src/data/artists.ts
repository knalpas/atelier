import type { Artist } from '../types'

export const artists: Artist[] = [
  {
    id: 'giotto',
    name: 'Giotto',
    years: [1267, 1337],
    birthplace: 'Near Florence',
    country: 'Italy',
    movement: 'Proto-Renaissance',
    summary:
      'Broke from Byzantine flatness toward weight, space, and human feeling—opening the road that Florence would later take.',
    connections: [
      { to: 'masaccio', type: 'influence', note: 'Revived Giotto’s sense of volume two centuries later' },
    ],
  },
  {
    id: 'masaccio',
    name: 'Masaccio',
    years: [1401, 1428],
    birthplace: 'San Giovanni Valdarno',
    country: 'Italy',
    movement: 'Early Renaissance',
    summary:
      'Brought perspective and sculptural light into fresco, making sacred stories feel grounded in real space.',
    connections: [
      { to: 'giotto', type: 'influence' },
      { to: 'botticelli', type: 'influence' },
      { to: 'leonardo', type: 'influence' },
    ],
  },
  {
    id: 'botticelli',
    name: 'Sandro Botticelli',
    years: [1445, 1510],
    birthplace: 'Florence',
    country: 'Italy',
    movement: 'Early Renaissance',
    summary:
      'Painter of mythic grace and linear beauty, closely tied to Medici Florence and its classical revival.',
    connections: [
      { to: 'masaccio', type: 'influence' },
      { to: 'leonardo', type: 'circle', note: 'Florentine contemporaries' },
      { to: 'michelangelo', type: 'circle' },
    ],
  },
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    years: [1452, 1519],
    birthplace: 'Vinci',
    country: 'Italy',
    movement: 'High Renaissance',
    summary:
      'Scientist-painter of sfumato and inquiry; his notebooks and portraits reshaped what an artist could be.',
    connections: [
      { to: 'botticelli', type: 'circle' },
      { to: 'michelangelo', type: 'rival', note: 'Florentine competition and mutual wariness' },
      { to: 'raphael', type: 'influence' },
      { to: 'verrocchio', type: 'mentor', note: 'Trained in Verrocchio’s workshop' },
    ],
  },
  {
    id: 'verrocchio',
    name: 'Andrea del Verrocchio',
    years: [1435, 1488],
    birthplace: 'Florence',
    country: 'Italy',
    movement: 'Early Renaissance',
    summary:
      'Sculptor and workshop master whose studio trained Leonardo and set a high craft standard in Florence.',
    connections: [{ to: 'leonardo', type: 'mentor' }],
  },
  {
    id: 'michelangelo',
    name: 'Michelangelo',
    years: [1475, 1564],
    birthplace: 'Caprese',
    country: 'Italy',
    movement: 'High Renaissance',
    summary:
      'Sculptor-painter of monumental bodies and moral force, from the David to the Sistine Chapel.',
    connections: [
      { to: 'leonardo', type: 'rival' },
      { to: 'raphael', type: 'rival', note: 'Competing commissions and temperaments in Rome' },
      { to: 'botticelli', type: 'circle' },
      { to: 'tintoretto', type: 'influence' },
    ],
  },
  {
    id: 'raphael',
    name: 'Raphael',
    years: [1483, 1520],
    birthplace: 'Urbino',
    country: 'Italy',
    movement: 'High Renaissance',
    summary:
      'Master of harmonious composition and courtly clarity; absorbed lessons from Leonardo and Michelangelo.',
    connections: [
      { to: 'leonardo', type: 'influence' },
      { to: 'michelangelo', type: 'rival' },
      { to: 'ingres', type: 'influence', note: 'Centuries later, Ingres looked back to Raphael’s line' },
    ],
  },
  {
    id: 'titian',
    name: 'Titian',
    years: [1488, 1576],
    birthplace: 'Pieve di Cadore',
    country: 'Italy',
    movement: 'Venetian Renaissance',
    summary:
      'Venetian colorist whose loose brush and glowing flesh set the tone for centuries of painterly painting.',
    connections: [
      { to: 'giorgione', type: 'collaborator', note: 'Shared early Venetian innovations' },
      { to: 'tintoretto', type: 'influence' },
      { to: 'rubens', type: 'influence' },
      { to: 'velazquez', type: 'influence' },
    ],
  },
  {
    id: 'giorgione',
    name: 'Giorgione',
    years: [1477, 1510],
    birthplace: 'Castelfranco Veneto',
    country: 'Italy',
    movement: 'Venetian Renaissance',
    summary:
      'Poetic and enigmatic Venetian who helped invent atmospheric landscape and mood over hard outline.',
    connections: [
      { to: 'titian', type: 'collaborator' },
      { to: 'bellini', type: 'mentor' },
    ],
  },
  {
    id: 'bellini',
    name: 'Giovanni Bellini',
    years: [1430, 1516],
    birthplace: 'Venice',
    country: 'Italy',
    movement: 'Venetian Renaissance',
    summary:
      'Bridge between late Gothic Venice and the high colorism of Giorgione and Titian.',
    connections: [
      { to: 'giorgione', type: 'mentor' },
      { to: 'titian', type: 'mentor' },
    ],
  },
  {
    id: 'tintoretto',
    name: 'Tintoretto',
    years: [1518, 1594],
    birthplace: 'Venice',
    country: 'Italy',
    movement: 'Mannerism',
    summary:
      'Dramatic Venetian who blended Michelangelo’s drawing ambition with Titian’s color at dizzying speed.',
    connections: [
      { to: 'titian', type: 'influence' },
      { to: 'michelangelo', type: 'influence' },
      { to: 'el-greco', type: 'influence' },
    ],
  },
  {
    id: 'el-greco',
    name: 'El Greco',
    years: [1541, 1614],
    birthplace: 'Crete',
    country: 'Spain',
    movement: 'Mannerism',
    summary:
      'Cretan-born painter who forged elongated, ecstatic forms in Toledo after absorbing Venetian light.',
    connections: [
      { to: 'tintoretto', type: 'influence' },
      { to: 'titian', type: 'influence' },
      { to: 'cezanne', type: 'influence', note: 'Later modernists rediscovered his distortions' },
    ],
  },
  {
    id: 'caravaggio',
    name: 'Caravaggio',
    years: [1571, 1610],
    birthplace: 'Milan',
    country: 'Italy',
    movement: 'Baroque',
    summary:
      'Invented a raw naturalism and theatrical dark–light contrast that shocked Rome and spread across Europe.',
    connections: [
      { to: 'rubens', type: 'influence' },
      { to: 'rembrandt', type: 'influence' },
      { to: 'velazquez', type: 'influence' },
      { to: 'artemisia', type: 'influence' },
    ],
  },
  {
    id: 'artemisia',
    name: 'Artemisia Gentileschi',
    years: [1593, 1653],
    birthplace: 'Rome',
    country: 'Italy',
    movement: 'Baroque',
    summary:
      'Caravaggesque dramatist who painted powerful women and claimed a rare professional standing for her time.',
    connections: [
      { to: 'caravaggio', type: 'influence' },
      { to: 'gentileschi', type: 'mentor', note: 'Trained by her father, Orazio' },
    ],
  },
  {
    id: 'gentileschi',
    name: 'Orazio Gentileschi',
    years: [1563, 1639],
    birthplace: 'Pisa',
    country: 'Italy',
    movement: 'Baroque',
    summary:
      'Caravaggio follower and court painter whose refined naturalism shaped Artemisia’s early training.',
    connections: [{ to: 'artemisia', type: 'mentor' }, { to: 'caravaggio', type: 'circle' }],
  },
  {
    id: 'rubens',
    name: 'Peter Paul Rubens',
    years: [1577, 1640],
    birthplace: 'Siegen',
    country: 'Flanders',
    movement: 'Baroque',
    summary:
      'Diplomat-painter of exuberant flesh, myth, and movement; a bridge between Italian color and Northern courts.',
    connections: [
      { to: 'titian', type: 'influence' },
      { to: 'caravaggio', type: 'influence' },
      { to: 'van-dyck', type: 'mentor' },
      { to: 'delacroix', type: 'influence' },
    ],
  },
  {
    id: 'van-dyck',
    name: 'Anthony van Dyck',
    years: [1599, 1641],
    birthplace: 'Antwerp',
    country: 'Flanders',
    movement: 'Baroque',
    summary:
      'Rubens’s brilliant pupil who refined aristocratic portraiture and became England’s court painter.',
    connections: [
      { to: 'rubens', type: 'mentor' },
      { to: 'gainsborough', type: 'influence' },
    ],
  },
  {
    id: 'rembrandt',
    name: 'Rembrandt',
    years: [1606, 1669],
    birthplace: 'Leiden',
    country: 'Netherlands',
    movement: 'Dutch Golden Age',
    summary:
      'Psychologist of light and selfhood; etched and painted an unmatched record of aging, faith, and intimacy.',
    connections: [
      { to: 'caravaggio', type: 'influence' },
      { to: 'vermeer', type: 'circle', note: 'Dutch Golden Age contemporaries' },
      { to: 'van-gogh', type: 'influence' },
    ],
  },
  {
    id: 'vermeer',
    name: 'Johannes Vermeer',
    years: [1632, 1675],
    birthplace: 'Delft',
    country: 'Netherlands',
    movement: 'Dutch Golden Age',
    summary:
      'Quiet master of daylight interiors; few paintings, infinite precision of color and stillness.',
    connections: [
      { to: 'rembrandt', type: 'circle' },
      { to: 'mondrian', type: 'influence', note: 'Later Dutch artists returned to his clarity' },
    ],
  },
  {
    id: 'velazquez',
    name: 'Diego Velázquez',
    years: [1599, 1660],
    birthplace: 'Seville',
    country: 'Spain',
    movement: 'Baroque',
    summary:
      'Court painter of Philip IV whose loose, truthful brush made royalty and servants equally present.',
    connections: [
      { to: 'titian', type: 'influence' },
      { to: 'caravaggio', type: 'influence' },
      { to: 'manet', type: 'influence', note: 'Manet studied Velázquez in the Prado' },
      { to: 'goya', type: 'influence' },
    ],
  },
  {
    id: 'goya',
    name: 'Francisco Goya',
    years: [1746, 1828],
    birthplace: 'Fuendetodos',
    country: 'Spain',
    movement: 'Romanticism',
    summary:
      'From court portraitist to visionary of war and nightmare; a hinge between old masters and modern unease.',
    connections: [
      { to: 'velazquez', type: 'influence' },
      { to: 'manet', type: 'influence' },
      { to: 'picasso', type: 'influence' },
    ],
  },
  {
    id: 'gainsborough',
    name: 'Thomas Gainsborough',
    years: [1727, 1788],
    birthplace: 'Sudbury',
    country: 'England',
    movement: 'Rococo / Portraiture',
    summary:
      'English portrait and landscape painter whose feathery brush rivaled Reynolds in London society.',
    connections: [
      { to: 'van-dyck', type: 'influence' },
      { to: 'reynolds', type: 'rival' },
    ],
  },
  {
    id: 'reynolds',
    name: 'Joshua Reynolds',
    years: [1723, 1792],
    birthplace: 'Plympton',
    country: 'England',
    movement: 'Grand Manner',
    summary:
      'Founding Royal Academy president who theorized “grand manner” portraiture after Italian models.',
    connections: [{ to: 'gainsborough', type: 'rival' }],
  },
  {
    id: 'david',
    name: 'Jacques-Louis David',
    years: [1748, 1825],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Neoclassicism',
    summary:
      'Revolutionary neoclassicist whose severe history paintings became the visual language of the French Republic.',
    connections: [
      { to: 'ingres', type: 'mentor' },
      { to: 'delacroix', type: 'rival', note: 'David’s line vs. the rising Romantic color' },
    ],
  },
  {
    id: 'ingres',
    name: 'Jean-Auguste-Dominique Ingres',
    years: [1780, 1867],
    birthplace: 'Montauban',
    country: 'France',
    movement: 'Neoclassicism',
    summary:
      'Disciple of David who worshipped Raphael’s contour and clashed with Romantic colorists.',
    connections: [
      { to: 'david', type: 'mentor' },
      { to: 'raphael', type: 'influence' },
      { to: 'delacroix', type: 'rival' },
      { to: 'degas', type: 'influence' },
    ],
  },
  {
    id: 'delacroix',
    name: 'Eugène Delacroix',
    years: [1798, 1863],
    birthplace: 'Charenton-Saint-Maurice',
    country: 'France',
    movement: 'Romanticism',
    summary:
      'Romantic colorist of passion and politics; his journals and Orient subjects fed later modern painting.',
    connections: [
      { to: 'rubens', type: 'influence' },
      { to: 'ingres', type: 'rival' },
      { to: 'baudelaire', type: 'friend', note: 'Baudelaire championed Delacroix’s modernity' },
      { to: 'van-gogh', type: 'influence' },
      { to: 'cezanne', type: 'influence' },
    ],
  },
  {
    id: 'baudelaire',
    name: 'Charles Baudelaire',
    years: [1821, 1867],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Symbolism / Criticism',
    summary:
      'Poet-critic who defined modern beauty and publicly defended Delacroix, Manet, and the painters of modern life.',
    connections: [
      { to: 'delacroix', type: 'friend' },
      { to: 'manet', type: 'friend' },
    ],
  },
  {
    id: 'courbet',
    name: 'Gustave Courbet',
    years: [1819, 1877],
    birthplace: 'Ornans',
    country: 'France',
    movement: 'Realism',
    summary:
      'Defiant realist who painted ordinary labor and scandalous frankness, rejecting academic allegory.',
    connections: [
      { to: 'manet', type: 'influence' },
      { to: 'monet', type: 'influence' },
    ],
  },
  {
    id: 'manet',
    name: 'Édouard Manet',
    years: [1832, 1883],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Impressionism',
    summary:
      'Bridge between Realism and Impressionism; modern life, flat color, and café society shocked the Salon.',
    connections: [
      { to: 'velazquez', type: 'influence' },
      { to: 'goya', type: 'influence' },
      { to: 'courbet', type: 'influence' },
      { to: 'baudelaire', type: 'friend' },
      { to: 'monet', type: 'friend' },
      { to: 'degas', type: 'friend' },
      { to: 'berthe', type: 'circle' },
    ],
  },
  {
    id: 'monet',
    name: 'Claude Monet',
    years: [1840, 1926],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Impressionism',
    summary:
      'Serial observer of light—haystacks, cathedrals, water lilies—who made painting chase the hour of day.',
    connections: [
      { to: 'manet', type: 'friend' },
      { to: 'renoir', type: 'friend' },
      { to: 'pissarro', type: 'collaborator' },
      { to: 'cezanne', type: 'friend' },
      { to: 'courbet', type: 'influence' },
    ],
  },
  {
    id: 'renoir',
    name: 'Pierre-Auguste Renoir',
    years: [1841, 1919],
    birthplace: 'Limoges',
    country: 'France',
    movement: 'Impressionism',
    summary:
      'Painter of sociable pleasure and glowing skin; early ally of Monet in the Impressionist break.',
    connections: [
      { to: 'monet', type: 'friend' },
      { to: 'cezanne', type: 'friend' },
      { to: 'matisse', type: 'influence' },
    ],
  },
  {
    id: 'degas',
    name: 'Edgar Degas',
    years: [1834, 1917],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Impressionism',
    summary:
      'Draftsman of dancers, baths, and racecourses; more classical than his Impressionist peers, yet radically modern.',
    connections: [
      { to: 'ingres', type: 'influence' },
      { to: 'manet', type: 'friend' },
      { to: 'cassatt', type: 'mentor' },
      { to: 'berthe', type: 'circle' },
    ],
  },
  {
    id: 'berthe',
    name: 'Berthe Morisot',
    years: [1841, 1895],
    birthplace: 'Bourges',
    country: 'France',
    movement: 'Impressionism',
    summary:
      'Core Impressionist whose airy brush captured domestic modernity and exhibited in nearly every group show.',
    connections: [
      { to: 'manet', type: 'circle', note: 'Married Eugène Manet; close to Édouard' },
      { to: 'monet', type: 'collaborator' },
      { to: 'degas', type: 'circle' },
      { to: 'cassatt', type: 'circle' },
    ],
  },
  {
    id: 'cassatt',
    name: 'Mary Cassatt',
    years: [1844, 1926],
    birthplace: 'Allegheny City',
    country: 'United States',
    movement: 'Impressionism',
    summary:
      'American in Paris who joined the Impressionists and made intimacy—mothers, children, private rooms—her subject.',
    connections: [
      { to: 'degas', type: 'mentor' },
      { to: 'berthe', type: 'circle' },
      { to: 'pissarro', type: 'circle' },
    ],
  },
  {
    id: 'pissarro',
    name: 'Camille Pissarro',
    years: [1830, 1903],
    birthplace: 'Charlotte Amalie',
    country: 'Denmark (West Indies)',
    movement: 'Impressionism',
    summary:
      'Dean of the Impressionists and later a Neo-Impressionist experimenter; mentor figure to Cézanne and others.',
    connections: [
      { to: 'monet', type: 'collaborator' },
      { to: 'cezanne', type: 'mentor' },
      { to: 'van-gogh', type: 'mentor' },
      { to: 'seurat', type: 'circle' },
      { to: 'cassatt', type: 'circle' },
    ],
  },
  {
    id: 'cezanne',
    name: 'Paul Cézanne',
    years: [1839, 1906],
    birthplace: 'Aix-en-Provence',
    country: 'France',
    movement: 'Post-Impressionism',
    summary:
      'Rebuilt nature as cylinders, spheres, and cones; the hinge from Impressionism to Cubism.',
    connections: [
      { to: 'pissarro', type: 'mentor' },
      { to: 'monet', type: 'friend' },
      { to: 'renoir', type: 'friend' },
      { to: 'delacroix', type: 'influence' },
      { to: 'el-greco', type: 'influence' },
      { to: 'picasso', type: 'influence' },
      { to: 'matisse', type: 'influence' },
    ],
  },
  {
    id: 'seurat',
    name: 'Georges Seurat',
    years: [1859, 1891],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Neo-Impressionism',
    summary:
      'Scientist of the dotted stroke; A Sunday on La Grande Jatte reorganized Impressionist light into method.',
    connections: [
      { to: 'pissarro', type: 'circle' },
      { to: 'van-gogh', type: 'influence' },
      { to: 'signac', type: 'collaborator' },
    ],
  },
  {
    id: 'signac',
    name: 'Paul Signac',
    years: [1863, 1935],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Neo-Impressionism',
    summary:
      'Seurat’s ally who spread Divisionism through coastal landscapes and theoretical writing.',
    connections: [
      { to: 'seurat', type: 'collaborator' },
      { to: 'matisse', type: 'influence' },
    ],
  },
  {
    id: 'van-gogh',
    name: 'Vincent van Gogh',
    years: [1853, 1890],
    birthplace: 'Zundert',
    country: 'Netherlands',
    movement: 'Post-Impressionism',
    summary:
      'Letters and paint fused into urgent color; Arles, wheatfields, and cypresses became modern icons.',
    connections: [
      { to: 'rembrandt', type: 'influence' },
      { to: 'delacroix', type: 'influence' },
      { to: 'pissarro', type: 'mentor' },
      { to: 'seurat', type: 'influence' },
      { to: 'gauguin', type: 'friend', note: 'Turbulent weeks together in Arles' },
      { to: 'toulouse', type: 'circle' },
    ],
  },
  {
    id: 'gauguin',
    name: 'Paul Gauguin',
    years: [1848, 1903],
    birthplace: 'Paris',
    country: 'France',
    movement: 'Post-Impressionism',
    summary:
      'Sought “primitive” color and myth in Brittany and Tahiti; a catalyst for Symbolism and later Fauvism.',
    connections: [
      { to: 'van-gogh', type: 'friend' },
      { to: 'pissarro', type: 'mentor' },
      { to: 'cezanne', type: 'influence' },
      { to: 'matisse', type: 'influence' },
      { to: 'munch', type: 'influence' },
    ],
  },
  {
    id: 'toulouse',
    name: 'Henri de Toulouse-Lautrec',
    years: [1864, 1901],
    birthplace: 'Albi',
    country: 'France',
    movement: 'Post-Impressionism',
    summary:
      'Chronicler of Montmartre nightlife whose posters turned cabaret into graphic modern art.',
    connections: [
      { to: 'van-gogh', type: 'circle' },
      { to: 'degas', type: 'influence' },
    ],
  },
  {
    id: 'munch',
    name: 'Edvard Munch',
    years: [1863, 1944],
    birthplace: 'Løten',
    country: 'Norway',
    movement: 'Expressionism',
    summary:
      'Mapped anxiety, love, and death in vibrating color; The Scream became a global emblem of modern dread.',
    connections: [
      { to: 'gauguin', type: 'influence' },
      { to: 'van-gogh', type: 'influence' },
      { to: 'kirchner', type: 'influence' },
    ],
  },
  {
    id: 'klimt',
    name: 'Gustav Klimt',
    years: [1862, 1918],
    birthplace: 'Baumgarten',
    country: 'Austria',
    movement: 'Symbolism / Vienna Secession',
    summary:
      'Golden surfaces and erotic allegory; led the Vienna Secession toward decorative modernism.',
    connections: [
      { to: 'schiele', type: 'mentor' },
      { to: 'kokoschka', type: 'circle' },
    ],
  },
  {
    id: 'schiele',
    name: 'Egon Schiele',
    years: [1890, 1918],
    birthplace: 'Tulln',
    country: 'Austria',
    movement: 'Expressionism',
    summary:
      'Protégé of Klimt who twisted the body into raw, angular self-exposure.',
    connections: [
      { to: 'klimt', type: 'mentor' },
      { to: 'kokoschka', type: 'circle' },
    ],
  },
  {
    id: 'kokoschka',
    name: 'Oskar Kokoschka',
    years: [1886, 1980],
    birthplace: 'Pöchlarn',
    country: 'Austria',
    movement: 'Expressionism',
    summary:
      'Vienna Expressionist of turbulent portraits and landscapes, adjacent to Klimt’s circle then breaking away.',
    connections: [
      { to: 'klimt', type: 'circle' },
      { to: 'schiele', type: 'circle' },
    ],
  },
  {
    id: 'kirchner',
    name: 'Ernst Ludwig Kirchner',
    years: [1880, 1938],
    birthplace: 'Aschaffenburg',
    country: 'Germany',
    movement: 'Expressionism',
    summary:
      'Die Brücke founder whose jagged Berlin streets and woodcuts defined German Expressionism.',
    connections: [
      { to: 'munch', type: 'influence' },
      { to: 'nietzsche', type: 'influence' },
    ],
  },
  {
    id: 'matisse',
    name: 'Henri Matisse',
    years: [1869, 1954],
    birthplace: 'Le Cateau-Cambrésis',
    country: 'France',
    movement: 'Fauvism',
    summary:
      'Color as structure and joy; from Fauvist shock to late paper cut-outs of pure rhythm.',
    connections: [
      { to: 'cezanne', type: 'influence' },
      { to: 'gauguin', type: 'influence' },
      { to: 'signac', type: 'influence' },
      { to: 'renoir', type: 'influence' },
      { to: 'picasso', type: 'rival', note: 'Friendly rivalry that pushed both for decades' },
    ],
  },
  {
    id: 'picasso',
    name: 'Pablo Picasso',
    years: [1881, 1973],
    birthplace: 'Málaga',
    country: 'Spain',
    movement: 'Cubism',
    summary:
      'Restless reinventor—Blue Period to Cubism to late variations—who remade the vocabulary of modern art.',
    connections: [
      { to: 'cezanne', type: 'influence' },
      { to: 'goya', type: 'influence' },
      { to: 'matisse', type: 'rival' },
      { to: 'braque', type: 'collaborator', note: 'Invented Cubism together' },
      { to: 'gertrude', type: 'friend' },
    ],
  },
  {
    id: 'braque',
    name: 'Georges Braque',
    years: [1882, 1963],
    birthplace: 'Argenteuil',
    country: 'France',
    movement: 'Cubism',
    summary:
      'Picasso’s closest Cubist partner; later returned to quieter still lifes and birds.',
    connections: [
      { to: 'picasso', type: 'collaborator' },
      { to: 'cezanne', type: 'influence' },
    ],
  },
  {
    id: 'gertrude',
    name: 'Gertrude Stein',
    years: [1874, 1946],
    birthplace: 'Allegheny',
    country: 'United States',
    movement: 'Modernist circle',
    summary:
      'Writer and collector whose Paris salon linked Picasso, Matisse, and the avant-garde.',
    connections: [
      { to: 'picasso', type: 'friend' },
      { to: 'matisse', type: 'friend' },
    ],
  },
  {
    id: 'duchamp',
    name: 'Marcel Duchamp',
    years: [1887, 1968],
    birthplace: 'Blainville-Crevon',
    country: 'France',
    movement: 'Dada / Conceptual',
    summary:
      'Turned the readymade into art’s sharpest question; chess player of the twentieth century’s ideas.',
    connections: [
      { to: 'picasso', type: 'circle' },
      { to: 'breton', type: 'circle' },
      { to: 'dali', type: 'influence' },
    ],
  },
  {
    id: 'breton',
    name: 'André Breton',
    years: [1896, 1966],
    birthplace: 'Tinchebray',
    country: 'France',
    movement: 'Surrealism',
    summary:
      'Poet who authored Surrealism’s manifesto and organized the movement’s painters and writers.',
    connections: [
      { to: 'dali', type: 'circle' },
      { to: 'magritte', type: 'circle' },
      { to: 'duchamp', type: 'circle' },
      { to: 'kahlo', type: 'circle' },
    ],
  },
  {
    id: 'dali',
    name: 'Salvador Dalí',
    years: [1904, 1989],
    birthplace: 'Figueres',
    country: 'Spain',
    movement: 'Surrealism',
    summary:
      'Showman of melting clocks and meticulous dreamscapes; Surrealism’s most famous—and contentious—face.',
    connections: [
      { to: 'breton', type: 'circle' },
      { to: 'duchamp', type: 'influence' },
      { to: 'picasso', type: 'influence' },
      { to: 'magritte', type: 'circle' },
    ],
  },
  {
    id: 'magritte',
    name: 'René Magritte',
    years: [1898, 1967],
    birthplace: 'Lessines',
    country: 'Belgium',
    movement: 'Surrealism',
    summary:
      'Quiet Belgian of bowler hats and word-play images that make ordinary things uncanny.',
    connections: [
      { to: 'breton', type: 'circle' },
      { to: 'dali', type: 'circle' },
    ],
  },
  {
    id: 'kahlo',
    name: 'Frida Kahlo',
    years: [1907, 1954],
    birthplace: 'Coyoacán',
    country: 'Mexico',
    movement: 'Surrealism / Mexican Modernism',
    summary:
      'Painted personal myth, injury, and identity; often labeled Surrealist, she insisted she painted her own reality.',
    connections: [
      { to: 'rivera', type: 'collaborator', note: 'Marriage, politics, and mutual influence' },
      { to: 'breton', type: 'circle' },
      { to: 'picasso', type: 'circle' },
    ],
  },
  {
    id: 'rivera',
    name: 'Diego Rivera',
    years: [1886, 1957],
    birthplace: 'Guanajuato',
    country: 'Mexico',
    movement: 'Mexican Muralism',
    summary:
      'Epic muralist of labor and history who studied in Europe then remade public walls in Mexico and the U.S.',
    connections: [
      { to: 'kahlo', type: 'collaborator' },
      { to: 'picasso', type: 'circle' },
      { to: 'modigliani', type: 'friend' },
    ],
  },
  {
    id: 'modigliani',
    name: 'Amedeo Modigliani',
    years: [1884, 1920],
    birthplace: 'Livorno',
    country: 'Italy',
    movement: 'Modernism',
    summary:
      'Elongated portraits and nudes of Montparnasse; close to the Paris avant-garde before an early death.',
    connections: [
      { to: 'rivera', type: 'friend' },
      { to: 'picasso', type: 'circle' },
      { to: 'brancusi', type: 'friend' },
    ],
  },
  {
    id: 'brancusi',
    name: 'Constantin Brâncuși',
    years: [1876, 1957],
    birthplace: 'Hobița',
    country: 'Romania',
    movement: 'Modernism / Sculpture',
    summary:
      'Sculptor of purified form whose Paris studio befriended Modigliani and shaped modern abstraction.',
    connections: [{ to: 'modigliani', type: 'friend' }],
  },
  {
    id: 'mondrian',
    name: 'Piet Mondrian',
    years: [1872, 1944],
    birthplace: 'Amersfoort',
    country: 'Netherlands',
    movement: 'De Stijl',
    summary:
      'Reduced painting to primary grids seeking universal harmony; from trees to neoplasticism.',
    connections: [
      { to: 'vermeer', type: 'influence' },
      { to: 'van-gogh', type: 'influence' },
      { to: 'doesburg', type: 'collaborator' },
    ],
  },
  {
    id: 'doesburg',
    name: 'Theo van Doesburg',
    years: [1883, 1931],
    birthplace: 'Utrecht',
    country: 'Netherlands',
    movement: 'De Stijl',
    summary:
      'De Stijl organizer and theorist who pushed abstraction into architecture and typography.',
    connections: [{ to: 'mondrian', type: 'collaborator' }],
  },
  {
    id: 'kandinsky',
    name: 'Wassily Kandinsky',
    years: [1866, 1944],
    birthplace: 'Moscow',
    country: 'Russia',
    movement: 'Abstract Expression (early)',
    summary:
      'Pioneer of pure abstraction who linked color to music and taught at the Bauhaus.',
    connections: [
      { to: 'klee', type: 'friend', note: 'Bauhaus colleagues' },
      { to: 'marc', type: 'collaborator', note: 'Der Blaue Reiter' },
    ],
  },
  {
    id: 'marc',
    name: 'Franz Marc',
    years: [1880, 1916],
    birthplace: 'Munich',
    country: 'Germany',
    movement: 'Expressionism',
    summary:
      'Painter of spiritual animals in prismatic color; co-founded Der Blaue Reiter with Kandinsky.',
    connections: [{ to: 'kandinsky', type: 'collaborator' }],
  },
  {
    id: 'klee',
    name: 'Paul Klee',
    years: [1879, 1940],
    birthplace: 'Münchenbuchsee',
    country: 'Switzerland',
    movement: 'Modernism / Bauhaus',
    summary:
      'Poet of small inventions—signs, gardens, music—who taught color theory at the Bauhaus.',
    connections: [
      { to: 'kandinsky', type: 'friend' },
      { to: 'miro', type: 'influence' },
    ],
  },
  {
    id: 'miro',
    name: 'Joan Miró',
    years: [1893, 1983],
    birthplace: 'Barcelona',
    country: 'Spain',
    movement: 'Surrealism',
    summary:
      'Catalan lyricist of floating signs and constellations; linked Surrealism to playful abstraction.',
    connections: [
      { to: 'klee', type: 'influence' },
      { to: 'picasso', type: 'friend' },
      { to: 'breton', type: 'circle' },
      { to: 'calder', type: 'friend' },
    ],
  },
  {
    id: 'calder',
    name: 'Alexander Calder',
    years: [1898, 1976],
    birthplace: 'Lawnton',
    country: 'United States',
    movement: 'Modernism / Kinetic',
    summary:
      'Inventor of the mobile; brought sculpture into motion after Paris friendships with Miró and others.',
    connections: [{ to: 'miro', type: 'friend' }],
  },
  {
    id: 'pollock',
    name: 'Jackson Pollock',
    years: [1912, 1956],
    birthplace: 'Cody',
    country: 'United States',
    movement: 'Abstract Expressionism',
    summary:
      'Drip paintings that made the canvas an arena of action; American painting’s postwar rupture.',
    connections: [
      { to: 'de-kooning', type: 'circle' },
      { to: 'krasner', type: 'collaborator' },
      { to: 'picasso', type: 'influence' },
    ],
  },
  {
    id: 'krasner',
    name: 'Lee Krasner',
    years: [1908, 1984],
    birthplace: 'Brooklyn',
    country: 'United States',
    movement: 'Abstract Expressionism',
    summary:
      'Abstract Expressionist who edited, collaged, and rebuilt her own work beside—and beyond—Pollock.',
    connections: [
      { to: 'pollock', type: 'collaborator' },
      { to: 'de-kooning', type: 'circle' },
    ],
  },
  {
    id: 'de-kooning',
    name: 'Willem de Kooning',
    years: [1904, 1997],
    birthplace: 'Rotterdam',
    country: 'Netherlands',
    movement: 'Abstract Expressionism',
    summary:
      'Dutch-American who kept the figure vibrating inside abstraction; a downtown New York pillar.',
    connections: [
      { to: 'pollock', type: 'circle' },
      { to: 'krasner', type: 'circle' },
    ],
  },
  {
    id: 'nietzsche',
    name: 'Friedrich Nietzsche',
    years: [1844, 1900],
    birthplace: 'Röcken',
    country: 'Germany',
    movement: 'Philosophy',
    summary:
      'Philosopher whose ideas of Dionysian energy and rupture fueled Expressionist painters more than any academy.',
    connections: [{ to: 'kirchner', type: 'influence' }],
  },
]

export const movements = [...new Set(artists.map((a) => a.movement))].sort()
export const countries = [...new Set(artists.map((a) => a.country))].sort()
