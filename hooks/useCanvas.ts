import { useRef, useEffect } from "react";

type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
type SnapshotFunction = (ctx: CanvasRenderingContext2D) => void;
export function useCanvas(
  drawFunctions: DrawFunction[],
  snapshotFunction: SnapshotFunction
) {
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
        ctx.lineCap = "round";
        drawFunctions.map((draw) => draw(ctx, frameCount));
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    // if (frameCount === 1) snapshotFunction(ctx);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawFunctions, snapshotFunction]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) snapshotFunction(ctx);
  }, []);

  return canvasRef;
}

export default useCanvas;
