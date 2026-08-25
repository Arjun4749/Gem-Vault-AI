import { NavratnaGem, AstrologicalInput, AstrologicalRecommendation, RashiDetail, NakshatraDetail, RashiReport, PlanetaryPosition } from '../types';

export const NAVRATNA_GEMSTONES: NavratnaGem[] = [
  {
    id: 'ruby',
    name: 'Ruby (Manik)',
    hindiName: 'माणिक्य',
    planet: 'Sun (Surya)',
    zodiacSign: 'Leo (Simha)',
    rulingDeity: 'Lord Surya',
    recommendedFinger: 'Ring Finger (Right Hand)',
    idealMetal: 'Gold or Copper',
    primaryBenefits: [
      'Enhances leadership, confidence, and vital energy',
      'Promotes bone health and blood circulation',
      'Elevates executive status and command in career'
    ],
    chakarAlignment: 'Manipura (Solar Plexus) & Anahata (Heart)',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    color: 'Deep Pigeon Blood Red',
    mohsHardness: 9.0,
    refractiveIndex: '1.762 - 1.770',
    specificGravity: '4.00',
    pricePerCaratUsd: 1200,
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pearl',
    name: 'Natural Pearl (Moti)',
    hindiName: 'मोती',
    planet: 'Moon (Chandra)',
    zodiacSign: 'Cancer (Karka)',
    rulingDeity: 'Goddess Parvati / Chandra Dev',
    recommendedFinger: 'Little Finger (Right Hand)',
    idealMetal: 'Silver',
    primaryBenefits: [
      'Calms emotional turbulence and reduces anxiety',
      'Fosters peaceful relationships and intuition',
      'Helps balance bodily fluids and mental serenity'
    ],
    chakarAlignment: 'Svadhisthana (Sacral) & Anahata (Heart)',
    mantra: 'Om Shram Shreem Shroum Sah Chandramase Namah',
    color: 'Lustrous Milky White',
    mohsHardness: 3.5,
    refractiveIndex: '1.530 - 1.680',
    specificGravity: '2.70',
    pricePerCaratUsd: 450,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'red_coral',
    name: 'Red Coral (Moonga)',
    hindiName: 'मूंगा',
    planet: 'Mars (Mangal)',
    zodiacSign: 'Aries (Mesha) & Scorpio (Vrishchik)',
    rulingDeity: 'Lord Hanuman / Mangal Dev',
    recommendedFinger: 'Ring Finger (Right Hand)',
    idealMetal: 'Gold or Copper',
    primaryBenefits: [
      'Instills physical courage, stamina, and willpower',
      'Neutralizes Manglik Dosha impacts',
      'Accelerates land & property acquisitions'
    ],
    chakarAlignment: 'Muladhara (Root Chakra)',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    color: 'Vibrant Vermilion Red',
    mohsHardness: 3.5,
    refractiveIndex: '1.486 - 1.658',
    specificGravity: '2.65',
    pricePerCaratUsd: 380,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'emerald',
    name: 'Emerald (Panna)',
    hindiName: 'पन्ना',
    planet: 'Mercury (Budh)',
    zodiacSign: 'Gemini (Mithun) & Virgo (Kanya)',
    rulingDeity: 'Lord Vishnu / Budh Dev',
    recommendedFinger: 'Little Finger (Right Hand)',
    idealMetal: 'Gold or Panchdhatu',
    primaryBenefits: [
      'Sharpens intellect, analytical clarity, and eloquence',
      'Boosts business negotiation and mathematical talent',
      'Calms nervous energy and enhances memory retention'
    ],
    chakarAlignment: 'Anahata (Heart Chakra)',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namah',
    color: 'Vivid Grass Green',
    mohsHardness: 7.5,
    refractiveIndex: '1.577 - 1.583',
    specificGravity: '2.72',
    pricePerCaratUsd: 1800,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'yellow_sapphire',
    name: 'Yellow Sapphire (Pukhraj)',
    hindiName: 'पुखराज',
    planet: 'Jupiter (Guru/Brihaspati)',
    zodiacSign: 'Sagittarius (Dhanu) & Pisces (Meen)',
    rulingDeity: 'Lord Brihaspati / Lord Brahma',
    recommendedFinger: 'Index Finger (Right Hand)',
    idealMetal: 'Yellow Gold or Brass',
    primaryBenefits: [
      'Attracts divine wisdom, wealth, and spiritual growth',
      'Blesses marital harmony and academic distinction',
      'Strengthens liver, digestion, and aura expander'
    ],
    chakarAlignment: 'Ajna (Third Eye) & Vishuddha (Throat)',
    mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    color: 'Canary Golden Yellow',
    mohsHardness: 9.0,
    refractiveIndex: '1.762 - 1.770',
    specificGravity: '4.00',
    pricePerCaratUsd: 2200,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'diamond',
    name: 'Diamond (Heera)',
    hindiName: 'हीरा',
    planet: 'Venus (Shukra)',
    zodiacSign: 'Taurus (Vrishabha) & Libra (Tula)',
    rulingDeity: 'Goddess Lakshmi / Shukra Dev',
    recommendedFinger: 'Middle or Little Finger (Right Hand)',
    idealMetal: 'Platinum or White Gold',
    primaryBenefits: [
      'Magnifies charm, aesthetic elegance, and luxury',
      'Amplifies artistic brilliance and romantic bliss',
      'Provides protection against subtle dark vibrations'
    ],
    chakarAlignment: 'Sahasrara (Crown Chakra)',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
    color: 'Colorless Sparkle (D-F Grade)',
    mohsHardness: 10.0,
    refractiveIndex: '2.417',
    specificGravity: '3.52',
    pricePerCaratUsd: 4500,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'blue_sapphire',
    name: 'Blue Sapphire (Neelam)',
    hindiName: 'नीलम',
    planet: 'Saturn (Shani)',
    zodiacSign: 'Capricorn (Makar) & Aquarius (Kumbh)',
    rulingDeity: 'Lord Shani',
    recommendedFinger: 'Middle Finger (Right Hand)',
    idealMetal: 'Silver or Iron/Steel Ring',
    primaryBenefits: [
      'Rapidly removes blockages, financial hardship, and delay',
      'Provides supreme focus, discipline, and stamina',
      'Grants immunity from evil eye and catastrophic losses'
    ],
    chakarAlignment: 'Vishuddha (Throat) & Ajna (Third Eye)',
    mantra: 'Om Pram Preem Proum Sah Shanaye Namah',
    color: 'Royal Cornflower Blue',
    mohsHardness: 9.0,
    refractiveIndex: '1.762 - 1.770',
    specificGravity: '4.00',
    pricePerCaratUsd: 3100,
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hessonite',
    name: 'Hessonite Garnet (Gomed)',
    hindiName: 'गोमेद',
    planet: 'Rahu (North Node)',
    zodiacSign: 'Gemini/Virgo (Rahu ruling placements)',
    rulingDeity: 'Goddess Saraswati / Rahu Dev',
    recommendedFinger: 'Middle Finger (Right Hand)',
    idealMetal: 'Silver or Alloy',
    primaryBenefits: [
      'Clears confusion, sudden hazards, and addiction traps',
      'Boosts political acumen and public influence',
      'Helps navigate digital tech, research, and speculation'
    ],
    chakarAlignment: 'Svadhisthana (Sacral Chakra)',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    color: 'Honey Amber Brown',
    mohsHardness: 7.25,
    refractiveIndex: '1.740',
    specificGravity: '3.65',
    pricePerCaratUsd: 550,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cats_eye',
    name: 'Cat’s Eye Chrysoberyl (Lehsuniya)',
    hindiName: 'लहसुनिया',
    planet: 'Ketu (South Node)',
    zodiacSign: 'Scorpio/Sagittarius (Ketu transit placements)',
    rulingDeity: 'Lord Ganesha / Ketu Dev',
    recommendedFinger: 'Middle Finger (Right Hand)',
    idealMetal: 'Silver or Gold',
    primaryBenefits: [
      'Protects against hidden enemies and physical injury',
      'Spurs sudden wealth windfalls and spiritual enlightenment',
      'Restores lost prosperity and acute mental focus'
    ],
    chakarAlignment: 'Muladhara (Root Chakra)',
    mantra: 'Om Stram Streem Stroum Sah Ketave Namah',
    color: 'Honey Yellow with Chatoyant Ray',
    mohsHardness: 8.5,
    refractiveIndex: '1.746 - 1.755',
    specificGravity: '3.73',
    pricePerCaratUsd: 850,
    image: 'https://images.unsplash.com/photo-1611591475119-97424ad4f61f?auto=format&fit=crop&w=600&q=80'
  }
];

