
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { totalItems, wishlist } = useShop();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="mobile-nav">
      <Link to="/" className={cn("mobile-nav-item", { active: isActive('/') })}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/search" className={cn("mobile-nav-item", { active: isActive('/search') })}>
        <Search size={20} />
        <span>Search</span>
      </Link>
      <Link to="/cart" className={cn("mobile-nav-item", { active: isActive('/cart') })}>
        <div className="relative">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <div className="badge-count">{totalItems}</div>
          )}
        </div>
        <span>Cart</span>
      </Link>
      <Link to="/wishlist" className={cn("mobile-nav-item", { active: isActive('/wishlist') })}>
        <div className="relative">
          <Heart size={20} />
          {wishlist.length > 0 && (
            <div className="badge-count">{wishlist.length}</div>
          )}
        </div>
        <span>Wishlist</span>
      </Link>
    </nav>
  );
};

export default MobileNavigation;
