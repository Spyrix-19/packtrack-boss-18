import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'OWNER' | 'RIDER' | 'BUYER' | 'STAFF';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface Delivery {
  id: string;
  riderId: string;
  buyerId: string;
  sellerId: string;
  item: string;
  quantity: number;
  pickupAddress: string;
  deliveryAddress: string;
  buyerPhone: string;
  sellerPhone: string;
  status: 'ASSIGNED' | 'ACCEPTED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED' | 'DAMAGED';
  assignedAt: string;
  estimatedDelivery?: string;
  notes?: string;
  reason?: string;
  photos?: string[];
  gpsLocation?: { lat: number; lng: number };
  buyerName: string;
  sellerName: string;
}

interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  riderId?: string;
  item: string;
  quantity: number;
  totalAmount: number;
  status: 'ORDERED' | 'CONFIRMED' | 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber: string;
  gpsLocation?: { lat: number; lng: number };
  sellerName: string;
  riderName?: string;
  deliveryAddress: string;
}

interface Feedback {
  id: string;
  buyerId: string;
  orderId: string;
  riderId?: string;
  sellerId: string;
  riderRating?: number;
  sellerRating?: number;
  comment?: string;
  issues?: string;
  photos?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  
  // Rider specific data
  riderDeliveries: Delivery[];
  acceptDelivery: (deliveryId: string) => void;
  declineDelivery: (deliveryId: string) => void;
  updateDeliveryStatus: (deliveryId: string, status: Delivery['status'], reason?: string, photo?: string) => void;
  
  // Buyer specific data
  buyerOrders: Order[];
  markOrderReceived: (orderId: string) => void;
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => void;
  
  // GPS tracking
  gpsEnabled: boolean;
  toggleGPS: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: 'usr-owner-001',
    email: 'owner@janjanmarine.com',
    name: 'Juan Santos',
    role: 'OWNER',
    phone: '+63 917 111 2222',
    address: 'San Roque, San Jose, Occidental Mindoro'
  },
  {
    id: 'usr-rider-001',
    email: 'rider1@janjanmarine.com',
    name: 'Miguel Torres',
    role: 'RIDER',
    phone: '+63 919 333 4444',
    address: 'Bagong Sikat, San Jose, Occidental Mindoro'
  },
  {
    id: 'usr-rider-002',
    email: 'rider2@janjanmarine.com',
    name: 'Carlos Rivera',
    role: 'RIDER',
    phone: '+63 920 444 5555',
    address: 'Poblacion, San Jose, Occidental Mindoro'
  },
  {
    id: 'usr-buyer-001',
    email: 'maria@gmail.com',
    name: 'Maria Santos',
    role: 'BUYER',
    phone: '+63 917 123 4567',
    address: 'San Jose Market, San Jose, Occidental Mindoro'
  },
  {
    id: 'usr-buyer-002',
    email: 'pedro@gmail.com',
    name: 'Pedro Martinez',
    role: 'BUYER',
    phone: '+63 919 345 6789',
    address: 'Mamburao Market, Mamburao, Occidental Mindoro'
  },
  {
    id: 'usr-staff-001',
    email: 'staff@janjanmarine.com',
    name: 'Ana Rodriguez',
    role: 'STAFF',
    phone: '+63 918 222 3333',
    address: 'Poblacion, San Jose, Occidental Mindoro'
  },
  {
    id: 'usr-staff-002',
    email: 'maria.staff@janjanmarine.com',
    name: 'Maria Elena Santos',
    role: 'STAFF',
    phone: '+63 917 888 9999',
    address: 'San Roque, San Jose, Occidental Mindoro'
  }
];

