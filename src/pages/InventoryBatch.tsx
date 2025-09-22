import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QRScannerDialog } from "@/components/QRScanner/QRScannerDialog";
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
  MapPin,
  FileText,
  TrendingUp
} from "lucide-react";

interface BatchItem {
  itemName: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
}

interface BatchExpense {
  type: string;
  amount: number;
  description: string;
}

interface InventoryBatch {
  id: string;
  batchName: string;
  supplier: string;
  items: BatchItem[];
  expenses: BatchExpense[];
  subtotalItems: number;
  totalExpenses: number;
  totalCost: number;
  dateReceived: string;
  storageLocation: string;
  status: string;
  notes: string;
  qrCode: string;
}

const mockBatches: InventoryBatch[] = [
  {
    id: "BTH001",
    batchName: "Electronic Devices - January Batch",
    supplier: "TechSource Philippines",
    items: [
      { itemName: "iPhone 14 Pro", quantity: 5, unitCost: 45000, subtotal: 225000 },
      { itemName: "Samsung Galaxy S23", quantity: 3, unitCost: 38000, subtotal: 114000 },
      { itemName: "iPad Air", quantity: 2, unitCost: 28000, subtotal: 56000 }
    ],
    expenses: [
      { type: "VAT (12%)", amount: 47400, description: "Value Added Tax" },
      { type: "Shipping", amount: 5000, description: "Door to door delivery" },
      { type: "Insurance", amount: 2000, description: "Cargo insurance" },
      { type: "Customs Fee", amount: 3500, description: "Import duties" }
    ],
    subtotalItems: 395000,
    totalExpenses: 57900,
    totalCost: 452900,
    dateReceived: "2024-01-15",
    storageLocation: "Warehouse A - Section 1",
    status: "Active",
    notes: "Premium electronics batch - handle with care",
    qrCode: "QR_BTH001"
  },
  {
    id: "BTH002", 
    batchName: "Home Appliances - Weekly Restock",
    supplier: "Appliance Central",
    items: [
      { itemName: "Electric Rice Cooker", quantity: 10, unitCost: 2500, subtotal: 25000 },
      { itemName: "Microwave Oven", quantity: 5, unitCost: 6000, subtotal: 30000 },
      { itemName: "Electric Kettle", quantity: 15, unitCost: 800, subtotal: 12000 }
    ],
    expenses: [
      { type: "VAT (12%)", amount: 8040, description: "Value Added Tax" },
      { type: "Delivery Fee", amount: 1500, description: "Local delivery" },
      { type: "Handling Fee", amount: 500, description: "Warehouse handling" }
    ],
    subtotalItems: 67000,
    totalExpenses: 10040,
    totalCost: 77040,
    dateReceived: "2024-01-14",
    storageLocation: "Warehouse B - Section 2",
    status: "Active", 
    notes: "Regular restock - standard quality items",
    qrCode: "QR_BTH002"
  }
];

const InventoryBatch = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBatches = mockBatches.filter(batch =>
    batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBatches = mockBatches.length;
  const totalInvestment = mockBatches.reduce((sum, batch) => sum + batch.totalCost, 0);
  const activeBatches = mockBatches.filter(batch => batch.status === 'Active').length;
  const totalItems = mockBatches.reduce((sum, batch) => 
    sum + batch.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Low Stock': return 'bg-warning text-warning-foreground';
      case 'Out of Stock': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
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
              <h1 className="text-2xl font-bold text-foreground">Inventory & Procurement - Batch Management</h1>
              <p className="text-muted-foreground">Manage inventory batches with detailed items and expenses tracking</p>
            </div>
            <Button className="bg-gradient-primary">
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
                  <TrendingUp className="h-12 w-12 text-success" />
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
                  <Package className="h-12 w-12 text-warning" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{totalItems}</p>
                    <p className="text-muted-foreground">Total Items</p>
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
                  placeholder="Search by batch name, supplier, or batch ID..."
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

          {/* Batch List */}
          <div className="space-y-6">
            {filteredBatches.map((batch) => (
              <Card key={batch.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-card-foreground">{batch.id}</h3>
                        <Badge className={getStatusColor(batch.status)}>{batch.status}</Badge>
                      </div>
                      <p className="text-muted-foreground">{batch.batchName}</p>
                      <p className="text-sm text-muted-foreground">Supplier: {batch.supplier}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Items */}
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Items in Batch
                      </h4>
                      <div className="space-y-2">
                        {batch.items.map((item, index) => (
                          <div key={index} className="p-3 bg-secondary rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-card-foreground">{item.itemName}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ₱{item.unitCost.toLocaleString()}
                                </p>
                              </div>
                              <p className="font-semibold text-card-foreground">₱{item.subtotal.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-border">
                          <div className="flex justify-between items-center font-semibold">
                            <span className="text-card-foreground">Items Subtotal:</span>
                            <span className="text-card-foreground">₱{batch.subtotalItems.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expenses */}
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Additional Expenses
                      </h4>
                      <div className="space-y-2">
                        {batch.expenses.map((expense, index) => (
                          <div key={index} className="p-3 bg-secondary rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-card-foreground">{expense.type}</p>
                                <p className="text-sm text-muted-foreground">{expense.description}</p>
                              </div>
                              <p className="font-semibold text-destructive">₱{expense.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-border">
                          <div className="flex justify-between items-center font-semibold">
                            <span className="text-card-foreground">Total Expenses:</span>
                            <span className="text-destructive">₱{batch.totalExpenses.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Batch Summary */}
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Investment:</span>
                        <p className="font-bold text-xl text-primary">₱{batch.totalCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Date Received:
                        </span>
                        <p className="font-medium text-card-foreground">{batch.dateReceived}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Storage:
                        </span>
                        <p className="font-medium text-card-foreground">{batch.storageLocation}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">QR Code:</span>
                        <p className="font-medium text-card-foreground">{batch.qrCode}</p>
                      </div>
                    </div>
                    {batch.notes && (
                      <div className="mt-3">
                        <span className="text-muted-foreground">Notes:</span>
                        <p className="text-card-foreground">{batch.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <QRScannerDialog open={scannerOpen} onOpenChange={setScannerOpen} />
    </div>
  );
};

export default InventoryBatch;