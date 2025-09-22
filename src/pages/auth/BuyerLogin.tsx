import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, Eye, EyeOff, Fish } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const BuyerLogin = () => {
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
          description: 'Welcome! Start shopping for fresh seafood.',
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
    { email: 'maria@gmail.com', password: 'password', name: 'Maria Santos' },
    { email: 'pedro@gmail.com', password: 'password', name: 'Pedro Martinez' }
  ];

  const fillDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8">
            <Fish className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Buyer Portal</h1>
          <p className="text-xl mb-8 opacity-90">
            Fresh seafood delivered to your doorstep
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Fresh daily catch selection</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Real-time order tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Fast & reliable delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Buyer Portal</h1>
            <p className="text-muted-foreground">Jan Jan Marine Products</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Customer Login</h1>
            <p className="text-muted-foreground">Shop for fresh seafood</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Customer Access</CardTitle>
              <CardDescription>Enter your account details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
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
                  <Label className="text-sm text-muted-foreground">Demo Customer Accounts:</Label>
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
                  {isLoading ? 'Signing in...' : 'Start Shopping'}
                </Button>
                
                <div className="flex flex-col sm:flex-row items-center justify-between w-full text-sm gap-2">
                  <Link 
                    to="/forgot-password" 
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                  <Link 
                    to="/buyer-signup" 
                    className="text-primary hover:underline"
                  >
                    Create new account
                  </Link>
                </div>
                
                <div className="text-center text-xs text-muted-foreground">
                  Business account? 
                  <Link to="/owner-login" className="text-primary hover:underline ml-1">Owner</Link> | 
                  <Link to="/staff-login" className="text-primary hover:underline ml-1">Staff</Link> | 
                  <Link to="/rider-login" className="text-primary hover:underline ml-1">Rider</Link>
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

export default BuyerLogin;