// Mock deliveries for riders
const mockDeliveries: Delivery[] = [
  {
    id: 'del-001',
    riderId: 'usr-rider-001',
    buyerId: 'usr-buyer-001',
    sellerId: 'usr-owner-001',
    item: 'Fresh Tuna (Yellowfin) - 15kg',
    quantity: 15,
    pickupAddress: 'San Roque, San Jose, Occidental Mindoro',
    deliveryAddress: 'San Jose Market, San Jose, Occidental Mindoro',
    buyerPhone: '+63 917 123 4567',
    sellerPhone: '+63 917 111 2222',
    status: 'ASSIGNED',
    assignedAt: '2024-01-16T08:00:00Z',
    estimatedDelivery: '2024-01-16T14:00:00Z',
    buyerName: 'Maria Santos',
    sellerName: 'Jan Jan Marine Products',
    gpsLocation: { lat: 13.4025, lng: 120.7097 }
  },
  {
    id: 'del-002',
    riderId: 'usr-rider-001',
    buyerId: 'usr-buyer-002',
    sellerId: 'usr-owner-001',
    item: 'Live Mud Crabs - 5pcs',
    quantity: 5,
    pickupAddress: 'San Roque, San Jose, Occidental Mindoro',
    deliveryAddress: 'Mamburao Market, Mamburao, Occidental Mindoro',
    buyerPhone: '+63 919 345 6789',
    sellerPhone: '+63 917 111 2222',
    status: 'IN_TRANSIT',
    assignedAt: '2024-01-16T06:00:00Z',
    estimatedDelivery: '2024-01-16T16:00:00Z',
    buyerName: 'Pedro Martinez',
    sellerName: 'Jan Jan Marine Products',
    gpsLocation: { lat: 13.3561, lng: 120.6056 }
  },
  {
    id: 'del-003',
    riderId: 'usr-rider-002',
    buyerId: 'usr-buyer-001',
    sellerId: 'usr-owner-001',
    item: 'Frozen Shrimp - 10kg',
    quantity: 10,
    pickupAddress: 'San Roque, San Jose, Occidental Mindoro',
    deliveryAddress: 'San Jose Market, San Jose, Occidental Mindoro',
    buyerPhone: '+63 917 123 4567',
    sellerPhone: '+63 917 111 2222',
    status: 'DELIVERED',
    assignedAt: '2024-01-15T09:00:00Z',
    estimatedDelivery: '2024-01-15T15:00:00Z',
    buyerName: 'Maria Santos',
    sellerName: 'Jan Jan Marine Products',
    gpsLocation: { lat: 13.4025, lng: 120.7097 }
  }
];

