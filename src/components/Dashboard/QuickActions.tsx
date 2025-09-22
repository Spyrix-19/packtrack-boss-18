import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Package, Plus, BarChart3 } from "lucide-react";
import { QRScannerDialog } from "@/components/QRScanner/QRScannerDialog";
import { AddInventoryDialog } from "@/components/Forms/AddInventoryDialog";
import { AddSaleDialog } from "@/components/Forms/AddSaleDialog";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    title: 'Scan QR Code',
    description: 'Quick scan for batch or shipment',
    icon: QrCode,
    color: 'bg-gradient-primary',
    action: 'scanQR'
  },
  {
    title: 'Add New Batch',
    description: 'Register new inventory batch',
    icon: Package,
    color: 'bg-gradient-success',
    action: 'addInventory'
  },
  {
    title: 'Create Order',
    description: 'Process new customer order',
    icon: Plus,
    color: 'bg-gradient-warning',
    action: 'addSale'
  },
  {
    title: 'View Reports',
    description: 'Access financial reports',
    icon: BarChart3,
    color: 'bg-gradient-secondary',
    action: 'viewReports'
  }
];

export function QuickActions() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);
  const [saleDialogOpen, setSaleDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case 'scanQR':
        setScannerOpen(true);
        break;
      case 'addInventory':
        setInventoryDialogOpen(true);
        break;
      case 'addSale':
        setSaleDialogOpen(true);
        break;
      case 'viewReports':
        navigate('/finance');
        break;
    }
  };

  return (
    <>
      <div className="bg-card p-6 rounded-lg border border-border shadow-card">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-card transition-all border-border"
                onClick={() => handleAction(action.action)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm text-card-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      <QRScannerDialog open={scannerOpen} onOpenChange={setScannerOpen} />
      <AddInventoryDialog open={inventoryDialogOpen} onOpenChange={setInventoryDialogOpen} />
      <AddSaleDialog open={saleDialogOpen} onOpenChange={setSaleDialogOpen} />
    </>
  );
}