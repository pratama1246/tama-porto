/* eslint-disable no-unused-vars, react-hooks/immutability */
import * as THREE from 'three';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from './card.glb';

extend({ MeshLineGeometry, MeshLineMaterial });

const cardAssetUrl = cardGLB || '/assets/lanyard/card.glb';

try {
  useGLTF.preload(cardAssetUrl);
} catch {
  // Safe ignore if preload fails
}

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

// Generate custom Kepanitiaan (Event Committee) Lanyard Strap Texture
function createLanyardBandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Lanyard band background - Deep Navy Ribbon
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border stitch lines
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(0, 0, canvas.width, 6);
  ctx.fillRect(0, canvas.height - 6, canvas.width, 6);

  // Repeating Committee Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const text = '★ TAMA v20.0  •  PNC INFORMATICS  •  PANITIA / CREW ★';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(-3, 1);
  return texture;
}

// Generate Full Custom Committee ID Card Texture (No React logo, 100% Kepanitiaan)
function createCommitteeCardAtlas(frontImageElement, _backImageElement) {
  const W = 2048;
  const H = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Fill entire base card atlas (edges & rim) with clean dark matte tone
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, W, H);

  // ----------------------------------------------------
  // FRONT FACE (Left Half: 0 to W*0.5, 0 to H*0.755)
  // ----------------------------------------------------
  const fw = W * FRONT_UV_RECT.w;
  const fh = H * FRONT_UV_RECT.h;

  // Card Front Body Background - Clean Crisp Cardstock
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, fw, fh);

  // Header Banner - Deep Indigo Gradient
  const grad = ctx.createLinearGradient(0, 0, fw, 0);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, fw, 340);

  // Header Logo / Institute Text
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('★ POLITEKNIK NEGERI CILACAP ★', fw / 2, 80);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Space Grotesk", sans-serif';
  ctx.fillText('TAMA v20.0', fw / 2, 175);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 30px "Space Grotesk", sans-serif';
  ctx.fillText('OFFICIAL COMMITTEE PASS', fw / 2, 245);

  // Yellow/Gold Badge Pill: "PANITIA INFORMATIKA"
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.roundRect(fw / 2 - 280, 280, 560, 68, 34);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText('● PANITIA / LEAD DEV ●', fw / 2, 327);

  // Middle Photo Area
  const photoX = 140;
  const photoY = 380;
  const photoW = fw - 280;
  const photoH = 750;

  // Photo Frame Border & Background
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(photoX, photoY, photoW, photoH);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // Draw Tama's transparent photo inside photo box
  if (frontImageElement && frontImageElement.width > 0) {
    const img = frontImageElement;
    const scale = Math.min(photoW / img.width, photoH / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = photoX + (photoW - dw) / 2;
    const dy = photoY + (photoH - dh);

    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    // Warm gradient behind Tama photo inside photo box
    const bgGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
    bgGrad.addColorStop(0, '#fef08a');
    bgGrad.addColorStop(1, '#fde047');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(photoX, photoY, photoW, photoH);

    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  // Name & Details Section below photo
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 64px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PRATAMA PUTRA PURWANTO', fw / 2, 1200);

  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText('D3 INFORMATICS ENGINEERING', fw / 2, 1260);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 32px "Space Grotesk", sans-serif';
  ctx.fillText('DIVISI IT, UI/UX & FRONTEND', fw / 2, 1310);

  // Bottom Access Bar & Barcode
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(photoX, 1360, photoW, 140);

  // Draw simulated Barcode lines
  ctx.fillStyle = '#ffffff';
  const barX = photoX + 40;
  const barY = 1380;
  const barH = 60;
  const bars = [4, 2, 8, 3, 6, 2, 10, 4, 3, 8, 2, 5, 12, 3, 6, 4, 9, 2, 7, 3, 11, 4, 6, 3, 8, 4, 10, 3, 5, 8];
  let curX = barX;
  for (let i = 0; i < bars.length; i++) {
    ctx.fillRect(curX, barY, bars[i], barH);
    curX += bars[i] + (i % 2 === 0 ? 8 : 14);
    if (curX > photoX + photoW - 220) break;
  }

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px "Space Grotesk", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('ALL ACCESS', photoX + photoW - 30, 1410);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('VIP #20-PNC', photoX + photoW - 30, 1445);

  // ----------------------------------------------------
  // BACK FACE (Right Half: W*0.5 to W, 0 to H*0.757)
  // ----------------------------------------------------
  const bx = W * BACK_UV_RECT.x;
  const bw = W * BACK_UV_RECT.w;
  const bh = H * BACK_UV_RECT.h;

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(bx, 0, bw, bh);

  // Back Header
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 54px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TAMA v20.0 PASS', bx + bw / 2, 130);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 30px "Space Grotesk", sans-serif';
  ctx.fillText('GENERAL TERMS & INFO', bx + bw / 2, 190);

  // Info Cards on Back
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(bx + 120, 240, bw - 240, 500);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('● Chapter 20 Access Granted', bx + 160, 310);
  ctx.fillText('● Politeknik Negeri Cilacap', bx + 160, 380);
  ctx.fillText('● Role: Lead Frontend & UI/UX', bx + 160, 450);
  ctx.fillText('● Status: Stable-ish & Verified', bx + 160, 520);
  ctx.fillText('● Valid Thru: August 2027 (v21.0)', bx + 160, 590);

  // Signature Block
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.fillText('SIGNATURE:', bx + 160, 840);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(bx + 350, 850);
  ctx.lineTo(bx + bw - 160, 850);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'italic bold 42px "Architects Daughter", cursive';
  ctx.fillText('Pratama Putra P.', bx + 380, 835);

  // Bottom Notice
  ctx.fillStyle = '#94a3b8';
  ctx.font = '24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PROPERTY OF TAMA GALLERY STUDIO • ID: 2006-2026', bx + bw / 2, 1420);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

export default function Lanyard({
  position = [0, 0, 16], // Closer camera position for a much bigger, impactful badge
  gravity = [0, -40, 0],
  fov = 22,
  transparent = true,
  frontImage = '/assets/photos/tama-badge.webp',
  backImage = null,
  imageFit = 'contain',
  lanyardWidth = 1.35
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-[580px] sm:h-[680px] md:h-[760px] flex justify-center items-center transform scale-100 origin-center select-none">
      <Canvas
        camera={{ position: isMobile ? [0, 0, 19] : position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  lanyardWidth = 1.35
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardAssetUrl);

  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Generate Custom Kepanitiaan Lanyard Band Texture
  const bandTexture = useMemo(() => createLanyardBandTexture(), []);

  // Generate Custom Kepanitiaan ID Card Atlas (Zero React Logo!)
  const cardMap = useMemo(() => {
    return createCommitteeCardAtlas(frontTex?.image, backTex?.image);
  }, [frontTex, backTex]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.85} // Scaled up for large, prominent, readable committee ID badge
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.85}
                  metalness={0.7}
                />
              </mesh>
            )}
            {nodes?.clip?.geometry && (
              <mesh geometry={nodes.clip.geometry} material={materials?.metal} material-roughness={0.3} />
            )}
            {nodes?.clamp?.geometry && (
              <mesh geometry={nodes.clamp.geometry} material={materials?.metal} />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
