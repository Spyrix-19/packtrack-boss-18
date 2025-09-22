import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthWrapper } from "@/components/Layout/AuthWrapper";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import EnhancedSales from "./pages/EnhancedSales";
import StaffInventoryView from "./components/Staff/StaffInventoryView";
import StaffSalesView from "./components/Staff/StaffSalesView";
import Logistics from "./pages/Logistics";
import Tracking from "./pages/Tracking";
import Finance from "./pages/Finance";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import LoginSelector from "./pages/auth/LoginSelector";
import OwnerLogin from "./pages/auth/OwnerLogin";
import StaffLogin from "./pages/auth/StaffLogin";
import RiderLogin from "./pages/auth/RiderLogin";
import BuyerLogin from "./pages/auth/BuyerLogin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import RiderDashboard from "./pages/rider/Dashboard";
import BuyerDashboard from "./pages/buyer/Dashboard";
import StaffDashboard from "./pages/staff/Dashboard";
import OwnerDashboard from "./pages/owner/Dashboard";
import AssignmentManagement from "./pages/AssignmentManagement";
import GPSTracking from "./pages/GPSTracking";
import OrderTracking from "./pages/OrderTracking";
import FeedbackManagement from "./pages/FeedbackManagement";
import InventoryBatch from "./pages/InventoryBatch";
import POSSales from "./pages/POSSales";
import VoucherManagement from "./pages/VoucherManagement";
import RiderProfile from "./pages/RiderProfile";
import BuyerProfile from "./pages/BuyerProfile";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <AuthWrapper requireAuth={false}>
                <LoginSelector />
              </AuthWrapper>
            } 
          />
          
          {/* Role-specific Login Routes */}
          <Route 
            path="/owner-login" 
            element={
              <AuthWrapper requireAuth={false}>
                <OwnerLogin />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/staff-login" 
            element={
              <AuthWrapper requireAuth={false}>
                <StaffLogin />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/rider-login" 
            element={
              <AuthWrapper requireAuth={false}>
                <RiderLogin />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/buyer-login" 
            element={
              <AuthWrapper requireAuth={false}>
                <BuyerLogin />
              </AuthWrapper>
            } 
          />
          
          {/* Legacy universal login for backward compatibility */}
          <Route 
            path="/universal-login" 
            element={
              <AuthWrapper requireAuth={false}>
                <Login />
              </AuthWrapper>
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              <AuthWrapper requireAuth={false}>
                <Signup />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <AuthWrapper requireAuth={false}>
                <ForgotPassword />
              </AuthWrapper>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <AuthWrapper>
                {user?.role === 'RIDER' ? <RiderDashboard /> : 
                 user?.role === 'BUYER' ? <BuyerDashboard /> : 
                 user?.role === 'STAFF' ? <StaffDashboard /> :
                 <Index />}
              </AuthWrapper>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <AuthWrapper>
                {user?.role === 'RIDER' ? <RiderDashboard /> : 
                 user?.role === 'BUYER' ? <BuyerDashboard /> : 
                 user?.role === 'STAFF' ? <StaffDashboard /> :
                 <Index />}
              </AuthWrapper>
            } 
          />

          {/* Owner/Staff-only Routes */}
          <Route 
            path="/inventory" 
            element={
              <AuthWrapper>
                {user?.role === 'STAFF' ? (
                  <StaffInventoryView />
                ) : (
                  <Inventory />
                )}
              </AuthWrapper>
            } 
          />
          <Route 
            path="/sales" 
            element={
              <AuthWrapper>
                {user?.role === 'STAFF' ? (
                  <StaffSalesView />
                ) : (
                  <EnhancedSales />
                )}
              </AuthWrapper>
            } 
          />
          <Route 
            path="/logistics" 
            element={
              <AuthWrapper>
                <Logistics />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/tracking" 
            element={
              <AuthWrapper>
                <Tracking />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/finance" 
            element={
              <AuthWrapper>
                <Finance />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/inventory-batch" 
            element={
              <AuthWrapper>
                <InventoryBatch />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/pos-sales" 
            element={
              <AuthWrapper>
                <POSSales />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/vouchers" 
            element={
              <AuthWrapper>
                <VoucherManagement />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/users" 
            element={
              <AuthWrapper>
                <Users />
              </AuthWrapper>
            } 
          />

          {/* Additional role-specific routes */}
          <Route 
            path="/assignments" 
            element={
              <AuthWrapper>
                <AssignmentManagement />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/gps-tracking" 
            element={
              <AuthWrapper>
                <GPSTracking />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/order-tracking" 
            element={
              <AuthWrapper>
                <OrderTracking />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/feedback" 
            element={
              <AuthWrapper>
                <FeedbackManagement />
              </AuthWrapper>
            } 
          />

          {/* All authenticated users can access profile */}
          <Route 
            path="/profile" 
            element={
              <AuthWrapper>
                {user?.role === 'RIDER' ? <RiderProfile /> : 
                 user?.role === 'BUYER' ? <BuyerProfile /> : 
                 <Profile />}
              </AuthWrapper>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
