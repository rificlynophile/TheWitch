import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ShopItem } from "@shared/schema";

export default function ShopItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const { data: item, isLoading, error } = useQuery<ShopItem>({
    queryKey: ["/api/shop-items", id],
  });

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${item?.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4 w-32"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full h-96 bg-muted rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground" data-testid="text-item-not-found">
                  Item not found
                </p>
                <div className="text-center mt-4">
                  <Button asChild data-testid="button-back-to-shop">
                    <Link href="/shop">Back to Shop</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Item Image */}
            <div>
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-full rounded-lg object-cover"
                data-testid="img-item-detail"
              />
            </div>

            {/* Item Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl" data-testid="text-item-detail-name">
                    {item.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-primary" data-testid="text-item-detail-price">
                      ${item.price}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="mr-1 h-4 w-4" />
                      <span data-testid="text-item-detail-rating">
                        {item.rating} rating
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground" data-testid="text-item-detail-description">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm" data-testid="text-item-detail-category">
                      {item.category}
                    </span>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleAddToCart}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
