import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { Package, Plus } from 'lucide-react';

interface AddInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddInventoryDialog: React.FC<AddInventoryDialogProps> = ({ open, onOpenChange }) => {
  const { addInventory, generateQRCode } = useData();
  const [formData, setFormData] = useState({
    supplier: '',
    items: '',
    quantity: '',
    unitCost: '',
    dateReceived: new Date().toISOString().split('T')[0],
    expiryDate: '',
    storageLocation: '',
    category: '',
    status: 'Active' as const
  });

  const marineSuppliers = [
    'Pacific Marine Suppliers Inc.',
    'Mindoro Seafood Trading',
    'Local Fishermen Coop',
    'Manila Bay Fisheries',
    'Batangas Fish Market',
    'Palawan Marine Products',
    'Visayas Seafood Express'
  ];

  const categories = [
    'Fish',
    'Shellfish',
    'Frozen Seafood',
    'Processed Seafood',
    'Live Seafood',
    'Marine Equipment',
    'Packaging Materials'
  ];

  const storageLocations = [
    'Cold Storage A-1',
    'Cold Storage A-2',
    'Freezer B-1',
    'Freezer B-2',
    'Dry Storage C-1',
    'Dry Storage C-2',
    'Live Tank D-1',
    'Live Tank D-2',
    'Equipment Room E-1'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supplier || !formData.items || !formData.quantity || !formData.unitCost) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quantity = parseInt(formData.quantity);
    const unitCost = parseFloat(formData.unitCost);
    
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    if (isNaN(unitCost) || unitCost <= 0) {
      toast.error('Please enter a valid unit cost');
      return;
    }

    const newItem = {
      supplier: formData.supplier,
      items: formData.items,
      quantity,
      unitCost,
      totalCost: quantity * unitCost,
      dateReceived: formData.dateReceived,
      expiryDate: formData.expiryDate || undefined,
      status: formData.status,
      qrCode: generateQRCode(),
      storageLocation: formData.storageLocation,
      category: formData.category
    };

    addInventory(newItem);
    toast.success('Inventory item added successfully!');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      supplier: '',
      items: '',
      quantity: '',
      unitCost: '',
      dateReceived: new Date().toISOString().split('T')[0],
      expiryDate: '',
      storageLocation: '',
      category: '',
      status: 'Active'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Add New Inventory Item
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supplier">Supplier *</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {marineSuppliers.map(supplier => (
                    <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="items">Items/Product Name *</Label>
            <Input
              id="items"
              value={formData.items}
              onChange={(e) => setFormData(prev => ({ ...prev, items: e.target.value }))}
              placeholder="e.g., Fresh Tuna (Yellowfin), Dried Squid, Live Crabs"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity (kg) *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0"
                min="1"
                required
              />
            </div>

            <div>
              <Label htmlFor="unitCost">Unit Cost (₱) *</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => setFormData(prev => ({ ...prev, unitCost: e.target.value }))}
                placeholder="0.00"
                min="0.01"
                required
              />
            </div>

            <div>
              <Label>Total Cost</Label>
              <Input
                value={formData.quantity && formData.unitCost ? 
                  `₱${(parseFloat(formData.quantity) * parseFloat(formData.unitCost)).toLocaleString()}` : 
                  '₱0.00'
                }
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="storageLocation">Storage Location</Label>
            <Select
              value={formData.storageLocation}
              onValueChange={(value) => setFormData(prev => ({ ...prev, storageLocation: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select storage location" />
              </SelectTrigger>
              <SelectContent>
                {storageLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateReceived">Date Received *</Label>
              <Input
                id="dateReceived"
                type="date"
                value={formData.dateReceived}
                onChange={(e) => setFormData(prev => ({ ...prev, dateReceived: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                min={formData.dateReceived}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};