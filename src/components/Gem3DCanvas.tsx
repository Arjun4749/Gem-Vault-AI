import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Layers, Sparkles, Zap, ShieldAlert, Compass } from 'lucide-react';

export interface Navratna3DGem {
  id: string;
  name: string;
  hindiName: string;
  planet: string;
  colorHex: string;
  ior: number;
  mohs: number;
  geometryType: 'octahedron' | 'sphere' | 'cylinder' | 'dodecahedron' | 'icosahedron' | 'torusKnot';
  lightColor: string;
  description: string;
}

export const NAVRATNA_3D_STONES: Navratna3DGem[] = [
  {
    id: 'ruby',
    name: 'Ruby',
    hindiName: 'माणिक्य (Manik)',
    planet: 'Sun (Surya)',
    colorHex: '#DC2626',
    ior: 1.766,
    mohs: 9.0,
    geometryType: 'octahedron',
    lightColor: '#EF4444',
    description: 'Deep pigeon blood red corundum with high refractive brilliance.'
  },
  {
    id: 'pearl',
    name: 'Pearl',
    hindiName: 'मोती (Moti)',
    planet: 'Moon (Chandra)',
    colorHex: '#F8FAFC',
    ior: 1.530,
    mohs: 3.5,
    geometryType: 'sphere',
    lightColor: '#E2E8F0',
    description: 'Soft lustrous nacreous sheen with smooth spherical light reflection.'
  },
  {
    id: 'red_coral',
    name: 'Red Coral',
    hindiName: 'मूंगा (Moonga)',
    planet: 'Mars (Mangal)',
    colorHex: '#EA580C',
    ior: 1.486,
    mohs: 3.5,
    geometryType: 'cylinder',
    lightColor: '#F97316',
    description: 'Vibrant vermilion organic calcium carbonate structure with warm luster.'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    hindiName: 'पन्ना (Panna)',
    planet: 'Mercury (Budh)',
    colorHex: '#059669',
    ior: 1.580,
    mohs: 7.5,
    geometryType: 'dodecahedron',
    lightColor: '#10B981',
    description: 'Vivid hexagonal beryl crystal lattice with internal garden refraction.'
  },
  {
    id: 'yellow_sapphire',
    name: 'Yellow Sapphire',
    hindiName: 'पुखराज (Pukhraj)',
    planet: 'Jupiter (Guru)',
    colorHex: '#EAB308',
    ior: 1.766,
    mohs: 9.0,
    geometryType: 'octahedron',
    lightColor: '#FBBF24',
    description: 'Canary golden corundum with divine refractive brilliance.'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    hindiName: 'हीरा (Heera)',
    planet: 'Venus (Shukra)',
    colorHex: '#38BDF8',
    ior: 2.417,
    mohs: 10.0,
    geometryType: 'octahedron',
    lightColor: '#E0F2FE',
    description: 'Maximum refractive index (2.417) producing intense rainbow fire.'
  },
  {
    id: 'blue_sapphire',
    name: 'Blue Sapphire',
    hindiName: 'नीलम (Neelam)',
    planet: 'Saturn (Shani)',
    colorHex: '#2563EB',
    ior: 1.766,
    mohs: 9.0,
    geometryType: 'icosahedron',
    lightColor: '#3B82F6',
    description: 'Royal cornflower blue corundum with extraordinary dispersion.'
  },
  {
    id: 'hessonite',
    name: 'Hessonite',
    hindiName: 'गोमेद (Gomed)',
    planet: 'Rahu (North Node)',
    colorHex: '#B45309',
    ior: 1.740,
    mohs: 7.25,
    geometryType: 'dodecahedron',
    lightColor: '#D97706',
    description: 'Honey amber brown grossular garnet with swirly oil-glass appearance.'
  },
  {
    id: 'cats_eye',
    name: 'Cat’s Eye',
    hindiName: 'लहसुनिया (Lehsuniya)',
    planet: 'Ketu (South Node)',
    colorHex: '#84CC16',
    ior: 1.750,
    mohs: 8.5,
    geometryType: 'sphere',
    lightColor: '#A3E635',
    description: 'Chrysoberyl with sharp chatoyant needle-inclusion ray line effect.'
  }
];

interface Gem3DCanvasProps {
  initialGemId?: string;
  height?: number;
  className?: string;
  showControls?: boolean;
}

