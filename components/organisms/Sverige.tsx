import Head from "next/head";
import { Canvas, Card, H1 } from "../";
import { useCanvas } from "../../hooks";
import { useState, useEffect } from "react";
import colors from "tailwindcss/colors";

import { clsx } from "clsx";

export function Sverige({ className }: { className?: string }) {
  let snapshot = null;
  // const [[coords, rgbs], takeSnapshot] = useState<Uint8ClampedArray[]>([]); // One array for colors, one for coordinates

  useEffect(() => {
    console.log("rerender");
  }, [snapshot]);

  // function drawCircle(ctx: CanvasRenderingContext2D, frameCount: number) {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //   ctx.beginPath();
  //   ctx.arc(50, 100, 140 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // }

  function drawText(ctx: CanvasRenderingContext2D, frameCount: number) {
    if (frameCount > 1) return;
    ctx.font = "110px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.blue[700];
    console.log("hej");
    ctx.fillText("Sverige", ctx.canvas.width / 2, ctx.canvas.height / 2);
    const snap = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    ).data;
    snapshot = [snap, snap];
  }

  function drawLine(ctx: CanvasRenderingContext2D, frameCount: number) {
    if (frameCount > 1) return;
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
    if (!snapshot?.length) return;
    const [coords, rgbs] = snapshot;
    // We only want to have a snapshot of the canvas once, so we clear it after
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const ease = Math.random() * 0.1 + 0.005;

    const gap = 12;
    const w = gap;
    const h = gap;
    for (let y = 0; y < ctx.canvas.height; y += gap) {
      for (let x = 0; x < ctx.canvas.width; x += gap) {
        const i = (y * ctx.canvas.width + x) * 4;
        const alpha = rgbs[i + 3];
        if (alpha > 0) {
          if (frameCount === 1) {
            ctx.fillStyle = "#FFF";
            ctx.fillRect(Math.random() * x, Math.random() * y, w, h);
          } else {
            const [originX, originY] = [coords[i], coords[i + 1]];
            const [r, g, b] = [rgbs[i], rgbs[i + 1], rgbs[i + 2]];
            ctx.fillStyle = colors.blue[100];
            // if (x === 0) console.log(originX);
            ctx.fillRect(
              x + (originX - x) * 0.2,
              y + (originY - y) * 0.2,
              w,
              h
            );
          }
          const [r, g, b] = [rgbs[i], rgbs[i + 1], rgbs[i + 2]];

          // IF YELLOW
          const isYellow = rgbToHex([r, g, b]) === colors.yellow[500];
          if (isYellow) ctx.fillStyle = colors.yellow[800];
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

  const canvasRef = useCanvas([drawLine, drawText, pixelate], true);

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
