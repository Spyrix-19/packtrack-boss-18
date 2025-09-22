import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Download,
  FileText,
  Calendar,
  BarChart3,
  PieChart,
  Calculator
} from "lucide-react";

const financialData = {
  totalRevenue: 171200,
  totalExpenses: 105500,
  totalProfit: 65700,
  profitMargin: 38.4,
  growthRate: 15.2
};

const monthlyData = [
  { month: 'Jan 2024', revenue: 52000, expenses: 32000, profit: 20000 },
  { month: 'Feb 2024', revenue: 47200, expenses: 28500, profit: 18700 },
  { month: 'Mar 2024', revenue: 72000, expenses: 45000, profit: 27000 }
];

const expenseBreakdown = [
  { category: 'Inventory Purchase', amount: 85000, percentage: 80.6 },
  { category: 'Taxes & Fees', amount: 8500, percentage: 8.1 },
  { category: 'Shipping & Logistics', amount: 6800, percentage: 6.4 },
  { category: 'Other Expenses', amount: 5200, percentage: 4.9 }
];

const revenueBreakdown = [
  { category: 'Electronics', amount: 95000, percentage: 55.5 },
  { category: 'Fashion & Accessories', amount: 47200, percentage: 27.6 },
  { category: 'Home & Appliances', amount: 29000, percentage: 16.9 }
];

const topProducts = [
  { name: 'iPhone 14 Pro', sales: 15, revenue: 780000, profit: 105000 },
  { name: 'Samsung Galaxy S23', sales: 12, revenue: 528000, profit: 80400 },
  { name: 'MacBook Air M2', sales: 8, revenue: 576000, profit: 80000 },
  { name: 'AirPods Pro', sales: 25, revenue: 400000, profit: 87500 },
  { name: 'Gaming Laptop', sales: 6, revenue: 420000, profit: 54000 }
];

const Finance = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance & Reporting</h1>
              <p className="text-muted-foreground">Comprehensive financial analytics and profit tracking</p>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{financialData.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calculator className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{financialData.totalExpenses.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{financialData.totalProfit.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                    <p className="text-2xl font-bold text-card-foreground">{financialData.profitMargin}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold text-card-foreground">+{financialData.growthRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Revenue, expenses, and profit breakdown by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-card-foreground">{data.month}</h3>
                      <Badge className="bg-success text-success-foreground">
                        Profit: ₱{data.profit.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-bold text-success">₱{data.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expenses</p>
                        <p className="font-bold text-warning">₱{data.expenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit Margin</p>
                        <p className="font-bold text-primary">{((data.profit / data.revenue) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Expense Breakdown
                </CardTitle>
                <CardDescription>Distribution of business expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{expense.category}</p>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-warning h-2 rounded-full"
                            style={{ width: `${expense.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-bold text-card-foreground">₱{expense.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{expense.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue by Category
                </CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueBreakdown.map((revenue, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{revenue.category}</p>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-success h-2 rounded-full"
                            style={{ width: `${revenue.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-bold text-card-foreground">₱{revenue.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{revenue.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Products with highest sales and profitability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                          <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Units Sold</p>
                            <p className="font-bold text-card-foreground">{product.sales} units</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-bold text-success">₱{product.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Profit</p>
                            <p className="font-bold text-primary">₱{product.profit.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Finance;