import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Clipboard, Truck, Fish, ArrowRight } from 'lucide-react';

const LoginSelector = () => {
  const roles = [
    {
      role: 'OWNER',
      title: 'Business Owner',
      description: 'Full system access and management',
      icon: Crown,
      path: '/owner-login',
      color: 'from-primary via-primary/90 to-primary/80',
      features: ['Complete business oversight', 'Financial management', 'Staff management']
    },
    {
      role: 'STAFF',
      title: 'Staff Member',
      description: 'Daily operations and customer service',
      icon: Clipboard,
      path: '/staff-login',
      color: 'from-blue-600 via-blue-700 to-blue-800',
      features: ['Inventory management', 'Sales processing', 'Customer assistance']
    },
    {
      role: 'RIDER',
      title: 'Delivery Rider',
      description: 'Order delivery and logistics',
      icon: Truck,
      path: '/rider-login',
      color: 'from-green-600 via-green-700 to-green-800',
      features: ['GPS deliveries', 'Order tracking', 'Earnings dashboard']
    },
    {
      role: 'BUYER',
      title: 'Customer',
      description: 'Shop for fresh seafood',
      icon: Fish,
      path: '/buyer-login',
      color: 'from-orange-500 via-orange-600 to-orange-700',
      features: ['Browse products', 'Order tracking', 'Fast delivery']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Fish className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">JAN JAN MARINE PRODUCTS</h1>
          <p className="text-xl text-muted-foreground mb-2">Choose Your Login Portal</p>
          <p className="text-muted-foreground">Select your role to access the appropriate dashboard</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card key={role.role} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${role.color} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription className="text-sm">{role.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link to={role.path} className="flex items-center justify-center">
                      Login as {role.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Demo Access */}
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Demo Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/owner-login">
                <Crown className="w-4 h-4 mr-2" />
                Owner Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/staff-login">
                <Clipboard className="w-4 h-4 mr-2" />
                Staff Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/rider-login">
                <Truck className="w-4 h-4 mr-2" />
                Rider Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/buyer-login">
                <Fish className="w-4 h-4 mr-2" />
                Customer Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            © 2024 JAN JAN MARINE PRODUCTS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;