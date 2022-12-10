import Head from "next/head";
import { Canvas, Card, H1 } from "../";
import { useCanvas } from "../../hooks";
import { useState, useEffect } from "react";
import colors from "tailwindcss/colors";

import { clsx } from "clsx";

export function Sverige({ className }: { className?: string }) {
  const [text, setText] = useState("Sveden!");
  const [snapshot, setSnapshot] = useState<Uint8ClampedArray>();

  useEffect(() => {
    console.log(snapshot);
  }, [snapshot]);

  // function drawCircle(ctx: CanvasRenderingContext2D, frameCount: number) {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //   ctx.beginPath();
  //   ctx.arc(50, 100, 140 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // }

  function drawText(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.font = "110px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.blue[700];

    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  function drawLine(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.lineWidth = 130;
    ctx.strokeStyle = colors.yellow[500];

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2.7, 0);
    ctx.lineTo(ctx.canvas.width / 2.7, ctx.canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.stroke();
  }

  function pixelate(ctx: CanvasRenderingContext2D, frameCount: number) {
    if (!snapshot) return;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const gap = 15;
    const w = gap * 0.9;
    const h = gap * 0.8;
    for (let y = 0; y < ctx.canvas.height; y += gap) {
      for (let x = 0; x < ctx.canvas.width; x += gap) {
        const i = (y * ctx.canvas.width + x) * 4;
        const alpha = snapshot[i + 3];
        if (alpha > 0) {
          const [r, g, b] = [snapshot[i], snapshot[i + 1], snapshot[i + 2]];

          // IF YELLOW
          if (rgbToHex([r, g, b]) === colors.yellow[500])
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

          ctx.fillRect(x, y, w, h);
          console.log(rgbToHex([r, g, b]) === colors.yellow[500]);
        }
      }
    }
  }

  // Hus blått, elpriser
  // Snö
  // Löner
  // Näringsvärde
  // Mäklarstatistik
  // Inflation
  // Bränslepriser
  // Solen
  // Månen
  //

  const canvasRef = useCanvas(
    [drawLine, drawText, pixelate],
    (ctx) =>
      setSnapshot(
        ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data
      ),
    true
  );

  return (
    <Canvas ref={canvasRef} className={clsx(className, "bg-blue-900 ring")} />
  );
}
function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgb(${parseInt(result?.[1] || "", 16)}, ${parseInt(
    result?.[2] || "",
    16
  )}, ${parseInt(result?.[3] || "", 16)})`;
}

function rgbToHex([r, g, b]: number[]) {
  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
