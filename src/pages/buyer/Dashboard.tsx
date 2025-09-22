import { BuyerNav } from "@/components/Layout/BuyerNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Star,
  DollarSign,
  Truck,
  Phone
} from "lucide-react";

const BuyerDashboard = () => {
  const { buyerOrders, markOrderReceived, user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ORDERED': return 'bg-secondary text-secondary-foreground';
      case 'CONFIRMED': return 'bg-primary text-primary-foreground';
      case 'ASSIGNED': return 'bg-info text-info-foreground';
      case 'PICKED_UP': return 'bg-warning text-warning-foreground';
      case 'IN_TRANSIT': return 'bg-info text-info-foreground';
      case 'DELIVERED': return 'bg-success text-success-foreground';
      case 'CANCELLED': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const totalOrders = buyerOrders.length;
  const totalSpent = buyerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const deliveredOrders = buyerOrders.filter(order => order.status === 'DELIVERED').length;
  const pendingOrders = buyerOrders.filter(order => !['DELIVERED', 'CANCELLED'].includes(order.status)).length;

  return (
    <div className="flex min-h-screen bg-background">
      <BuyerNav />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Buyer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}! Track your orders and deliveries.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold text-card-foreground">{totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-card-foreground">₱{totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                    <p className="text-2xl font-bold text-card-foreground">{deliveredOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-card-foreground">{pendingOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>
                Track your orders and view delivery progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buyerOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-card-foreground">{order.trackingNumber}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.item}</p>
                        <p className="text-sm text-card-foreground">Quantity: {order.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-card-foreground">₱{order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Seller</p>
                        <p className="font-medium text-card-foreground">{order.sellerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Rider</p>
                        <p className="font-medium text-card-foreground">{order.riderName || 'Not assigned'}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                      <p className="font-medium text-card-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {order.deliveryAddress}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {order.status === 'IN_TRANSIT' && (
                        <Button 
                          size="sm" 
                          onClick={() => markOrderReceived(order.id)}
                          className="bg-success text-success-foreground"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark as Received
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Truck className="w-4 h-4 mr-1" />
                        Track Order
                      </Button>
                      
                      {order.status === 'DELIVERED' && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {buyerOrders.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <p className="text-sm text-muted-foreground">Start shopping to see your orders here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;