import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db as firestoreDb, handleFirestoreError, OperationType } from './firebase';
import { User, BlockchainCertificate, ImageAnalysisResult, AstrologicalRecommendation, AnalyticsData } from '../types';

export interface DatabaseSchema {
  users: User[];
  certificates: BlockchainCertificate[];
  analyses: ImageAnalysisResult[];
  recommendations: AstrologicalRecommendation[];
  logs: Array<{ id: string; user: string; action: string; timestamp: string; status: 'Success' | 'Warning' | 'Pending' }>;
}

const INITIAL_DB: DatabaseSchema = {
  users: [
    {
      id: 'usr-admin-1',
      fullName: 'Dr. Evelyn Vance (Chief Gemologist)',
      email: 'admin@gemvault.ai',
      role: 'Admin',
      dob: '1982-05-14',
      gender: 'Female',
      bodyWeightKg: 64,
      profession: 'Senior Mineralogist & Lab Lead',
      country: 'United States',
      state: 'California',
      profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      twoFactorEnabled: true,
      createdAt: '2025-01-10T10:00:00Z'
    },
    {
      id: 'usr-researcher-1',
      fullName: 'Prof. Rajesh Sharma',
      email: 'researcher@gemvault.ai',
      role: 'Researcher',
      dob: '1979-11-23',
      gender: 'Male',
      bodyWeightKg: 78,
      profession: 'Astrological Scientist',
      country: 'India',
      state: 'Delhi',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      createdAt: '2025-02-01T12:00:00Z'
    },
    {
      id: 'usr-jeweler-1',
      fullName: 'Aria Sterling (Master Jeweler)',
      email: 'jeweler@gemvault.ai',
      role: 'Jeweler',
      dob: '1990-08-19',
      gender: 'Female',
      bodyWeightKg: 58,
      profession: 'Luxury Gem Artisan',
      country: 'United Kingdom',
      state: 'London',
      profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      createdAt: '2025-02-15T09:30:00Z'
    },
    {
      id: 'usr-customer-1',
      fullName: 'Alexander Wright',
      email: 'customer@gemvault.ai',
      role: 'Customer',
      dob: '1994-07-28',
      gender: 'Male',
      bodyWeightKg: 72,
      profession: 'Software Executive',
      country: 'United States',
      state: 'New York',
      healthGoal: 'Vitality & Focus',
      financialGoal: 'Wealth Preservation & Expansion',
      personality: 'Ambitious, Analytical',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      createdAt: '2025-03-01T15:45:00Z'
    }
  ],
  certificates: [
    {
      certificateId: 'GEM-BC-984210',
      gemstoneName: 'Natural Royal Blue Sapphire (Ceylon)',
      caratWeight: 6.25,
      origin: 'Ratnapura, Sri Lanka',
      authenticityStatus: 'Natural Untreated',
      clarityGrade: 'VVS1',
      cutGrade: 'Ideal Oval Brilliant',
      ownerName: 'Alexander Wright',
      ownerEmail: 'customer@gemvault.ai',
      issuer: 'GemVault AI Sovereign Protocol',
      timestamp: '2026-06-12T14:22:10Z',
      blockHash: '0x8f2a4b89c31e7d90a5f112e456b789123cde4567890abcdef123456789abcde0',
      previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      qrCodeUrl: '',
      verificationUrl: 'https://gemvault.ai/verify/GEM-BC-984210',
      nftMetadata: {
        name: 'GemVault Sovereign Certificate #984210',
        description: 'Immutable Blockchain Authentication Record for 6.25ct Natural Ceylon Blue Sapphire.',
        image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
        attributes: [
          { trait_type: 'Gemstone', value: 'Blue Sapphire' },
          { trait_type: 'Carat', value: 6.25 },
          { trait_type: 'Clarity', value: 'VVS1' },
          { trait_type: 'Status', value: 'Natural Untreated' },
          { trait_type: 'Refractive Index', value: '1.762' }
        ]
      }
    },
    {
      certificateId: 'GEM-BC-772041',
      gemstoneName: 'Natural Pigeon Blood Ruby (Burma)',
      caratWeight: 4.80,
      origin: 'Mogok, Myanmar',
      authenticityStatus: 'Natural Untreated',
      clarityGrade: 'VVS2',
      cutGrade: 'Cushion Cut',
      ownerName: 'Aria Sterling',
      ownerEmail: 'jeweler@gemvault.ai',
      issuer: 'GemVault AI Sovereign Protocol',
      timestamp: '2026-07-01T09:10:00Z',
      blockHash: '0x3c9e120f87a6d4e510a991283c47e8190d112233445566778899aabbccddeeff',
      previousHash: '0x8f2a4b89c31e7d90a5f112e456b789123cde4567890abcdef123456789abcde0',
      qrCodeUrl: '',
      verificationUrl: 'https://gemvault.ai/verify/GEM-BC-772041',
      nftMetadata: {
        name: 'GemVault Sovereign Certificate #772041',
        description: 'Immutable Blockchain Certificate for 4.80ct Mogok Pigeon Blood Ruby.',
        image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80',
        attributes: [
          { trait_type: 'Gemstone', value: 'Ruby' },
          { trait_type: 'Carat', value: 4.80 },
          { trait_type: 'Clarity', value: 'VVS2' },
          { trait_type: 'Status', value: 'Natural Untreated' }
        ]
      }
    }
  ],
  analyses: [],
  recommendations: [],
  logs: [
    { id: 'log-1', user: 'admin@gemvault.ai', action: 'System Security Audit Completed - Zero Vulnerabilities', timestamp: '2026-07-30T18:00:00Z', status: 'Success' },
    { id: 'log-2', user: 'customer@gemvault.ai', action: 'Generated Blockchain Certificate #GEM-BC-984210', timestamp: '2026-07-29T14:22:00Z', status: 'Success' },
    { id: 'log-3', user: 'jeweler@gemvault.ai', action: 'Optical CNN Analysis: Synthetic Emerald Flagged', timestamp: '2026-07-28T11:15:00Z', status: 'Warning' },
    { id: 'log-4', user: 'researcher@gemvault.ai', action: 'Navratna Astro-Planetary Map Model Calibrated', timestamp: '2026-07-27T09:00:00Z', status: 'Success' }
  ]
};

