import { FeatureCards } from "@/components/feature-cards";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col mx-auto  sm:max-w-[540px] md:max-w-[930px] lg:max-w-[1170px] xl:max-w-[1500px]">
      <div className="space-y-4">
        <FeatureCards />
      </div>
    </div>
  );
}
