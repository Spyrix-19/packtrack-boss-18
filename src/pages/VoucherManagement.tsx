import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Percent,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Copy,
  Eye,
  Users,
  TrendingUp,
  Gift
} from "lucide-react";

interface Voucher {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  validFrom: string;
  validTo: string;
  active: boolean;
  createdBy: string;
  createdAt: string;
}

const mockVouchers: Voucher[] = [
  {
    id: "VCH001",
    code: "WELCOME10",
    type: 'percentage',
    value: 10,
    description: "Welcome discount for new customers",
    minAmount: 1000,
    maxDiscount: 500,
    usageLimit: 100,
    usageCount: 23,
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    active: true,
    createdBy: "Admin",
    createdAt: "2024-01-01"
  },
  {
    id: "VCH002",
    code: "SAVE100",
    type: 'fixed',
    value: 100,
    description: "Fixed ₱100 discount",
    minAmount: 500,
    usageLimit: 50,
    usageCount: 12,
    validFrom: "2024-01-15",
    validTo: "2024-02-15",
    active: true,
    createdBy: "Admin", 
    createdAt: "2024-01-15"
  },
  {
    id: "VCH003",
    code: "BULK25",
    type: 'percentage',
    value: 25,
    description: "Bulk purchase discount",
    minAmount: 20000,
    maxDiscount: 5000,
    usageLimit: 20,
    usageCount: 5,
    validFrom: "2024-01-10",
    validTo: "2024-03-10",
    active: false,
    createdBy: "Admin",
    createdAt: "2024-01-10"
  }
];

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    description: "",
    minAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    validFrom: "",
    validTo: "",
    active: true
  });

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVouchers = vouchers.length;
  const activeVouchers = vouchers.filter(v => v.active).length;
  const totalUsage = vouchers.reduce((sum, v) => sum + v.usageCount, 0);
  const totalSavings = vouchers.reduce((sum, v) => {
    return sum + (v.type === 'fixed' ? v.value * v.usageCount : 0);
  }, 0);

  const getStatusColor = (voucher: Voucher) => {
    if (!voucher.active) return 'bg-secondary text-secondary-foreground';
    const today = new Date();
    const validTo = new Date(voucher.validTo);
    const validFrom = new Date(voucher.validFrom);
    
    if (validTo < today) return 'bg-destructive text-destructive-foreground';
    if (validFrom > today) return 'bg-warning text-warning-foreground';
    if (voucher.usageCount >= voucher.usageLimit) return 'bg-destructive text-destructive-foreground';
    return 'bg-success text-success-foreground';
  };

  const getStatusText = (voucher: Voucher) => {
    if (!voucher.active) return 'Inactive';
    const today = new Date();
    const validTo = new Date(voucher.validTo);
    const validFrom = new Date(voucher.validFrom);
    
    if (validTo < today) return 'Expired';
    if (validFrom > today) return 'Scheduled';
    if (voucher.usageCount >= voucher.usageLimit) return 'Limit Reached';
    return 'Active';
  };

  const handleCreateVoucher = () => {
    const voucher: Voucher = {
      id: `VCH${String(vouchers.length + 1).padStart(3, '0')}`,
      ...newVoucher,
      usageCount: 0,
      createdBy: "Admin",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVouchers([...vouchers, voucher]);
    setNewVoucher({
      code: "",
      type: 'percentage',
      value: 0,
      description: "",
      minAmount: 0,
      maxDiscount: 0,
      usageLimit: 0,
      validFrom: "",
      validTo: "",
      active: true
    });
    setDialogOpen(false);
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewVoucher({...newVoucher, code: result});
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleVoucherStatus = (id: string) => {
    setVouchers(vouchers.map(voucher =>
      voucher.id === id ? {...voucher, active: !voucher.active} : voucher
    ));
  };

  const deleteVoucher = (id: string) => {
    setVouchers(vouchers.filter(voucher => voucher.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Voucher Management</h1>
              <p className="text-muted-foreground">Create and manage discount vouchers for customers</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Voucher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Voucher</DialogTitle>
                  <DialogDescription>
                    Create a discount voucher for customer purchases
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Voucher Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="code"
                        placeholder="SAVE10"
                        value={newVoucher.code}
                        onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value.toUpperCase()})}
                      />
                      <Button variant="outline" onClick={generateRandomCode}>
                        Generate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Discount Type</Label>
                    <Select value={newVoucher.type} onValueChange={(value: 'percentage' | 'fixed') => setNewVoucher({...newVoucher, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount (₱)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {newVoucher.type === 'percentage' ? 'Percentage (%)' : 'Amount (₱)'}
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      value={newVoucher.value}
                      onChange={(e) => setNewVoucher({...newVoucher, value: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Minimum Purchase Amount (₱)</Label>
                    <Input
                      id="minAmount"
                      type="number"
                      value={newVoucher.minAmount}
                      onChange={(e) => setNewVoucher({...newVoucher, minAmount: Number(e.target.value)})}
                    />
                  </div>

                  {newVoucher.type === 'percentage' && (
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount">Maximum Discount (₱)</Label>
                      <Input
                        id="maxDiscount"
                        type="number"
                        value={newVoucher.maxDiscount}
                        onChange={(e) => setNewVoucher({...newVoucher, maxDiscount: Number(e.target.value)})}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={newVoucher.usageLimit}
                      onChange={(e) => setNewVoucher({...newVoucher, usageLimit: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validFrom">Valid From</Label>
                    <Input
                      id="validFrom"
                      type="date"
                      value={newVoucher.validFrom}
                      onChange={(e) => setNewVoucher({...newVoucher, validFrom: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validTo">Valid To</Label>
                    <Input
                      id="validTo"
                      type="date"
                      value={newVoucher.validTo}
                      onChange={(e) => setNewVoucher({...newVoucher, validTo: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the voucher..."
                      value={newVoucher.description}
                      onChange={(e) => setNewVoucher({...newVoucher, description: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center space-x-2">
                    <Switch
                      checked={newVoucher.active}
                      onCheckedChange={(checked) => setNewVoucher({...newVoucher, active: checked})}
                    />
                    <Label>Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateVoucher}>Create Voucher</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Gift className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{totalVouchers}</p>
                    <p className="text-muted-foreground">Total Vouchers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-12 w-12 text-success" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{activeVouchers}</p>
                    <p className="text-muted-foreground">Active Vouchers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-12 w-12 text-warning" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">{totalUsage}</p>
                    <p className="text-muted-foreground">Total Usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-12 w-12 text-success" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-card-foreground">₱{totalSavings.toLocaleString()}</p>
                    <p className="text-muted-foreground">Customer Savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vouchers by code or description..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vouchers List */}
          <Card>
            <CardHeader>
              <CardTitle>All Vouchers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVouchers.map((voucher) => (
                  <div key={voucher.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            {voucher.type === 'percentage' ? <Percent className="w-4 h-4 text-primary" /> : <DollarSign className="w-4 h-4 text-primary" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-card-foreground">{voucher.code}</h3>
                              <Badge className={getStatusColor(voucher)}>
                                {getStatusText(voucher)}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(voucher.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{voucher.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Discount:</p>
                            <p className="font-semibold text-card-foreground">
                              {voucher.type === 'percentage' ? `${voucher.value}%` : `₱${voucher.value}`}
                              {voucher.maxDiscount && voucher.type === 'percentage' && (
                                <span className="text-muted-foreground text-xs"> (max ₱{voucher.maxDiscount})</span>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Min Purchase:</p>
                            <p className="font-semibold text-card-foreground">₱{voucher.minAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Usage:</p>
                            <p className="font-semibold text-card-foreground">{voucher.usageCount}/{voucher.usageLimit}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Valid Until:</p>
                            <p className="font-semibold text-card-foreground">{voucher.validTo}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleVoucherStatus(voucher.id)}
                        >
                          <Switch checked={voucher.active} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteVoucher(voucher.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredVouchers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No vouchers found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VoucherManagement;