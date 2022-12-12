import Head from "next/head";
import { Canvas } from "../";
import { useCanvas } from "../../hooks";
import colors from "tailwindcss/colors";

import { clsx } from "clsx";
export class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  ease: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.targetX = x;
    this.targetY = y;
    this.color = color;
    this.ease = Math.random() * 0.01 + 0.08;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 8, 8);
  }
  update() {
    this.x += (this.targetX - this.x) * this.ease;
    this.y += (this.targetY - this.y) * this.ease;
  }
}
export function Sverige({ className }: { className?: string }) {
  const particles = [] as Particle[];

  function drawLine(ctx: CanvasRenderingContext2D) {
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

  function drawText(ctx: CanvasRenderingContext2D) {
    ctx.font = "110px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.blue[700];
    ctx.fillText("Sverige", ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  function paintPictureAndGenerateParticles(
    ctx: CanvasRenderingContext2D,
    frameCount: number
  ) {
    if (frameCount > 1) return;
    drawLine(ctx);
    drawText(ctx);
    let snapshot = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    ).data;
    generateParticles(ctx, snapshot);
  }

  function generateParticles(
    ctx: CanvasRenderingContext2D,
    rgbs: Uint8ClampedArray
  ) {
    const gap = 12;
    for (let y = 0; y < ctx.canvas.height; y += gap) {
      for (let x = 0; x < ctx.canvas.width; x += gap) {
        const i = (y * ctx.canvas.width + x) * 4;
        // Only if there was a color do we make a Particle (rgbs[i + 3] = alpha)
        if (rgbs[i + 3] > 0) {
          ctx.fillStyle = colors.blue[100];
          const color = rgbToHex(rgbs[i], rgbs[i + 1], rgbs[i + 2]);
          particles.push(new Particle(ctx, x, y, color));
        }
      }
    }
  }

  function generateParticlesAndAnimate(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
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

  const canvasRef = useCanvas([
    paintPictureAndGenerateParticles,
    generateParticlesAndAnimate,
  ]);

  return (
    <Canvas ref={canvasRef} className={clsx(className, "bg-blue-900 ring")} />
  );
}

function rgbToHex(r: number, g: number, b: number) {
  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
