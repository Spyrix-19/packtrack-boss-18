import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Users as UsersIcon, 
  Shield,
  User,
  Crown,
  Truck,
  ShoppingBag,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail
} from "lucide-react";

const staff = [
  {
    id: "STF001",
    name: "Sarah Martinez",
    email: "sarah.martinez@business.com",
    phone: "+63 917 111 2222",
    role: "Staff",
    department: "Inventory Management",
    dateHired: "2023-08-15",
    status: "Active",
    permissions: ["Inventory View", "Sales Entry", "Customer Management"]
  },
  {
    id: "STF002",
    name: "Michael Santos",
    email: "michael.santos@business.com", 
    phone: "+63 908 333 4444",
    role: "Staff",
    department: "Sales & Customer Service",
    dateHired: "2023-10-01",
    status: "Active",
    permissions: ["Sales Entry", "Customer Management", "Order Processing"]
  },
  {
    id: "STF003",
    name: "Lisa Chen",
    email: "lisa.chen@business.com",
    phone: "+63 929 555 6666",
    role: "Staff",
    department: "Finance & Reporting",
    dateHired: "2023-12-01",
    status: "Inactive",
    permissions: ["Financial Reports", "Expense Management"]
  }
];

const riders = [
  {
    id: "RDR001",
    name: "Miguel Santos",
    email: "miguel.rider@lbc.ph",
    phone: "+63 917 123 4567",
    role: "Rider",
    partner: "LBC Express",
    vehicleType: "Motorcycle",
    licenseNumber: "123-ABC-2024",
    rating: 4.8,
    totalDeliveries: 234,
    status: "Active"
  },
  {
    id: "RDR002",
    name: "Carlos Garcia",
    email: "carlos.rider@flash.ph",
    phone: "+63 908 987 6543",
    role: "Rider", 
    partner: "Flash Express",
    vehicleType: "Van",
    licenseNumber: "456-DEF-2024",
    rating: 4.6,
    totalDeliveries: 189,
    status: "Active"
  }
];

const buyers = [
  {
    id: "BYR001",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 111 2222",
    role: "Buyer",
    address: "123 Rizal St, Makati City",
    totalOrders: 15,
    totalSpent: 145000,
    lastOrder: "2024-01-15",
    status: "Active",
    preferredPayment: "GCash"
  },
  {
    id: "BYR002",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "+63 908 333 4444",
    role: "Buyer",
    address: "456 Bonifacio Ave, Quezon City",
    totalOrders: 8,
    totalSpent: 89000,
    lastOrder: "2024-01-14",
    status: "Active",
    preferredPayment: "Cash"
  },
  {
    id: "BYR003",
    name: "Ana Garcia",
    email: "ana.garcia@email.com",
    phone: "+63 929 555 6666",
    role: "Buyer",
    address: "789 Ortigas Center, Pasig City",
    totalOrders: 12,
    totalSpent: 178000,
    lastOrder: "2024-01-13",
    status: "VIP",
    preferredPayment: "GCash"
  }
];

const Users = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'VIP': return 'bg-primary text-primary-foreground';
      case 'Inactive': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner': return <Crown className="w-4 h-4" />;
      case 'Staff': return <Shield className="w-4 h-4" />;
      case 'Rider': return <Truck className="w-4 h-4" />;
      case 'Buyer': return <ShoppingBag className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const allUsers = [...staff, ...riders, ...buyers];
  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter(user => user.status === 'Active').length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User & Role Management</h1>
              <p className="text-muted-foreground">Manage staff, riders, and customer accounts</p>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Add User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Add Staff</SelectItem>
                  <SelectItem value="rider">Add Rider</SelectItem>
                  <SelectItem value="buyer">Add Buyer</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <UsersIcon className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-card-foreground">{totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Staff Members</p>
                    <p className="text-2xl font-bold text-card-foreground">{staff.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Riders</p>
                    <p className="text-2xl font-bold text-card-foreground">{riders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Registered Buyers</p>
                    <p className="text-2xl font-bold text-card-foreground">{buyers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input className="pl-10" placeholder="Search users by name, email, or role..." />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Staff Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Staff Members
              </CardTitle>
              <CardDescription>Internal team members with system access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getRoleIcon(member.role)}
                          <h3 className="font-semibold text-card-foreground">{member.name}</h3>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Contact Information</p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {member.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Work Details</p>
                            <p className="text-card-foreground">{member.department}</p>
                            <p className="text-muted-foreground">Hired: {member.dateHired}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-muted-foreground text-xs mb-1">Permissions:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open('/pos-sales', '_blank')}
                        >
                          POS
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Riders Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery Riders
              </CardTitle>
              <CardDescription>Partner logistics riders for deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riders.map((rider) => (
                  <div key={rider.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getRoleIcon(rider.role)}
                          <h3 className="font-semibold text-card-foreground">{rider.name}</h3>
                          <Badge className={getStatusColor(rider.status)}>
                            {rider.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">Rating: {rider.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Contact & Partner</p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {rider.email}
                            </p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {rider.phone}
                            </p>
                            <p className="text-muted-foreground">Partner: {rider.partner}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Vehicle & Performance</p>
                            <p className="text-card-foreground">{rider.vehicleType}</p>
                            <p className="text-muted-foreground">License: {rider.licenseNumber}</p>
                            <p className="text-muted-foreground">{rider.totalDeliveries} deliveries</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buyers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Registered Buyers
              </CardTitle>
              <CardDescription>Customer accounts and purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buyers.map((buyer) => (
                  <div key={buyer.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getRoleIcon(buyer.role)}
                          <h3 className="font-semibold text-card-foreground">{buyer.name}</h3>
                          <Badge className={getStatusColor(buyer.status)}>
                            {buyer.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Contact Information</p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {buyer.email}
                            </p>
                            <p className="text-card-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {buyer.phone}
                            </p>
                            <p className="text-muted-foreground">{buyer.address}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Purchase History</p>
                            <p className="text-card-foreground">{buyer.totalOrders} orders</p>
                            <p className="text-success font-medium">₱{buyer.totalSpent.toLocaleString()} spent</p>
                            <p className="text-muted-foreground">Last order: {buyer.lastOrder}</p>
                            <p className="text-muted-foreground">Prefers: {buyer.preferredPayment}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Users;