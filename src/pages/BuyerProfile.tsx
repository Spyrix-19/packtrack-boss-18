import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin,
  ShoppingBag,
  Clock,
  LogOut,
  Star
} from 'lucide-react';

const BuyerProfile = () => {
  const { user, logout, buyerOrders } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user || user.role !== 'BUYER') {
    return null;
  }

  const totalOrders = buyerOrders.length;
  const completedOrders = buyerOrders.filter(o => o.status === 'DELIVERED').length;
  const totalSpent = buyerOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Buyer Profile</h1>
              <p className="text-muted-foreground">Manage your profile and view order history</p>
            </div>
            <Button 
              onClick={logout}
              variant="outline"
              className="text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Your basic profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                BUYER
              </Badge>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  Edit Profile
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} size="sm">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center mt-1">
                  <User className="w-4 h-4 text-muted-foreground mr-3" />
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <span className="text-sm">{user.name}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center mt-1">
                  <Mail className="w-4 h-4 text-muted-foreground mr-3" />
                  <span className="text-sm text-muted-foreground">{user.email} (Cannot be changed)</span>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center mt-1">
                  <Phone className="w-4 h-4 text-muted-foreground mr-3" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <span className="text-sm">{user.phone || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground mr-3" />
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <span className="text-sm">{user.address || 'Not provided'}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Order Statistics</span>
            </CardTitle>
            <CardDescription>Your ordering history and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalOrders}</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₱{totalSpent.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Recent Feedback</span>
            </CardTitle>
            <CardDescription>Your latest reviews and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Excellent service!</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Fast delivery and fresh products. Very satisfied with the quality."
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Frozen Shrimp - 10kg • Jan 15, 2024
                </p>
              </div>
              
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">More feedback will appear here as you complete orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Account Information</span>
            </CardTitle>
            <CardDescription>Your account status and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">User ID:</span>
                <span className="text-sm text-muted-foreground">{user.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Role:</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-700">BUYER</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant="default" className="bg-green-500/20 text-green-700">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Member Since:</span>
                <span className="text-sm text-muted-foreground">January 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerProfile;