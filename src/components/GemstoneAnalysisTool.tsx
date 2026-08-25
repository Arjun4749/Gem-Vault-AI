import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  Cpu,
  Eye,
  Sparkles,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { ImageAnalysisResult } from '../types';

export const GemstoneAnalysisTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [gemHint, setGemHint] = useState<string>('Natural Blue Sapphire');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [activeStep, setActiveStep] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sample Preset Gemstone Images for Instant Demo
  const presetGems = [
    { name: 'Natural Ceylon Sapphire', url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mogok Pigeon Blood Ruby', url: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80' },
    { name: 'Zambian Emerald', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Yellow Sapphire', url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80' }
  ];

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Live Camera
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access unavailable or blocked in frame. Please use file upload or demo presets.');
      setIsCameraActive(false);
    }
  };

  // Capture Photo from Camera
  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        setAnalysisResult(null);
      }
      // Stop stream
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  // Execute Optical & CNN Pipeline
  const runAnalysisPipeline = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    // Simulated OpenCV sequence indicators
    const steps = [
      'Applying Bilateral Filter (Noise Removal)...',
      'Detecting Specular Reflections & Facet Junctions...',
      'Segmenting Crystal Outline & Shape Features...',
      'Calculating Gabor Texture Uniformity...',
      'Computing Optical Refractive Transparency Score...',
      'Detecting Internal Fracture & Inclusion Lines...',
      'Running CNN Deep Learning Classification...'
    ];

    for (const step of steps) {
      setActiveStep(step);
      await new Promise((r) => setTimeout(r, 220));
    }

    try {
      const res = await fetch('/api/image-analysis/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          gemNameHint: gemHint
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      setAnalysisResult(data.result);
    } catch (error: any) {
      alert('Error running AI analysis: ' + error.message);
    } finally {
      setAnalyzing(false);
      setActiveStep('');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] font-mono tracking-[0.2em] uppercase">
          <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
          <span>OpenCV & Deep CNN Optical Inspector</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
          Smart Gemstone Authentication
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Upload or capture a gemstone image. Our neural optical pipeline evaluates facet reflection, clarity inclusions, and crystal lattice naturalness.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Input & Controls */}
        <div className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-6">
          
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center space-x-2">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Image Capture & Preset Selection</span>
          </h3>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Select Demo Gemstone Preset</label>
            <div className="grid grid-cols-2 gap-2">
              {presetGems.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setGemHint(preset.name);
                    setAnalysisResult(null);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center space-x-2 ${
                    selectedImage === preset.url
                      ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#A7F3D0]'
                      : 'bg-[#08080A] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <img src={preset.url} alt={preset.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="truncate text-[11px] font-sans">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Camera / Upload Box */}
          <div className="relative border-2 border-dashed border-[#D4AF37]/30 rounded-2xl p-4 text-center bg-[#08080A] hover:border-[#D4AF37]/60 transition-all">
            
            {isCameraActive ? (
              <div className="space-y-3">
                <video ref={videoRef} autoPlay playsInline className="w-full h-48 rounded-xl object-cover bg-black" />
                <button
                  onClick={captureCameraPhoto}
                  className="w-full py-2.5 rounded-xl editorial-button-gold text-xs uppercase font-semibold"
                >
                  Capture Frame Now
                </button>
              </div>
            ) : selectedImage ? (
              <div className="relative group">
                <img src={selectedImage} alt="Selected Gemstone" className="w-full h-56 rounded-xl object-cover" />
                <div className="absolute inset-0 bg-[#050505]/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-[#0F0F12] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold hover:border-[#D4AF37]"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer py-8 space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#FFF8E7]">Drag & Drop or Click to Upload</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Supports PNG, JPG, WEBP up to 20MB</p>
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={startCamera}
              className="w-1/2 py-2.5 rounded-xl bg-[#0E0E12] border border-neutral-800 hover:border-[#D4AF37]/40 text-xs font-medium text-neutral-300 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Camera className="w-4 h-4 text-[#D4AF37]" />
              <span>Use Live Camera</span>
            </button>

            <button
              onClick={runAnalysisPipeline}
              disabled={!selectedImage || analyzing}
              className="w-1/2 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md disabled:opacity-50 flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
              <span>{analyzing ? 'Scanning...' : 'Execute AI Scan'}</span>
            </button>
          </div>

        </div>

        {/* Right Column: OpenCV & CNN Output Display */}
        <div className="lg:col-span-7 p-6 rounded-2xl editorial-card space-y-6">
          
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#D4AF37]" />
              <span>Optical Diagnostic Spectrum</span>
            </div>
            {analysisResult && (
              <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${
                analysisResult.authenticityStatus === 'Natural'
                  ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40'
                  : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40'
              }`}>
                {analysisResult.authenticityStatus} ({analysisResult.confidenceScore}%)
              </span>
            )}
          </h3>

          {/* Loading state during pipeline execution */}
          {analyzing && (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin mx-auto" />
              <p className="text-xs font-mono text-[#D4AF37] animate-pulse">{activeStep}</p>
            </div>
          )}

          {/* When result is available */}
          {!analyzing && analysisResult && (
            <div className="space-y-6">
              
              {/* Authenticity Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                analysisResult.authenticityStatus === 'Natural'
                  ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#A7F3D0]'
                  : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#FFF8E7]'
              }`}>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">Classification Outcome</p>
                  <p className="text-lg font-serif font-bold mt-0.5">
                    {analysisResult.gemstoneType} [{analysisResult.authenticityStatus}]
                  </p>
                  <p className="text-xs text-neutral-300 mt-1">
                    Treatment Status: {analysisResult.treatmentType || 'None (Natural Formation)'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-[#10B981]">
                    {analysisResult.confidenceScore}%
                  </span>
                  <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest">Neural Confidence</p>
                </div>
              </div>

              {/* 4 Optical Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Clarity Grade</p>
                  <p className="text-sm font-serif font-bold text-[#D4AF37] mt-0.5">{analysisResult.clarityGrade}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Cut Quality</p>
                  <p className="text-sm font-serif font-bold text-[#10B981] mt-0.5">{analysisResult.cutQuality}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Reflection Index</p>
                  <p className="text-sm font-serif font-bold text-[#D4AF37] mt-0.5">{analysisResult.opencvMetrics.reflectionIndex}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Shape Outline</p>
                  <p className="text-sm font-serif font-bold text-[#10B981] mt-0.5">{analysisResult.opencvMetrics.shapeDetected}</p>
                </div>
              </div>

              {/* OpenCV Pipeline Breakdown */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-3">
                <h4 className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">
                  OpenCV Feature Extraction Metrics
                </h4>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between text-neutral-400 mb-1">
                      <span>Texture Uniformity</span>
                      <span className="text-[#10B981] font-mono">{analysisResult.opencvMetrics.textureUniformity}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                      <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${analysisResult.opencvMetrics.textureUniformity}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-400 mb-1">
                      <span>Transparency Score</span>
                      <span className="text-[#D4AF37] font-mono">{analysisResult.opencvMetrics.transparencyScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                      <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${analysisResult.opencvMetrics.transparencyScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Absorption Spectrum Chart */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
                <h4 className="text-[10px] font-mono font-semibold text-[#10B981] uppercase tracking-[0.2em] flex items-center justify-between">
                  <span>Wavelength Absorption Spectrum (nm)</span>
                  <BarChart2 className="w-3.5 h-3.5 text-[#10B981]" />
                </h4>

                <div className="h-36 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analysisResult.opticalSpectrumData.wavelengthNm.map((nm, idx) => ({
                        nm: `${nm}nm`,
                        absorbance: analysisResult.opticalSpectrumData.absorbance[idx]
                      }))}
                    >
                      <XAxis dataKey="nm" stroke="#737373" fontSize={10} />
                      <YAxis stroke="#737373" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0B0E', borderColor: '#10B981', borderRadius: '8px', color: '#FFF8E7' }} />
                      <Line type="monotone" dataKey="absorbance" stroke="#10B981" strokeWidth={2} dot={{ fill: '#D4AF37' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Gemological Observations */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 text-xs space-y-1.5">
                <p className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[10px] font-mono">Gemological Scientist Observations:</p>
                <p className="text-neutral-300 leading-relaxed italic">{analysisResult.aiNotes}</p>
              </div>

            </div>
          )}

          {/* Placeholder state before upload */}
          {!analyzing && !analysisResult && (
            <div className="py-20 text-center text-neutral-500 space-y-2">
              <Cpu className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs">No image scanned yet. Select a preset or upload a photo to launch optical CNN analysis.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
