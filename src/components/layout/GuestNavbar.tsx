// components/layout/GuestNavbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Menu, X, User, ArrowRight } from "lucide-react";

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const guestNavLinks = [
    { href: "/auctions", label: "Browse Auctions" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white lg:bg-transparent"
        }`}
      >
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group z-50 relative"
              onClick={handleLinkClick}
            >
              <Gavel className="h-7 w-7 sm:h-8 sm:w-8 text-black group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg sm:text-xl font-bold text-black">
                AutoBID
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {guestNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium transition-colors duration-200 rounded-md ${
                    isActive(link.href)
                      ? "text-black bg-gray-100"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Actions */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <Link
                href="/login"
                className="flex items-center px-4 xl:px-6 py-2 text-sm xl:text-base font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Login as Admin/Moderator Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mobile-menu-container">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200 z-50 relative"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed left-0 right-0 top-16 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out mobile-menu-container ${
              isMenuOpen
                ? "opacity-100 visible transform translate-y-0"
                : "opacity-0 invisible transform -translate-y-2"
            }`}
            style={{ maxHeight: isMenuOpen ? "calc(100vh - 4rem)" : "0" }}
          >
            <div className="overflow-y-auto max-h-full">
              {/* Mobile Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                {guestNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-black bg-gray-100"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Actions */}
              <div className="px-4 py-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <User className="h-5 w-5 mr-3" />
                  Login as Admin/Moderator Demo
                </Link>
              </div>

              {/* Mobile Footer Info */}
              <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Join 50,000+ car enthusiasts
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Bid on premium vehicles with confidence
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Secure
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Trusted
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Quick Links */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link
                    href="/help"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2 px-2 rounded text-center"
                  >
                    Help & Support
                  </Link>
                  <Link
                    href="/safety"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2 px-2 rounded text-center"
                  >
                    Safety Tips
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2 px-2 rounded text-center"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2 px-2 rounded text-center"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GuestNavbar;