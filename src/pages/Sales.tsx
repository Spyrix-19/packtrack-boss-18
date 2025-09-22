import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Users,
  CreditCard,
  Smartphone,
  Eye,
  Edit,
  Truck
} from "lucide-react";

const sales = [
  {
    id: "SLE001",
    customerName: "Maria Santos",
    customerPhone: "+63 917 123 4567",
    customerAddress: "123 Rizal St, Makati City",
    items: [
      { name: "iPhone 14 Pro", quantity: 1, buyingPrice: 45000, sellingPrice: 52000 }
    ],
    totalBuyingPrice: 45000,
    totalSellingPrice: 52000,
    profit: 7000,
    paymentMethod: "GCash",
    status: "Delivered",
    dateCreated: "2024-01-15",
    shipmentQR: "SHP_SLE001"
  },
  {
    id: "SLE002",
    customerName: "Juan Dela Cruz",
    customerPhone: "+63 908 987 6543",
    customerAddress: "456 Bonifacio Ave, Quezon City",
    items: [
      { name: "Samsung Galaxy S23", quantity: 1, buyingPrice: 38000, sellingPrice: 44000 },
      { name: "Wireless Earbuds", quantity: 1, buyingPrice: 2500, sellingPrice: 3200 }
    ],
    totalBuyingPrice: 40500,
    totalSellingPrice: 47200,
    profit: 6700,
    paymentMethod: "Cash",
    status: "In Transit",
    dateCreated: "2024-01-14",
    shipmentQR: "SHP_SLE002"
  },
  {
    id: "SLE003",
    customerName: "Ana Garcia",
    customerPhone: "+63 929 555 1234",
    customerAddress: "789 Ortigas Center, Pasig City",
    items: [
      { name: "MacBook Air M2", quantity: 1, buyingPrice: 62000, sellingPrice: 72000 }
    ],
    totalBuyingPrice: 62000,
    totalSellingPrice: 72000,
    profit: 10000,
    paymentMethod: "GCash",
    status: "Packed",
    dateCreated: "2024-01-13",
    shipmentQR: "SHP_SLE003"
  }
];

const Sales = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-success text-success-foreground';
      case 'In Transit': return 'bg-warning text-warning-foreground';
      case 'Packed': return 'bg-primary text-primary-foreground';
      case 'Cancelled': return 'bg-destructive text-destructive-foreground';
      case 'Returned': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPaymentIcon = (method: string) => {
    return method === 'GCash' ? <Smartphone className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />;
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalSellingPrice, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sales & Reselling</h1>
              <p className="text-muted-foreground">Track customer sales and manage order fulfillment</p>
            </div>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Sale
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold text-card-foreground">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{totalProfit.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Unique Customers</p>
                    <p className="text-2xl font-bold text-card-foreground">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input className="pl-10" placeholder="Search sales, customers, or items..." />
                </div>
                <Button variant="outline">
                  Filter by Status
                </Button>
                <Button variant="outline">
                  Filter by Payment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sales Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                Customer sales with automatic profit calculation and shipping integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sales.map((sale) => (
                  <div key={sale.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-card-foreground">{sale.id}</h3>
                          <Badge className={getStatusColor(sale.status)}>
                            {sale.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {getPaymentIcon(sale.paymentMethod)}
                            {sale.paymentMethod}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Customer Details</p>
                            <p className="font-medium text-card-foreground">{sale.customerName}</p>
                            <p className="text-sm text-muted-foreground">{sale.customerPhone}</p>
                            <p className="text-sm text-muted-foreground">{sale.customerAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Items Sold</p>
                            {sale.items.map((item, index) => (
                              <p key={index} className="text-sm text-card-foreground">
                                {item.quantity}x {item.name}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Buying Price:</span>
                            <p className="font-medium text-card-foreground">₱{sale.totalBuyingPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Selling Price:</span>
                            <p className="font-medium text-card-foreground">₱{sale.totalSellingPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Profit:</span>
                            <p className="font-medium text-success">₱{sale.profit.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Shipment QR:</span>
                            <p className="font-medium text-card-foreground">{sale.shipmentQR}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4" />
                        </Button>
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

export default Sales;