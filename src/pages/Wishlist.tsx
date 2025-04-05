
import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useShop } from '@/context/ShopContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const Wishlist = () => {
  const { wishlist } = useShop();
  const navigate = useNavigate();
  
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const wishlistProducts = allProducts.filter(product => 
    wishlist.includes(product.id)
  );
  
  const header = (
    <div className="w-full">
      <h1 className="text-xl font-bold">My Wishlist</h1>
    </div>
  );
  
  if (isLoading) {
    return (
      <MobileLayout header={header}>
        <div className="product-grid">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </MobileLayout>
    );
  }
  
  if (wishlist.length === 0) {
    return (
      <MobileLayout header={header}>
        <div className="flex flex-col items-center justify-center h-full p-4 mt-20">
          <Heart size={64} className="text-neutral-200 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-neutral-300 mb-6 text-center">
            Save items you love to your wishlist and revisit them anytime.
          </p>
          <Button onClick={() => navigate('/')} className="bg-purple hover:bg-purple/90">
            Explore Products
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout header={header}>
      <div className="product-grid">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MobileLayout>
  );
};

export default Wishlist;
