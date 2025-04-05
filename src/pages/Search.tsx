
import React, { useState, useEffect } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/types';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Filter by price range
      let matchesPrice = true;
      if (priceRange === 'under25') {
        matchesPrice = product.price < 25;
      } else if (priceRange === '25to50') {
        matchesPrice = product.price >= 25 && product.price <= 50;
      } else if (priceRange === '50to100') {
        matchesPrice = product.price > 50 && product.price <= 100;
      } else if (priceRange === 'over100') {
        matchesPrice = product.price > 100;
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };
  
  const sortProducts = (products: Product[]) => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'priceLow':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'name':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sortedProducts;
    }
  };
  
  const filteredProducts = sortProducts(filterProducts(products));
  
  const header = (
    <div className="w-full">
      <div className="relative">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-9 py-5"
        />
        <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" />
        {searchTerm && (
          <button 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300"
            onClick={() => setSearchTerm('')}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
  
  return (
    <MobileLayout header={header}>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm mb-1 text-neutral-300">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-300">Price Range</label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under25">Under $25</SelectItem>
                <SelectItem value="25to50">$25 - $50</SelectItem>
                <SelectItem value="50to100">$50 - $100</SelectItem>
                <SelectItem value="over100">Over $100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm mb-1 text-neutral-300">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-300">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
        
        {isProductsLoading ? (
          <div className="grid grid-cols-2 gap-3">
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <SearchIcon size={48} className="text-neutral-200 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-1">No products found</h2>
            <p className="text-neutral-300 mb-4">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Search;