export const VEDIC_RASHIS: RashiDetail[] = [
  {
    id: 'mesha',
    name: 'Mesha',
    englishName: 'Aries',
    symbol: '♈',
    sanskritSymbolName: 'Ram / मेष',
    rulingPlanet: 'Mars (Mangal)',
    rulingDeity: 'Lord Hanuman / Kartikeya',
    element: 'Fire',
    luckyNumbers: [1, 8, 9],
    luckyColors: ['Crimson Red', 'Saffron', 'Bright Coral'],
    luckyDays: ['Tuesday', 'Sunday'],
    personalityTraits: [
      'Dynamic, courageous, and pioneering spirit',
      'Natural born leader with high vitality and drive',
      'Can be impulsive or quick-tempered if energy is unchanneled'
    ],
    nameSyllables: ['A', 'L', 'E', 'Cho', 'La', 'Lee', 'Loo', 'Le', 'Lo', 'Chu', 'Che'],
    recommendedGemstoneId: 'red_coral',
    recommendedGemstoneName: 'Red Coral (Moonga)',
    recommendedFinger: 'Ring Finger (Right Hand)',
    recommendedMetal: 'Gold or Copper',
    wearingDay: 'Tuesday Morning during Sunrise',
    gemstoneBenefits: [
      'Neutralizes Mars affliction & Manglik dosha',
      'Boosts physical stamina, courage, and decision power',
      'Guards against blood disorders and property disputes'
    ],
    weaknessAnalysis: 'Afflicted Mars causes impatience, hasty investments, or blood pressure fluctuations.'
  },
  {
    id: 'vrishabha',
    name: 'Vrishabha',
    englishName: 'Taurus',
    symbol: '♉',
    sanskritSymbolName: 'Bull / वृषभ',
    rulingPlanet: 'Venus (Shukra)',
    rulingDeity: 'Goddess Lakshmi',
    element: 'Earth',
    luckyNumbers: [2, 6, 7],
    luckyColors: ['Royal White', 'Silver', 'Pastel Pink'],
    luckyDays: ['Friday', 'Wednesday'],
    personalityTraits: [
      'Grounded, steady, artistic, and deeply reliable',
      'Appreciates luxury, fine arts, and financial security',
      'Resistant to unneeded change, persistent in long-term goals'
    ],
    nameSyllables: ['I', 'U', 'E', 'O', 'Va', 'Vi', 'Vu', 'Ve', 'Vo', 'B', 'W'],
    recommendedGemstoneId: 'diamond',
    recommendedGemstoneName: 'Diamond (Heera / White Zircon)',
    recommendedFinger: 'Middle or Little Finger (Right Hand)',
    recommendedMetal: 'Platinum, White Gold or Silver',
    wearingDay: 'Friday Morning during Shukla Paksha',
    gemstoneBenefits: [
      'Amplifies Venus energy for grace, charm, and wealth',
      'Enhances marital harmony and creative excellence',
      'Shields against negativity and subtle energy drains'
    ],
    weaknessAnalysis: 'Afflicted Venus leads to excessive luxury spending, throat sensitivity, or relationship friction.'
  },
  {
    id: 'mithuna',
    name: 'Mithuna',
    englishName: 'Gemini',
    symbol: '♊',
    sanskritSymbolName: 'Twins / मिथुन',
    rulingPlanet: 'Mercury (Budh)',
    rulingDeity: 'Lord Vishnu',
    element: 'Air',
    luckyNumbers: [3, 5, 6],
    luckyColors: ['Emerald Green', 'Light Yellow', 'Jade'],
    luckyDays: ['Wednesday', 'Friday'],
    personalityTraits: [
      'Intellectual, versatile, communicative, and witty',
      'Exceptional talent for commerce, coding, and networking',
      'Can experience nervous restlessness or dual-minded indecision'
    ],
    nameSyllables: ['K', 'Ki', 'Ku', 'Gha', 'Nga', 'Chha', 'Ke', 'Ko', 'Ha', 'C'],
    recommendedGemstoneId: 'emerald',
    recommendedGemstoneName: 'Emerald (Panna)',
    recommendedFinger: 'Little Finger (Right Hand)',
    recommendedMetal: 'Gold or Panchdhatu',
    wearingDay: 'Wednesday Morning',
    gemstoneBenefits: [
      'Sharpens analytical brain, eloquence, and negotiation',
      'Calms anxiety and cures speech/communication blocks',
      'Promotes business growth and financial breakthroughs'
    ],
    weaknessAnalysis: 'Afflicted Mercury causes mental fatigue, skin allergies, or contractual misunderstandings.'
  },
  {
    id: 'karka',
    name: 'Karka',
    englishName: 'Cancer',
    symbol: '♋',
    sanskritSymbolName: 'Crab / कर्क',
    rulingPlanet: 'Moon (Chandra)',
    rulingDeity: 'Goddess Parvati / Lord Shiva',
    element: 'Water',
    luckyNumbers: [2, 4, 7],
    luckyColors: ['Milky White', 'Silver', 'Pearl Sea Green'],
    luckyDays: ['Monday', 'Sunday'],
    personalityTraits: [
      'Intuitively receptive, empathetic, protective, and imaginative',
      'Deeply attached to family roots and emotional comfort',
      'Prone to mood swings mirroring lunar cycles'
    ],
    nameSyllables: ['Hi', 'Hu', 'He', 'Ho', 'Da', 'Dee', 'Doo', 'De', 'Do', 'D'],
    recommendedGemstoneId: 'pearl',
    recommendedGemstoneName: 'Natural Pearl (Moti)',
    recommendedFinger: 'Little Finger (Right Hand)',
    recommendedMetal: 'Pure Silver',
    wearingDay: 'Monday Morning during Shukla Paksha',
    gemstoneBenefits: [
      'Soothes emotional volatility and mental stress',
      'Promotes deep intuition, peace, and restful sleep',
      'Stabilizes digestive health and fluid balance'
    ],
    weaknessAnalysis: 'Afflicted Moon induces anxiety, insomnia, over-sensitivity, or lung/chest vulnerability.'
  },
  {
    id: 'simha',
    name: 'Simha',
    englishName: 'Leo',
    symbol: '♌',
    sanskritSymbolName: 'Lion / सिंह',
    rulingPlanet: 'Sun (Surya)',
    rulingDeity: 'Lord Surya / Gayatri Mata',
    element: 'Fire',
    luckyNumbers: [1, 5, 9],
    luckyColors: ['Sun Gold', 'Pigeon Blood Red', 'Copper Orange'],
    luckyDays: ['Sunday', 'Tuesday'],
    personalityTraits: [
      'Magnanimous, regal, confident, and noble-hearted',
      'Natural authority, high creative warmth, and leadership',
      'Needs respect and recognition; dislikes micromanagement'
    ],
    nameSyllables: ['Ma', 'Mi', 'Mu', 'Me', 'Mo', 'Ta', 'Tee', 'Too', 'Te', 'M', 'TT'],
    recommendedGemstoneId: 'ruby',
    recommendedGemstoneName: 'Ruby (Manik)',
    recommendedFinger: 'Ring Finger (Right Hand)',
    recommendedMetal: 'Gold or Copper',
    wearingDay: 'Sunday Morning during Hora',
    gemstoneBenefits: [
      'Bestows regal command, executive success, and vitality',
      'Strengthens cardiac health and bone structure',
      'Unlocks government support and high administrative status'
    ],
    weaknessAnalysis: 'Afflicted Sun creates ego clashes, lack of recognition, or eye/heart weakness.'
  },
  {
    id: 'kanya',
    name: 'Kanya',
    englishName: 'Virgo',
    symbol: '♍',
    sanskritSymbolName: 'Virgin / कन्या',
    rulingPlanet: 'Mercury (Budh)',
    rulingDeity: 'Lord Vishnu / Narayana',
    element: 'Earth',
    luckyNumbers: [3, 5, 8],
    luckyColors: ['Grass Green', 'Olive', 'Crisp White'],
    luckyDays: ['Wednesday', 'Friday'],
    personalityTraits: [
      'Meticulous, analytical, service-oriented, and precise',
      'Master of detail, data processing, and practical wisdom',
      'Can suffer from perfectionist stress or over-criticism'
    ],
    nameSyllables: ['To', 'Pa', 'Pee', 'Poo', 'Sha', 'Na', 'Tha', 'Pe', 'Po', 'P', 'SH'],
    recommendedGemstoneId: 'emerald',
    recommendedGemstoneName: 'Emerald (Panna)',
    recommendedFinger: 'Little Finger (Right Hand)',
    recommendedMetal: 'Gold or Panchdhatu',
    wearingDay: 'Wednesday Morning',
    gemstoneBenefits: [
      'Enhances computational skill and strategic foresight',
      'Protects against financial deception and nerve troubles',
      'Promotes fluent public speaking and academic awards'
    ],
    weaknessAnalysis: 'Afflicted Mercury causes digestive ailments, overthinking, or misdirected effort.'
  },
  {
    id: 'tula',
    name: 'Tula',
    englishName: 'Libra',
    symbol: '♎',
    sanskritSymbolName: 'Scales / तुला',
    rulingPlanet: 'Venus (Shukra)',
    rulingDeity: 'Goddess Mahalakshmi',
    element: 'Air',
    luckyNumbers: [2, 6, 9],
    luckyColors: ['Diamond White', 'Sky Blue', 'Cream'],
    luckyDays: ['Friday', 'Saturday'],
    personalityTraits: [
      'Harmonious, diplomatic, aesthetic, and justice-loving',
      'Natural mediator with refined artistic taste',
      'May hesitate or compromise excessively to maintain peace'
    ],
    nameSyllables: ['Ra', 'Ree', 'Roo', 'Re', 'Ro', 'Ta', 'Tee', 'Too', 'Te', 'R', 'T'],
    recommendedGemstoneId: 'diamond',
    recommendedGemstoneName: 'Diamond / Opal',
    recommendedFinger: 'Middle or Little Finger (Right Hand)',
    recommendedMetal: 'Platinum or White Gold',
    wearingDay: 'Friday Morning',
    gemstoneBenefits: [
      'Attracts high-value business partnerships and luxury',
      'Elevates magnetism, charm, and social repute',
      'Brings equilibrium to kidneys and reproductive health'
    ],
    weaknessAnalysis: 'Afflicted Venus leads to kidney issues, financial volatility, or partner conflicts.'
  },
  {
    id: 'vrishchik',
    name: 'Vrishchik',
    englishName: 'Scorpio',
    symbol: '♏',
    sanskritSymbolName: 'Scorpion / वृश्चिक',
    rulingPlanet: 'Mars (Mangal)',
    rulingDeity: 'Lord Hanuman / Lord Bhairava',
    element: 'Water',
    luckyNumbers: [1, 3, 9],
    luckyColors: ['Dark Maroon', 'Coral Red', 'Burnt Orange'],
    luckyDays: ['Tuesday', 'Thursday'],
    personalityTraits: [
      'Intense, investigative, resilient, and magnetically powerful',
      'Possesses deep strategic intuition and transformative courage',
      'Guarded emotions; intensely loyal to allies'
    ],
    nameSyllables: ['To', 'Na', 'Nee', 'Noo', 'Ne', 'No', 'Ya', 'Yee', 'Yu', 'N', 'Y'],
    recommendedGemstoneId: 'red_coral',
    recommendedGemstoneName: 'Red Coral (Moonga)',
    recommendedFinger: 'Ring Finger (Right Hand)',
    recommendedMetal: 'Gold or Copper',
    wearingDay: 'Tuesday Morning',
    gemstoneBenefits: [
      'Converts internal intensity into unstoppable execution power',
      'Defeats hidden adversaries and legal litigation',
      'Boosts muscle strength, blood health, and surgical success'
    ],
    weaknessAnalysis: 'Afflicted Mars induces intense anger, accidental injuries, or blood disorders.'
  },
  {
    id: 'dhanu',
    name: 'Dhanu',
    englishName: 'Sagittarius',
    symbol: '♐',
    sanskritSymbolName: 'Archer / धनु',
    rulingPlanet: 'Jupiter (Guru)',
    rulingDeity: 'Lord Brihaspati / Lord Dattatreya',
    element: 'Fire',
    luckyNumbers: [3, 5, 9],
    luckyColors: ['Yellow Gold', 'Amber', 'Bright Saffron'],
    luckyDays: ['Thursday', 'Sunday'],
    personalityTraits: [
      'Philosophical, optimistic, truth-seeking, and expansive',
      'Loves higher knowledge, global wisdom, and spiritual honor',
      'Direct in speech; highly inspiring mentor figure'
    ],
    nameSyllables: ['Ye', 'Yo', 'Bha', 'Bhee', 'Bhoo', 'Dha', 'Pha', 'Dha', 'Bhe', 'BH', 'DH', 'F'],
    recommendedGemstoneId: 'yellow_sapphire',
    recommendedGemstoneName: 'Yellow Sapphire (Pukhraj)',
    recommendedFinger: 'Index Finger (Right Hand)',
    recommendedMetal: 'Yellow Gold or Brass',
    wearingDay: 'Thursday Morning during Sunrise',
    gemstoneBenefits: [
      'Unlocks divine luck, fortune, and academic distinction',
      'Bestows happiness in progeny and spiritual mastery',
      'Fortifies liver health and financial prosperity'
    ],
    weaknessAnalysis: 'Afflicted Jupiter leads to missed opportunities, liver/fat imbalances, or dogmatic misjudgment.'
  },
  {
    id: 'makara',
    name: 'Makara',
    englishName: 'Capricorn',
    symbol: '♑',
    sanskritSymbolName: 'Sea-Goat / मकर',
    rulingPlanet: 'Saturn (Shani)',
    rulingDeity: 'Lord Shani / Lord Shiva',
    element: 'Earth',
    luckyNumbers: [4, 8, 9],
    luckyColors: ['Royal Blue', 'Charcoal Grey', 'Deep Indigo'],
    luckyDays: ['Saturday', 'Friday'],
    personalityTraits: [
      'Disciplined, ambitious, pragmatic, and enduring',
      'Architect of long-term empires with immense stamina',
      'Prone to initial delays followed by permanent peak achievement'
    ],
    nameSyllables: ['Bho', 'Ja', 'Jee', 'Khee', 'Khoo', 'Khe', 'Kho', 'Ga', 'Gee', 'J', 'KH', 'G'],
    recommendedGemstoneId: 'blue_sapphire',
    recommendedGemstoneName: 'Blue Sapphire (Neelam)',
    recommendedFinger: 'Middle Finger (Right Hand)',
    recommendedMetal: 'Silver or Steel/Iron Ring',
    wearingDay: 'Saturday Evening',
    gemstoneBenefits: [
      'Dissolves karmic delays, debt burdens, and chronic stagnation',
      'Bestows razor-sharp discipline and industrial power',
      'Shields against accident hazards and bone/joint pain'
    ],
    weaknessAnalysis: 'Afflicted Saturn brings heavy melancholic stress, joint pain, or career delays.'
  },
  {
    id: 'kumbha',
    name: 'Kumbha',
    englishName: 'Aquarius',
    symbol: '♒',
    sanskritSymbolName: 'Water-Bearer / कुंभ',
    rulingPlanet: 'Saturn (Shani)',
    rulingDeity: 'Lord Shani / Lord Hanuman',
    element: 'Air',
    luckyNumbers: [4, 8, 9],
    luckyColors: ['Electric Blue', 'Black Sapphire', 'Violet'],
    luckyDays: ['Saturday', 'Wednesday'],
    personalityTraits: [
      'Visionary, humanitarian, inventive, and progressive',
      'Attracted to scientific breakthroughs, philanthropy, and tech',
      'Independent thinker who values universal equality'
    ],
    nameSyllables: ['Goo', 'Ge', 'Go', 'Sa', 'See', 'Soo', 'Se', 'So', 'Da', 'S', 'G'],
    recommendedGemstoneId: 'blue_sapphire',
    recommendedGemstoneName: 'Blue Sapphire (Neelam)',
    recommendedFinger: 'Middle Finger (Right Hand)',
    recommendedMetal: 'Silver or Iron',
    wearingDay: 'Saturday Evening',
    gemstoneBenefits: [
      'Accelerates groundbreaking tech inventions and wealth gains',
      'Guards against false friends and sudden social isolation',
      'Enhances neurological reflexes and longevity'
    ],
    weaknessAnalysis: 'Afflicted Saturn brings nerve strain, leg/ankle vulnerability, or unexpected isolation.'
  },
  {
    id: 'meena',
    name: 'Meena',
    englishName: 'Pisces',
    symbol: '♓',
    sanskritSymbolName: 'Fish / मीन',
    rulingPlanet: 'Jupiter (Guru)',
    rulingDeity: 'Lord Vishnu / Goddess Saraswati',
    element: 'Water',
    luckyNumbers: [3, 7, 9],
    luckyColors: ['Golden Yellow', 'Sea Green', 'Aquamarine'],
    luckyDays: ['Thursday', 'Monday'],
    personalityTraits: [
      'Compassionate, intuitive, artistic, and spiritually inclined',
      'Deep connection to transcendental meditation and art',
      'Generous to a fault; requires strong energetic boundaries'
    ],
    nameSyllables: ['Dee', 'Doo', 'Tha', 'Jha', 'Nya', 'De', 'Do', 'Cha', 'Chee', 'CH', 'JH', 'TH'],
    recommendedGemstoneId: 'yellow_sapphire',
    recommendedGemstoneName: 'Yellow Sapphire (Pukhraj)',
    recommendedFinger: 'Index Finger (Right Hand)',
    recommendedMetal: 'Yellow Gold or Brass',
    wearingDay: 'Thursday Morning',
    gemstoneBenefits: [
      'Enhances spiritual enlightenment and inner serenity',
      'Attracts noble mentors, divine protection, and fortune',
      'Protects lymphatic system and immune vitality'
    ],
    weaknessAnalysis: 'Afflicted Jupiter leads to vulnerability to deception, sleep disturbances, or boundary issues.'
  }
];

