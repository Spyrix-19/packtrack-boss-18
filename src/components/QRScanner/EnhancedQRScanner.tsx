import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { 
  QrCode, 
  Camera, 
  Search, 
  Package, 
  ShoppingCart, 
  Truck,
  Eye,
  Calendar,
  MapPin,
  DollarSign
} from "lucide-react";

interface EnhancedQRScannerProps {
  onSelect?: (item: any, type: string) => void;
}

const EnhancedQRScanner = ({ onSelect }: EnhancedQRScannerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const { findByQR, inventory, sales, logistics } = useData();

  const handleSearch = () => {
    if (!inputValue.trim()) return;

    // First try exact QR match
    const qrResult = findByQR(inputValue.trim());
    
    let results: any[] = [];
    
    if (qrResult) {
      results.push({
        ...qrResult.data,
        type: qrResult.type,
        matchType: 'qr'
      });
    }

    // Then search by partial matches
    const searchTerm = inputValue.toLowerCase();
    
    // Search inventory
    const inventoryMatches = inventory.filter(item => 
      item.id.toLowerCase().includes(searchTerm) ||
      item.items.toLowerCase().includes(searchTerm) ||
      item.supplier.toLowerCase().includes(searchTerm)
    ).map(item => ({ ...item, type: 'inventory', matchType: 'search' }));

    // Search sales
    const salesMatches = sales.filter(sale => 
      sale.id.toLowerCase().includes(searchTerm) ||
      sale.customer.toLowerCase().includes(searchTerm) ||
      sale.items.toLowerCase().includes(searchTerm)
    ).map(sale => ({ ...sale, type: 'sale', matchType: 'search' }));

    // Search logistics
    const logisticsMatches = logistics.filter(shipment => 
      shipment.id.toLowerCase().includes(searchTerm) ||
      shipment.destination.toLowerCase().includes(searchTerm) ||
      shipment.items.toLowerCase().includes(searchTerm)
    ).map(shipment => ({ ...shipment, type: 'shipment', matchType: 'search' }));

    results = [...results, ...inventoryMatches, ...salesMatches, ...logisticsMatches];
    
    // Remove duplicates
    results = results.filter((item, index, self) => 
      self.findIndex(i => i.id === item.id && i.type === item.type) === index
    );

    setSearchResults(results);
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setSelectedType(item.type);
    if (onSelect) {
      onSelect(item, item.type);
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'inventory': return <Package className="w-5 h-5 text-primary" />;
      case 'sale': return <ShoppingCart className="w-5 h-5 text-success" />;
      case 'shipment': return <Truck className="w-5 h-5 text-warning" />;
      default: return <QrCode className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': case 'Completed': case 'Delivered': return 'default';
      case 'Low Stock': case 'Processing': case 'In Transit': return 'secondary';
      case 'Out of Stock': case 'Cancelled': case 'Delayed': return 'destructive';
      case 'Expired': case 'Returned': return 'destructive';
      default: return 'outline';
    }
  };

  const renderItemDetails = () => {
    if (!selectedItem) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getItemIcon(selectedType)}
            {selectedItem.id}
          </CardTitle>
          <CardDescription>
            {selectedType === 'inventory' && 'Inventory Batch Details'}
            {selectedType === 'sale' && 'Sale Transaction Details'}
            {selectedType === 'shipment' && 'Shipment Details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedType === 'inventory' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{selectedItem.items}</span>
                <Badge variant={getStatusColor(selectedItem.status) as any}>
                  {selectedItem.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Supplier:</span>
                  <p className="font-medium">{selectedItem.supplier}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <p className="font-medium">{selectedItem.quantity} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Cost:</span>
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ₱{selectedItem.totalCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Storage:</span>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedItem.storageLocation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedType === 'sale' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{selectedItem.customer}</span>
                <Badge variant={getStatusColor(selectedItem.status) as any}>
                  {selectedItem.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Items:</span>
                  <p className="font-medium">{selectedItem.items}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <p className="font-medium">{selectedItem.quantity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Amount:</span>
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ₱{selectedItem.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment:</span>
                  <p className="font-medium">{selectedItem.paymentMethod}</p>
                </div>
              </div>
            </div>
          )}

          {selectedType === 'shipment' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{selectedItem.destination}</span>
                <Badge variant={getStatusColor(selectedItem.status) as any}>
                  {selectedItem.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Items:</span>
                  <p className="font-medium">{selectedItem.items}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <p className="font-medium">{selectedItem.quantity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Value:</span>
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ₱{selectedItem.totalValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tracking:</span>
                  <p className="font-medium">{selectedItem.trackingNumber}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>
            Scan QR code or search manually by ID, name, or description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter QR code or search term..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Scan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.length} matching items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {searchResults.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getItemIcon(item.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.matchType === 'qr' && (
                            <Badge variant="default" className="text-xs">
                              QR Match
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.type === 'inventory' && item.items}
                          {item.type === 'sale' && `${item.customer} - ${item.items}`}
                          {item.type === 'shipment' && `${item.destination} - ${item.items}`}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Item Details */}
      {selectedItem && renderItemDetails()}
    </div>
  );
};

export default EnhancedQRScanner;