export const Gem3DCanvas: React.FC<Gem3DCanvasProps> = ({
  initialGemId = 'emerald',
  height = 420,
  className = '',
  showControls = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Controls state
  const [selectedGemId, setSelectedGemId] = useState<string>(initialGemId);
  const [viewMode, setViewMode] = useState<'single' | 'ring'>('ring'); // Default 'ring' so user sees all 9 immediately!
  const [showWireframe, setShowWireframe] = useState<boolean>(true);
  const [customIor, setCustomIor] = useState<number>(0); // 0 means use stone default
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);

  const selectedGem = NAVRATNA_3D_STONES.find(g => g.id === selectedGemId) || NAVRATNA_3D_STONES[3];
  const activeIor = customIor > 0 ? customIor : selectedGem.ior;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const currentHeight = height;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / currentHeight, 0.1, 1000);
    camera.position.set(0, 0, viewMode === 'ring' ? 7.2 : 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, currentHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // Create Helper Geometry Generator
    const createGemGeometry = (type: string, radius = 1.2) => {
      switch (type) {
        case 'sphere':
          return new THREE.SphereGeometry(radius * 0.9, 32, 32);
        case 'cylinder':
          return new THREE.CylinderGeometry(radius * 0.85, radius * 0.9, radius * 0.8, 24);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(radius * 0.95, 1);
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(radius, 2);
        case 'octahedron':
        default:
          return new THREE.OctahedronGeometry(radius, 2);
      }
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xfff8e7, 3.5, 100);
    mainLight.position.set(6, 6, 6);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0xd4af37, 2.5, 100);
    backLight.position.set(-6, -6, -6);
    scene.add(backLight);

    // Containers
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    let singleMeshGroup: THREE.Group | null = null;
    const ringMeshes: THREE.Mesh[] = [];

    if (viewMode === 'single') {
      // --- SINGLE STONE FOCUS MODE ---
      singleMeshGroup = new THREE.Group();

      const geom = createGemGeometry(selectedGem.geometryType, 1.35);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(selectedGem.colorHex),
        metalness: 0.1,
        roughness: selectedGem.id === 'pearl' ? 0.25 : 0.04,
        transmission: selectedGem.id === 'pearl' ? 0.3 : 0.9,
        ior: activeIor,
        thickness: 1.2,
        reflectivity: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05
      });

      const gemMesh = new THREE.Mesh(geom, mat);
      singleMeshGroup.add(gemMesh);

      // Wireframe overlay
      if (showWireframe) {
        const wireGeo = new THREE.WireframeGeometry(geom);
        const wireMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(selectedGem.lightColor),
          transparent: true,
          opacity: 0.4
        });
        const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
        gemMesh.add(wireMesh);
      }

      // Cat's Eye Chatoyant Ray Overlay
      if (selectedGem.id === 'cats_eye') {
        const rayGeo = new THREE.RingGeometry(0.05, 0.12, 32);
        const rayMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const rayMesh = new THREE.Mesh(rayGeo, rayMat);
        rayMesh.rotation.x = Math.PI / 2;
        gemMesh.add(rayMesh);
      }

      mainGroup.add(singleMeshGroup);

    } else {
      // --- ALL 9 NAVRATNA STONES RING MANDALA MODE ---
      const ringRadius = 3.2;
      const totalStones = NAVRATNA_3D_STONES.length;

      // Central Golden Sun / Solar Core Mesh
      const sunGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const sunMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        emissive: new THREE.Color('#F59E0B'),
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const sunMesh = new THREE.Mesh(sunGeo, sunMat);
      mainGroup.add(sunMesh);

      // Sun Wireframe
      const sunWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(sunGeo),
        new THREE.LineBasicMaterial({ color: 0xfff8e7, transparent: true, opacity: 0.3 })
      );
      sunMesh.add(sunWire);

      // Orbital Gold Ring Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, ringRadius, ringRadius, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMat = new THREE.LineBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.3 });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      mainGroup.add(orbitLine);

      // Render all 9 Stones positioned around orbit ring
      NAVRATNA_3D_STONES.forEach((gem, idx) => {
        const angle = (idx / totalStones) * Math.PI * 2;
        const x = Math.cos(angle) * ringRadius;
        const z = Math.sin(angle) * ringRadius;

        const gemGeom = createGemGeometry(gem.geometryType, 0.62);
        const isSelected = gem.id === selectedGemId;

        const gemMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(gem.colorHex),
          metalness: 0.1,
          roughness: gem.id === 'pearl' ? 0.2 : 0.05,
          transmission: gem.id === 'pearl' ? 0.3 : 0.88,
          ior: gem.ior,
          thickness: 0.8,
          clearcoat: 1.0
        });

        const stoneMesh = new THREE.Mesh(gemGeom, gemMat);
        stoneMesh.position.set(x, 0, z);
        stoneMesh.userData = { gemId: gem.id };

        // Wireframe Overlay
        if (showWireframe || isSelected) {
          const wireGeo = new THREE.WireframeGeometry(gemGeom);
          const wireMat = new THREE.LineBasicMaterial({
            color: isSelected ? 0xffd700 : new THREE.Color(gem.lightColor),
            transparent: true,
            opacity: isSelected ? 0.9 : 0.35
          });
          const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
          stoneMesh.add(wireMesh);
        }

        // Highlight halo for selected stone
        if (isSelected) {
          stoneMesh.scale.set(1.3, 1.3, 1.3);
        }

        ringMeshes.push(stoneMesh);
        mainGroup.add(stoneMesh);
      });

      // Tilt orbit slightly for elegant 3D perspective
      mainGroup.rotation.x = 0.35;
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetRotationY = (x / rect.width) * Math.PI;
      targetRotationX = (y / rect.height) * Math.PI;
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const speedFactor = 0.006 * rotationSpeed;

      if (viewMode === 'ring') {
        // Rotate entire Navratna Ring
        mainGroup.rotation.y += speedFactor;
        // Spin each individual gemstone on its axis
        ringMeshes.forEach(m => {
          m.rotation.y += 0.02;
          m.rotation.x += 0.01;
        });
      } else if (singleMeshGroup) {
        // Single Gemstone smooth rotation
        singleMeshGroup.rotation.y += speedFactor * 1.5;
        singleMeshGroup.rotation.x += speedFactor * 0.5;

        // Mouse response
        singleMeshGroup.rotation.y += (targetRotationY - singleMeshGroup.rotation.y) * 0.04;
        singleMeshGroup.rotation.x += (targetRotationX - singleMeshGroup.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      camera.aspect = newWidth / currentHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, currentHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [selectedGemId, viewMode, showWireframe, activeIor, rotationSpeed, height]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#050508] border border-[#D4AF37]/30 ${className}`}>
      
      {/* 3D WebGL Canvas Mounting Point */}
      <div
        ref={mountRef}
        className="w-full cursor-grab active:cursor-grabbing"
        style={{ height: `${height}px` }}
      />

      {/* Top Controls Overlay Bar */}
      {showControls && (
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#09090D]/90 border border-neutral-800 backdrop-blur-md z-10 text-xs">
          
          {/* Mode Switcher */}
          <div className="flex items-center space-x-1 p-1 rounded-lg bg-[#000000]/60 border border-neutral-800">
            <button
              onClick={() => setViewMode('ring')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center space-x-1.5 ${
                viewMode === 'ring'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>All 9 Navratna Ring (3D Orbit)</span>
            </button>

            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center space-x-1.5 ${
                viewMode === 'single'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Single Gem</span>
            </button>
          </div>

          {/* Quick Optics Toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowWireframe(!showWireframe)}
              className={`px-2 py-1 rounded-md text-[10px] font-mono border transition-all flex items-center space-x-1 ${
                showWireframe
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Facets: {showWireframe ? 'ON' : 'OFF'}</span>
            </button>

            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#D4AF37] bg-[#000]/60 px-2 py-1 rounded-md border border-neutral-800">
              <Zap className="w-3 h-3 text-[#D4AF37]" />
              <span>IOR: {activeIor.toFixed(3)}</span>
            </div>
          </div>

        </div>
      )}

      {/* Bottom 9 Gemstones Selector Strip */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-[#09090D]/90 border border-neutral-800 backdrop-blur-md z-10">
          <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-1.5 flex justify-between items-center px-1">
            <span>Select Stone to Inspect Optical Refraction ({NAVRATNA_3D_STONES.length} Navratna Gems):</span>
            <span className="text-[#D4AF37] font-semibold">{selectedGem.name} ({selectedGem.planet})</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {NAVRATNA_3D_STONES.map((gem) => {
              const isSelected = gem.id === selectedGemId;
              return (
                <button
                  key={gem.id}
                  onClick={() => {
                    setSelectedGemId(gem.id);
                    setCustomIor(0); // reset custom ior
                  }}
                  className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-left text-[11px] border transition-all flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF8E7] shadow-md shadow-[#D4AF37]/10'
                      : 'bg-[#000000]/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20"
                    style={{ backgroundColor: gem.colorHex }}
                  />
                  <div className="leading-none">
                    <p className="font-semibold">{gem.name}</p>
                    <p className="text-[9px] text-neutral-500 font-mono">{gem.planet.split(' ')[0]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Stone Optics Telemetry Overlay Badge (Top Right) */}
      <div className="absolute top-14 right-3 p-3 rounded-xl bg-[#08080C]/85 border border-[#D4AF37]/30 text-xs text-neutral-300 space-y-1 pointer-events-none hidden sm:block max-w-[180px]">
        <p className="font-serif font-bold text-[#FFF8E7] text-sm flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{selectedGem.name}</span>
        </p>
        <p className="text-[10px] text-[#D4AF37] font-mono">{selectedGem.hindiName}</p>
        <div className="pt-1 text-[10px] font-mono space-y-0.5 border-t border-neutral-800 text-neutral-400">
          <p>Refractive Index: <span className="text-white font-bold">{selectedGem.ior}</span></p>
          <p>Mohs Hardness: <span className="text-[#10B981] font-bold">{selectedGem.mohs}</span></p>
          <p>Ruling Planet: <span className="text-[#D4AF37] font-bold">{selectedGem.planet}</span></p>
        </div>
      </div>

    </div>
  );
};