export const VEDIC_NAKSHATRAS: NakshatraDetail[] = [
  { id: 'ashwini', name: 'Ashwini', hindiName: 'अश्विनी', rashi: 'Mesha (Aries)', rulingPlanet: 'Ketu', symbol: 'Horse Head', deity: 'Ashwini Kumars (Celestial Healers)', gemstone: 'Cat’s Eye', energyQuality: 'Swift Healing & Initiation' },
  { id: 'bharani', name: 'Bharani', hindiName: 'भरणी', rashi: 'Mesha (Aries)', rulingPlanet: 'Venus', symbol: 'Yoni / Vessel', deity: 'Lord Yama (God of Justice)', gemstone: 'Diamond / White Zircon', energyQuality: 'Transformation & Passion' },
  { id: 'krittika', name: 'Krittika', hindiName: 'कृत्तिका', rashi: 'Mesha / Vrishabha', rulingPlanet: 'Sun', symbol: 'Razor / Flame', deity: 'Lord Agni (Fire God)', gemstone: 'Ruby', energyQuality: 'Purification & Sharp Intellect' },
  { id: 'rohini', name: 'Rohini', hindiName: 'रोहिणी', rashi: 'Vrishabha (Taurus)', rulingPlanet: 'Moon', symbol: 'Chariot / Banyan Tree', deity: 'Lord Brahma (Creator)', gemstone: 'Pearl', energyQuality: 'Growth, Beauty & Attraction' },
  { id: 'mrigashira', name: 'Mrigashira', hindiName: 'मृगशिरा', rashi: 'Vrishabha / Mithuna', rulingPlanet: 'Mars', symbol: 'Deer Head', deity: 'Soma (Moon God)', gemstone: 'Red Coral', energyQuality: 'Searching & Gentle Pursuit' },
  { id: 'ardra', name: 'Ardra', hindiName: 'आर्द्रा', rashi: 'Mithuna (Gemini)', rulingPlanet: 'Rahu', symbol: 'Teardrop / Diamond', deity: 'Rudra (Storm God)', gemstone: 'Hessonite Garnet', energyQuality: 'Breakthrough & Emotional Storms' },
  { id: 'punarvasu', name: 'Punarvasu', hindiName: 'पुनर्वसु', rashi: 'Mithuna / Karka', rulingPlanet: 'Jupiter', symbol: 'Bow & Quiver of Arrows', deity: 'Aditi (Universal Mother)', gemstone: 'Yellow Sapphire', energyQuality: 'Return of Light & Renewal' },
  { id: 'pushya', name: 'Pushya', hindiName: 'पुष्य', rashi: 'Karka (Cancer)', rulingPlanet: 'Saturn', symbol: 'Cow Udder / Lotus', deity: 'Brihaspati (Divine Guru)', gemstone: 'Blue Sapphire', energyQuality: 'Supreme Nourishment & Virtuosity' },
  { id: 'ashlesha', name: 'Ashlesha', hindiName: 'आश्लेषा', rashi: 'Karka (Cancer)', rulingPlanet: 'Mercury', symbol: 'Coiled Serpent', deity: 'Nagas (Serpent Deities)', gemstone: 'Emerald', energyQuality: 'Hypnotic Intuition & Kundalini' },
  { id: 'magha', name: 'Magha', hindiName: 'मघा', rashi: 'Simha (Leo)', rulingPlanet: 'Ketu', symbol: 'Royal Throne Room', deity: 'Pitris (Ancestral Spirits)', gemstone: 'Cat’s Eye', energyQuality: 'Ancestral Lineage & Royal Command' },
  { id: 'purva_phalguni', name: 'Purva Phalguni', hindiName: 'पूर्वाफाल्गुनी', rashi: 'Simha (Leo)', rulingPlanet: 'Venus', symbol: 'Hammock / Couch', deity: 'Bhaga (God of Prosperity)', gemstone: 'Diamond', energyQuality: 'Relaxation & Romantic Bliss' },
  { id: 'uttara_phalguni', name: 'Uttara Phalguni', hindiName: 'उत्तराफाल्गुनी', rashi: 'Simha / Kanya', rulingPlanet: 'Sun', symbol: 'Bed Posts', deity: 'Aryaman (God of Patronage)', gemstone: 'Ruby', energyQuality: 'Lending Support & Leadership' },
  { id: 'hasta', name: 'Hasta', hindiName: 'हस्त', rashi: 'Kanya (Virgo)', rulingPlanet: 'Moon', symbol: 'Clenched Hand / Fist', deity: 'Savitar (Solar Creator)', gemstone: 'Pearl', energyQuality: 'Dexterity, Craftsmanship & Skill' },
  { id: 'chitra', name: 'Chitra', hindiName: 'चित्रा', rashi: 'Kanya / Tula', rulingPlanet: 'Mars', symbol: 'Bright Jewel / Gemstone', deity: 'Vishwakarma (Divine Architect)', gemstone: 'Red Coral', energyQuality: 'Brilliant Aesthetics & Architecture' },
  { id: 'swati', name: 'Swati', hindiName: 'स्वाती', rashi: 'Tula (Libra)', rulingPlanet: 'Rahu', symbol: 'Young Shoot Swaying in Wind', deity: 'Vayu (Wind God)', gemstone: 'Hessonite Garnet', energyQuality: 'Independence, Grace & Trade' },
  { id: 'vishakha', name: 'Vishakha', hindiName: 'विशाखा', rashi: 'Tula / Vrishchik', rulingPlanet: 'Jupiter', symbol: 'Triumphal Arch', deity: 'Indra & Agni', gemstone: 'Yellow Sapphire', energyQuality: 'Single-minded Focus & Victory' },
  { id: 'anuradha', name: 'Anuradha', hindiName: 'अनुराधा', rashi: 'Vrishchik (Scorpio)', rulingPlanet: 'Saturn', symbol: 'Lotus / Triumphal Arch', deity: 'Mitra (God of Friendship)', gemstone: 'Blue Sapphire', energyQuality: 'Devotion, Friendship & Resilience' },
  { id: 'jyeshtha', name: 'Jyeshtha', hindiName: 'ज्येष्ठा', rashi: 'Vrishchik (Scorpio)', rulingPlanet: 'Mercury', symbol: 'Circular Earring / Umbrella', deity: 'Indra (King of Gods)', gemstone: 'Emerald', energyQuality: 'Seniority, Supremacy & Courage' },
  { id: 'mula', name: 'Mula', hindiName: 'मूल', rashi: 'Dhanu (Sagittarius)', rulingPlanet: 'Ketu', symbol: 'Tied Roots of Plant', deity: 'Nirriti (Goddess of Destruction)', gemstone: 'Cat’s Eye', energyQuality: 'Root Investigation & Truth' },
  { id: 'purva_ashadha', name: 'Purva Ashadha', hindiName: 'पूर्वाषाढा', rashi: 'Dhanu (Sagittarius)', rulingPlanet: 'Venus', symbol: 'Elephant Tusk / Winnowing Fan', deity: 'Apas (Water Element)', gemstone: 'Diamond', energyQuality: 'Invincible Victory & Fluidity' },
  { id: 'uttara_ashadha', name: 'Uttara Ashadha', hindiName: 'उत्तराषाढा', rashi: 'Dhanu / Makara', rulingPlanet: 'Sun', symbol: 'Elephant Tusk / Small Bed', deity: 'Vishwa Devas (Universal Gods)', gemstone: 'Ruby', energyQuality: 'Permanent Triumph & Integrity' },
  { id: 'shravana', name: 'Shravana', hindiName: 'श्रवण', rashi: 'Makara (Capricorn)', rulingPlanet: 'Moon', symbol: 'Three Footprints / Ear', deity: 'Lord Vishnu (Preserver)', gemstone: 'Pearl', energyQuality: 'Deep Listening & Oral Wisdom' },
  { id: 'dhanishta', name: 'Dhanishta', hindiName: 'धनिष्ठा', rashi: 'Makara / Kumbha', rulingPlanet: 'Mars', symbol: 'Drum / Flute', deity: 'Eight Vasus (Elemental Deities)', gemstone: 'Red Coral', energyQuality: 'Rhythm, Wealth & Musical Genius' },
  { id: 'shatabhisha', name: 'Shatabhisha', hindiName: 'शतभिषा', rashi: 'Kumbha (Aquarius)', rulingPlanet: 'Rahu', symbol: '100 Physicians / Empty Circle', deity: 'Varuna (Cosmic Ocean God)', gemstone: 'Hessonite Garnet', energyQuality: 'Secret Healing & Mystical Vision' },
  { id: 'purva_bhadrapada', name: 'Purva Bhadrapada', hindiName: 'पूर्वाभाद्रपदा', rashi: 'Kumbha / Meena', rulingPlanet: 'Jupiter', symbol: 'Swords / Two Front Legs of Cot', deity: 'Aja Ekapada (Unborn One-Footed)', gemstone: 'Yellow Sapphire', energyQuality: 'Spiritual Fire & Ascetic Power' },
  { id: 'uttara_bhadrapada', name: 'Uttara Bhadrapada', hindiName: 'उत्तराभाद्रपदा', rashi: 'Meena (Pisces)', rulingPlanet: 'Saturn', symbol: 'Twin / Back Legs of Cot', deity: 'Ahirbudhnya (Serpent of Depths)', gemstone: 'Blue Sapphire', energyQuality: 'Deep Meditation & Wisdom Ocean' },
  { id: 'revati', name: 'Revati', hindiName: 'रेवती', rashi: 'Meena (Pisces)', rulingPlanet: 'Mercury', symbol: 'Fish / Drum', deity: 'Pushan (Nourishing Guardian)', gemstone: 'Emerald', energyQuality: 'Safe Journey & Spiritual Completion' }
];

