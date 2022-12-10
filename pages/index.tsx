import Head from "next/head";
import { Canvas, Card, H1 } from "../components";

export default function Home() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <H1 className="text-center">Creative Coding</H1>
      <div className="grid sm:grid-cols-4">
        <Card className="relative overflow-hidden w-64">
          <Canvas
            className="h-full bg-red-500 inset-0 absolute"
            draw={draw}
          ></Canvas>
        </Card>
      </div>
    </>
  );
}
