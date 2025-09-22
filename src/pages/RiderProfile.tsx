import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Shield,
  Clock,
  LogOut,
  Navigation,
  Eye,
  EyeOff
} from 'lucide-react';

const RiderProfile = () => {
  const { user, logout, gpsEnabled, toggleGPS } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user || user.role !== 'RIDER') {
    return null;
  }

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
              <h1 className="text-2xl font-bold text-foreground">Rider Profile</h1>
              <p className="text-muted-foreground">Manage your profile and settings</p>
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
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-700">
                RIDER
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

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy Settings</span>
            </CardTitle>
            <CardDescription>Control your privacy and tracking preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">GPS Tracking</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Allow real-time location tracking for deliveries
                </p>
              </div>
              <Switch 
                checked={gpsEnabled} 
                onCheckedChange={toggleGPS}
              />
            </div>
            
            {gpsEnabled ? (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">GPS tracking is enabled</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your location is being shared with the admin for delivery tracking
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <EyeOff className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-700">GPS tracking is disabled</span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Location sharing is turned off for privacy
                </p>
              </div>
            )}
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
                <Badge variant="secondary">RIDER</Badge>
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

export default RiderProfile;