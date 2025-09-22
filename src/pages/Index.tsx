import { Sidebar } from "@/components/Layout/Sidebar";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { RecentActivities } from "@/components/Dashboard/RecentActivities";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { useData } from "@/contexts/DataContext";
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  DollarSign,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const Index = () => {
  const { businessInfo, inventory, sales, logistics } = useData();
  
  // Calculate metrics from actual data
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const todaysSales = sales.filter(sale => sale.date === new Date().toISOString().split('T')[0]);
  const itemsSoldToday = todaysSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const inTransit = logistics.filter(ship => ship.status === 'In Transit').length;
  const todaysRevenue = todaysSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Dashboard - {businessInfo.name}</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your marine products business today.</p>
            <p className="text-sm text-muted-foreground">{businessInfo.address}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Stock Level"
              value={totalStock.toLocaleString() + " kg"}
              change={`${inventory.filter(i => i.status === 'Active').length} active batches`}
              changeType="increase"
              icon={Package}
            />
            <MetricCard
              title="Items Sold Today"
              value={itemsSoldToday.toString() + " kg"}
              change={`${todaysSales.length} orders`}
              changeType="increase"
              icon={ShoppingCart}
            />
            <MetricCard
              title="In Transit"
              value={inTransit.toString()}
              change={`${logistics.filter(s => s.status === 'Delivered').length} delivered`}
              changeType="neutral"
              icon={Truck}
            />
            <MetricCard
              title="Today's Revenue"
              value={`₱${todaysRevenue.toLocaleString()}`}
              change={todaysRevenue > 0 ? "+Revenue generated" : "No sales today"}
              changeType={todaysRevenue > 0 ? "increase" : "neutral"}
              icon={DollarSign}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>
            
            {/* Quick Actions - Takes 1 column */}
            <div>
              <QuickActions />
              
              {/* Business Status */}
              <div className="mt-6 bg-card p-4 rounded-lg border border-border shadow-card">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <TrendingUp className="w-4 h-4 text-success-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Business Status</p>
                    <p className="text-xs text-muted-foreground">{businessInfo.name} - All operations running smoothly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
