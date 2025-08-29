import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "wouter";
import type { ShopItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ShopItemCardProps {
  item: ShopItem;
}

export default function ShopItemCard({ item }: ShopItemCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-item-${item.id}`}>
      <Link href={`/shop/${item.id}`} data-testid={`link-item-${item.id}`}>
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-48 object-cover cursor-pointer"
          data-testid={`img-item-${item.id}`}
        />
      </Link>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2" data-testid={`text-item-name-${item.id}`}>
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`text-item-description-${item.id}`}>
          {item.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold" data-testid={`text-item-price-${item.id}`}>
            ${item.price}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1 h-4 w-4" />
            <span data-testid={`text-item-rating-${item.id}`}>
              {item.rating}
            </span>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          data-testid={`button-add-cart-${item.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
