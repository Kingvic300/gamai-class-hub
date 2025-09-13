import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import gamaiLogo from "@/assets/gamai-logo.png";
import raoatechLogo from "@/assets/raoatech-logo.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={gamaiLogo} alt="Gamai" className="h-8 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transforming education with AI-powered learning experiences that connect teachers, students, and parents in a seamless ecosystem.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for educators worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-smooth">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-smooth">
                  Sign In
                </Link>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="#roles" className="text-muted-foreground hover:text-primary transition-smooth">
                  For Educators
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="text-muted-foreground hover:text-primary transition-smooth">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Powered by 
                <img src={raoatechLogo} alt="RAOATECH" className="inline-block h-4 w-auto mx-2" />
                All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="https://twitter.com/raoatech" className="hover:text-primary transition-smooth">
                Twitter
              </a>
              <a href="https://linkedin.com/company/raoatech" className="hover:text-primary transition-smooth">
                LinkedIn
              </a>
              <a href="mailto:hello@raoatech.com" className="hover:text-primary transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}