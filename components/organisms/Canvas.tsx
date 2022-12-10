import { useCanvas } from "../../hooks";

type Props = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  className?: string;
};

export const Canvas: React.FC<Props> = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
