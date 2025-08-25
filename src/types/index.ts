export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: 'customer' | 'pharmacy';
  created_at: string;
}

export interface Customer extends User {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface Pharmacy extends User {
  pharmacy_name: string;
  license_number: string;
  address: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  operating_hours: string;
}

export interface MedicineRequest {
  id: string;
  customer_id: string;
  prescription_image_url?: string;
  manual_medicines?: string[];
  radius: 5 | 10;
  customer_latitude: number;
  customer_longitude: number;
  customer_address: string;
  status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
  created_at: string;
  customer?: Customer;
}

export interface Quote {
  id: string;
  request_id: string;
  pharmacy_id: string;
  delivery_price: number;
  pickup_price: number;
  estimated_delivery_time: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  pharmacy?: Pharmacy;
  request?: MedicineRequest;
}

export interface Medicine {
  id: string;
  name: string;
  dosage?: string;
  quantity: number;
}