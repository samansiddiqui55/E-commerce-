
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Heart } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden relative">
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={18} 
          className={cn(
            "transition-colors", 
            inWishlist ? "fill-purple stroke-purple" : "stroke-neutral-300"
          )}
        />
      </button>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-40 bg-neutral-100 flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-1 mb-1">{product.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
            <div className="text-xs text-neutral-300 flex items-center">
              <span className="mr-1">⭐</span>
              <span>{product.rating.rate}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