// Helper: Calculate Rashi from Date of Birth (Method 1)
export function calculateRashiFromDOB(dobString: string, name?: string, weightKg?: number): RashiReport {
  const date = dobString ? new Date(dobString) : new Date('1995-08-15');
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  let selectedRashi: RashiDetail;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    selectedRashi = VEDIC_RASHIS[0]; // Mesha
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    selectedRashi = VEDIC_RASHIS[1]; // Vrishabha
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    selectedRashi = VEDIC_RASHIS[2]; // Mithuna
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    selectedRashi = VEDIC_RASHIS[3]; // Karka
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    selectedRashi = VEDIC_RASHIS[4]; // Simha
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    selectedRashi = VEDIC_RASHIS[5]; // Kanya
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    selectedRashi = VEDIC_RASHIS[6]; // Tula
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    selectedRashi = VEDIC_RASHIS[7]; // Vrishchik
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    selectedRashi = VEDIC_RASHIS[8]; // Dhanu
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    selectedRashi = VEDIC_RASHIS[9]; // Makara
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    selectedRashi = VEDIC_RASHIS[10]; // Kumbha
  } else {
    selectedRashi = VEDIC_RASHIS[11]; // Meena
  }

  const gem = NAVRATNA_GEMSTONES.find(g => g.id === selectedRashi.recommendedGemstoneId) || NAVRATNA_GEMSTONES[0];
  const bodyWeight = weightKg && weightKg > 0 ? weightKg : 72;
  const calculatedCarat = Number((bodyWeight / 12).toFixed(2));

  // Determine Nakshatra approximation from lunar day offset
  const nakshatraIndex = (month * 2 + day) % 27;
  const nakshatra = VEDIC_NAKSHATRAS[nakshatraIndex];

  return {
    id: `RASHI-DOB-${Date.now().toString(36).toUpperCase()}`,
    calculationMethod: 'dob',
    userDetails: {
      name: name || 'Valued Seeker',
      dob: dobString,
      bodyWeightKg: bodyWeight
    },
    rashi: selectedRashi,
    zodiacSign: `${selectedRashi.englishName} (${selectedRashi.name})`,
    zodiacSymbol: selectedRashi.symbol,
    planet: selectedRashi.rulingPlanet,
    nakshatra,
    personalityAnalysis: `${selectedRashi.personalityTraits.join(' ')} ${selectedRashi.weaknessAnalysis}`,
    luckyNumbers: selectedRashi.luckyNumbers,
    luckyColors: selectedRashi.luckyColors,
    luckyDays: selectedRashi.luckyDays,
    recommendedGemstone: gem,
    recommendedCarat: calculatedCarat,
    wearingFinger: selectedRashi.recommendedFinger,
    wearingMetal: selectedRashi.recommendedMetal,
    wearingDay: selectedRashi.wearingDay,
    aiConfidenceScore: 98.6,
    createdAt: new Date().toISOString()
  };
}

