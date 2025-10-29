import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
            <Store className="h-6 w-6 text-primary" />
            <span>ShopHub</span>
          </Link>
          
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <Badge 
                variant="default" 
                className="absolute -right-1 -top-1 h-5 min-w-[20px] animate-in zoom-in-50"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
