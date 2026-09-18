import Image from "next/image";

type LogoVariant = "seal" | "horizontal" | "stacked" | "mark";
type LogoColor = "full-color" | "deep-blue" | "black" | "white";

interface LogoProps {
  variant?: LogoVariant;
  color?: LogoColor;
  className?: string;
  width?: number;
  height?: number;
}

const directoryMap: Record<LogoVariant, string> = {
  seal: "01-master-seal",
  horizontal: "02-horizontal",
  stacked: "03-stacked",
  mark: "04-mark",
};

const filePrefixMap: Record<LogoVariant, string> = {
  seal: "phronesis-seal",
  horizontal: "phronesis-horizontal",
  stacked: "phronesis-stacked",
  mark: "phronesis-mark",
};

export function Logo({
  variant = "horizontal",
  color = "full-color",
  className,
  width = 200,
  height = 80,
}: LogoProps) {
  const directory = directoryMap[variant];
  const prefix = filePrefixMap[variant];
  const src = `/brand/${directory}/${prefix}-${color}.svg`;

  return (
    <Image
      src={src}
      alt={`Phronesis Homeschool ${variant} logo`}
      width={width}
      height={height}
      className={['object-contain', className].filter(Boolean).join(' ')}
      style={{ maxWidth: '100%', height: 'auto' }}
      priority
    />
  );
}
