
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/services/api';
import MobileLayout from '@/components/MobileLayout';
import QuantityControl from '@/components/QuantityControl';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id)),
  });
  
  const inWishlist = product ? isInWishlist(product.id) : false;
  
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const header = (
    <div className="w-full flex items-center">
      <button onClick={() => navigate(-1)} className="mr-4">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold flex-1 text-left">Product Details</h1>
    </div>
  );
  
  if (isError) {
    return (
      <MobileLayout header={header}>
        <div className="p-4 text-center">
          <p>Error loading product details. Please try again later.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go back to home
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout header={header}>
      {isLoading ? (
        <div className="p-4">
          <Skeleton className="h-72 w-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      ) : product ? (
        <div className="p-4">
          <div className="bg-neutral-100 rounded-lg h-72 flex items-center justify-center mb-4">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-64 max-w-full object-contain"
            />
          </div>
          
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-1">{product.title}</h1>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              <div className="flex items-center text-sm text-neutral-300">
                <span className="mr-1">⭐</span>
                <span>{product.rating.rate}</span>
                <span className="mx-1">•</span>
                <span>{product.rating.count} reviews</span>
              </div>
            </div>
            <p className="text-sm text-neutral-300">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <QuantityControl
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
            </div>
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-purple hover:bg-purple/90"
            >
              <ShoppingBag size={16} className="mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "border-2", 
                inWishlist ? "border-purple" : "border-neutral-200"
              )}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart 
                size={18} 
                className={cn(
                  inWishlist ? "fill-purple stroke-purple" : "stroke-neutral-300"
                )}
              />
            </Button>
          </div>
        </div>
      ) : null}
    </MobileLayout>
  );
};

export default ProductDetail;
