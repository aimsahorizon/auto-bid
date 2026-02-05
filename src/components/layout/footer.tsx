// components/layout/footer.tsx
import React from "react";
import Link from "next/link";
import { Gavel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Balanced Horizontal Layout */}
        <div className="py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand & Tagline */}
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Gavel className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">AutoBID</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Zamboanga&apos;s online mobile car auction platform. Buy and sell premium vehicles with confidence and transparency.
            </p>
          </div>
          
          {/* Spread Contact Info - Horizontal on Desktop */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 flex-1 justify-end">
            <div className="flex items-center space-x-3 text-gray-400 group cursor-default">
              <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Call Us</p>
                <span className="text-sm font-medium">0975-950-1214</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-400 group cursor-default">
              <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Email</p>
                <span className="text-sm font-medium">aimsahorizon@gmail.com</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-400 group cursor-default">
              <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Location</p>
                <span className="text-sm font-medium">Zamboanga, PH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} AutoBID. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Trusted</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;