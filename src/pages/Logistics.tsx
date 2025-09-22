import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Building2, 
  Truck, 
  Users,
  Phone,
  MapPin,
  Star,
  Eye,
  Edit,
  Trash2,
  UserPlus
} from "lucide-react";

const partners = [
  {
    id: "LBC001",
    name: "LBC Express",
    type: "Logistics Partner",
    contactPerson: "Maria Rodriguez",
    phone: "+63 2 8858 5999",
    email: "partnerships@lbc.ph",
    address: "LBC Building, 1598 F.B. Harrison St, Pasay City",
    coverage: "Nationwide",
    rating: 4.5,
    activeRiders: 12,
    status: "Active"
  },
  {
    id: "FLE001",
    name: "Flash Express",
    type: "Logistics Partner", 
    contactPerson: "John Santos",
    phone: "+63 2 7902 3456",
    email: "business@flashexpress.ph",
    address: "Flash Hub, BGC Central, Taguig City",
    coverage: "Metro Manila & Luzon",
    rating: 4.2,
    activeRiders: 8,
    status: "Active"
  },
  {
    id: "JNT001",
    name: "J&T Express",
    type: "Logistics Partner",
    contactPerson: "Lisa Chen",
    phone: "+63 2 8234 5678",
    email: "corporate@jtexpress.ph", 
    address: "J&T Center, EDSA Guadalupe, Makati City",
    coverage: "Nationwide",
    rating: 4.3,
    activeRiders: 15,
    status: "Active"
  }
];

const riders = [
  {
    id: "RDR001",
    name: "Miguel Santos",
    partner: "LBC Express",
    phone: "+63 917 123 4567",
    vehicleType: "Motorcycle",
    licenseNumber: "123-ABC-2024",
    rating: 4.8,
    totalDeliveries: 234,
    status: "Available",
    currentLocation: "Makati City"
  },
  {
    id: "RDR002", 
    name: "Carlos Garcia",
    partner: "Flash Express",
    phone: "+63 908 987 6543",
    vehicleType: "Van",
    licenseNumber: "456-DEF-2024",
    rating: 4.6,
    totalDeliveries: 189,
    status: "On Delivery",
    currentLocation: "BGC, Taguig"
  },
  {
    id: "RDR003",
    name: "Roberto Cruz",
    partner: "J&T Express",
    phone: "+63 929 555 1234",
    vehicleType: "Motorcycle", 
    licenseNumber: "789-GHI-2024",
    rating: 4.9,
    totalDeliveries: 312,
    status: "Available",
    currentLocation: "Quezon City"
  }
];

const Logistics = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Available': return 'bg-success text-success-foreground';
      case 'On Delivery': return 'bg-warning text-warning-foreground';
      case 'Inactive': return 'bg-destructive text-destructive-foreground';
      case 'Offline': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={i < Math.floor(rating) ? "w-4 h-4 fill-yellow-400 text-yellow-400" : "w-4 h-4 text-gray-300"}
      />
    ));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Partner Logistics</h1>
              <p className="text-muted-foreground">Manage shipping partners and rider assignments</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Rider
              </Button>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                    <p className="text-2xl font-bold text-card-foreground">{partners.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Riders</p>
                    <p className="text-2xl font-bold text-card-foreground">{riders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Available Riders</p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {riders.filter(r => r.status === 'Available').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold text-card-foreground">4.7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Companies Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Logistics Partners</CardTitle>
              <CardDescription>
                Manage your shipping and delivery partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-card-foreground">{partner.name}</h3>
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(partner.rating)}
                            <span className="text-sm text-muted-foreground ml-1">({partner.rating})</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Contact Person:</p>
                            <p className="font-medium text-card-foreground">{partner.contactPerson}</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {partner.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Coverage & Riders:</p>
                            <p className="font-medium text-card-foreground">{partner.coverage}</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {partner.activeRiders} Active Riders
                            </p>
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
          <Card>
            <CardHeader>
              <CardTitle>Riders</CardTitle>
              <CardDescription>
                View and manage individual riders across all partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input className="pl-10" placeholder="Search riders by name, partner, or location..." />
                </div>
              </div>
              
              <div className="space-y-4">
                {riders.map((rider) => (
                  <div key={rider.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-card-foreground">{rider.name}</h3>
                          <Badge className={getStatusColor(rider.status)}>
                            {rider.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(rider.rating)}
                            <span className="text-sm text-muted-foreground ml-1">({rider.rating})</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Partner & Contact:</p>
                            <p className="font-medium text-card-foreground">{rider.partner}</p>
                            <p className="text-muted-foreground">{rider.phone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Vehicle & License:</p>
                            <p className="font-medium text-card-foreground">{rider.vehicleType}</p>
                            <p className="text-muted-foreground">{rider.licenseNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Performance:</p>
                            <p className="font-medium text-card-foreground">{rider.totalDeliveries} deliveries</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {rider.currentLocation}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4" />
                        </Button>
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

export default Logistics;