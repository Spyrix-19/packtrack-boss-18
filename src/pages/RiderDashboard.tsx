import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRScannerDialog } from '@/components/QRScanner/QRScannerDialog';
import { RiderNav } from '@/components/Layout/RiderNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  QrCode,
  Phone,
  MapPin,
  Navigation,
  User
} from 'lucide-react';

const RiderDashboard = () => {
  const { user, riderDeliveries, updateDeliveryStatus } = useAuth();
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  if (!user || user.role !== 'RIDER') {
    return null;
  }

  // Calculate delivery stats
  const todayDeliveries = riderDeliveries.filter(d => {
    const today = new Date().toISOString().split('T')[0];
    const deliveryDate = new Date(d.assignedAt).toISOString().split('T')[0];
    return deliveryDate === today;
  });

  const pendingDeliveries = riderDeliveries.filter(d => d.status === 'ASSIGNED');
  const completedDeliveries = riderDeliveries.filter(d => d.status === 'DELIVERED');

  const handleQRScan = (scannedData: string) => {
    // Find delivery by QR code
    const delivery = riderDeliveries.find(d => d.item.toLowerCase().includes(scannedData.toLowerCase()));
    if (delivery) {
      // For demo, just update status to next logical step
      let newStatus: 'ACCEPTED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' = 'PICKED_UP';
      
      if (delivery.status === 'ASSIGNED') newStatus = 'ACCEPTED';
      else if (delivery.status === 'ACCEPTED') newStatus = 'PICKED_UP';
      else if (delivery.status === 'PICKED_UP') newStatus = 'IN_TRANSIT';
      else if (delivery.status === 'IN_TRANSIT') newStatus = 'DELIVERED';
      
      updateDeliveryStatus(delivery.id, newStatus);
    }
    setIsQRScannerOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ASSIGNED': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'ACCEPTED': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'PICKED_UP': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      case 'IN_TRANSIT': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'DELIVERED': return 'bg-green-500/20 text-green-700 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex min-h-screen bg-background">
      <RiderNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Rider Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.name}!</p>
              </div>
              <Button onClick={() => setIsQRScannerOpen(true)} className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span>Quick Scan</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">Assigned for today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Deliveries</CardTitle>
            <CardDescription>Manage your delivery assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riderDeliveries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No deliveries assigned at the moment</p>
                </div>
              ) : (
                riderDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{delivery.item}</h3>
                          <p className="text-sm text-muted-foreground">Qty: {delivery.quantity}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(delivery.status)}>
                        {formatStatus(delivery.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Buyer:</span>
                          <span>{delivery.buyerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{delivery.buyerPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{delivery.deliveryAddress}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Seller:</span>
                          <span>{delivery.sellerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{delivery.sellerPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{delivery.pickupAddress}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-muted-foreground">
                        Est. Delivery: {new Date(delivery.estimatedDelivery || '').toLocaleString()}
                      </div>
                      <div className="flex space-x-2">
                        {delivery.status === 'ASSIGNED' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateDeliveryStatus(delivery.id, 'DELIVERED')} // Demo: simulate decline
                            >
                              Decline
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => updateDeliveryStatus(delivery.id, 'ACCEPTED')}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                        {delivery.status !== 'ASSIGNED' && delivery.status !== 'DELIVERED' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setIsQRScannerOpen(true)}
                          >
                            <QrCode className="w-4 h-4 mr-1" />
                            Scan QR
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Navigation className="w-4 h-4 mr-1" />
                          Navigate
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

      <QRScannerDialog
        open={isQRScannerOpen}
        onOpenChange={setIsQRScannerOpen}
        onScan={handleQRScan}
      />
    </div>
  );
};

export default RiderDashboard;