import { useEffect, useRef } from "react";

const KundliChart = ({ data }) => {
  const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const size = 420;
//     const center = size / 2;

//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;

//     ctx.beginPath();
//     ctx.moveTo(0, center);
//     ctx.lineTo(center, 0);
//     ctx.lineTo(size, center);
//     ctx.lineTo(center, size);
//     ctx.closePath();
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(size, size);
//     ctx.moveTo(size, 0);
//     ctx.lineTo(0, size);
//     ctx.stroke();

//     data.forEach(({ name, degree, position }) => {
//       const positions = [
//         [30, 30], // Top-left
//         [center, 30], // Top-center
//         [size - 70, 30], // Top-right
//         [30, center], // Left-center
//         [size - 70, center], // Right-center
//         [30, size - 30], // Bottom-left
//         [center, size - 30], // Bottom-center
//         [size - 70, size - 30], // Bottom-right
//       ];

//       const [x, y] = positions[position] || [center, center];

//       ctx.fillStyle = "black";
//       ctx.font = "14px Arial";
//       ctx.fillText(`${name}-${degree}°`, x, y);
//     });
//   }, [data]);

  return (
    <div className="container mx-auto">
      {/* <canvas ref={canvasRef} width={420} height={420} className="border" /> */}
      <div class="kundli">
        <div class="square"></div>
        <div class="diagonal"></div>
        <div class="house top-left">Sa-3.56°</div>
        <div class="house top-right">Ne-6.3°<br/>Ur-15.83°</div>
        <div class="house bottom-left">Ra-2.08°</div>
        <div class="house bottom-right" style={{color: "red"}}>Ma-9.43°</div>
        <div class="house center">2</div>
    </div>
    </div>
  );
};

export default KundliChart;
