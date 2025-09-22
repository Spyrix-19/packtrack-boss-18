import { Sidebar } from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Truck, 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Navigation,
  Eye,
  MessageSquare
} from "lucide-react";

const shipments = [
  {
    id: "SHP001",
    qrCode: "QR_SHP001",
    customerName: "Maria Santos",
    customerAddress: "123 Rizal St, Makati City",
    items: "iPhone 14 Pro",
    rider: "Miguel Santos",
    partner: "LBC Express",
    status: "In Transit",
    currentLocation: "EDSA Guadalupe",
    estimatedDelivery: "2024-01-16 2:00 PM",
    lastUpdate: "2024-01-15 10:30 AM",
    progress: 60
  },
  {
    id: "SHP002", 
    qrCode: "QR_SHP002",
    customerName: "Juan Dela Cruz",
    customerAddress: "456 Bonifacio Ave, Quezon City",
    items: "Samsung Galaxy S23, Wireless Earbuds",
    rider: "Carlos Garcia",
    partner: "Flash Express",
    status: "Packed",
    currentLocation: "Flash Hub BGC",
    estimatedDelivery: "2024-01-16 4:00 PM",
    lastUpdate: "2024-01-15 9:15 AM",
    progress: 25
  },
  {
    id: "SHP003",
    qrCode: "QR_SHP003",
    customerName: "Ana Garcia",
    customerAddress: "789 Ortigas Center, Pasig City",
    items: "MacBook Air M2",
    rider: "Roberto Cruz",
    partner: "J&T Express",
    status: "Delivered",
    currentLocation: "Delivered",
    estimatedDelivery: "2024-01-15 3:00 PM",
    lastUpdate: "2024-01-15 2:45 PM",
    progress: 100
  },
  {
    id: "SHP004",
    qrCode: "QR_SHP004",
    customerName: "Pedro Reyes",
    customerAddress: "321 Shaw Blvd, Mandaluyong City",
    items: "Gaming Laptop",
    rider: "Miguel Santos",
    partner: "LBC Express",
    status: "Returned",
    currentLocation: "LBC Hub",
    estimatedDelivery: "Failed Delivery",
    lastUpdate: "2024-01-14 4:30 PM",
    progress: 0,
    returnReason: "Customer not available"
  }
];

const Tracking = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-success text-success-foreground';
      case 'In Transit': return 'bg-warning text-warning-foreground';
      case 'Packed': return 'bg-primary text-primary-foreground';
      case 'Cancelled': return 'bg-destructive text-destructive-foreground';
      case 'Returned': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Packed': return <Package className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      case 'Returned': return <RotateCcw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusCounts = shipments.reduce((acc, shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tracking & Monitoring</h1>
              <p className="text-muted-foreground">Real-time shipment tracking and delivery management</p>
            </div>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <MapPin className="w-4 h-4 mr-2" />
              View Global Map
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Packed</p>
                    <p className="text-2xl font-bold text-card-foreground">{statusCounts['Packed'] || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                    <p className="text-2xl font-bold text-card-foreground">{statusCounts['In Transit'] || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                    <p className="text-2xl font-bold text-card-foreground">{statusCounts['Delivered'] || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <RotateCcw className="w-8 h-8 text-secondary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Returned</p>
                    <p className="text-2xl font-bold text-card-foreground">{statusCounts['Returned'] || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <XCircle className="w-8 h-8 text-destructive" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                    <p className="text-2xl font-bold text-card-foreground">{statusCounts['Cancelled'] || 0}</p>
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
                  <Input className="pl-10" placeholder="Search by shipment ID, customer, or QR code..." />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="packed">Packed</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Partners</SelectItem>
                    <SelectItem value="lbc">LBC Express</SelectItem>
                    <SelectItem value="flash">Flash Express</SelectItem>
                    <SelectItem value="jnt">J&T Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Shipments Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Live Shipment Tracking</CardTitle>
              <CardDescription>
                Real-time tracking of all shipments with QR code integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-card-foreground">{shipment.id}</h3>
                          <Badge className={getStatusColor(shipment.status)}>
                            {getStatusIcon(shipment.status)}
                            {shipment.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                            {shipment.qrCode}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Customer & Delivery</p>
                            <p className="font-medium text-card-foreground">{shipment.customerName}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {shipment.customerAddress}
                            </p>
                            <p className="text-sm text-muted-foreground">Items: {shipment.items}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Rider & Partner</p>
                            <p className="font-medium text-card-foreground">{shipment.rider}</p>
                            <p className="text-sm text-muted-foreground">{shipment.partner}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Navigation className="w-3 h-3" />
                              {shipment.currentLocation}
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Delivery Progress</span>
                            <span className="text-muted-foreground">{shipment.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${shipment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
                          <span>Last Update: {shipment.lastUpdate}</span>
                          <span>
                            {shipment.status === 'Returned' ? `Reason: ${shipment.returnReason}` : 
                             `ETA: ${shipment.estimatedDelivery}`}
                          </span>
                        </div>
                        
                        {shipment.status === 'Returned' && (
                          <div className="mt-2 p-2 bg-secondary rounded text-sm">
                            <span className="text-destructive font-medium">Return Reason: </span>
                            {shipment.returnReason}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
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

export default Tracking;