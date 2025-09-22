import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  MapPin, 
  Calendar, 
  DollarSign, 
  User, 
  QrCode,
  Edit,
  Trash2
} from "lucide-react";

interface InventoryBatch {
  id: string;
  supplier: string;
  items: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  dateReceived: string;
  expiryDate?: string;
  status: 'Active' | 'Low Stock' | 'Out of Stock' | 'Expired';
  qrCode: string;
  storageLocation: string;
  category: string;
}

interface InventoryDetailsDialogProps {
  batch: InventoryBatch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (batch: InventoryBatch) => void;
  onDelete?: (id: string) => void;
}

const InventoryDetailsDialog = ({ 
  batch, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}: InventoryDetailsDialogProps) => {
  if (!batch) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Low Stock': return 'destructive';
      case 'Out of Stock': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'default';
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(batch.id);
      onOpenChange(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(batch);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Batch Details
          </DialogTitle>
          <DialogDescription>
            Complete information for batch {batch.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{batch.id}</h3>
              <p className="text-muted-foreground">{batch.items}</p>
            </div>
            <Badge variant={getStatusColor(batch.status) as any}>
              {batch.status}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Supplier Information</span>
                </div>
                <p className="text-sm">{batch.supplier}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Quantity & Category</span>
                </div>
                <p className="text-sm">{batch.quantity} kg</p>
                <p className="text-xs text-muted-foreground">{batch.category}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Cost Information</span>
                </div>
                <p className="text-sm">Unit: ₱{batch.unitCost.toLocaleString()}</p>
                <p className="text-sm font-semibold">Total: ₱{batch.totalCost.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Storage Location</span>
                </div>
                <p className="text-sm">{batch.storageLocation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Important Dates</span>
                </div>
                <p className="text-sm">Received: {batch.dateReceived}</p>
                {batch.expiryDate && (
                  <p className="text-sm">Expires: {batch.expiryDate}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">QR Code</span>
                </div>
                <p className="text-sm font-mono">{batch.qrCode}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Batch
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Batch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDetailsDialog;