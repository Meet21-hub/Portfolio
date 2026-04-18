import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useVelocity } from "framer-motion";

function DynamicLights() {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  const light1 = useRef<THREE.SpotLight>(null);
  const light2 = useRef<THREE.SpotLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  // Lighting Colors mapped mapping
  const colors = {
    top1: new THREE.Color("#8b5cf6"), // primary purple
    bottom1: new THREE.Color("#f59e0b"), // accent gold
    top2: new THREE.Color("#06b6d4"), // cyan
    bottom2: new THREE.Color("#ef4444"), // red
  };

  useFrame(() => {
    const scrollY = scrollYProgress.get();
    const vel = Math.abs(scrollVelocity.get());
    
    // Intensity bursts when scrolling fast
    const intensityBurst = Math.min(vel * 5, 2.0);

    if (light1.current) {
        light1.current.color.lerpColors(colors.top1, colors.bottom1, scrollY);
        light1.current.intensity = THREE.MathUtils.lerp(light1.current.intensity, 1.5 + intensityBurst, 0.1);
    }
    if (light2.current) {
        light2.current.color.lerpColors(colors.top2, colors.bottom2, scrollY);
        light2.current.intensity = THREE.MathUtils.lerp(light2.current.intensity, 1.0 + intensityBurst, 0.1);
    }
    if (ambient.current) {
        ambient.current.intensity = THREE.MathUtils.lerp(ambient.current.intensity, 0.2 + intensityBurst * 0.2, 0.1);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.2} />
      <spotLight ref={light1} position={[10, 10, 10]} penumbra={1} />
      <spotLight ref={light2} position={[-10, -10, -10]} penumbra={1} />
    </>
  );
}

function InteractiveParticles() {
  const count = 700;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  // Track global scroll
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  const mouse = useRef({ x: 0, y: 0 });
  const warpFactor = useRef(0);
  const currentSpeed = useRef(1);
  const currentStretch = useRef(1);
  const customTime = useRef(0);
  const baseCamZ = useRef(5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Subtle material color variation to break up flatness (5-10% shifts)
  useEffect(() => {
    if (!mesh.current) return;
    const baseColor = new THREE.Color("#8b5cf6");
    
    for (let i = 0; i < count; i++) {
        const color = baseColor.clone();
        const shift = Math.random();
        
        // Slightly shift color hue or brightness randomly per particle
        if (shift > 0.6) color.lerp(new THREE.Color("#06b6d4"), 0.1); // 10% cyan mix
        if (shift < 0.3) color.lerp(new THREE.Color("#ffffff"), 0.1); // 10% white brightness
        
        color.multiplyScalar(0.9 + Math.random() * 0.2); // 90% to 110% brightness variation
        
        mesh.current.setColorAt(i, color);
    }
    mesh.current.instanceColor!.needsUpdate = true;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 10 - 5;
        const speed = 0.01 + Math.random() * 0.02;
        temp.push({ x, y, z, originX: x, originY: y, originZ: z, speed });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    const scrollY = scrollYProgress.get(); 
    const rawVel = Math.abs(scrollVelocity.get()); 
    
    // Warp is present but not the dominant event during content reading
    const targetWarp = Math.min(rawVel * 2.5, 0.7); 
    
    // Apply Galaxy Vortex Twist instead of linear stretch!
    // We lerp UP quickly, and decay DOWN slowly
    if (targetWarp > warpFactor.current) {
        warpFactor.current = THREE.MathUtils.lerp(warpFactor.current, targetWarp, 0.2); 
    } else {
        warpFactor.current = THREE.MathUtils.lerp(warpFactor.current, 0, 0.02); 
    }

    const targetSpeed = 1 + warpFactor.current * 10; 
    
    baseCamZ.current = THREE.MathUtils.lerp(5, 2.5, scrollY);
    // Instead of diving, let's pull the camera back slightly during a vortex to see the whole galaxy
    const targetCamZ = baseCamZ.current + warpFactor.current * 4; 
    
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.1);
    
    customTime.current += delta * currentSpeed.current;
    const time = customTime.current;
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
    
    const mx = (mouse.current.x * viewport.width) / 2;
    const my = (mouse.current.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      const waveX = Math.sin(time * particle.speed + particle.originY) * 0.5;
      const waveY = Math.cos(time * particle.speed + particle.originX) * 0.5;

      let targetX = particle.originX + waveX;
      let targetY = particle.originY + waveY;

      // --- NEW ANIMATION: Galaxy Vortex Swirl ---
      // We twist the particle positions around the center based on warpFactor
      const distFromCenter = Math.sqrt(particle.originX * particle.originX + particle.originY * particle.originY);
      // Math: closer particles spin tighter, pushed outwards aggressively
      const swirlAngle = warpFactor.current * 12 * (1 / (distFromCenter * 0.2 + 1));
      
      const twistedX = targetX * Math.cos(swirlAngle) - targetY * Math.sin(swirlAngle);
      const twistedY = targetX * Math.sin(swirlAngle) + targetY * Math.cos(swirlAngle);
      
      // Expand radially while spinning
      targetX = twistedX * (1 + warpFactor.current * 0.5);
      targetY = twistedY * (1 + warpFactor.current * 0.5);
      // ------------------------------------------

      const dx = targetX - mx;
      const dy = targetY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let currentScale = 1 + warpFactor.current * 1.5; // Overall plumpness grows during vortex

      if (dist < 5) { 
         const pull = (5 - dist) / 5;
         targetX -= dx * pull * 0.4; 
         targetY -= dy * pull * 0.4;
         currentScale += pull * 3; 
      }

      particle.x += (targetX - particle.x) * 0.05;
      particle.y += (targetY - particle.y) * 0.05;
      
      // Also inject vortex depth into Z so they form a 3D tornado
      const targetZ = particle.originZ + Math.sin(swirlAngle * 2) * warpFactor.current * 8;
      particle.z += (targetZ - particle.z) * 0.05;

      dummy.position.set(particle.x, particle.y, particle.z);
      
      // Violent individual rotation during swirl
      dummy.rotation.x = time * particle.speed + warpFactor.current * 10;
      dummy.rotation.y = time * 0.1 + warpFactor.current * 10;
      
      // Standard uniform scale (removed the Z laser stretch)
      dummy.scale.set(currentScale, currentScale, currentScale);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Subtle mouse tilt — reduced range so it doesn't compete with foreground content
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (mouse.current.x * Math.PI) / 22, 0.03);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -(mouse.current.y * Math.PI) / 30, 0.03);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.06, 0]} />
      {/* Base white color because setColorAt multiples against it natively */}
      <meshStandardMaterial 
         color="#ffffff" 
         emissive="#06b6d4" 
         emissiveIntensity={0.2} 
         roughness={0.2}
         metalness={0.8}
         transparent
         opacity={0.8}
      />
    </instancedMesh>
  );
}

export default function InteractiveWebGL() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#05050f"]} />
        <DynamicLights />
        <InteractiveParticles />
      </Canvas>
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050f]/0 via-[#05050f]/40 to-[#05050f] pointer-events-none" />
    </div>
  );
}