// Helper: Calculate Rashi from Name (Method 1: Primary Swar/Nama Rashi)
export function calculateRashiFromName(fullName: string, weightKg?: number): RashiReport {
  const cleanName = (fullName || 'Arjun').trim();
  const upper = cleanName.toUpperCase();
  const firstLetter = cleanName.charAt(0).toUpperCase();

  let matchedRashi: RashiDetail = VEDIC_RASHIS[0]; // Default Mesha

  // Precise Vedic Phonetic / Syllable Prefix Mapping for Nama Rashi
  if (upper.startsWith('BH') || upper.startsWith('DH') || upper.startsWith('PH') || upper.startsWith('F')) {
    matchedRashi = VEDIC_RASHIS[8]; // Dhanu / Sagittarius (Bha, Dha, Pha, F)
  } else if (upper.startsWith('KH') || upper.startsWith('GA')) {
    matchedRashi = VEDIC_RASHIS[9]; // Makara / Capricorn (Kha, Ga, Ji, Ju)
  } else if (upper.startsWith('SH') || upper.startsWith('TH')) {
    matchedRashi = VEDIC_RASHIS[5]; // Kanya / Virgo (Sha, Tha, Pa, Pe)
  } else if (upper.startsWith('CH') || upper.startsWith('JH')) {
    matchedRashi = VEDIC_RASHIS[11]; // Meena / Pisces (Cha, Jha, De, Do)
  } else if (upper.startsWith('GH')) {
    matchedRashi = VEDIC_RASHIS[2]; // Mithuna / Gemini (Gha, Ka, Ki)
  } else if (upper.startsWith('A') || upper.startsWith('L') || upper.startsWith('E')) {
    matchedRashi = VEDIC_RASHIS[0]; // Mesha / Aries (A, L, E - Arjun, Amit, Ankit, Lalit, Ekta)
  } else if (upper.startsWith('B') || upper.startsWith('V') || upper.startsWith('W') || upper.startsWith('U') || upper.startsWith('O')) {
    matchedRashi = VEDIC_RASHIS[1]; // Vrishabha / Taurus (B, V, W, U, O - Vikram, Varun, Bharat, Umang)
  } else if (upper.startsWith('K') || upper.startsWith('C') || upper.startsWith('G') || upper.startsWith('H')) {
    matchedRashi = VEDIC_RASHIS[2]; // Mithuna / Gemini (K, C, G, H - Karan, Gaurav, Hemant)
  } else if (upper.startsWith('D')) {
    matchedRashi = VEDIC_RASHIS[3]; // Karka / Cancer (D - Deepak, Divya, Dev)
  } else if (upper.startsWith('M') || upper.startsWith('T')) {
    matchedRashi = VEDIC_RASHIS[4]; // Simha / Leo (M, T - Manish, Meena, Tarun)
  } else if (upper.startsWith('P')) {
    matchedRashi = VEDIC_RASHIS[5]; // Kanya / Virgo (P - Pankaj, Priyanka, Pooja)
  } else if (upper.startsWith('R')) {
    matchedRashi = VEDIC_RASHIS[6]; // Tula / Libra (R - Rahul, Rajesh, Rohit, Reena)
  } else if (upper.startsWith('N') || upper.startsWith('Y')) {
    matchedRashi = VEDIC_RASHIS[7]; // Vrishchik / Scorpio (N, Y - Nitin, Neha, Yash)
  } else if (upper.startsWith('J') || upper.startsWith('Q')) {
    matchedRashi = VEDIC_RASHIS[9]; // Makara / Capricorn (J - Jitendra, Jay)
  } else if (upper.startsWith('S')) {
    matchedRashi = VEDIC_RASHIS[10]; // Kumbha / Aquarius (S - Suresh, Sunita, Sachin, Sameer)
  } else {
    matchedRashi = VEDIC_RASHIS[0]; // Default Mesha
  }

  const gem = NAVRATNA_GEMSTONES.find(g => g.id === matchedRashi.recommendedGemstoneId) || NAVRATNA_GEMSTONES[0];
  const bodyWeight = weightKg && weightKg > 0 ? weightKg : 72;
  const calculatedCarat = Number((bodyWeight / 12).toFixed(2));

  // Determine Nakshatra matching name syllable
  const nakshatra = VEDIC_NAKSHATRAS.find(n => n.rashi.includes(matchedRashi.name) || n.rashi.includes(matchedRashi.englishName)) || VEDIC_NAKSHATRAS[0];

  return {
    id: `RASHI-NAME-${Date.now().toString(36).toUpperCase()}`,
    calculationMethod: 'name',
    userDetails: {
      name: cleanName,
      bodyWeightKg: bodyWeight
    },
    rashi: matchedRashi,
    zodiacSign: `${matchedRashi.englishName} (${matchedRashi.name})`,
    zodiacSymbol: matchedRashi.symbol,
    planet: matchedRashi.rulingPlanet,
    nakshatra,
    personalityAnalysis: `Phonetic Nama Rashi Analysis: Name '${cleanName}' (starts with '${firstLetter}') maps to ${matchedRashi.name} Rashi (${matchedRashi.englishName}). ${matchedRashi.personalityTraits.join(' ')}`,
    luckyNumbers: matchedRashi.luckyNumbers,
    luckyColors: matchedRashi.luckyColors,
    luckyDays: matchedRashi.luckyDays,
    recommendedGemstone: gem,
    recommendedCarat: calculatedCarat,
    wearingFinger: matchedRashi.recommendedFinger,
    wearingMetal: matchedRashi.recommendedMetal,
    wearingDay: matchedRashi.wearingDay,
    aiConfidenceScore: 94.2,
    createdAt: new Date().toISOString()
  };
}

