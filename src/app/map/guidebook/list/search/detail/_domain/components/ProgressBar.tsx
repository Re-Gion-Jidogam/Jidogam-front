interface ProgressBarProps {
  visitedCount: number;
  totalCount: number;
}

export function ProgressBar({ visitedCount, totalCount }: ProgressBarProps) {
  const percentage = Math.round((visitedCount / totalCount) * 100);

  return (
    <div
      className="w-full flex items-center justify-between rounded-[100px] border"
      style={{
        height: "26px",
        border: "1px solid #FFFFFF66",
        boxShadow: "0px 4px 14px 0px #0000001A",
        backdropFilter: "blur(10px)",
        background: "#FFFFFF66",
        padding: "2px 12px 2px 2px",
      }}
    >
      <div
        className="flex items-center px-2"
        style={{
          height: "22px",
          borderRadius: "100px",
          background: "#FFFFFF",
          boxShadow: "0px 4px 20px 0px #0000001A",
          width: `${percentage}%`,
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "100%",
          }}
        >
          {percentage}% 완료
        </span>
      </div>
      <span
        style={{
          fontFamily: "Pretendard",
          fontWeight: 500,
          fontSize: "10px",
          lineHeight: "100%",
        }}
      >
        {visitedCount.toLocaleString()} / {totalCount.toLocaleString()}
      </span>
    </div>
  );
}
