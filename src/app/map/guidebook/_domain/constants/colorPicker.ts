export const RAINBOW_GRADIENT =
  "linear-gradient(90deg, #FF2929 0%, #FF7B29 15.64%, #FFF429 30.69%, #12FF12 46.61%, #2962FF 65.81%, #C929FF 81.88%, #FF292C 99.01%)";
export const DISABLED_TRACK_COLOR = "#D4D5D0";

export const ACTIVE_SLIDER_VARS = {
  "--track-border": "var(--color-gray-0)",
  "--track-cursor": "pointer",
  "--thumb-bg": "rgb(255 255 255 / 0.4)",
  "--thumb-border": "var(--color-gray-0)",
  "--thumb-shadow": "0px 4px 20px 0px rgba(0,0,0,0.1)",
  "--thumb-blur": "10px",
};

export const DISABLED_SLIDER_VARS = {
  "--track-border": "var(--color-gray-500)",
  "--track-cursor": "not-allowed",
  "--thumb-bg": "var(--color-gray-500)",
  "--thumb-border": "var(--color-gray-500)",
  "--thumb-shadow": "none",
  "--thumb-blur": "0px",
};

export const SLIDER_BASE_CLASSES = [
  "w-full h-2 rounded-[100px] appearance-none",
  "border border-[var(--track-border)]",
  "cursor-[var(--track-cursor)]",
  "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]",
];

export const THUMB_CLASSES = [
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:w-6",
  "[&::-webkit-slider-thumb]:h-6",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-[var(--thumb-bg)]",
  "[&::-webkit-slider-thumb]:border",
  "[&::-webkit-slider-thumb]:border-[var(--thumb-border)]",
  "[&::-webkit-slider-thumb]:shadow-[var(--thumb-shadow)]",
  "[&::-webkit-slider-thumb]:backdrop-blur-[var(--thumb-blur)]",
  "[&::-webkit-slider-thumb]:cursor-[var(--track-cursor)]",
  "[&::-moz-range-thumb]:w-6",
  "[&::-moz-range-thumb]:h-6",
  "[&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:bg-[var(--thumb-bg)]",
  "[&::-moz-range-thumb]:border",
  "[&::-moz-range-thumb]:border-[var(--thumb-border)]",
  "[&::-moz-range-thumb]:cursor-[var(--track-cursor)]",
];
