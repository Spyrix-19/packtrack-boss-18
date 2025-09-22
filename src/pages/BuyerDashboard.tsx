import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BuyerNav } from '@/components/Layout/BuyerNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Package, 
  MapPin, 
  Clock, 
  Star,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Camera,
  Truck
} from 'lucide-react';

const BuyerDashboard = () => {
  const { user, buyerOrders, markOrderReceived, submitFeedback } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [feedback, setFeedback] = useState({
    riderRating: 0,
    sellerRating: 0,
    comment: '',
    issues: '',
    photos: [] as string[]
  });

  if (!user || user.role !== 'BUYER') {
    return null;
  }

  const activeOrders = buyerOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const completedOrders = buyerOrders.filter(o => o.status === 'DELIVERED');
  const totalOrders = buyerOrders.length;

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

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleMarkReceived = (orderId: string) => {
    markOrderReceived(orderId);
  };

  const handleSubmitFeedback = () => {
    if (selectedOrder) {
      submitFeedback({
        buyerId: user.id,
        orderId: selectedOrder.id,
        riderId: selectedOrder.riderId,
        sellerId: selectedOrder.sellerId,
        riderRating: feedback.riderRating || undefined,
        sellerRating: feedback.sellerRating || undefined,
        comment: feedback.comment || undefined,
        issues: feedback.issues || undefined,
        photos: feedback.photos
      });
      
      setFeedback({
        riderRating: 0,
        sellerRating: 0,
        comment: '',
        issues: '',
        photos: []
      });
      setSelectedOrder(null);
    }
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="text-yellow-400 hover:text-yellow-500 focus:outline-none"
          >
            <Star 
              className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'fill-none'}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <BuyerNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Buyer Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.name}!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrders.length}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders.length}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Order Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Track your orders and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buyerOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No orders found</p>
                </div>
              ) : (
                buyerOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{order.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            Tracking: {order.trackingNumber}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {formatStatus(order.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Seller:</span>
                          <span>{order.sellerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Rider:</span>
                          <span>{order.riderName || 'Not assigned'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Amount:</span>
                          <span>₱{order.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Ordered: {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                        </div>
                        {order.estimatedDelivery && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{order.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>

                    {order.gpsLocation && (
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">Live Location:</span>
                          <span>Lat: {order.gpsLocation.lat}, Lng: {order.gpsLocation.lng}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        {order.status === 'IN_TRANSIT' && (
                          <Button 
                            size="sm"
                            onClick={() => handleMarkReceived(order.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark as Received
                          </Button>
                        )}
                        {order.status === 'DELIVERED' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Leave Feedback
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Rate & Review</DialogTitle>
                                <DialogDescription>
                                  Share your experience with this delivery
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Rate Seller</Label>
                                  <StarRating 
                                    rating={feedback.sellerRating}
                                    onRatingChange={(rating) => setFeedback(prev => ({ ...prev, sellerRating: rating }))}
                                  />
                                </div>
                                
                                {order.riderName && (
                                  <div>
                                    <Label>Rate Rider</Label>
                                    <StarRating 
                                      rating={feedback.riderRating}
                                      onRatingChange={(rating) => setFeedback(prev => ({ ...prev, riderRating: rating }))}
                                    />
                                  </div>
                                )}
                                
                                <div>
                                  <Label>Comment</Label>
                                  <Textarea 
                                    placeholder="Share your experience..."
                                    value={feedback.comment}
                                    onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                                  />
                                </div>
                                
                                <div>
                                  <Label>Report Issues (Optional)</Label>
                                  <Textarea 
                                    placeholder="Any issues or problems?"
                                    value={feedback.issues}
                                    onChange={(e) => setFeedback(prev => ({ ...prev, issues: e.target.value }))}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleSubmitFeedback}>
                                  Submit Feedback
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <MapPin className="w-4 h-4 mr-1" />
                          Track
                        </Button>
                        {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                          <Button size="sm" variant="ghost">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Report Issue
                          </Button>
                        )}
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

export default BuyerDashboard;