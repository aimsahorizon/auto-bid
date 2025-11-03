// components/layout/navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Menu, X, User, Bell, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
      setShowUserMenu(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/auctions", label: "Auctions" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowUserMenu(false);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white lg:bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
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
              {navLinks.map((link) => (
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

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              {/* <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button> */}
              
              {/* User Menu */}
              {/* <div className="relative">
                <button
                  onClick={handleUserMenuClick}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden xl:block">Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Sign Up
                    </Link>
                    <hr className="my-1" />
                  </div>
                )}
              </div> */}
              <Link
                href="/register"
                className="px-4 xl:px-6 py-2 text-sm xl:text-base font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors duration-200 z-50 relative"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed left-0 right-0 top-16 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 visible transform translate-y-0"
                : "opacity-0 invisible transform -translate-y-2"
            }`}
            style={{ maxHeight: isOpen ? "calc(100vh - 4rem)" : "0" }}
          >
            <div className="overflow-y-auto max-h-full">
              {/* Mobile Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
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

              {/* Mobile Actions */}
              <div className="px-4 py-4 border-t border-gray-100 space-y-3">
                {/* <button className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button> */}
                {/* <button onClick={toggle} className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  {isDark ? <Sun className="h-5 w-5 mr-3 text-yellow-400" /> : <Moon className="h-5 w-5 mr-3" />}
                  Toggle Theme
                </button> */}
                
                {/* <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <User className="h-5 w-5 mr-3" />
                  Sign In
                </Link> */}

                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-base font-medium bg-black text-white text-center rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Footer Links */}
              <div className="px-4 py-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link
                    href="/help"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/support"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-gray-700 py-2"
                  >
                    Support
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

export default Navbar;

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/95 backdrop-blur-md shadow-sm"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center space-x-2 group"
//             onClick={() => setIsOpen(false)}
//           >
//             <Gavel className="h-8 w-8 text-black group-hover:rotate-12 transition-transform duration-300" />
//             <span className="text-xl font-bold text-black">AuctionHub</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
//                   isActive(link.href)
//                     ? "text-black"
//                     : "text-gray-600 hover:text-black"
//                 }`}
//               >
//                 {link.label}
//                 {isActive(link.href) && (
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <button className="p-2 text-gray-600 hover:text-black transition-colors duration-200">
//               <Bell className="h-5 w-5" />
//             </button>
//             <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
//               Sign In
//             </button>
//             <button className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors duration-200"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="lg:hidden bg-white border-t border-gray-100">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
//                     isActive(link.href)
//                       ? "text-black bg-gray-50"
//                       : "text-gray-600 hover:text-black hover:bg-gray-50"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <div className="pt-4 border-t border-gray-100">
//                 <Link
//                   href="/signin"
//                   onClick={() => setIsOpen(false)}
//                   className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/signup"
//                   onClick={() => setIsOpen(false)}
//                   className="block mx-3 mt-2 px-4 py-2 text-base font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;