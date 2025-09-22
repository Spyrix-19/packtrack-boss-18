import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Truck, Eye, EyeOff, Navigation } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const RiderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Login successful',
          description: 'Ready to start deliveries!',
        });
        navigate('/');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'rider1@janjanmarine.com', password: 'password', name: 'Miguel Torres' },
    { email: 'rider2@janjanmarine.com', password: 'password', name: 'Carlos Rivera' }
  ];

  const fillDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8">
            <Truck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Rider Portal</h1>
          <p className="text-xl mb-8 opacity-90">
            Deliver fresh seafood to happy customers
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <Navigation className="w-5 h-5" />
              <span>GPS-enabled deliveries</span>
            </div>
            <div className="flex items-center space-x-3">
              <Navigation className="w-5 h-5" />
              <span>Real-time order tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <Navigation className="w-5 h-5" />
              <span>Earnings & performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Rider Portal</h1>
            <p className="text-muted-foreground">Jan Jan Marine Products</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Rider Login</h1>
            <p className="text-muted-foreground">Access your delivery dashboard</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Delivery Access</CardTitle>
              <CardDescription>Enter your rider credentials</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Rider Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rider@janjanmarine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Demo Accounts */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Demo Rider Accounts:</Label>
                  <div className="grid gap-2">
                    {demoAccounts.map((account) => (
                      <Button
                        key={account.email}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillDemoAccount(account.email)}
                        className="text-xs justify-start"
                      >
                        {account.name}: {account.email}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Start Delivering'}
                </Button>
                
                <div className="flex items-center justify-between w-full text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                  <div className="text-muted-foreground">
                    Other roles: 
                    <Link to="/owner-login" className="text-primary hover:underline ml-1">Owner</Link> | 
                    <Link to="/staff-login" className="text-primary hover:underline ml-1">Staff</Link> | 
                    <Link to="/buyer-login" className="text-primary hover:underline ml-1">Buyer</Link>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            © 2024 JAN JAN MARINE PRODUCTS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;