import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { Truck, Plus } from 'lucide-react';

interface AddShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddShipmentDialog: React.FC<AddShipmentDialogProps> = ({ open, onOpenChange }) => {
  const { addShipment, generateQRCode } = useData();
  const [formData, setFormData] = useState({
    destination: '',
    items: '',
    quantity: '',
    totalValue: '',
    estimatedArrival: '',
    trackingNumber: '',
    partner: '',
    vessel: '',
    status: 'Pending' as const
  });

  const destinations = [
    'Batangas Port',
    'Calapan City',
    'Puerto Galera',
    'Mamburao',
    'Manila Fish Port',
    'Palawan',
    'Cebu City',
    'Davao City'
  ];

  const partners = [
    'FastCargo Marine Services',
    'Island Express Logistics',
    'Manila Bay Shipping',
    'Mindoro Transport Co.',
    'Pacific Marine Cargo',
    'SeaLink Logistics',
    'Ocean Express Lines'
  ];

  const vessels = [
    'MV Sea Eagle',
    'MV Ocean Breeze',
    'MV Island Star',
    'MV Pacific Wind',
    'MV Manila Bay',
    'MV Mindoro Express',
    'MV Coastal Pride'
  ];

  const generateTrackingNumber = () => {
    const prefix = 'MMP';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.items || !formData.quantity || !formData.totalValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quantity = parseInt(formData.quantity);
    const totalValue = parseFloat(formData.totalValue);
    
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    if (isNaN(totalValue) || totalValue <= 0) {
      toast.error('Please enter a valid total value');
      return;
    }

    const newShipment = {
      destination: formData.destination,
      items: formData.items,
      quantity,
      totalValue,
      status: formData.status,
      estimatedArrival: formData.estimatedArrival,
      trackingNumber: formData.trackingNumber || generateTrackingNumber(),
      qrCode: generateQRCode(),
      partner: formData.partner,
      vessel: formData.vessel
    };

    addShipment(newShipment);
    toast.success('Shipment created successfully!');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      destination: '',
      items: '',
      quantity: '',
      totalValue: '',
      estimatedArrival: '',
      trackingNumber: '',
      partner: '',
      vessel: '',
      status: 'Pending'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Create New Shipment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Select
                value={formData.destination}
                onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimatedArrival">Estimated Arrival *</Label>
              <Input
                id="estimatedArrival"
                type="date"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedArrival: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="items">Items/Products *</Label>
            <Input
              id="items"
              value={formData.items}
              onChange={(e) => setFormData(prev => ({ ...prev, items: e.target.value }))}
              placeholder="e.g., Mixed Seafood Package, Fresh Fish Delivery"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="totalValue">Total Value (₱) *</Label>
              <Input
                id="totalValue"
                type="number"
                step="0.01"
                value={formData.totalValue}
                onChange={(e) => setFormData(prev => ({ ...prev, totalValue: e.target.value }))}
                placeholder="0.00"
                min="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="partner">Logistics Partner</Label>
              <Select
                value={formData.partner}
                onValueChange={(value) => setFormData(prev => ({ ...prev, partner: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  {partners.map(partner => (
                    <SelectItem key={partner} value={partner}>{partner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vessel">Vessel/Vehicle</Label>
              <Select
                value={formData.vessel}
                onValueChange={(value) => setFormData(prev => ({ ...prev, vessel: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vessel" />
                </SelectTrigger>
                <SelectContent>
                  {vessels.map(vessel => (
                    <SelectItem key={vessel} value={vessel}>{vessel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                placeholder="Auto-generated if empty"
              />
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Shipment Summary</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Destination: {formData.destination || 'Not selected'}</p>
              <p>Estimated Value: {formData.totalValue ? `₱${parseFloat(formData.totalValue).toLocaleString()}` : '₱0.00'}</p>
              <p>Tracking: {formData.trackingNumber || generateTrackingNumber()}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Shipment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};