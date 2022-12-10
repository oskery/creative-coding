import { useCanvas } from "../../hooks";
import { clsx } from "clsx";
import { forwardRef } from "react";

type Props = {
  className?: string;
};

const Canvas = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
  return (
    <canvas
      {...props}
      ref={ref}
      className={clsx(props?.className, "h-full w-full")}
    />
  );
});

Canvas.displayName = "Canvas";

export { Canvas };