// Mock orders for buyers
const mockOrders: Order[] = [
  {
    id: 'ord-001',
    buyerId: 'usr-buyer-001',
    sellerId: 'usr-owner-001',
    riderId: 'usr-rider-001',
    item: 'Fresh Tuna (Yellowfin) - 15kg',
    quantity: 15,
    totalAmount: 9750,
    status: 'ASSIGNED',
    orderDate: '2024-01-16T08:00:00Z',
    estimatedDelivery: '2024-01-16T14:00:00Z',
    trackingNumber: 'TRK-001-2024',
    sellerName: 'Jan Jan Marine Products',
    riderName: 'Miguel Torres',
    deliveryAddress: 'San Jose Market, San Jose, Occidental Mindoro',
    gpsLocation: { lat: 13.4025, lng: 120.7097 }
  },
  {
    id: 'ord-002',
    buyerId: 'usr-buyer-001',
    sellerId: 'usr-owner-001',
    riderId: 'usr-rider-002',
    item: 'Frozen Shrimp - 10kg',
    quantity: 10,
    totalAmount: 4200,
    status: 'DELIVERED',
    orderDate: '2024-01-15T09:00:00Z',
    estimatedDelivery: '2024-01-15T15:00:00Z',
    trackingNumber: 'TRK-002-2024',
    sellerName: 'Jan Jan Marine Products',
    riderName: 'Carlos Rivera',
    deliveryAddress: 'San Jose Market, San Jose, Occidental Mindoro',
    gpsLocation: { lat: 13.4025, lng: 120.7097 }
  },
  {
    id: 'ord-003',
    buyerId: 'usr-buyer-002',
    sellerId: 'usr-owner-001',
    riderId: 'usr-rider-001',
    item: 'Live Mud Crabs - 5pcs',
    quantity: 5,
    totalAmount: 2550,
    status: 'IN_TRANSIT',
    orderDate: '2024-01-16T06:00:00Z',
    estimatedDelivery: '2024-01-16T16:00:00Z',
    trackingNumber: 'TRK-003-2024',
    sellerName: 'Jan Jan Marine Products',
    riderName: 'Miguel Torres',
    deliveryAddress: 'Mamburao Market, Mamburao, Occidental Mindoro',
    gpsLocation: { lat: 13.3561, lng: 120.6056 }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [riderDeliveries, setRiderDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [buyerOrders, setBuyerOrders] = useState<Order[]>(mockOrders);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [gpsEnabled, setGpsEnabled] = useState(true);

  const isAuthenticated = !!user;

  // Auto-login for demo (remove in real app)
  useEffect(() => {
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - find user by email or determine role by email pattern
    let foundUser = mockUsers.find(u => u.email === email);
    
    // If user not found in mock data, create user based on email pattern
    if (!foundUser) {
      let role: UserRole = 'BUYER'; // default
      
      // Determine role based on email pattern
      if (email.includes('@janjanmarine.com')) {
        if (email.includes('owner')) {
          role = 'OWNER';
        } else if (email.includes('rider')) {
          role = 'RIDER';
        } else if (email.includes('staff')) {
          role = 'STAFF';
        } else {
          role = 'STAFF'; // default for janjanmarine.com emails
        }
      }
      
      // Create new user based on email pattern
      foundUser = {
        id: `usr-${role.toLowerCase()}-${Date.now()}`,
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role,
        phone: '',
        address: ''
      };
      
      mockUsers.push(foundUser);
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('demoUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    // Mock signup - create new user
    const newUser: User = {
      id: `usr-${role.toLowerCase()}-${Date.now()}`,
      email,
      name,
      role,
      phone: '',
      address: ''
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('demoUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset
    const foundUser = mockUsers.find(u => u.email === email);
    return !!foundUser;
  };

  const acceptDelivery = (deliveryId: string) => {
    setRiderDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: 'ACCEPTED' as const }
          : delivery
      )
    );
  };

  const declineDelivery = (deliveryId: string) => {
    setRiderDeliveries(prev => 
      prev.filter(delivery => delivery.id !== deliveryId)
    );
  };

  const updateDeliveryStatus = (deliveryId: string, status: Delivery['status'], reason?: string, photo?: string) => {
    setRiderDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { 
              ...delivery, 
              status, 
              reason,
              photos: photo ? [...(delivery.photos || []), photo] : delivery.photos
            }
          : delivery
      )
    );

    // Update corresponding order status
    setBuyerOrders(prev =>
      prev.map(order => {
        const delivery = riderDeliveries.find(d => d.id === deliveryId);
        if (delivery && order.item === delivery.item) {
          return { ...order, status: status as Order['status'] };
        }
        return order;
      })
    );
  };

  const markOrderReceived = (orderId: string) => {
    setBuyerOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'DELIVERED' as const }
          : order
      )
    );
  };

  const submitFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: `feed-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setFeedbacks(prev => [...prev, newFeedback]);
  };

  const toggleGPS = () => {
    setGpsEnabled(prev => !prev);
  };

  // Filter data based on user
  const getUserRiderDeliveries = () => {
    if (!user || user.role !== 'RIDER') return [];
    return riderDeliveries.filter(delivery => delivery.riderId === user.id);
  };

  const getUserBuyerOrders = () => {
    if (!user || user.role !== 'BUYER') return [];
    return buyerOrders.filter(order => order.buyerId === user.id);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
    riderDeliveries: getUserRiderDeliveries(),
    acceptDelivery,
    declineDelivery,
    updateDeliveryStatus,
    buyerOrders: getUserBuyerOrders(),
    markOrderReceived,
    submitFeedback,
    gpsEnabled,
    toggleGPS
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};