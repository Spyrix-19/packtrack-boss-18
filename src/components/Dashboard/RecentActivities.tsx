import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, Users, DollarSign } from "lucide-react";

const activities = [
  {
    id: 1,
    type: 'inventory',
    message: 'New batch #B2024-001 added - Electronics from Supplier A',
    time: '2 hours ago',
    status: 'completed',
    icon: Package
  },
  {
    id: 2,
    type: 'sales',
    message: 'Order #ORD-2024-156 shipped via LBC',
    time: '4 hours ago',
    status: 'in-transit',
    icon: Truck
  },
  {
    id: 3,
    type: 'user',
    message: 'New rider assigned: John Doe (Flash Express)',
    time: '6 hours ago',
    status: 'active',
    icon: Users
  },
  {
    id: 4,
    type: 'finance',
    message: 'Daily profit report generated: ₱15,450',
    time: '8 hours ago',
    status: 'completed',
    icon: DollarSign
  },
];

const statusColors = {
  completed: 'bg-success text-success-foreground',
  'in-transit': 'bg-warning text-warning-foreground',
  active: 'bg-primary text-primary-foreground',
  pending: 'bg-secondary text-secondary-foreground'
};

export function RecentActivities() {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activities</h3>
        <Badge variant="secondary" className="text-xs">
          <Clock className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Icon className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground font-medium">
                  {activity.message}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Badge 
                    className={`text-xs ${statusColors[activity.status as keyof typeof statusColors]}`}
                    variant="secondary"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 text-sm text-primary-foreground font-medium py-2 bg-gradient-primary rounded-lg hover:opacity-90 transition-opacity">
        View All Activities
      </button>
    </div>
  );
}