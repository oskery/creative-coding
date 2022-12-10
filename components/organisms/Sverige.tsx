import Head from "next/head";
import { Canvas, Card, H1 } from "../";
import { useCanvas } from "../../hooks";
import { useState, useEffect } from "react";
import colors from "tailwindcss/colors";

export function Sverige() {
  const [text, setText] = useState("Heja Sverige!");
  const [snapshot, setSnapshot] = useState<ImageData>();

  useEffect(() => {
    console.log(snapshot);
  }, [snapshot]);

  function drawCircle(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    ctx.arc(50, 100, 140 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawText(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.font = "124px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.blue[500];

    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  function drawLine(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.lineWidth = 130;
    ctx.strokeStyle = colors.yellow[500];
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.stroke();
  }

  function pixelate(ctx: CanvasRenderingContext2D, frameCount: number) {
    if (!snapshot) return;

    const gap = 10;
    const w = gap * 0.8;
    const h = gap * 0.8;
    for (let y = 0; y < ctx.canvas.height; y += gap) {
      for (let x = 0; x < ctx.canvas.width; x += gap) {
        const i = (y * ctx.canvas.width + x) * 4;
        const alpha = snapshot.data[i + 3];
        if (alpha > 0) {
          const [r, g, b] = [
            snapshot.data[i],
            snapshot.data[i + 1],
            snapshot.data[i + 2],
          ];
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, w, h);
        }
      }
    }
  }

  const canvasRef = useCanvas(
    [drawCircle, drawLine, drawText, pixelate],
    (ctx) =>
      setSnapshot(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))
  );

  return <Canvas ref={canvasRef} className="bg-blue-900 ring" />;
}
