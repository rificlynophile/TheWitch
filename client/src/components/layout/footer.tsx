import { Gamepad2 } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="text-2xl" />
              <span className="text-xl font-bold">GameScript</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Your ultimate destination for game scripts and items. Enhance your gaming experience with our community-driven platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-discord">
                <i className="fab fa-discord text-xl"></i>
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-reddit">
                <i className="fab fa-reddit text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/scripts" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-scripts">
                  Browse Scripts
                </Link>
              </li>
              <li>
                <Link href="/shop" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-shop">
                  Shop Items
                </Link>
              </li>
              <li>
                <Link href="/admin" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-admin">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-help">Help Center</Link></li>
              <li><Link href="/help" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-docs">Documentation</Link></li>
              <li><Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-contact">Contact Us</Link></li>
              <li><Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-bug">Report Bug</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-terms">Terms of Service</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-cookies">Cookie Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-dmca">DMCA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 GameScript. All rights reserved. Made with ❤️ for the gaming community.</p>
        </div>
      </div>
    </footer>
  );
}
