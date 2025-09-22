import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { QRScannerDialog } from '@/components/QRScanner/QRScannerDialog';
import { RiderNav } from '@/components/Layout/RiderNav';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Package, 
  Phone,
  MapPin,
  Navigation,
  User,
  QrCode,
  CheckCircle,
  XCircle,
  Camera,
  Clock
} from 'lucide-react';

const AssignmentManagement = () => {
  const { user, riderDeliveries, acceptDelivery, declineDelivery, updateDeliveryStatus } = useAuth();
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    reason: '',
    photo: ''
  });

  if (!user || user.role !== 'RIDER') {
    return null;
  }

  const handleQRScan = (scannedData: string) => {
    const delivery = riderDeliveries.find(d => d.item.toLowerCase().includes(scannedData.toLowerCase()));
    if (delivery && delivery.status === 'ACCEPTED') {
      updateDeliveryStatus(delivery.id, 'PICKED_UP');
    }
    setIsQRScannerOpen(false);
  };

  const handleStatusUpdate = () => {
    if (selectedDelivery && statusUpdate.status) {
      updateDeliveryStatus(
        selectedDelivery.id, 
        statusUpdate.status as any, 
        statusUpdate.reason,
        statusUpdate.photo
      );
      setSelectedDelivery(null);
      setStatusUpdate({ status: '', reason: '', photo: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ASSIGNED': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'ACCEPTED': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'PICKED_UP': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      case 'IN_TRANSIT': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'DELIVERED': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'RETURNED': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'DAMAGED': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const statusOptions = [
    { value: 'PICKED_UP', label: 'Picked Up' },
    { value: 'IN_TRANSIT', label: 'In Transit' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'RETURNED', label: 'Returned' },
    { value: 'DAMAGED', label: 'Damaged' }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <RiderNav />
      
      <main className="flex-1 md:ml-0">
        <div className="border-b border-border bg-card">
          <div className="px-6 py-4 md:ml-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Assignment Management</h1>
                <p className="text-muted-foreground">Manage your delivery assignments</p>
              </div>
              <Button onClick={() => setIsQRScannerOpen(true)} className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span>Quick Scan</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Assignment List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Delivery Assignments</CardTitle>
              <CardDescription>View and manage all assigned deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riderDeliveries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No assignments available</p>
                  </div>
                ) : (
                  riderDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border border-border rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{delivery.item}</h3>
                            <p className="text-sm text-muted-foreground">Qty: {delivery.quantity} • ID: {delivery.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/20 p-4 rounded-lg">
                        <div className="space-y-3">
                          <h4 className="font-medium text-primary">Buyer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{delivery.buyerName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{delivery.buyerPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">{delivery.deliveryAddress}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-primary">Seller Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{delivery.sellerName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{delivery.sellerPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">{delivery.pickupAddress}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Timeline */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>Assigned: {new Date(delivery.assignedAt).toLocaleString()}</span>
                          </div>
                          {delivery.estimatedDelivery && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>Est. Delivery: {new Date(delivery.estimatedDelivery).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex space-x-2">
                          {delivery.status === 'ASSIGNED' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => declineDelivery(delivery.id)}
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Decline
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => acceptDelivery(delivery.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                            </>
                          )}
                          
                          {delivery.status === 'ACCEPTED' && (
                            <Button 
                              size="sm"
                              onClick={() => setIsQRScannerOpen(true)}
                            >
                              <QrCode className="w-4 h-4 mr-1" />
                              Scan to Pick Up
                            </Button>
                          )}

                          {(delivery.status === 'PICKED_UP' || delivery.status === 'IN_TRANSIT') && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm"
                                  onClick={() => setSelectedDelivery(delivery)}
                                >
                                  <QrCode className="w-4 h-4 mr-1" />
                                  Update Status
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Update Delivery Status</DialogTitle>
                                  <DialogDescription>
                                    Update the status of delivery: {delivery.item}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-4">
                                  <div>
                                    <Label>New Status</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                      {statusOptions.map(option => (
                                        <Button
                                          key={option.value}
                                          variant={statusUpdate.status === option.value ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => setStatusUpdate(prev => ({ ...prev, status: option.value }))}
                                        >
                                          {option.label}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Reason/Notes (Optional)</Label>
                                    <Textarea
                                      placeholder="Add any notes or reason for status update..."
                                      value={statusUpdate.reason}
                                      onChange={(e) => setStatusUpdate(prev => ({ ...prev, reason: e.target.value }))}
                                    />
                                  </div>

                                  <div>
                                    <Label>Photo (Optional)</Label>
                                    <Button variant="outline" size="sm" className="w-full mt-1">
                                      <Camera className="w-4 h-4 mr-2" />
                                      Take Photo
                                    </Button>
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button 
                                    onClick={handleStatusUpdate}
                                    disabled={!statusUpdate.status}
                                  >
                                    Update Status
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>

                        <Button size="sm" variant="ghost">
                          <Navigation className="w-4 h-4 mr-1" />
                          Navigate
                        </Button>
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

export default AssignmentManagement;