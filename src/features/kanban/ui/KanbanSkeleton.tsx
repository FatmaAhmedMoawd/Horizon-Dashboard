import Card from "@/components/card";

export default function KanbanSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-5 h-12 max-w-md rounded-full bg-gray-200 dark:bg-navy-700" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} extra="min-h-[420px] rounded-[20px]" />
        ))}
      </div>
    </div>
  );
}
