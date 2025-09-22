import React, { createContext, useContext, useState, useEffect } from 'react';

interface InventoryBatch {
  id: string;
  supplier: string;
  items: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  dateReceived: string;
  expiryDate?: string;
  status: 'Active' | 'Low Stock' | 'Out of Stock' | 'Expired';
  qrCode: string;
  storageLocation: string;
  category: string;
}

interface Sale {
  id: string;
  customer: string;
  phone: string;
  items: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  profit: number;
  paymentMethod: 'Cash' | 'GCash' | 'Bank Transfer' | 'Credit Card';
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  date: string;
  qrCode: string;
  location: string;
}

interface Shipment {
  id: string;
  destination: string;
  items: string;
  quantity: number;
  totalValue: number;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Delayed';
  estimatedArrival: string;
  trackingNumber: string;
  qrCode: string;
  partner: string;
  vessel: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Sales Agent' | 'Warehouse Staff' | 'Accountant';
  department: string;
  status: 'Active' | 'Inactive';
  dateJoined: string;
  phone: string;
  address: string;
}

interface DataContextType {
  // Business Info
  businessInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  
  // Data
  inventory: InventoryBatch[];
  sales: Sale[];
  logistics: Shipment[];
  users: User[];
  
  // Actions
  addInventory: (item: Omit<InventoryBatch, 'id'>) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  addShipment: (shipment: Omit<Shipment, 'id'>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  
  updateInventory: (id: string, updates: Partial<InventoryBatch>) => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  updateShipment: (id: string, updates: Partial<Shipment>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  
  deleteInventory: (id: string) => void;
  deleteSale: (id: string) => void;
  deleteShipment: (id: string) => void;
  deleteUser: (id: string) => void;
  
  findByQR: (qrCode: string) => { type: string; data: any } | null;
  generateQRCode: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial marine products data
const initialInventory: InventoryBatch[] = [
  {
    id: 'INV-001',
    supplier: 'Pacific Marine Suppliers Inc.',
    items: 'Fresh Tuna (Yellowfin)',
    quantity: 120,
    unitCost: 450,
    totalCost: 54000,
    dateReceived: '2024-01-15',
    expiryDate: '2024-01-22',
    status: 'Active',
    qrCode: 'QR-INV-001-TUN-120',
    storageLocation: 'Cold Storage A-1',
    category: 'Fish'
  },
  {
    id: 'INV-002',
    supplier: 'Mindoro Seafood Trading',
    items: 'Dried Squid',
    quantity: 50,
    unitCost: 280,
    totalCost: 14000,
    dateReceived: '2024-01-14',
    expiryDate: '2024-06-14',
    status: 'Active',
    qrCode: 'QR-INV-002-SQD-50',
    storageLocation: 'Dry Storage B-2',
    category: 'Processed Seafood'
  },
  {
    id: 'INV-003',
    supplier: 'Local Fishermen Coop',
    items: 'Live Crabs (Mud Crabs)',
    quantity: 8,
    unitCost: 650,
    totalCost: 5200,
    dateReceived: '2024-01-16',
    status: 'Low Stock',
    qrCode: 'QR-INV-003-CRB-8',
    storageLocation: 'Live Tank C-1',
    category: 'Live Seafood'
  },
  {
    id: 'INV-004',
    supplier: 'Manila Bay Fisheries',
    items: 'Frozen Shrimp (Tiger Prawns)',
    quantity: 25,
    unitCost: 380,
    totalCost: 9500,
    dateReceived: '2024-01-13',
    expiryDate: '2024-04-13',
    status: 'Active',
    qrCode: 'QR-INV-004-SHR-25',
    storageLocation: 'Freezer D-1',
    category: 'Frozen Seafood'
  }
];

const initialSales: Sale[] = [
  {
    id: 'SAL-001',
    customer: 'Maria Santos Restaurant',
    phone: '+63 917 123 4567',
    items: 'Fresh Tuna (Yellowfin) - 15kg',
    quantity: 15,
    unitPrice: 650,
    totalAmount: 9750,
    profit: 3000,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    date: '2024-01-16',
    qrCode: 'QR-SAL-001-TUN-15',
    location: 'San Jose Market'
  },
  {
    id: 'SAL-002',
    customer: 'Jolly Seafood Store',
    phone: '+63 918 234 5678',
    items: 'Dried Squid - 10kg',
    quantity: 10,
    unitPrice: 420,
    totalAmount: 4200,
    profit: 1400,
    paymentMethod: 'Cash',
    status: 'Completed',
    date: '2024-01-16',
    qrCode: 'QR-SAL-002-SQD-10',
    location: 'Mamburao Market'
  },
  {
    id: 'SAL-003',
    customer: 'Pedro Martinez',
    phone: '+63 919 345 6789',
    items: 'Live Mud Crabs - 3pcs',
    quantity: 3,
    unitPrice: 850,
    totalAmount: 2550,
    profit: 600,
    paymentMethod: 'GCash',
    status: 'Processing',
    date: '2024-01-16',
    qrCode: 'QR-SAL-003-CRB-3',
    location: 'Local Delivery'
  }
];

const initialLogistics: Shipment[] = [
  {
    id: 'SHIP-001',
    destination: 'Batangas Port',
    items: 'Mixed Seafood Package',
    quantity: 50,
    totalValue: 35000,
    status: 'In Transit',
    estimatedArrival: '2024-01-17',
    trackingNumber: 'MMP-2024-001',
    qrCode: 'QR-SHIP-001-BTG-50',
    partner: 'FastCargo Marine Services',
    vessel: 'MV Sea Eagle'
  },
  {
    id: 'SHIP-002',
    destination: 'Calapan City',
    items: 'Fresh Fish Delivery',
    quantity: 30,
    totalValue: 18500,
    status: 'Delivered',
    estimatedArrival: '2024-01-16',
    trackingNumber: 'MMP-2024-002',
    qrCode: 'QR-SHIP-002-CLP-30',
    partner: 'Island Express Logistics',
    vessel: 'MV Ocean Breeze'
  }
];

const initialUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Juan Santos',
    email: 'juan.santos@janjanmarine.com',
    role: 'Owner',
    department: 'Management',
    status: 'Active',
    dateJoined: '2020-01-15',
    phone: '+63 917 111 2222',
    address: 'San Roque, San Jose, Occidental Mindoro'
  },
  {
    id: 'USR-002',
    name: 'Ana Rodriguez',
    email: 'ana.rodriguez@janjanmarine.com',
    role: 'Manager',
    department: 'Operations',
    status: 'Active',
    dateJoined: '2021-03-10',
    phone: '+63 918 222 3333',
    address: 'Poblacion, San Jose, Occidental Mindoro'
  },
  {
    id: 'USR-003',
    name: 'Miguel Torres',
    email: 'miguel.torres@janjanmarine.com',
    role: 'Sales Agent',
    department: 'Sales',
    status: 'Active',
    dateJoined: '2022-06-20',
    phone: '+63 919 333 4444',
    address: 'Bagong Sikat, San Jose, Occidental Mindoro'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryBatch[]>(initialInventory);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [logistics, setLogistics] = useState<Shipment[]>(initialLogistics);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const businessInfo = {
    name: 'JAN JAN MARINE PRODUCTS',
    address: 'San Roque, San Jose, Occidental Mindoro',
    phone: '+63 917 555 0123',
    email: 'info@janjanmarine.com'
  };

  const generateId = (prefix: string) => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  };

  const generateQRCode = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 8);
    return `QR-${timestamp}-${random}`.toUpperCase();
  };

  const addInventory = (item: Omit<InventoryBatch, 'id'>) => {
    const newItem: InventoryBatch = {
      ...item,
      id: generateId('INV')
    };
    setInventory(prev => [...prev, newItem]);
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...sale,
      id: generateId('SAL')
    };
    setSales(prev => [...prev, newSale]);
  };

  const addShipment = (shipment: Omit<Shipment, 'id'>) => {
    const newShipment: Shipment = {
      ...shipment,
      id: generateId('SHIP')
    };
    setLogistics(prev => [...prev, newShipment]);
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: generateId('USR')
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateInventory = (id: string, updates: Partial<InventoryBatch>) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const updateSale = (id: string, updates: Partial<Sale>) => {
    setSales(prev => prev.map(sale => sale.id === id ? { ...sale, ...updates } : sale));
  };

  const updateShipment = (id: string, updates: Partial<Shipment>) => {
    setLogistics(prev => prev.map(ship => ship.id === id ? { ...ship, ...updates } : ship));
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updates } : user));
  };

  const deleteInventory = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const deleteSale = (id: string) => {
    setSales(prev => prev.filter(sale => sale.id !== id));
  };

  const deleteShipment = (id: string) => {
    setLogistics(prev => prev.filter(ship => ship.id !== id));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const findByQR = (qrCode: string) => {
    // Search in inventory
    const inventoryItem = inventory.find(item => item.qrCode === qrCode);
    if (inventoryItem) return { type: 'inventory', data: inventoryItem };

    // Search in sales
    const saleItem = sales.find(sale => sale.qrCode === qrCode);
    if (saleItem) return { type: 'sale', data: saleItem };

    // Search in logistics
    const shipmentItem = logistics.find(ship => ship.qrCode === qrCode);
    if (shipmentItem) return { type: 'shipment', data: shipmentItem };

    return null;
  };

  const value: DataContextType = {
    businessInfo,
    inventory,
    sales,
    logistics,
    users,
    addInventory,
    addSale,
    addShipment,
    addUser,
    updateInventory,
    updateSale,
    updateShipment,
    updateUser,
    deleteInventory,
    deleteSale,
    deleteShipment,
    deleteUser,
    findByQR,
    generateQRCode
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};