
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { fetchProducts, fetchCategories } from '@/services/api';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const header = (
    <div className="w-full">
      <h1 className="text-xl font-bold">Snappy Shop</h1>
    </div>
  );

  return (
    <MobileLayout header={header}>
      <div className="px-4 pt-4">
        <h2 className="text-xl font-semibold mb-4">Browse Products</h2>
        
        <ScrollArea className="whitespace-nowrap pb-4">
          <div className="flex space-x-2 p-1">
            <button
              className={`px-4 py-2 text-sm rounded-full ${
                activeCategory === 'all'
                  ? 'bg-purple text-white'
                  : 'bg-neutral-100 text-neutral-300'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            
            {isCategoriesLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-24 h-10 rounded-full" />
              ))
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-purple text-white'
                      : 'bg-neutral-100 text-neutral-300'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="product-grid">
        {isProductsLoading ? (
          // Loading skeletons
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-2 py-10 text-center">
            <p>No products found in this category.</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </MobileLayout>
  );
};

export default Index;
