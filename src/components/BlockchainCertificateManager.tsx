import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Copy, Check, Download, Sparkles, Key } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlockchainCertificate } from '../types';

export const BlockchainCertificateManager: React.FC = () => {
  const [certificates, setCertificates] = useState<BlockchainCertificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<BlockchainCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedHash, setCopiedHash] = useState(false);

  // Form for Minting
  const [gemstoneName, setGemstoneName] = useState('Natural Royal Blue Sapphire');
  const [caratWeight, setCaratWeight] = useState(6.25);
  const [origin, setOrigin] = useState('Ratnapura, Sri Lanka');
  const [authenticityStatus, setAuthenticityStatus] = useState('Natural Untreated');
  const [clarityGrade, setClarityGrade] = useState('VVS1');
  const [cutGrade, setCutGrade] = useState('Ideal Cushion Cut');
  const [ownerName, setOwnerName] = useState('Alexander Wright');
  const [ownerEmail, setOwnerEmail] = useState('customer@gemvault.ai');

  const [minting, setMinting] = useState(false);

  // Fetch certificates from Express backend
  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certificates');
      const data = await res.json();
      if (data.success) {
        setCertificates(data.certificates);
        if (data.certificates.length > 0 && !selectedCert) {
          setSelectedCert(data.certificates[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Mint new Blockchain Certificate
  const handleMintCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMinting(true);

    try {
      const res = await fetch('/api/blockchain/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gemstoneName,
          caratWeight,
          origin,
          authenticityStatus,
          clarityGrade,
          cutGrade,
          ownerName,
          ownerEmail
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Minting failed');

      setCertificates((prev) => [data.certificate, ...prev]);
      setSelectedCert(data.certificate);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      alert('Minting error: ' + err.message);
    } finally {
      setMinting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Sovereign Immutable Ledger</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
          SHA-256 Blockchain Certification & NFT Vault
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Every gemstone certificate is cryptographically signed with a SHA-256 block hash and embedded QR code verification url.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Issue / Mint Certificate */}
        <form onSubmit={handleMintCertificate} className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] pb-2 border-b border-neutral-800 flex items-center space-x-2">
            <Key className="w-4 h-4 text-[#D4AF37]" />
            <span>Mint New Sovereign Certificate</span>
          </h3>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Gemstone Description</label>
            <input
              type="text"
              value={gemstoneName}
              onChange={(e) => setGemstoneName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">Carat Weight</label>
              <input
                type="number"
                step="0.01"
                value={caratWeight}
                onChange={(e) => setCaratWeight(Number(e.target.value))}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/40 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Authenticity Status</label>
              <input
                type="text"
                value={authenticityStatus}
                onChange={(e) => setAuthenticityStatus(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Clarity Grade</label>
              <input
                type="text"
                value={clarityGrade}
                onChange={(e) => setClarityGrade(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Registered Owner Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Registered Owner Email</label>
            <input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={minting}
            className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
          >
            <Sparkles className="w-4 h-4 text-black animate-pulse" />
            <span>{minting ? 'Cryptographic Signing...' : 'Mint & Register NFT Certificate'}</span>
          </button>
        </form>

        {/* Right Output: Certificate Card & List */}
        <div className="lg:col-span-7 space-y-6">
          
          {selectedCert ? (
            <div className="p-6 rounded-3xl bg-[#08080A] border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Gold watermark */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Certificate Header */}
              <div className="flex justify-between items-start border-b border-[#D4AF37]/30 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                    <span className="font-serif text-lg font-bold text-[#FFF8E7] uppercase tracking-wider">
                      GemVault Sovereign Certificate
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-[#D4AF37]/80 mt-1">
                    ID: {selectedCert.certificateId} • Issued by {selectedCert.issuer}
                  </p>
                </div>

                {selectedCert.qrCodeUrl && (
                  <img src={selectedCert.qrCodeUrl} alt="QR Code" className="w-20 h-20 rounded-xl border border-[#D4AF37]/50 p-1 bg-white" />
                )}
              </div>

              {/* Gem Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#0B0B0E] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Gemstone Variety</p>
                  <p className="font-serif font-bold text-[#FFF8E7] text-sm mt-0.5">{selectedCert.gemstoneName}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B0B0E] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Carat Weight & Origin</p>
                  <p className="font-serif font-bold text-[#D4AF37] text-sm mt-0.5">
                    {selectedCert.caratWeight} ct ({selectedCert.origin})
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B0B0E] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Clarity / Cut Grade</p>
                  <p className="font-semibold text-[#10B981] mt-0.5">{selectedCert.clarityGrade} • {selectedCert.cutGrade}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B0B0E] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Registered Collector</p>
                  <p className="font-semibold text-[#FFF8E7] mt-0.5">{selectedCert.ownerName}</p>
                </div>
              </div>

              {/* SHA-256 Hash Display */}
              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-[#D4AF37]/30 text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                  <span>Cryptographic SHA-256 Block Hash</span>
                  <button
                    onClick={() => copyToClipboard(selectedCert.blockHash)}
                    className="flex items-center space-x-1 text-[#10B981] hover:underline"
                  >
                    {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Copied Hash' : 'Copy Hash'}</span>
                  </button>
                </div>
                <p className="font-mono text-[11px] text-neutral-300 break-all bg-[#050505] p-2 rounded-lg border border-neutral-800">
                  {selectedCert.blockHash}
                </p>
              </div>

              {/* NFT Exportable Metadata Preview */}
              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-neutral-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#10B981] uppercase tracking-wider">ERC-721 NFT Ready JSON</span>
                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedCert.nftMetadata, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `${selectedCert.certificateId}_nft_metadata.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="flex items-center space-x-1 text-[#D4AF37] hover:underline text-[11px]"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download JSON</span>
                  </button>
                </div>

                <pre className="text-[10px] font-mono text-neutral-400 bg-[#050505] p-2.5 rounded-lg overflow-x-auto">
                  {JSON.stringify(selectedCert.nftMetadata, null, 2)}
                </pre>
              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500">
              <Award className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs">No certificate selected.</p>
            </div>
          )}

          {/* Certificate Vault List */}
          <div className="p-4 rounded-2xl editorial-card space-y-3">
            <h4 className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">
              Issued Certificates Registry ({certificates.length})
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {certificates.map((cert) => (
                <div
                  key={cert.certificateId}
                  onClick={() => setSelectedCert(cert)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex justify-between items-center transition-all ${
                    selectedCert?.certificateId === cert.certificateId
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#FFF8E7]'
                      : 'bg-[#08080A] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <p className="font-bold text-[#FFF8E7]">{cert.gemstoneName} ({cert.caratWeight} ct)</p>
                    <p className="text-[10px] font-mono text-neutral-400">{cert.certificateId} • {cert.ownerName}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
