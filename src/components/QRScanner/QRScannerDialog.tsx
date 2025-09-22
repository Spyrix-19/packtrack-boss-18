import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { Camera, Keyboard, Search, Package, ShoppingCart, Truck, Calendar, MapPin, Phone, User, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface QRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan?: (scannedData: string) => void;
}

export const QRScannerDialog: React.FC<QRScannerDialogProps> = ({ open, onOpenChange, onScan }) => {
  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [scannedData, setScannedData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { findByQR } = useData();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate camera scanning
  const startCameraSimulation = async () => {
    setIsScanning(true);
    
    // Simulate camera access delay
    setTimeout(() => {
      // Simulate scanning random QR code after 2 seconds
      setTimeout(() => {
        const sampleQRCodes = [
          'QR-INV-001-TUN-120',
          'QR-SAL-001-TUN-15',
          'QR-SHIP-001-BTG-50',
          'QR-INV-002-SQD-50',
          'QR-SAL-002-SQD-10'
        ];
        const randomQR = sampleQRCodes[Math.floor(Math.random() * sampleQRCodes.length)];
        handleQRCodeScanned(randomQR);
        setIsScanning(false);
      }, 2000);
    }, 1000);

    toast.success('Camera simulation started');
  };

  const handleQRCodeScanned = (qrCode: string) => {
    const result = findByQR(qrCode);
    if (result) {
      setScannedData(result);
      toast.success(`QR Code found: ${result.type.toUpperCase()}`);
    } else {
      toast.error('QR Code not found in database');
      setScannedData(null);
    }
    
    // Call external onScan callback if provided
    if (onScan) {
      onScan(qrCode);
    }
  };

  const handleManualSearch = () => {
    if (!manualCode.trim()) {
      toast.error('Please enter a QR code');
      return;
    }
    handleQRCodeScanned(manualCode.trim());
  };

  const renderScannedData = () => {
    if (!scannedData) return null;

    const { type, data } = scannedData;

    switch (type) {
      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Inventory Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Batch ID:</span>
                <Badge variant="outline">{data.id}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Items:</span>
                <span>{data.items}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Quantity:</span>
                <span>{data.quantity} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge variant={data.status === 'Active' ? 'default' : data.status === 'Low Stock' ? 'destructive' : 'secondary'}>
                  {data.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Storage:</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.storageLocation}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Supplier:</span>
                <span>{data.supplier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ₱{data.totalCost.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        );

      case 'sale':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Sales Record
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Sale ID:</span>
                <Badge variant="outline">{data.id}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Customer:</span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {data.customer}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Phone:</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data.phone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Items:</span>
                <span>{data.items}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ₱{data.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge variant={data.status === 'Completed' ? 'default' : 'secondary'}>
                  {data.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Date:</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {data.date}
                </span>
              </div>
            </CardContent>
          </Card>
        );

      case 'shipment':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Shipment ID:</span>
                <Badge variant="outline">{data.id}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Destination:</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.destination}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Items:</span>
                <span>{data.items}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Quantity:</span>
                <span>{data.quantity} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge variant={data.status === 'Delivered' ? 'default' : data.status === 'In Transit' ? 'secondary' : 'destructive'}>
                  {data.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Vessel:</span>
                <span>{data.vessel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Partner:</span>
                <span>{data.partner}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Value:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ₱{data.totalValue.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setManualCode('');
    setIsScanning(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetScanner();
    }}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            QR Code Scanner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex gap-2">
            <Button
              variant={mode === 'camera' ? 'default' : 'outline'}
              onClick={() => setMode('camera')}
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Camera Scan
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
              className="flex items-center gap-2"
            >
              <Keyboard className="w-4 h-4" />
              Manual Entry
            </Button>
          </div>

          {/* Camera Mode */}
          {mode === 'camera' && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-8 text-center border-2 border-dashed">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <Camera className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Scanning for QR codes...</p>
                      <p className="text-sm text-muted-foreground mt-2">Point camera at QR code</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground mb-2">Camera Ready</p>
                      <Button onClick={startCameraSimulation} className="bg-gradient-primary">
                        Start Scanning
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual Entry Mode */}
          {mode === 'manual' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="qr-code">Enter QR Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="qr-code"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g., QR-INV-001-TUN-120"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                  />
                  <Button onClick={handleManualSearch}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Sample QR codes you can try:</p>
                <div className="grid grid-cols-1 gap-1">
                  {['QR-INV-001-TUN-120', 'QR-SAL-001-TUN-15', 'QR-SHIP-001-BTG-50', 'QR-INV-002-SQD-50'].map(code => (
                    <Button
                      key={code}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-xs h-auto p-2"
                      onClick={() => setManualCode(code)}
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scanned Data Display */}
          {scannedData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Scanned Result</h3>
                <Button variant="outline" size="sm" onClick={resetScanner}>
                  Scan Another
                </Button>
              </div>
              {renderScannedData()}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};