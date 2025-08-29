import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SearchBar from "@/components/search-bar";
import ScriptCard from "@/components/script-card";
import ShopItemCard from "@/components/shop-item-card";
import { Button } from "@/components/ui/button";
import { Shield, Rocket, Users, Smartphone, Clock, RotateCcw } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { Script, ShopItem } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();

  const { data: stats } = useQuery<{scriptCount: number, itemCount: number, userCount: string}>({
    queryKey: ["/api/stats"],
  });

  const { data: scripts = [], isLoading: isLoadingScripts } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  const { data: shopItems = [], isLoading: isLoadingShop } = useQuery<ShopItem[]>({
    queryKey: ["/api/shop-items"],
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLocation(`/scripts?search=${encodeURIComponent(query)}`);
    }
  };

  // Show first 4 items for preview
  const featuredScripts = scripts.slice(0, 4);
  const featuredItems = shopItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing<br />
            <span className="text-accent">Game Scripts</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Browse, download, and share game scripts. Find items, tools, and resources for your favorite games.
          </p>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search scripts, items, or categories..."
          />

          {/* Quick Stats */}
          {stats && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold" data-testid="text-stats-scripts">
                  {stats.scriptCount}
                </div>
                <div className="text-muted-foreground">Scripts Available</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl font-bold" data-testid="text-stats-items">
                  {stats.itemCount}
                </div>
                <div className="text-muted-foreground">Shop Items</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl font-bold" data-testid="text-stats-users">
                  {stats.userCount}
                </div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Scripts Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Scripts</h2>
              <p className="text-muted-foreground text-lg">Popular community-created game scripts</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button asChild data-testid="button-view-all-scripts">
                <Link href="/scripts">View All Scripts</Link>
              </Button>
            </div>
          </div>

          {isLoadingScripts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredScripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Shop Items Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
              <p className="text-muted-foreground text-lg">Premium items and resources for your games</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button asChild data-testid="button-view-all-items">
                <Link href="/shop">View All Items</Link>
              </Button>
            </div>
          </div>

          {isLoadingShop ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <ShopItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GameScript?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to enhance your gaming experience in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safe & Secure</h3>
              <p className="text-muted-foreground">All scripts are verified and tested for safety. Your account security is our priority.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Performance</h3>
              <p className="text-muted-foreground">Optimized scripts that won't slow down your game or affect your experience.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Driven</h3>
              <p className="text-muted-foreground">Created by gamers, for gamers. Join our community and contribute your own scripts.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mobile Friendly</h3>
              <p className="text-muted-foreground">Fully responsive design that works perfectly on all devices and screen sizes.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-muted-foreground">Get help whenever you need it with our round-the-clock customer support.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Regular Updates</h3>
              <p className="text-muted-foreground">Scripts are regularly updated to work with the latest game versions.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
