
import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useShop } from '@/context/ShopContext';
import { Trash, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantityControl from '@/components/QuantityControl';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useShop();
  const navigate = useNavigate();
  
  const header = (
    <div className="w-full">
      <h1 className="text-xl font-bold">Shopping Cart</h1>
    </div>
  );
  
  if (cart.length === 0) {
    return (
      <MobileLayout header={header}>
        <div className="flex flex-col items-center justify-center h-full p-4 mt-20">
          <ShoppingBag size={64} className="text-neutral-200 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-neutral-300 mb-6 text-center">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button onClick={() => navigate('/')} className="bg-purple hover:bg-purple/90">
            Start Shopping
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout header={header}>
      <div className="p-4">
        <div className="mb-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-neutral-300">
            <Trash size={16} className="mr-2" />
            Clear Cart
          </Button>
        </div>
        
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="w-24 h-24 bg-neutral-100 flex-shrink-0 flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1 p-3 flex flex-col">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium line-clamp-1 mb-1">{item.title}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-300 hover:text-destructive"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                <p className="text-sm font-semibold mb-2">${item.price.toFixed(2)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <QuantityControl
                    quantity={item.quantity}
                    onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  />
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-20">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-neutral-300">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <Button className="w-full bg-purple hover:bg-purple/90">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Cart;