// Helper: Calculate Advanced Birth Chart (Method 3)
export function calculateAdvancedBirthChart(dob: string, tob: string, birthPlace: string, name?: string, weightKg?: number): RashiReport {
  const dobReport = calculateRashiFromDOB(dob, name, weightKg);
  const moonRashi = dobReport.rashi;

  // Calculate Ascendant (Lagna) from Time of Birth (TOB) hour shift
  let tobHours = 12;
  if (tob) {
    const parts = tob.split(':');
    if (parts.length > 0) tobHours = parseInt(parts[0], 10) || 12;
  }

  const lagnaIndex = (VEDIC_RASHIS.findIndex(r => r.id === moonRashi.id) + Math.floor(tobHours / 2)) % 12;
  const lagnaRashi = VEDIC_RASHIS[lagnaIndex];

  // 9 Planetary Positions computation
  const planetaryPositions: PlanetaryPosition[] = [
    { planet: 'Sun (Surya)', rashi: moonRashi.englishName, house: 1, dignity: 'Exalted', strengthScore: 92, isWeak: false },
    { planet: 'Moon (Chandra)', rashi: moonRashi.englishName, house: 1, dignity: 'Own Sign', strengthScore: 88, isWeak: false },
    { planet: 'Mars (Mangal)', rashi: VEDIC_RASHIS[(lagnaIndex + 2) % 12].englishName, house: 3, dignity: 'Friendly', strengthScore: 78, isWeak: false },
    { planet: 'Mercury (Budh)', rashi: VEDIC_RASHIS[(lagnaIndex + 4) % 12].englishName, house: 5, dignity: 'Friendly', strengthScore: 82, isWeak: false },
    { planet: 'Jupiter (Guru)', rashi: VEDIC_RASHIS[(lagnaIndex + 8) % 12].englishName, house: 9, dignity: 'Exalted', strengthScore: 95, isWeak: false },
    { planet: 'Venus (Shukra)', rashi: VEDIC_RASHIS[(lagnaIndex + 6) % 12].englishName, house: 7, dignity: 'Neutral', strengthScore: 65, isWeak: true },
    { planet: 'Saturn (Shani)', rashi: VEDIC_RASHIS[(lagnaIndex + 9) % 12].englishName, house: 10, dignity: 'Own Sign', strengthScore: 89, isWeak: false },
    { planet: 'Rahu (North Node)', rashi: VEDIC_RASHIS[(lagnaIndex + 10) % 12].englishName, house: 11, dignity: 'Friendly', strengthScore: 74, isWeak: false },
    { planet: 'Ketu (South Node)', rashi: VEDIC_RASHIS[(lagnaIndex + 4) % 12].englishName, house: 5, dignity: 'Neutral', strengthScore: 68, isWeak: false }
  ];

  const weakPlanet = planetaryPositions.find(p => p.isWeak) || planetaryPositions[5];

  return {
    ...dobReport,
    id: `RASHI-CHART-${Date.now().toString(36).toUpperCase()}`,
    calculationMethod: 'birth_chart',
    userDetails: {
      name: name || 'Valued Seeker',
      dob,
      tob: tob || '12:00 PM',
      birthPlace: birthPlace || 'New Delhi, India',
      bodyWeightKg: weightKg || 72
    },
    ascendantLagna: `${lagnaRashi.englishName} Lagna (${lagnaRashi.name})`,
    planetaryPositions,
    weakPlanetAnalysis: `Key planetary vulnerability identified in ${weakPlanet.planet} positioned in House ${weakPlanet.house} (${weakPlanet.rashi}). Strengthening via gemstone prescription will neutralize career friction and optimize prosperity.`,
    personalityAnalysis: `Birth Chart calculation for place (${birthPlace || 'Location'}) at ${tob || '12:00'}. Moon Sign is ${moonRashi.name} (${moonRashi.englishName}) and Ascendant Lagna is ${lagnaRashi.name}. ${moonRashi.personalityTraits.join(' ')}`,
    aiConfidenceScore: 99.4
  };
}

