import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2,
  Calendar,
  Crown,
  Shield,
  Edit,
  Save,
  Camera,
  Key,
  Bell,
  Download
} from "lucide-react";

const Profile = () => {
  const ownerInfo = {
    name: "Business Owner",
    email: "admin@business.com",
    phone: "+63 917 123 4567",
    address: "123 Business District, Makati City, Philippines",
    businessName: "PackTrack Boss Enterprise",
    businessType: "E-commerce & Retail",
    dateJoined: "2023-06-15",
    lastLogin: "2024-01-15 10:30 AM",
    role: "Owner",
    permissions: "Full Access"
  };

  const businessStats = {
    totalSales: 171200,
    totalProfit: 65700,
    totalCustomers: 156,
    activeStaff: 3,
    totalShipments: 245
  };

  const recentActivity = [
    { action: "Updated inventory batch BTH001", timestamp: "2024-01-15 09:45 AM" },
    { action: "Approved new staff member", timestamp: "2024-01-14 03:30 PM" },
    { action: "Generated monthly financial report", timestamp: "2024-01-14 11:20 AM" },
    { action: "Added new logistics partner", timestamp: "2024-01-13 02:15 PM" },
    { action: "Updated system settings", timestamp: "2024-01-13 10:00 AM" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account and business information</p>
            </div>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <User className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80"
                      variant="outline"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    {ownerInfo.name}
                  </CardTitle>
                  <CardDescription>
                    <Badge className="bg-primary text-primary-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      {ownerInfo.role}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">{ownerInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">{ownerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">{ownerInfo.businessName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">Joined {ownerInfo.dateJoined}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Quick Stats</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-secondary rounded">
                        <p className="font-bold text-success">₱{businessStats.totalProfit.toLocaleString()}</p>
                        <p className="text-muted-foreground">Profit</p>
                      </div>
                      <div className="text-center p-2 bg-secondary rounded">
                        <p className="font-bold text-primary">{businessStats.totalCustomers}</p>
                        <p className="text-muted-foreground">Customers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={ownerInfo.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={ownerInfo.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={ownerInfo.phone} />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue={ownerInfo.role} disabled />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={ownerInfo.address} />
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription>Manage your business details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input id="businessName" defaultValue={ownerInfo.businessName} />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Input id="businessType" defaultValue={ownerInfo.businessType} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea 
                      id="businessDescription" 
                      placeholder="Describe your business activities and focus areas..."
                      defaultValue="E-commerce and retail business focusing on electronics, fashion, and home appliances with integrated inventory management and delivery tracking."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Account Activity</CardTitle>
                  <CardDescription>Your recent actions and system usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Last Login</p>
                        <p className="font-medium text-card-foreground">{ownerInfo.lastLogin}</p>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Account Status</p>
                        <Badge className="bg-success text-success-foreground mt-1">Active</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-card-foreground mb-3">Recent Actions</p>
                      <div className="space-y-2">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex justify-between items-center py-2 px-3 bg-secondary/50 rounded text-sm">
                            <span className="text-card-foreground">{activity.action}</span>
                            <span className="text-muted-foreground">{activity.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Permissions
                  </CardTitle>
                  <CardDescription>Your access levels and system capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-card-foreground">Administrative Access</p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="bg-success/10 text-success">
                          <Shield className="w-3 h-3 mr-1" />
                          Full System Access
                        </Badge>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          User Management
                        </Badge>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          Financial Reports
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-card-foreground">Operations Access</p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="bg-success/10 text-success">
                          Inventory Management
                        </Badge>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          Sales & Orders
                        </Badge>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          Logistics Control
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;