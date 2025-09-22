import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { ShoppingCart, Plus } from 'lucide-react';

interface AddSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSaleDialog: React.FC<AddSaleDialogProps> = ({ open, onOpenChange }) => {
  const { addSale, generateQRCode, inventory } = useData();
  const [formData, setFormData] = useState({
    customer: '',
    phone: '',
    items: '',
    quantity: '',
    unitPrice: '',
    paymentMethod: 'Cash' as const,
    location: '',
    status: 'Processing' as const
  });

  const paymentMethods = ['Cash', 'GCash', 'Bank Transfer', 'Credit Card'];
  const locations = [
    'San Jose Market',
    'Mamburao Market',
    'Local Delivery',
    'Calapan Market',
    'Puerto Galera',
    'Store Pickup'
  ];

  const availableItems = inventory.filter(item => item.status === 'Active').map(item => item.items);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer || !formData.items || !formData.quantity || !formData.unitPrice) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quantity = parseInt(formData.quantity);
    const unitPrice = parseFloat(formData.unitPrice);
    
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    if (isNaN(unitPrice) || unitPrice <= 0) {
      toast.error('Please enter a valid unit price');
      return;
    }

    const totalAmount = quantity * unitPrice;
    const estimatedProfit = totalAmount * 0.25; // 25% profit margin

    const newSale = {
      customer: formData.customer,
      phone: formData.phone,
      items: `${formData.items} - ${quantity}kg`,
      quantity,
      unitPrice,
      totalAmount,
      profit: Math.round(estimatedProfit),
      paymentMethod: formData.paymentMethod,
      status: formData.status,
      date: new Date().toISOString().split('T')[0],
      qrCode: generateQRCode(),
      location: formData.location
    };

    addSale(newSale);
    toast.success('Sale recorded successfully!');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      customer: '',
      phone: '',
      items: '',
      quantity: '',
      unitPrice: '',
      paymentMethod: 'Cash',
      location: '',
      status: 'Processing'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Record New Sale
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer">Customer Name *</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                placeholder="e.g., Maria Santos Restaurant"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+63 917 123 4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="items">Items/Product *</Label>
            <Select
              value={formData.items}
              onValueChange={(value) => setFormData(prev => ({ ...prev, items: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product from inventory" />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map((item, index) => (
                  <SelectItem key={index} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Label htmlFor="unitPrice">Unit Price (₱) *</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, unitPrice: e.target.value }))}
                placeholder="0.00"
                min="0.01"
                required
              />
            </div>

            <div>
              <Label>Total Amount</Label>
              <Input
                value={formData.quantity && formData.unitPrice ? 
                  `₱${(parseFloat(formData.quantity) * parseFloat(formData.unitPrice)).toLocaleString()}` : 
                  '₱0.00'
                }
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Sale Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Estimated Profit</h4>
            <p className="text-sm text-muted-foreground">
              {formData.quantity && formData.unitPrice ? 
                `₱${Math.round((parseFloat(formData.quantity) * parseFloat(formData.unitPrice)) * 0.25).toLocaleString()} (25% margin)` : 
                '₱0.00'
              }
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Record Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};