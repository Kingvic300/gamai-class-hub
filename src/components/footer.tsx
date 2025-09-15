import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Logo size="sm" className="text-white" />
            </Link>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Transforming education through innovative technology solutions that connect teachers, 
              students, and parents in meaningful learning experiences.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for educators worldwide</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition-smooth">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition-smooth">
                  Sign In
                </Link>
              </li>
              <li>
                <a href="#features" className="text-slate-400 hover:text-white transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="#roles" className="text-slate-400 hover:text-white transition-smooth">
                  For Educators
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/help" className="text-slate-400 hover:text-white transition-smooth">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-400 hover:text-white transition-smooth">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-400 hover:text-white transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-slate-400 hover:text-white transition-smooth">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-400">
                © 2025 Gamai Educational Platform. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <a href="https://twitter.com/gamai" className="hover:text-white transition-smooth">
                Twitter
              </a>
              <a href="https://linkedin.com/company/gamai" className="hover:text-white transition-smooth">
                LinkedIn
              </a>
              <a href="mailto:hello@gamai.com" className="hover:text-white transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}