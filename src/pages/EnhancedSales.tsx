import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useData } from "@/contexts/DataContext";
import EnhancedQRScanner from "@/components/QRScanner/EnhancedQRScanner";
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users,
  Plus,
  Minus,
  Search,
  Star,
  Package,
  Trash2,
  Receipt
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
  category?: string;
}

const EnhancedSales = () => {
  const { inventory, sales, addSale } = useData();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });

  // Calculate stats
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  const avgOrderValue = totalRevenue / totalSales || 0;

  // Get top selling items (mock data)
  const topSellingItems = [
    { name: "Fresh Tuna (Yellowfin)", sold: 45, revenue: 292500 },
    { name: "Live Mud Crabs", sold: 32, revenue: 85600 },
    { name: "Frozen Shrimp", sold: 28, revenue: 58800 },
  ];

  // Get recent items sold
  const recentItemsSold = sales.slice(-6).map(sale => ({
    name: sale.items,
    customer: sale.customer,
    amount: sale.totalAmount,
    date: sale.date
  }));

  // Filter inventory for search
  const filteredInventory = inventory.filter(item =>
    item.status === 'Active' &&
    (item.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToCart = (inventoryItem: any, quantity: number = 1) => {
    const existingItem = cart.find(item => item.id === inventoryItem.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === inventoryItem.id
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.unitPrice }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: inventoryItem.id,
        name: inventoryItem.items,
        unitPrice: inventoryItem.unitCost * 1.5, // Add markup
        quantity,
        total: (inventoryItem.unitCost * 1.5) * quantity,
        category: inventoryItem.category
      };
      setCart([...cart, newItem]);
    }
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0 || !customerInfo.name) return;

    const newSale = {
      customer: customerInfo.name,
      phone: customerInfo.phone,
      items: cart.map(item => `${item.quantity}x ${item.name}`).join(", "),
      quantity: cartItemCount,
      unitPrice: cartTotal / cartItemCount,
      totalAmount: cartTotal,
      profit: cartTotal * 0.3, // Assume 30% profit margin
      paymentMethod: 'Cash' as const,
      status: 'Completed' as const,
      date: new Date().toISOString().split('T')[0],
      qrCode: `QR-${Date.now()}`,
      location: customerInfo.address || 'Store'
    };

    addSale(newSale);
    
    // Clear cart and customer info
    setCart([]);
    setCustomerInfo({ name: "", phone: "", address: "" });
    
    alert("Sale completed successfully!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sales & Reselling</h1>
              <p className="text-muted-foreground">Process orders and manage sales transactions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowScanner(!showScanner)}>
                <Search className="w-4 h-4 mr-2" />
                {showScanner ? 'Hide Scanner' : 'QR Scanner'}
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold text-card-foreground">{totalSales}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Profit</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Avg Order</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{Math.round(avgOrderValue).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QR Scanner */}
          {showScanner && (
            <div className="mb-8">
              <EnhancedQRScanner 
                onSelect={(item, type) => {
                  if (type === 'inventory') {
                    addToCart(item, 1);
                  }
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Search & Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Products</CardTitle>
                  <CardDescription>
                    Find and add products to cart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input
                      placeholder="Search by product name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                    {filteredInventory.map((item) => (
                      <div key={item.id} className="p-3 border rounded-lg hover:bg-muted/50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{item.items}</h4>
                            <p className="text-xs text-muted-foreground">{item.id}</p>
                            <p className="text-sm font-semibold text-success">
                              ₱{Math.round(item.unitCost * 1.5).toLocaleString()}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => addToCart(item, 1)}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stock: {item.quantity} kg
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Selling Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topSellingItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.sold} sold • ₱{item.revenue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Items Sold */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Items Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentItemsSold.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm p-2 rounded border">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">{item.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₱{item.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shopping Cart & Checkout */}
            <div className="space-y-6">
              {/* Cart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart ({cartItemCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Cart is empty
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-success">₱{item.unitPrice.toLocaleString()} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total:</span>
                        <span>₱{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Customer Name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                  <Input
                    placeholder="Address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Checkout */}
              <Button 
                className="w-full bg-gradient-primary" 
                size="lg"
                onClick={handleCheckout}
                disabled={cart.length === 0 || !customerInfo.name}
              >
                <Receipt className="w-4 h-4 mr-2" />
                Complete Sale - ₱{cartTotal.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedSales;