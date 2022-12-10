import { useRef, useEffect } from "react";

export function useCanvas(draw: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;
    var rect = canvas?.getBoundingClientRect();
    if (canvas && rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
}

export default useCanvas;
