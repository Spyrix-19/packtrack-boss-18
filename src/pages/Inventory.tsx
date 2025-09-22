import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { QRScannerDialog } from "@/components/QRScanner/QRScannerDialog";
import { AddInventoryDialog } from "@/components/Forms/AddInventoryDialog";
import InventoryDetailsDialog from "@/components/Inventory/InventoryDetailsDialog";
import { 
  Package, 
  Search, 
  QrCode, 
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  MapPin
} from "lucide-react";

const Inventory = () => {
  const { inventory, businessInfo, deleteInventory } = useData();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter(batch =>
    batch.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBatches = inventory.length;
  const totalInvestment = inventory.reduce((sum, batch) => sum + batch.totalCost, 0);
  const activeBatches = inventory.filter(batch => batch.status === 'Active').length;
  const lowStockItems = inventory.filter(batch => batch.status === 'Low Stock').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Low Stock': return 'destructive';
      case 'Out of Stock': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventory & Procurement - {businessInfo.name}</h1>
              <p className="text-muted-foreground">Manage your marine products inventory and procurement batches</p>
            </div>
            <Button className="bg-gradient-primary" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Batch
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{totalBatches}</p>
                    <p className="text-muted-foreground">Total Batches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-12 w-12 text-success" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">₱{totalInvestment.toLocaleString()}</p>
                    <p className="text-muted-foreground">Total Investment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-12 w-12 text-success" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{activeBatches}</p>
                    <p className="text-muted-foreground">Active Batches</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-12 w-12 text-destructive" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{lowStockItems}</p>
                    <p className="text-muted-foreground">Low Stock Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product, supplier, or batch ID..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setScannerOpen(true)}>
              <QrCode className="w-4 h-4" />
              Scan QR Code
            </Button>
          </div>

          {/* Inventory List */}
          <div className="space-y-4">
            {filteredInventory.map((batch) => (
              <Card key={batch.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-card-foreground">{batch.id}</h3>
                          <Badge variant={getStatusColor(batch.status) as any}>{batch.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">{batch.items}</span> • {batch.supplier}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {batch.quantity} kg
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ₱{batch.totalCost.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {batch.dateReceived}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {batch.storageLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => {
                        setSelectedBatch(batch);
                        setDetailsDialogOpen(true);
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteInventory(batch.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <QRScannerDialog open={scannerOpen} onOpenChange={setScannerOpen} />
      <AddInventoryDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <InventoryDetailsDialog 
        batch={selectedBatch}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onEdit={(batch) => {
          // Handle edit functionality
          console.log('Edit batch:', batch);
        }}
        onDelete={(id) => {
          deleteInventory(id);
          setDetailsDialogOpen(false);
        }}
      />
    </div>
  );
};

export default Inventory;