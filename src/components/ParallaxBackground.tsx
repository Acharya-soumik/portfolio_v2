import React, { useEffect, useRef, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

const COLORS = ["#FF00FF", "#00FFFF", "#FF3366"];

const ParallaxBackground: React.FC = () => {
  const [orbs, setOrbs] = useState<Orb[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 80,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
    }))
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setOrbs((currentOrbs) =>
        currentOrbs.map((orb) => {
          const angleChange = orb.speed * deltaTime * 0.001;
          const newAngle = orb.angle + angleChange;

          return {
            ...orb,
            angle: newAngle,
            x: Math.max(0, Math.min(100, orb.x + Math.cos(newAngle) * 2)),
            y: Math.max(0, Math.min(100, orb.y + Math.sin(newAngle) * 2)),
          };
        })
      );

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)",
          filter: "blur(10px)",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
        }}
      >
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              backgroundColor: orb.color,
              opacity: 0.7,
              boxShadow: `0 0 ${orb.size / 2}px ${orb.color}`,
              transform: `translate(${mousePos.x * (orb.size / 2)}px, ${
                mousePos.y * (orb.size / 2)
              }px)`,
              transition: "transform 200ms ease-out",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxBackground;
