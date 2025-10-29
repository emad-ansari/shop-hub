import { useEffect, useState } from 'react';
import { type Product } from '@/context/cart-context';
import Navigation from '@/components/navigation';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Premium sound quality with noise cancellation',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Track your fitness and stay connected',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    description: 'Durable and stylish for everyday use',
  },
  {
    id: 4,
    name: 'Coffee Maker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
    description: 'Brew perfect coffee every morning',
  },
  {
    id: 5,
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Comfortable and lightweight design',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    description: 'Adjustable LED lighting for your workspace',
  },
  {
    id: 7,
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    description: 'Non-slip surface for all your exercises',
  },
  {
    id: 8,
    name: 'Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    description: 'Insulated stainless steel construction',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Featured Products</h1>
          <p className="text-muted-foreground">
            Discover our carefully curated selection of premium items
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;

