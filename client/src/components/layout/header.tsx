import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Gamepad2 } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <Gamepad2 className="text-2xl" />
            <span className="text-xl font-bold">GameScript</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/scripts" 
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/scripts') ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="link-scripts"
            >
              Scripts
            </Link>
            <Link 
              href="/shop" 
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/shop') ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="link-shop"
            >
              Shop
            </Link>
            <Button variant="outline" asChild data-testid="button-admin">
              <Link href="/admin">
                Admin Panel
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-4" data-testid="mobile-menu">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/scripts" 
                className="font-medium transition-colors hover:text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-scripts"
              >
                Scripts
              </Link>
              <Link 
                href="/shop" 
                className="font-medium transition-colors hover:text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-shop"
              >
                Shop
              </Link>
              <Button variant="outline" asChild className="text-left" data-testid="mobile-button-admin">
                <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Panel
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
