import { HiOutlineLightningBolt } from "react-icons/hi";
import { TbApi } from "react-icons/tb";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  text?: string;
}

export function Logo({
  size = 32,
  className = "",
  showText = false,
  text = "AutoAPI",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Gradient background circle */}
        <div
          className="rounded-lg bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md"
          style={{ width: size, height: size }}
        >
          {/* API Icon with automation bolt */}
          <div className="relative text-white">
            <TbApi size={size * 0.6} strokeWidth={2.5} />
            <HiOutlineLightningBolt
              size={size * 0.35}
              className="absolute -bottom-0.5 -right-0.5 text-yellow-300 drop-shadow-sm"
            />
          </div>
        </div>
      </div>
      {showText && (
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {text}
        </span>
      )}
    </div>
  );
}
