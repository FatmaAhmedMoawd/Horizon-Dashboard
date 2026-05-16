import Card from "@/components/card";

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} extra="h-[90px] rounded-[20px]" />
        ))}
      </div>
      <Card extra="mt-5 h-[380px] rounded-[20px]" />
    </div>
  );
}
