"use client";
import css from "@/styles/alexHome.module.css";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import Link from "next/link";

// Dynamically import the Canvas component
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), {
  ssr: false
});

import OrbitControls from "@/components/OrbitControls";
import Sun from "@/components/Sun";
import Earth from "@/components/Earth";
import Mercury from "@/components/Mercury";
import Venus from "@/components/Venus";
import Mars from "@/components/Mars";
import Jupiter from "@/components/Jupiter";
import Saturn from "@/components/Saturn";
import Uranus from "@/components/Uranus";
import Neptune from "@/components/Neptune";
import Scene from "@/components/Scene";
import LightBulb from "@/components/LightBulb";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the flag to true if the window object is defined
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const earthTexture = useLoader(TextureLoader, "/2k_earth_daymap.jpg");
  const mercuryTexture = useLoader(TextureLoader, "/2k_mercury.jpg");
  const sunTexture = useLoader(TextureLoader, "/2k_sun.jpg");
  const venusTexture = useLoader(TextureLoader, "/2k_venus_atmosphere.jpg");
  const marsTexture = useLoader(TextureLoader, "/2k_mars.jpg");
  const jupiterTexture = useLoader(TextureLoader, "/2k_jupiter.jpg");
  const saturnTexture = useLoader(TextureLoader, "/2k_saturn.jpg");
  const uranusTexture = useLoader(TextureLoader, "/2k_uranus.jpg");
  const neptuneTexture = useLoader(TextureLoader, "/2k_neptune.jpg");

  return (
    <div className={css.scene}>
      <Link href={"/"} className="fixed z-10 bg-opacity-0 m-5">
        Home
      </Link>
      <Canvas
        shadows
        className={css.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <Scene />
        <Suspense fallback={<div>Loading...</div>}>
          <Mercury map={mercuryTexture} />
          <Venus map={venusTexture} />
          <Earth map={earthTexture} />
          <Mars map={marsTexture} />
          <Jupiter map={jupiterTexture} />
          <Saturn map={saturnTexture} />
          <Uranus map={uranusTexture} />
          <Neptune map={neptuneTexture} />
          <Sun map={sunTexture} />
        </Suspense>
        <ambientLight color={"white"} intensity={0.5} />
      </Canvas>
    </div>
  );
}
