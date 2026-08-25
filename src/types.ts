export type UserRole = 'Admin' | 'Researcher' | 'Jeweler' | 'Customer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bodyWeightKg?: number;
  profession?: string;
  country?: string;
  state?: string;
  profilePicture?: string;
  healthGoal?: string;
  financialGoal?: string;
  personality?: string;
  isVerified: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface NavratnaGem {
  id: string;
  name: string;
  hindiName: string;
  planet: string;
  zodiacSign: string;
  rulingDeity: string;
  recommendedFinger: string;
  idealMetal: string;
  primaryBenefits: string[];
  chakarAlignment: string;
  mantra: string;
  color: string;
  mohsHardness: number;
  refractiveIndex: string;
  specificGravity: string;
  pricePerCaratUsd: number;
  image: string;
}

export interface AstrologicalInput {
  fullName: string;
  dob: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other';
  bodyWeightKg: number;
  profession: string;
  healthGoal?: string;
  financialGoal?: string;
  preferences?: string;
}

export interface AstrologicalRecommendation {
  id: string;
  fullName: string;
  userDob: string;
  zodiacSign: string;
  namaRashi?: string;
  janmaRashi?: string;
  rulingPlanet: string;
  recommendedGem: NavratnaGem;
  calculatedCarat: number; // BodyWeight / 12
  recommendedFinger: string;
  recommendedMetal: string;
  astrologicalBenefits: string[];
  auspiciousDay: string;
  mantra: string;
  confidenceScore: number; // 0 - 100
  createdAt: string;
}

export interface ImageAnalysisResult {
  id: string;
  gemstoneType: string;
  authenticityStatus: 'Natural' | 'Synthetic' | 'Fake' | 'Treated';
  treatmentType?: 'Heat Treated' | 'Oil Injected' | 'Glass Filled' | 'None';
  confidenceScore: number;
  clarityGrade: 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'I1';
  cutQuality: 'Ideal' | 'Excellent' | 'Very Good' | 'Good';
  colorSaturation: string;
  opencvMetrics: {
    noiseLevel: number; // 0-100
    reflectionIndex: number;
    shapeDetected: string;
    textureUniformity: number;
    transparencyScore: number;
    crackInclusionCount: number;
  };
  opticalSpectrumData: {
    wavelengthNm: number[];
    absorbance: number[];
  };
  aiNotes: string;
  analyzedAt: string;
  imageUrl: string;
}

export interface PricePredictionInput {
  gemstoneName: string;
  caratWeight: number;
  color: string;
  clarity: 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'I1';
  origin: string; // e.g. "Ceylon (Sri Lanka)", "Burma (Myanmar)", "Colombia", "Zambia"
  treatment: 'None' | 'Heat Treated' | 'Oil Injected' | 'Glass Filled';
  demandFactor: 'Low' | 'Medium' | 'High' | 'Extreme';
  rarityScore: number; // 1 - 10
}

export interface PricePredictionResult {
  estimatedPriceUsd: number;
  estimatedPriceInr: number;
  priceRangeUsd: { min: number; max: number };
  priceRangeInr: { min: number; max: number };
  confidenceScore: number;
  historicalPriceTrend: { month: string; priceUsd: number }[];
  marketAnalysisSummary: string;
}

export interface DurabilityInput {
  mohsHardness: number; // 1-10
  toughnessScore: number; // 1-10 (Resistance to breaking/chipping)
  heatResistanceScore: number; // 1-10 (Thermal stability)
  chemicalResistanceScore: number; // 1-10 (Resistance to acids/solvents)
}

export interface DurabilityResult {
  overallScore: number; // (H+T+R+C)/4
  mohsGauge: number;
  toughness: number;
  heatResistance: number;
  chemicalResistance: number;
  riskCategory: 'Very Low' | 'Low' | 'Moderate' | 'High';
  expectedLifespanYears: string;
  careGuidelines: string[];
}

export interface BlockchainCertificate {
  certificateId: string; // GEM-BC-XXXXXX
  gemstoneName: string;
  caratWeight: number;
  origin: string;
  authenticityStatus: string;
  clarityGrade: string;
  cutGrade: string;
  ownerName: string;
  ownerEmail: string;
  issuer: string;
  timestamp: string;
  blockHash: string; // SHA-256
  previousHash: string;
  qrCodeUrl: string;
  verificationUrl: string;
  nftMetadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
  };
}

export interface GemstoneAnalysisReport {
  reportId: string;
  gemstoneName: string;
  caratWeight: number;
  authenticityStatus: 'Natural' | 'Synthetic' | 'Fake' | 'Treated';
  clarityGrade: string;
  durabilityScore: number;
  riskCategory: string;
  estimatedPriceUsd: number;
  origin: string;
  aiNotes: string;
  createdAt: string;
}

export interface RashiDetail {
  id: string;
  name: string; // e.g. Mesha
  englishName: string; // e.g. Aries
  symbol: string; // e.g. ♈
  sanskritSymbolName: string; // e.g. Ram / मेष
  rulingPlanet: string;
  rulingDeity: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  personalityTraits: string[];
  nameSyllables: string[]; // Syllables like ["Cho", "La", "Lee", "Loo", "Le", "Lo", "A"]
  recommendedGemstoneId: string;
  recommendedGemstoneName: string;
  recommendedFinger: string;
  recommendedMetal: string;
  wearingDay: string;
  gemstoneBenefits: string[];
  weaknessAnalysis: string;
}

export interface NakshatraDetail {
  id: string;
  name: string;
  hindiName: string;
  rashi: string;
  rulingPlanet: string;
  symbol: string;
  deity: string;
  gemstone: string;
  energyQuality: string;
}

export interface PlanetaryPosition {
  planet: string; // Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
  rashi: string;
  house: number; // 1 to 12
  dignity: 'Exalted' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Debilitated' | 'Enemy';
  strengthScore: number; // 0 to 100
  isWeak: boolean;
}

export interface RashiReport {
  id: string;
  calculationMethod: 'dob' | 'name' | 'birth_chart';
  userDetails: {
    name?: string;
    dob?: string;
    tob?: string;
    birthPlace?: string;
    bodyWeightKg?: number;
  };
  rashi: RashiDetail;
  zodiacSign: string;
  zodiacSymbol: string;
  planet: string;
  nakshatra?: NakshatraDetail;
  ascendantLagna?: string;
  planetaryPositions?: PlanetaryPosition[];
  weakPlanetAnalysis?: string;
  personalityAnalysis: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  recommendedGemstone: NavratnaGem;
  recommendedCarat: number;
  wearingFinger: string;
  wearingMetal: string;
  wearingDay: string;
  aiConfidenceScore: number;
  createdAt: string;
}

export interface AnalyticsData {
  totalAuthentications: number;
  naturalGemsPercentage: number;
  certificatesIssued: number;
  astrologicalRecommendationsGiven: number;
  recentLogs: Array<{ id: string; user: string; action: string; timestamp: string; status: 'Success' | 'Warning' | 'Pending' }>;
  authenticityBreakdown: { name: string; value: number }[];
  monthlyVerifications: { month: string; verifications: number; certificates: number }[];
}
