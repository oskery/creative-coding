import { useRef, useEffect } from "react";

type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
type SnapshotFunction = (ctx: CanvasRenderingContext2D) => void;
export function useCanvas(
  drawFunctions: DrawFunction[],
  snapshotFunction: SnapshotFunction,
  refresh?: boolean
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
        if (refresh) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineCap = "round";
        drawFunctions.map((draw) => draw(ctx, frameCount));
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawFunctions, refresh]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) snapshotFunction(ctx);
  }, []);

  return canvasRef;
}

export default useCanvas;
