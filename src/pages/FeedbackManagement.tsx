import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BuyerNav } from '@/components/Layout/BuyerNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Star, 
  MessageSquare,
  AlertTriangle,
  Camera,
  Package,
  Truck,
  User,
  Clock
} from 'lucide-react';

const FeedbackManagement = () => {
  const { user, buyerOrders, submitFeedback } = useAuth();
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

  const deliveredOrders = buyerOrders.filter(o => o.status === 'DELIVERED');

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    readonly = false 
  }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange?.(star)}
            className={`text-yellow-400 ${!readonly ? 'hover:text-yellow-500 focus:outline-none cursor-pointer' : 'cursor-default'}`}
            disabled={readonly}
          >
            <Star 
              className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'fill-none'}`} 
            />
          </button>
        ))}
      </div>
    );
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

  // Mock previous feedback for display
  const mockFeedback = [
    {
      id: 'feed-001',
      orderId: 'ord-002',
      item: 'Frozen Shrimp - 10kg',
      riderRating: 5,
      sellerRating: 5,
      comment: 'Excellent service! The rider was very professional and the seafood was fresh.',
      createdAt: '2024-01-15T16:00:00Z',
      riderName: 'Carlos Rivera',
      sellerName: 'Jan Jan Marine Products'
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <BuyerNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Feedback & Reviews</h1>
                <p className="text-muted-foreground">Rate your delivery experience and report issues</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Pending Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Rate Your Recent Orders</span>
              </CardTitle>
              <CardDescription>Leave feedback for completed deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveredOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No completed orders to review</p>
                  </div>
                ) : (
                  deliveredOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{order.item}</h3>
                            <p className="text-sm text-muted-foreground">
                              Delivered • {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-green-500/20 text-green-700">
                          Delivered
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>Seller: {order.sellerName}</span>
                        </div>
                        {order.riderName && (
                          <div className="flex items-center space-x-2">
                            <Truck className="w-4 h-4 text-muted-foreground" />
                            <span>Rider: {order.riderName}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Leave Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Rate & Review Your Order</DialogTitle>
                              <DialogDescription>
                                Share your experience with {order.item}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Seller Rating */}
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Rate Seller: {order.sellerName}</Label>
                                <div className="flex items-center space-x-2">
                                  <StarRating 
                                    rating={feedback.sellerRating}
                                    onRatingChange={(rating) => setFeedback(prev => ({ ...prev, sellerRating: rating }))}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {feedback.sellerRating > 0 && `${feedback.sellerRating}/5 stars`}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Rider Rating */}
                              {order.riderName && (
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Rate Delivery: {order.riderName}</Label>
                                  <div className="flex items-center space-x-2">
                                    <StarRating 
                                      rating={feedback.riderRating}
                                      onRatingChange={(rating) => setFeedback(prev => ({ ...prev, riderRating: rating }))}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                      {feedback.riderRating > 0 && `${feedback.riderRating}/5 stars`}
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              {/* Comment */}
                              <div className="space-y-2">
                                <Label htmlFor="comment">Your Review</Label>
                                <Textarea 
                                  id="comment"
                                  placeholder="Share your experience with the product quality, delivery speed, etc..."
                                  value={feedback.comment}
                                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                                />
                              </div>
                              
                              {/* Issues */}
                              <div className="space-y-2">
                                <Label htmlFor="issues" className="flex items-center space-x-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span>Report Issues (Optional)</span>
                                </Label>
                                <Textarea 
                                  id="issues"
                                  placeholder="Any issues with the order? (damaged items, late delivery, etc.)"
                                  value={feedback.issues}
                                  onChange={(e) => setFeedback(prev => ({ ...prev, issues: e.target.value }))}
                                />
                              </div>

                              {/* Photo Upload */}
                              <div className="space-y-2">
                                <Label>Attach Photos (Optional)</Label>
                                <Button variant="outline" size="sm" className="w-full">
                                  <Camera className="w-4 h-4 mr-2" />
                                  Add Photos
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                  Add photos to support your review or report issues
                                </p>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button 
                                onClick={handleSubmitFeedback}
                                disabled={!feedback.sellerRating && !feedback.riderRating}
                              >
                                Submit Review
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Previous Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Your Reviews</span>
              </CardTitle>
              <CardDescription>Your previous feedback and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFeedback.map((review) => (
                  <div key={review.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{review.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            Order ID: {review.orderId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Seller Rating:</span>
                          <StarRating rating={review.sellerRating} readonly />
                        </div>
                        <p className="text-xs text-muted-foreground">{review.sellerName}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Delivery Rating:</span>
                          <StarRating rating={review.riderRating} readonly />
                        </div>
                        <p className="text-xs text-muted-foreground">{review.riderName}</p>
                      </div>
                    </div>

                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}

                {mockFeedback.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No reviews yet</p>
                    <p className="text-sm">Your reviews will appear here after you rate your orders</p>
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

export default FeedbackManagement;