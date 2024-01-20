"use client";
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { priceFormat } from "@/lib/utils";
import { format } from "date-fns";
interface OrderData {
  id: number;
  stt: number;
  phone: number;
  name: string;
  address: string;
  created_date: string;
  delivery_by: string;
  payment_method: string;
  products: Array<any>;
  total: string | number;
}
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OrderData;
  isLoading: boolean;
}

const OrderModal = ({ isLoading, isOpen, onClose, data }: OrderModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title={`Order of ${data.name}`}
      description="This is the order detail"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-3 space-y-8">
        <div >
          <h2 className="text-lg font-semibold mb-2">Order Information</h2>
          <div className="flex  items-start justify-between">
              <div >
                <p className="text-gray-600">Order ID: {data.id}</p>
                <p className="text-gray-600">Order Date: {format(new Date(data.created_date), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <p className="text-gray-600">
                  Payment Method: {data.payment_method}
                </p>
                <p className="text-gray-600">Delivery: {data.delivery_by}</p>
              
              </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
          <p className="text-gray-600">Name: {data.name}</p>
          <p className="text-gray-600">Phone: {data.phone}</p>
          <p className="text-gray-600">Address: {data.address}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <ul>
            {data.products.map((product, index) => (
              <li key={index} className="text-gray-600 py-4 ">
                <div className="flex items-center justify-between">
                  <p>{product.name}</p> <p>{priceFormat.format(product.price)} </p>
                </div>
                <div className="flex items-center justify-between text-gray-400 text-sm font-light">
                 <p> Storage: {product.storage}  </p>
                 <span>|</span>
                 <p> Color: {product.color} </p>
                 <span>|</span>
                 <p> Quantity: {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-gray-800 pt-5 border-t-2">Total Amount: {data.total}</p>
 
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
