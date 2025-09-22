import { Sidebar } from "@/components/Layout/Sidebar";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { RecentActivities } from "@/components/Dashboard/RecentActivities";
import { useData } from "@/contexts/DataContext";
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users,
  Truck,
  ShoppingCart
} from "lucide-react";

const OwnerDashboard = () => {
  const { inventory, sales, logistics, users } = useData();

  const totalInvestment = inventory.reduce((sum, batch) => sum + batch.totalCost, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  const activeBatches = inventory.filter(batch => batch.status === 'Active').length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Owner Dashboard</h1>
            <p className="text-muted-foreground">Overview of JAN JAN MARINE PRODUCTS operations</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Investment"
              value={`₱${totalInvestment.toLocaleString()}`}
              icon={Package}
              change="+12.5%"
              changeType="increase"
            />
            <MetricCard
              title="Revenue"
              value={`₱${totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              change="+8.2%"
              changeType="increase"
            />
            <MetricCard
              title="Profit"
              value={`₱${totalProfit.toLocaleString()}`}
              icon={TrendingUp}
              change="+15.3%"
              changeType="increase"
            />
            <MetricCard
              title="Active Batches"
              value={activeBatches.toString()}
              icon={Truck}
              change="+3"
              changeType="increase"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <QuickActions />
            </div>

            {/* Recent Activities */}
            <div>
              <RecentActivities />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;