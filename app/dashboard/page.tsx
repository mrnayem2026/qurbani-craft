import { DashboardHeader } from "@/components/dashboard-header";
import Dashboard from "@/components/dashboard/dashboard";
import { FeatureCards } from "@/components/feature-cards";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader /> */}
      {/* <div className="relative z-10">
            <main className="container mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Welcome to QurbaniCraft
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Create beautiful Eid memories with our festive tools. Share
                  joy, spread blessings, and celebrate together.
                </p>
              </div>

              <FeatureCards />
            </main>
          </div> */}
      <Dashboard />
    </div>
  );
}
