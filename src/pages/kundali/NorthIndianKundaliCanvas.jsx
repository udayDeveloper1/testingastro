import React, { useRef, useEffect } from 'react';

const KundaliCanvas = () => {
  const canvasRef = useRef(null);

  // Dummy data for planets per house
  const planetData = {
    1: [{ name: "Asc", degree: "9.64°" }],
    2: [],
    3: [],
    4: [],
    5: [{ name: "Ke", degree: "24.72°" }],
    6: [],
    7: [],
    8: [{ name: "Ma", degree: "16.22°" }],
    9: [],
    10: [{ name: "Mo", degree: "8.35°" }],
    11: [
      { name: "Me", degree: "1.98°" },
      { name: "Ve", degree: "12.51°" },
      { name: "Ra", degree: "24.72°" },
    ],
    12: [
      { name: "Su", degree: "17.0°" },
      { name: "Sa", degree: "21.93°" },
      { name: "Ne", degree: "18.31°" },
      { name: "Ur", degree: "12.06°" },
    ],
  };

  // House center coordinates for 12 houses in North Indian format
  const houseCenters = {
    1: [200, 200],
    2: [270, 270],
    3: [200, 340],
    4: [130, 270],
    5: [60, 340],
    6: [130, 130],
    7: [200, 60],
    8: [270, 130],
    9: [340, 60],
    10: [270, 200],
    11: [340, 340],
    12: [60, 60],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outer square
    ctx.beginPath();
    ctx.rect(50, 50, 300, 300);
    ctx.stroke();

    // Draw cross diagonals
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(200, 50);
    ctx.lineTo(350, 200);
    ctx.lineTo(200, 350);
    ctx.lineTo(50, 200);
    ctx.stroke();

    // Draw inner diagonals
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(350, 200);
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 350);
    ctx.stroke();

    // Draw planetary info in each house
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    for (let house = 1; house <= 12; house++) {
      const [x, y] = houseCenters[house];
      const planets = planetData[house] || [];
      planets.forEach((planet, index) => {
        ctx.fillText(`${planet.name}-${planet.degree}`, x, y + index * 14);
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid #ccc' }} />;
};

export default KundaliCanvas;
