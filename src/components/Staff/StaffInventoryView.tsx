import { useState } from "react";
import { StaffNav } from "@/components/Layout/StaffNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useData } from "@/contexts/DataContext";
import { AddInventoryDialog } from "@/components/Forms/AddInventoryDialog";
import InventoryDetailsDialog from "@/components/Inventory/InventoryDetailsDialog";
import { 
  Package, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  QrCode,
  Filter,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StaffInventoryView = () => {
  const { inventory, deleteInventory, updateInventory, addInventory } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(batch => {
    const matchesSearch = batch.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || batch.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Low Stock': return 'bg-warning text-warning-foreground';
      case 'Out of Stock': return 'bg-destructive text-destructive-foreground';
      case 'Expired': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleEdit = (batch: any) => {
    const updatedBatch = {
      ...batch,
      dateReceived: new Date().toISOString()
    };
    // For demo purposes, just show an alert
    alert(`Batch ${batch.id} updated successfully!`);
  };

  const handleDelete = (batchId: string) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      // For demo purposes, just show an alert
      alert(`Batch ${batchId} deleted successfully!`);
    }
  };

  const handleViewDetails = (batch: any) => {
    setSelectedBatch(batch);
    setIsDetailsDialogOpen(true);
  };

  const handleViewQR = (batch: any) => {
    // Generate QR code data
    const qrData = JSON.stringify({
      id: batch.id,
      items: batch.items,
      supplier: batch.supplier,
      expiryDate: batch.expiryDate
    });
    
    // In a real app, you'd show a QR code dialog
    alert(`QR Code Data: ${qrData}`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StaffNav />
      
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage stock levels and batch information</p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product or batch ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-primary text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Batch
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Batches</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">{inventory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">
                      {inventory.filter(b => b.status === 'Active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-warning" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Low Stock</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">
                      {inventory.filter(b => b.status === 'Low Stock').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-destructive" />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Out of Stock</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">
                      {inventory.filter(b => b.status === 'Out of Stock').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredInventory.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                  <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg">{batch.items}</CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground">ID: {batch.id}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(batch)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(batch)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Batch
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewQR(batch)}>
                          <QrCode className="mr-2 h-4 w-4" />
                          View QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(batch.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Quantity</span>
                        <p className="font-medium">{batch.quantity}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unit Cost</span>
                        <p className="font-medium">₱{batch.unitCost.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Expires</span>
                      <p className="font-medium">{new Date(batch.expiryDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total Value</span>
                      <p className="font-semibold text-primary">₱{batch.totalCost.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredInventory.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No inventory batches found</p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Batch
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <AddInventoryDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
      
      <InventoryDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        batch={selectedBatch}
      />
    </div>
  );
};

export default StaffInventoryView;