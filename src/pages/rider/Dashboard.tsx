import { RiderNav } from "@/components/Layout/RiderNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Navigation,
  Phone,
  Star
} from "lucide-react";

const RiderDashboard = () => {
  const { riderDeliveries, acceptDelivery, updateDeliveryStatus, user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ASSIGNED': return 'bg-warning text-warning-foreground';
      case 'ACCEPTED': return 'bg-primary text-primary-foreground';
      case 'PICKED_UP': return 'bg-info text-info-foreground';
      case 'IN_TRANSIT': return 'bg-info text-info-foreground';
      case 'DELIVERED': return 'bg-success text-success-foreground';
      case 'RETURNED': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const todaysDeliveries = riderDeliveries.filter(delivery => {
    const today = new Date().toDateString();
    const assignedDate = new Date(delivery.assignedAt).toDateString();
    return today === assignedDate;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <RiderNav />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Rider Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Today's Deliveries</p>
                    <p className="text-2xl font-bold text-card-foreground">{todaysDeliveries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {riderDeliveries.filter(d => d.status === 'DELIVERED').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {riderDeliveries.filter(d => ['ASSIGNED', 'ACCEPTED'].includes(d.status)).length}
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
                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold text-card-foreground">4.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Assignments</CardTitle>
              <CardDescription>
                Manage your assigned deliveries and update status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riderDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-card-foreground">{delivery.id}</h3>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{delivery.item}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{delivery.quantity}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pickup</p>
                        <p className="font-medium text-card-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {delivery.pickupAddress}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {delivery.sellerPhone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Delivery</p>
                        <p className="font-medium text-card-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {delivery.deliveryAddress}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {delivery.buyerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {delivery.status === 'ASSIGNED' && (
                        <Button 
                          size="sm" 
                          onClick={() => acceptDelivery(delivery.id)}
                          className="bg-gradient-primary"
                        >
                          Accept Delivery
                        </Button>
                      )}
                      
                      {delivery.status === 'ACCEPTED' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateDeliveryStatus(delivery.id, 'PICKED_UP')}
                        >
                          Mark Picked Up
                        </Button>
                      )}
                      
                      {delivery.status === 'PICKED_UP' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateDeliveryStatus(delivery.id, 'IN_TRANSIT')}
                        >
                          Start Delivery
                        </Button>
                      )}
                      
                      {delivery.status === 'IN_TRANSIT' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateDeliveryStatus(delivery.id, 'DELIVERED')}
                          className="bg-success text-success-foreground"
                        >
                          Mark Delivered
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
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

export default RiderDashboard;