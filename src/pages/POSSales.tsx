import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QRScannerDialog } from "@/components/QRScanner/QRScannerDialog";
import { 
  Search, 
  Plus, 
  Minus,
  ShoppingCart, 
  DollarSign, 
  CreditCard,
  Smartphone,
  Truck,
  User,
  Trash2,
  Calculator,
  Receipt,
  Percent,
  QrCode,
  Users
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface VoucherCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount?: number;
  active: boolean;
}

const mockProducts = [
  { id: "PRD001", name: "iPhone 14 Pro", price: 52000, stock: 5, category: "Electronics" },
  { id: "PRD002", name: "Samsung Galaxy S23", price: 44000, stock: 3, category: "Electronics" },
  { id: "PRD003", name: "iPad Air", price: 35000, stock: 2, category: "Electronics" },
  { id: "PRD004", name: "MacBook Air M2", price: 72000, stock: 1, category: "Electronics" },
  { id: "PRD005", name: "Wireless Earbuds", price: 3200, stock: 10, category: "Accessories" },
  { id: "PRD006", name: "Rice Cooker", price: 3500, stock: 8, category: "Appliances" },
];

const mockVouchers: VoucherCode[] = [
  { code: "SAVE10", type: 'percentage', value: 10, description: "10% off total", minAmount: 5000, active: true },
  { code: "NEW100", type: 'fixed', value: 100, description: "₱100 off", minAmount: 1000, active: true },
  { code: "BULK20", type: 'percentage', value: 20, description: "20% bulk discount", minAmount: 20000, active: true },
];

const riders = [
  { id: "RDR001", name: "Miguel Santos", partner: "LBC Express", rating: 4.8 },
  { id: "RDR002", name: "Carlos Garcia", partner: "Flash Express", rating: 4.6 },
  { id: "RDR003", name: "Ana Reyes", partner: "J&T Express", rating: 4.9 },
];

const partners = [
  { id: "LBC", name: "LBC Express", fee: 150, estimatedDays: "1-2 days" },
  { id: "FLASH", name: "Flash Express", fee: 120, estimatedDays: "1-3 days" },
  { id: "JNT", name: "J&T Express", fee: 100, estimatedDays: "2-3 days" },
];

const POSSales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherCode | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedRider, setSelectedRider] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });
  const [scannerOpen, setScannerOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
          : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  
  const applyVoucher = () => {
    const voucher = mockVouchers.find(v => v.code === voucherCode && v.active);
    if (voucher && (!voucher.minAmount || subtotal >= voucher.minAmount)) {
      setAppliedVoucher(voucher);
    }
  };

  const discount = appliedVoucher
    ? appliedVoucher.type === 'percentage'
      ? subtotal * (appliedVoucher.value / 100)
      : appliedVoucher.value
    : 0;

  const shippingFee = selectedPartner
    ? partners.find(p => p.id === selectedPartner)?.fee || 0
    : 0;

  const total = subtotal - discount + shippingFee;

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
    setVoucherCode("");
    setPaymentMethod("");
    setSelectedPartner("");
    setSelectedRider("");
    setCustomerInfo({ name: "", phone: "", address: "", email: "" });
  };

  const processSale = () => {
    // Process the sale
    alert("Sale processed successfully!");
    clearCart();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Point of Sale System</h1>
              <p className="text-muted-foreground">Process sales with integrated payment and logistics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setScannerOpen(true)}>
                <QrCode className="w-4 h-4 mr-2" />
                Scan Product
              </Button>
              <Button className="bg-gradient-primary">
                <Receipt className="w-4 h-4 mr-2" />
                New Transaction
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Product Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-card-foreground">{product.name}</h4>
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock} left
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">₱{product.price.toLocaleString()}</span>
                          <Button size="sm" disabled={product.stock === 0}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart & Checkout Section */}
            <div className="space-y-6">
              {/* Cart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Cart ({cart.length})
                    </div>
                    <Button variant="outline" size="sm" onClick={clearCart}>
                      Clear All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-card-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₱{item.price.toLocaleString()} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">Cart is empty</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Voucher */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Discount Voucher
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter voucher code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyVoucher}>
                      Apply
                    </Button>
                  </div>
                  {appliedVoucher && (
                    <div className="mt-3 p-3 bg-success/10 rounded-lg border border-success/20">
                      <p className="text-sm text-success font-medium">
                        {appliedVoucher.description} applied!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Customer name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                  <Input
                    placeholder="Phone number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                  <Input
                    placeholder="Email (optional)"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                  <Textarea
                    placeholder="Delivery address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Payment & Logistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Logistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Payment Method</label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Cash
                          </div>
                        </SelectItem>
                        <SelectItem value="gcash">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            GCash
                          </div>
                        </SelectItem>
                        <SelectItem value="cod">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Cash on Delivery
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Logistics Partner</label>
                    <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select logistics partner" />
                      </SelectTrigger>
                      <SelectContent>
                        {partners.map((partner) => (
                          <SelectItem key={partner.id} value={partner.id}>
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4" />
                              {partner.name} - ₱{partner.fee} ({partner.estimatedDays})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Assign Rider</label>
                    <Select value={selectedRider} onValueChange={setSelectedRider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rider" />
                      </SelectTrigger>
                      <SelectContent>
                        {riders.map((rider) => (
                          <SelectItem key={rider.id} value={rider.id}>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {rider.name} - {rider.partner} (★{rider.rating})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Total & Checkout */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-card-foreground">₱{subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount:</span>
                        <span>-₱{discount.toLocaleString()}</span>
                      </div>
                    )}
                    {shippingFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span className="text-card-foreground">₱{shippingFee.toLocaleString()}</span>
                      </div>
                    )}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-card-foreground">Total:</span>
                      <span className="text-primary">₱{total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-4 bg-gradient-primary"
                    onClick={processSale}
                    disabled={cart.length === 0 || !paymentMethod || !customerInfo.name}
                  >
                    Process Sale
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <QRScannerDialog open={scannerOpen} onOpenChange={setScannerOpen} />
    </div>
  );
};

export default POSSales;