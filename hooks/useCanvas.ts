import { useRef, useEffect } from "react";
import colors from "tailwindcss/colors";

type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
export function useCanvas(drawFunctions: DrawFunction[]) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;
    var rect = canvas?.getBoundingClientRect();
    if (canvas && rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    const render = () => {
      frameCount++;

      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = colors.emerald[500];
        ctx.lineCap = "round";
        ctx.font = "64px Helvetica";
        ctx.lineWidth = 3;
        ctx.strokeStyle = colors.red[500];
        drawFunctions.map((draw) => draw(ctx, frameCount));
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawFunctions]);

  return canvasRef;
}

export default useCanvas;
