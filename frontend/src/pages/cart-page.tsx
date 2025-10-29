import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/cart-context';
import Navigation from '@/components/navigation';
import CartItem from '@/components/cart-item';
import CheckoutModal from '@/components/checkout-modal';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, getTotalPrice } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Add some products to get started!
            </p>
            <Button asChild className="mt-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button
                onClick={() => setCheckoutOpen(true)}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
};

export default Cart;