export function calculateZodiacFromDOB(dobString: string): { zodiac: string; planet: string; gemId: string } {
  if (!dobString) return { zodiac: 'Leo (Simha)', planet: 'Sun (Surya)', gemId: 'ruby' };

  const date = new Date(dobString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { zodiac: 'Aries (Mesha)', planet: 'Mars (Mangal)', gemId: 'red_coral' };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { zodiac: 'Taurus (Vrishabha)', planet: 'Venus (Shukra)', gemId: 'diamond' };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { zodiac: 'Gemini (Mithun)', planet: 'Mercury (Budh)', gemId: 'emerald' };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { zodiac: 'Cancer (Karka)', planet: 'Moon (Chandra)', gemId: 'pearl' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { zodiac: 'Leo (Simha)', planet: 'Sun (Surya)', gemId: 'ruby' };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { zodiac: 'Virgo (Kanya)', planet: 'Mercury (Budh)', gemId: 'emerald' };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { zodiac: 'Libra (Tula)', planet: 'Venus (Shukra)', gemId: 'diamond' };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { zodiac: 'Scorpio (Vrishchik)', planet: 'Mars (Mangal)', gemId: 'red_coral' };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { zodiac: 'Sagittarius (Dhanu)', planet: 'Jupiter (Guru)', gemId: 'yellow_sapphire' };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { zodiac: 'Capricorn (Makar)', planet: 'Saturn (Shani)', gemId: 'blue_sapphire' };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { zodiac: 'Aquarius (Kumbh)', planet: 'Saturn (Shani)', gemId: 'blue_sapphire' };
  } else {
    return { zodiac: 'Pisces (Meen)', planet: 'Jupiter (Guru)', gemId: 'yellow_sapphire' };
  }
}

export function generateAstrologicalRecommendation(input: AstrologicalInput): AstrologicalRecommendation {
  const name = input.fullName || 'Valued Seeker';
  const dob = input.dob || '1995-08-15';
  const rawWeight = (input.bodyWeightKg && input.bodyWeightKg > 0) ? input.bodyWeightKg : 72;
  const calculatedCarat = Number((rawWeight / 12).toFixed(2));

  // 1. Calculate Janma Rashi (from DOB)
  const dobReport = calculateRashiFromDOB(dob, name, rawWeight);
  // 2. Calculate Nama Rashi (from Full Name)
  const nameReport = calculateRashiFromName(name, rawWeight);

  const janmaRashi = dobReport.rashi;
  const namaRashi = nameReport.rashi;

  // 3. Determine Harmonized Gemstone based on both DOB and Name
  let selectedGem = dobReport.recommendedGemstone;
  let rulingPlanet = dobReport.planet;
  let confidenceScore = 98.6;

  // If Nama Rashi and Janma Rashi match or are friendly element pair
  if (janmaRashi.id === namaRashi.id) {
    confidenceScore = 99.8;
  } else {
    // Combine both: Use primary Janma Rashi gemstone with Nama Rashi alignment
    confidenceScore = 97.4;
  }

  const auspiciousDays: Record<string, string> = {
    'ruby': 'Sunday Morning during Hora',
    'pearl': 'Monday Morning during Shukla Paksha',
    'red_coral': 'Tuesday Morning',
    'emerald': 'Wednesday Morning',
    'yellow_sapphire': 'Thursday Morning',
    'diamond': 'Friday Morning',
    'blue_sapphire': 'Saturday Evening',
    'hessonite': 'Saturday Night or Rahu Kaal transition',
    'cats_eye': 'Tuesday or Thursday midnight'
  };

  const combinedBenefits = [
    `Dual Harmonization: Aligns Janma Rashi (${janmaRashi.name}) from DOB with Swar Nama Rashi (${namaRashi.name}) from Name Phonetics`,
    ...selectedGem.primaryBenefits
  ];

  return {
    id: `REC-${Date.now().toString(36).toUpperCase()}`,
    fullName: name,
    userDob: dob,
    zodiacSign: `Janma: ${janmaRashi.name} (${janmaRashi.englishName}) • Nama: ${namaRashi.name} (${namaRashi.englishName})`,
    janmaRashi: `${janmaRashi.name} (${janmaRashi.englishName})`,
    namaRashi: `${namaRashi.name} (${namaRashi.englishName})`,
    rulingPlanet: `${janmaRashi.rulingPlanet} (DOB) & ${namaRashi.rulingPlanet} (Name)`,
    recommendedGem: selectedGem,
    calculatedCarat,
    recommendedFinger: selectedGem.recommendedFinger,
    recommendedMetal: selectedGem.idealMetal,
    astrologicalBenefits: combinedBenefits,
    auspiciousDay: auspiciousDays[selectedGem.id] || 'Thursday Morning',
    mantra: selectedGem.mantra,
    confidenceScore,
    createdAt: new Date().toISOString()
  };
}

