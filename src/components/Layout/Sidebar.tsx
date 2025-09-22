import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  MapPin, 
  BarChart3, 
  Users, 
  User,
  QrCode,
  Building2,
  LogOut
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory & Procurement', href: '/inventory-batch', icon: Package },
  { name: 'Sales & Reselling', href: '/pos-sales', icon: ShoppingCart },
  { name: 'Partner Logistics', href: '/logistics', icon: Building2 },
  { name: 'Tracking', href: '/tracking', icon: MapPin },
  { name: 'Finance & Reporting', href: '/finance', icon: BarChart3 },
  { name: 'User & Role Management', href: '/users', icon: Users },
  { name: 'Voucher Management', href: '/vouchers', icon: QrCode },
  { name: 'Profile', href: '/profile', icon: User },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Show sidebar for OWNER role
  if (!user || user.role !== 'OWNER') {
    return null;
  }

  return (
    <div className={cn("flex flex-col w-64 bg-card border-r border-border", className)}>
      <div className="flex items-center h-16 px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <QrCode className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">Admin Portal</h1>
            <p className="text-xs text-muted-foreground">Business Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:text-card-foreground hover:bg-secondary"
              )}
            >
              <Icon className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-card-foreground"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}