class MemoryDatabase {
  private data: DatabaseSchema = INITIAL_DB;

  constructor() {
    this.syncFromFirestore();
  }

  private async syncFromFirestore() {
    try {
      const usersSnap = await getDocs(collection(firestoreDb, 'users'));
      if (!usersSnap.empty) {
        const fetchedUsers: User[] = [];
        usersSnap.forEach((d) => fetchedUsers.push(d.data() as User));
        if (fetchedUsers.length > 0) {
          this.data.users = fetchedUsers;
        }
      }

      const certsSnap = await getDocs(collection(firestoreDb, 'certificates'));
      if (!certsSnap.empty) {
        const fetchedCerts: BlockchainCertificate[] = [];
        certsSnap.forEach((d) => fetchedCerts.push(d.data() as BlockchainCertificate));
        if (fetchedCerts.length > 0) {
          this.data.certificates = fetchedCerts;
        }
      }
    } catch {
      // Memory fallback active
    }
  }

  getUsers(): User[] {
    return this.data.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  addUser(user: User): User {
    this.data.users.push(user);
    this.addLog(user.email, `New user registered: ${user.fullName} (${user.role})`, 'Success');

    // Async sync to Firestore
    const userDocRef = doc(firestoreDb, 'users', user.id);
    setDoc(userDocRef, user).catch((err) => handleFirestoreError(err, OperationType.WRITE, 'users'));

    return user;
  }

  getCertificates(): BlockchainCertificate[] {
    return this.data.certificates;
  }

  getCertificateById(id: string): BlockchainCertificate | undefined {
    return this.data.certificates.find(c => c.certificateId.toUpperCase() === id.toUpperCase());
  }

  addCertificate(cert: BlockchainCertificate): BlockchainCertificate {
    this.data.certificates.unshift(cert);
    this.addLog(cert.ownerEmail, `Minted Blockchain Certificate #${cert.certificateId}`, 'Success');

    // Async sync to Firestore
    const certDocRef = doc(firestoreDb, 'certificates', cert.certificateId);
    setDoc(certDocRef, cert).catch((err) => handleFirestoreError(err, OperationType.WRITE, 'certificates'));

    return cert;
  }

  addAnalysis(analysis: ImageAnalysisResult): ImageAnalysisResult {
    this.data.analyses.unshift(analysis);
    this.addLog('System AI', `Optical Scan Completed: ${analysis.gemstoneType} [${analysis.authenticityStatus}]`, 'Success');
    return analysis;
  }

  addLog(user: string, action: string, status: 'Success' | 'Warning' | 'Pending') {
    this.data.logs.unshift({
      id: `log-${Date.now()}`,
      user,
      action,
      timestamp: new Date().toISOString(),
      status
    });
  }

  getAnalytics(): AnalyticsData {
    return {
      totalAuthentications: 1420 + this.data.analyses.length,
      naturalGemsPercentage: 88.5,
      certificatesIssued: 492 + this.data.certificates.length,
      astrologicalRecommendationsGiven: 2180 + this.data.recommendations.length,
      recentLogs: this.data.logs.slice(0, 6),
      authenticityBreakdown: [
        { name: 'Natural Untreated', value: 68 },
        { name: 'Heat Treated', value: 18 },
        { name: 'Synthetic (Lab-Grown)', value: 10 },
        { name: 'Counterfeit / Glass', value: 4 }
      ],
      monthlyVerifications: [
        { month: 'Jan', verifications: 120, certificates: 45 },
        { month: 'Feb', verifications: 180, certificates: 62 },
        { month: 'Mar', verifications: 240, certificates: 88 },
        { month: 'Apr', verifications: 310, certificates: 110 },
        { month: 'May', verifications: 420, certificates: 145 },
        { month: 'Jun', verifications: 510, certificates: 190 }
      ]
    };
  }
}

export const db = new MemoryDatabase();

