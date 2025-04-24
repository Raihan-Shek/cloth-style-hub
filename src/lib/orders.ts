
import { createClient } from '@supabase/supabase-js';
import { Order } from '@/types';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ ...orderData, createdAt: new Date().toISOString() }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const fetchOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) throw error;
  return data;
};
