import { useState } from "react";
import { StaffNav } from "@/components/Layout/StaffNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useData } from "@/contexts/DataContext";
import EnhancedQRScanner from "@/components/QRScanner/EnhancedQRScanner";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus,
  Trash2, 
  QrCode,
  Star,
  Clock,
  DollarSign,
  Package,
  Receipt
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const StaffSalesView = () => {
  const { inventory, sales, addSale } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Mock top selling and recent items based on sales data
  const topSellingItems = [
    { name: "Fresh Tuna (Yellowfin)", sales: 45, price: 650 },
    { name: "Live Mud Crab", sales: 32, price: 510 },
    { name: "Frozen Shrimp", sales: 28, price: 420 },
    { name: "Fresh Pompano", sales: 24, price: 380 },
    { name: "Dried Squid", sales: 19, price: 290 },
    { name: "Fresh Lapu-lapu", sales: 16, price: 750 }
  ];

  const recentItems = [
    { name: "Fresh Bangus", price: 180, lastSold: "2 hours ago" },
    { name: "Frozen Mackerel", price: 220, lastSold: "4 hours ago" },
    { name: "Live Tilapia", price: 160, lastSold: "6 hours ago" },
    { name: "Dried Fish", price: 350, lastSold: "1 day ago" },
    { name: "Fresh Galunggong", price: 140, lastSold: "1 day ago" },
    { name: "Squid Rings", price: 480, lastSold: "2 days ago" }
  ];

  // Filter inventory for available items
  const availableItems = inventory.filter(item => 
    item.status === 'Active' && item.quantity > 0 &&
    (item.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateCartQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        name: item.items,
        price: item.unitCost,
        quantity: 1,
        total: item.unitCost
      };
      setCart([...cart, newCartItem]);
    }
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity, total: item.price * quantity }
          : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQRScan = (data: string) => {
    try {
      const scannedData = JSON.parse(data);
      const item = inventory.find(inv => inv.id === scannedData.id);
      if (item) {
        addToCart(item);
        setShowScanner(false);
      }
    } catch {
      // Handle manual input
      const item = inventory.find(inv => 
        inv.items.toLowerCase().includes(data.toLowerCase()) ||
        inv.id.toLowerCase().includes(data.toLowerCase())
      );
      if (item) {
        addToCart(item);
        setShowScanner(false);
      }
    }
  };

  const processTransaction = () => {
    if (cart.length === 0 || !customerName) return;

    const newSale = {
      customer: customerName,
      phone: "N/A",
      items: cart.map(item => `${item.name} x${item.quantity}`).join(', '),
      quantity: cartItemsCount,
      unitPrice: Math.round(cartTotal / cartItemsCount),
      totalAmount: cartTotal,
      profit: cartTotal * 0.3, // 30% profit margin
      paymentMethod: paymentMethod as any,
      status: 'Completed' as const,
      date: new Date().toISOString(),
      qrCode: `QR-${Date.now()}`,
      location: "Store Front"
    };

    addSale(newSale);
    
    // Clear cart and form
    setCart([]);
    setCustomerName("");
    setPaymentMethod("Cash");
    
    alert(`Transaction completed! Total: ₱${cartTotal.toLocaleString()}`);
  };

  const todaySales = sales.filter(sale => {
    const today = new Date().toDateString();
    const saleDate = new Date(sale.date).toDateString();
    return today === saleDate;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <StaffNav />
      
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sales & Reselling</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Process transactions and manage sales</p>
          </div>

          {/* Sales Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Today's Sales</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">{todaySales.length}</p>
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
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">
                      ₱{todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-warning" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Cart Items</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">{cartItemsCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-info" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Cart Total</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">₱{cartTotal.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Product Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search & Scanner */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Product Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products or batch numbers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button 
                      onClick={() => setShowScanner(true)}
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Available Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableItems.slice(0, 6).map((item) => (
                      <div key={item.id} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-card-foreground text-sm">{item.items}</h3>
                          <Badge variant="outline" className="text-xs">{item.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">ID: {item.id}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">₱{item.unitCost.toLocaleString()}</span>
                          <Button 
                            size="sm" 
                            onClick={() => addToCart(item)}
                            className="text-xs"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Stock: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Selling & Recent Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center">
                      <Star className="w-4 h-4 mr-2 text-warning" />
                      Top Selling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topSellingItems.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-medium text-card-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.sales} sold</p>
                          </div>
                          <span className="font-semibold text-primary">₱{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-info" />
                      Recent Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-medium text-card-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.lastSold}</p>
                          </div>
                          <span className="font-semibold text-primary">₱{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Shopping Cart ({cartItemsCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="p-3 border border-border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-card-foreground text-sm">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">₱{item.price} each</p>
                              <p className="font-semibold text-primary">₱{item.total.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">₱{cartTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Cart is empty</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Checkout */}
              {cart.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Checkout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Customer Name</label>
                      <Input
                        placeholder="Enter customer name..."
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="Cash">Cash</option>
                        <option value="GCash">GCash</option>
                        <option value="Card">Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    
                    <Button 
                      onClick={processTransaction}
                      disabled={!customerName}
                      className="w-full bg-gradient-primary text-base py-3"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      Process Transaction - ₱{cartTotal.toLocaleString()}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code Scanner</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScanner(false)}
              >
                ×
              </Button>
            </div>
            <EnhancedQRScanner onSelect={handleQRScan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSalesView;