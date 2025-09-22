import { StaffNav } from "@/components/Layout/StaffNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users,
  Plus,
  BarChart3,
  PieChart,
  Package
} from "lucide-react";

const StaffDashboard = () => {
  const { sales } = useData();
  const { user } = useAuth();

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  const avgOrderValue = totalRevenue / totalSales || 0;

  // Recent sales for today
  const today = new Date().toDateString();
  const todaySales = sales.filter(sale => {
    const saleDate = new Date(sale.date).toDateString();
    return today === saleDate;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <StaffNav />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}! Manage sales and view financial reports.</p>
          </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Inventory Management</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage stock & batches</p>
                </div>
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <Button className="w-full mt-3 sm:mt-4 bg-gradient-primary text-sm" asChild>
                <a href="/inventory">Manage Inventory</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Sales & Reselling</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Process orders & transactions</p>
                </div>
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
              </div>
              <Button className="w-full mt-3 sm:mt-4 bg-gradient-success text-sm" asChild>
                <a href="/sales">Go to Sales</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Profile Settings</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage your account</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-warning" />
              </div>
              <Button className="w-full mt-3 sm:mt-4 text-sm" variant="outline" asChild>
                <a href="/profile">View Profile</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Sales</p>
                  <p className="text-lg sm:text-2xl font-bold text-card-foreground">{totalSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold text-card-foreground">₱{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Profit</p>
                  <p className="text-lg sm:text-2xl font-bold text-card-foreground">₱{totalProfit.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <PieChart className="w-6 h-6 sm:w-8 sm:h-8 text-warning" />
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Order</p>
                  <p className="text-lg sm:text-2xl font-bold text-card-foreground">₱{Math.round(avgOrderValue).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Sales</CardTitle>
            <CardDescription>
              Recent transactions processed today ({todaySales.length} sales)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaySales.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {todaySales.slice(0, 5).map((sale) => (
                  <div key={sale.id} className="p-3 sm:p-4 border border-border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-sm sm:text-base font-semibold text-card-foreground">{sale.id}</h3>
                          <Badge variant="outline" className="text-xs">{sale.paymentMethod}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{sale.customer}</p>
                        <p className="text-xs sm:text-sm text-card-foreground">{sale.items}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm sm:text-base font-semibold text-card-foreground">₱{sale.totalAmount.toLocaleString()}</p>
                        <p className="text-xs sm:text-sm text-success">+₱{sale.profit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">No sales recorded today</p>
                <Button className="text-sm bg-gradient-primary" asChild>
                  <a href="/sales">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Sale
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
  );
};

export default StaffDashboard;