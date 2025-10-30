import { useState } from 'react';
import { api } from '@/api/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useCart } from '@/context/cart-context';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Receipt {
  name: string;
  email: string;
  total: number;
  items: Array<{ id: number; name: string; price: number; quantity: number }>;
  timestamp: string;
}

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const { clearCart, cart, getTotalPrice } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  console.log('receipt : ', receipt);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) {
      toast.error('Your cart is empty.');
      return;
    }
    if (!name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }
    setLoading(true);
    try {
      const cartItems = cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity }));
      const res = await api.post('/checkout', { name, email, cartItems });
      console.log('Checkout API Response:', res.data);
      if (res.data && res.data.receipt) {
        setReceipt(res.data.receipt);
        toast.success('Order placed!');

      } else {
        toast.error('Receipt not found in response.');
        console.error('API responded without receipt:', res.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Checkout failed.');
      console.error('Checkout error:', error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // Only clear and close modal on explicit user action (Close button or onOpenChange)
  const handleClose = () => {
    clearCart(); // <-- Now clear cart only after user closes receipt
    setName('');
    setEmail('');
    setReceipt(null);
    onOpenChange(false);
  };

  console.log('Rendering CheckoutModal, receipt:', receipt);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-full">
        {!receipt ? (
          <>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Full Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-lg text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-white font-bold"
                disabled={loading || !cart.length}
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <DialogTitle className="text-2xl">Order Successful!</DialogTitle>
            </div>
            <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{receipt.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{receipt.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-lg text-primary">
                  ${receipt.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="font-medium text-sm">{new Date(receipt.timestamp).toLocaleString()}</span>
              </div>
              {receipt.items.length > 0 && (
                <div className="mt-3">
                  <div className="font-semibold mb-2">Items:</div>
                  <ul className="space-y-1">
                    {receipt.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button onClick={handleClose} className="w-full rounded-md bg-primary px-4 py-2 text-white font-bold">
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
