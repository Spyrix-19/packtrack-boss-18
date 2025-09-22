import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BuyerNav } from '@/components/Layout/BuyerNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle,
  Truck,
  Search,
  Navigation,
  User,
  Phone
} from 'lucide-react';

const OrderTracking = () => {
  const { user, buyerOrders, markOrderReceived } = useAuth();
  const [trackingInput, setTrackingInput] = useState('');

  if (!user || user.role !== 'BUYER') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ORDERED': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'CONFIRMED': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'ASSIGNED': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      case 'PICKED_UP': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'IN_TRANSIT': return 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30';
      case 'DELIVERED': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'CANCELLED': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { key: 'ORDERED', label: 'Order Placed', completed: true },
      { key: 'CONFIRMED', label: 'Order Confirmed', completed: false },
      { key: 'ASSIGNED', label: 'Rider Assigned', completed: false },
      { key: 'PICKED_UP', label: 'Picked Up', completed: false },
      { key: 'IN_TRANSIT', label: 'In Transit', completed: false },
      { key: 'DELIVERED', label: 'Delivered', completed: false }
    ];

    const statusOrder = ['ORDERED', 'CONFIRMED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  const handleTrackingSearch = () => {
    // Simulate tracking search - would normally search by tracking number
    console.log('Searching for tracking number:', trackingInput);
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex min-h-screen bg-background">
      <BuyerNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Order & Tracking</h1>
                <p className="text-muted-foreground">Track your orders and deliveries in real-time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Public Tracking Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Public Order Tracking</span>
              </CardTitle>
              <CardDescription>Track any order using your tracking number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    placeholder="Enter tracking number (e.g., TRK-001-2024)"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                  />
                </div>
                <Button onClick={handleTrackingSearch} className="mt-6">
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>Track your current and completed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {buyerOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No orders found</p>
                  </div>
                ) : (
                  buyerOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-6 space-y-6">
                      {/* Order Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.item}</h3>
                            <p className="text-sm text-muted-foreground">
                              Tracking: {order.trackingNumber} • Qty: {order.quantity}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </div>

                      {/* Order Progress */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Delivery Progress</h4>
                        <div className="relative">
                          <div className="flex justify-between items-center">
                            {getStatusSteps(order.status).map((step, index) => (
                              <div key={step.key} className="flex flex-col items-center space-y-2">
                                <div className={`
                                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                                  ${step.completed 
                                    ? 'bg-primary text-primary-foreground' 
                                    : step.current 
                                      ? 'bg-yellow-500 text-yellow-900' 
                                      : 'bg-muted text-muted-foreground'
                                  }
                                `}>
                                  {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className={`text-xs text-center max-w-20 ${
                                  step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Progress Line */}
                          <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted -z-10">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ 
                                width: `${(getStatusSteps(order.status).filter(s => s.completed).length - 1) * 20}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-secondary/20 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">Seller:</span>
                          </div>
                          <p className="text-sm">{order.sellerName}</p>
                        </div>

                        {order.riderName && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Truck className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-sm">Rider:</span>
                            </div>
                            <p className="text-sm">{order.riderName}</p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">Delivery Address:</span>
                          </div>
                          <p className="text-sm">{order.deliveryAddress}</p>
                        </div>
                      </div>

                      {/* Estimated Delivery & GPS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.estimatedDelivery && (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="font-medium text-sm">Estimated Delivery</span>
                            </div>
                            <p className="text-sm">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.estimatedDelivery).toLocaleTimeString()}</p>
                          </div>
                        )}

                        {order.gpsLocation && (order.status === 'PICKED_UP' || order.status === 'IN_TRANSIT') && (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <Navigation className="w-4 h-4 text-primary" />
                              <span className="font-medium text-sm">Live Location</span>
                            </div>
                            <p className="text-xs font-mono">
                              {order.gpsLocation.lat.toFixed(6)}, {order.gpsLocation.lng.toFixed(6)}
                            </p>
                            <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                              View on Map
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          Order Total: ₱{order.totalAmount.toLocaleString()}
                        </div>
                        
                        <div className="flex space-x-2">
                          {order.status === 'IN_TRANSIT' && (
                            <Button 
                              size="sm"
                              onClick={() => markOrderReceived(order.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark as Received
                            </Button>
                          )}
                          
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;