import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RiderNav } from '@/components/Layout/RiderNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Navigation, 
  MapPin, 
  Eye,
  EyeOff,
  Clock,
  Truck,
  Shield,
  Wifi,
  WifiOff
} from 'lucide-react';

const GPSTracking = () => {
  const { user, gpsEnabled, toggleGPS } = useAuth();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  if (!user || user.role !== 'RIDER') {
    return null;
  }

  // Simulate GPS location updates
  useEffect(() => {
    if (gpsEnabled) {
      const interval = setInterval(() => {
        // Simulate location changes (San Jose, Occidental Mindoro area)
        setCurrentLocation({
          lat: 13.4025 + (Math.random() - 0.5) * 0.01,
          lng: 120.7097 + (Math.random() - 0.5) * 0.01
        });
        setLastUpdate(new Date());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [gpsEnabled]);

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <RiderNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Live GPS Tracking</h1>
                <p className="text-muted-foreground">Manage your location sharing and tracking settings</p>
              </div>
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Badge variant="default" className="bg-green-500/20 text-green-700">
                    <Wifi className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <WifiOff className="w-3 h-3 mr-1" />
                    Offline
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* GPS Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>GPS Tracking Controls</span>
              </CardTitle>
              <CardDescription>Control your location sharing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Enable GPS Tracking</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share your location with admin and customers for real-time tracking
                  </p>
                </div>
                <Switch 
                  checked={gpsEnabled} 
                  onCheckedChange={toggleGPS}
                />
              </div>

              {gpsEnabled ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">GPS tracking is active</span>
                    </div>
                    <p className="text-xs text-green-600">
                      Your location is being shared automatically for delivery tracking
                    </p>
                  </div>

                  {currentLocation && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">Current Location</span>
                        </div>
                        <p className="text-sm font-mono">{formatCoordinates(currentLocation.lat, currentLocation.lng)}</p>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium">Last Update</span>
                        </div>
                        <p className="text-sm">{lastUpdate.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <EyeOff className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">GPS tracking is disabled</span>
                  </div>
                  <p className="text-xs text-yellow-600">
                    Location sharing is turned off. Customers and admin cannot track your location.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>Understand how your location data is used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Real-time Tracking</p>
                    <p className="text-muted-foreground">Your location is updated every 30 seconds when GPS is enabled</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Data Sharing</p>
                    <p className="text-muted-foreground">Location data is shared only with admin and active delivery customers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Data Retention</p>
                    <p className="text-muted-foreground">Location history is kept for 30 days for delivery verification</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Privacy Control</p>
                    <p className="text-muted-foreground">You can disable GPS tracking anytime for privacy</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location History (Mock) */}
          {gpsEnabled && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Location Updates</span>
                </CardTitle>
                <CardDescription>Your recent GPS location history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, index) => {
                    const time = new Date(Date.now() - index * 5 * 60 * 1000);
                    const lat = 13.4025 + (Math.random() - 0.5) * 0.01;
                    const lng = 120.7097 + (Math.random() - 0.5) * 0.01;
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-mono">{formatCoordinates(lat, lng)}</p>
                            <p className="text-xs text-muted-foreground">{time.toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Truck className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GPSTracking;