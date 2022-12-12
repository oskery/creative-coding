import { useRef, useEffect } from "react";

type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
export function useCanvas(drawFunctions: DrawFunction[]) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleResize = (canvas: HTMLCanvasElement | null, rect?: DOMRect) => {
      if (!canvas || !rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;
    var rect = canvas?.getBoundingClientRect();
    handleResize(canvas, rect);

    const render = () => {
      frameCount++;

      if (ctx) {
        ctx.lineCap = "round";
        drawFunctions.map((draw) => draw(ctx, frameCount));
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.addEventListener(
        "resize",
        () => handleResize(canvas, rect),
        false
      );
    };
  }, [drawFunctions]);

  return canvasRef;
}

export default useCanvas;
