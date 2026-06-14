export const INITIAL_SLIDER_VALUE = 0;

export function sliderValueToColor(value: number): string {
  const hue = Math.round(value * 3.3);
  return `hsl(${hue}, 70%, 65%)`;
}

export function colorToSliderValue(color: string | null): number {
  if (!color) return INITIAL_SLIDER_VALUE;
  const match = color.match(/hsl\((\d+(?:\.\d+)?)/);
  if (!match) return INITIAL_SLIDER_VALUE;
  return Math.round(parseFloat(match[1]) / 3.3);
}
