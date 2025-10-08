interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <span className="font-medium text-xs text-gray-600">
      {minutes}:{secs.toString().padStart(2, "0")}
    </span>
  );
}
