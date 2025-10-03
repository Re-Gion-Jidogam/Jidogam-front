import ToggleGroup from "@/components/ToggleGroup";

export default function Home() {
  // return <h1>Hello Jidogam</h1>;
  return (
    <div className="p-10">
      <ToggleGroup
        items={[
          { image: "ToggleGroupCheck", label: "옵션 1" },
          { image: "ToggleGroupRound", label: "옵션 2" },
          { image: "ToggleGroupCheck", label: "옵션 3" },
        ]}
      />
    </div>
  );
}
