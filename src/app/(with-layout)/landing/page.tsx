/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx - Landing Page
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Gavel, 
  Trophy, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowRight, 
  Star, 
  CheckCircle,
  PlayCircle,
  Zap,
  Award,
  Globe
} from "lucide-react";

export default function LandingPage() {
  const featuredAuctions = [
    {
      id: 1,
      title: "2019 Porsche 911 GT3",
      year: "2019",
      make: "Porsche",
      model: "911 GT3",
      image: "/cars/porsche.jpg",
      currentBid: 145000,
      timeLeft: "2d 14h 32m",
      bids: 47,
      featured: true,
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      title: "1967 Ford Mustang Shelby GT500",
      year: "1967",
      make: "Ford",
      model: "Mustang Shelby GT500",
      image: "/cars/ford-mustang.jpg",
      currentBid: 89500,
      timeLeft: "5d 8h 15m",
      bids: 23,
      featured: false,
      location: "Detroit, MI"
    },
    {
      id: 3,
      title: "2021 McLaren 720S",
      year: "2021",
      make: "McLaren",
      model: "720S",
      image: "/cars/mclaren.jpg",
      currentBid: 267000,
      timeLeft: "1d 6h 44m",
      bids: 31,
      featured: true,
      location: "Miami, FL"
    }
  ];

  const stats = [
    { icon: Gavel, label: "Active Auctions", value: "1,247", growth: "+12%" },
    { icon: Users, label: "Registered Bidders", value: "45,892", growth: "+28%" },
    { icon: Trophy, label: "Cars Sold", value: "12,456", growth: "+15%" },
    { icon: TrendingUp, label: "Success Rate", value: "96.8%", growth: "+2.1%" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Bidding",
      description: "Advanced encryption and fraud protection for every transaction."
    },
    {
      icon: Award,
      title: "Verified Listings",
      description: "Every vehicle undergoes thorough inspection and authentication."
    },
    {
      icon: Globe,
      title: "Local Exclusivity",
      description: "Connect with buyers and sellers within the Philippines."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live bidding with instant notifications and updates."
    }
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Collector",
      image: "/leaderboard/avatar-placeholder.jpg",
      rating: 5,
      text: "Found my dream 1969 Camaro SS through AutoBID. The process was transparent and secure."
    },
    {
      name: "Sarah Williams",
      role: "Dealer",
      image: "/leaderboard/avatar-placeholder.jpg",
      rating: 5,
      text: "As a dealer, I've sold over 200 vehicles on this platform. Excellent service and support."
    },
    {
      name: "David Rodriguez",
      role: "Enthusiast",
      image: "/leaderboard/avatar-placeholder.jpg",
      rating: 5,
      text: "The bidding experience is smooth and exciting. Highly recommend to any car enthusiast."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 mb-6">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                Live Auctions Available Now
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight mb-6">
                Premium Car Auctions
                <span className="block gradient-text">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover, bid, and own exceptional vehicles from around the world. 
                Join thousands of collectors, dealers, and enthusiasts in the most trusted car auction platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/auctions"
                  className="inline-flex items-center px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 hover-lift"
                >
                  Browse Auctions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                {/* <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </button> */}
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span>10k+ Happy Bidders</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                  <Image
                    src="/cars/bugatti.jpg" 
                    alt="Featured luxury car"
                    height={1000}
                    width={1000}
                    className="w-full h-full object-cover"
                  />
                  {/* <Image
                    src="/cars/bugatti.jpg"
                    alt="Featured luxury car"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Auction</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">47 active bids</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.growth}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Featured Auctions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional vehicles currently up for auction. 
              Each listing is verified and backed by our authenticity guarantee.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAuctions.map((auction) => (
              <div key={auction.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift group">
                {/* {auction.featured && (
                  <div className="relative bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium z-10">
                    Featured
                  </div>
                )} */}
                
                <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                  <Image 
                    src={auction.image} 
                    alt={auction.title}
                    height={1000}
                    width={1000}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* <Image
                    src={auction.image}
                    alt={auction.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {auction.bids} bids
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{auction.year}</span>
                    <span className="text-sm text-gray-500">{auction.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {auction.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Current Bid</div>
                      <div className="text-2xl font-bold text-black">
                        ${auction.currentBid.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Time Left</div>
                      <div className="text-sm font-medium text-red-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {auction.timeLeft}
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/login"
                    className="inline-flex items-center px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 hover-lift"
                  >
                    Place bid
                  </Link>
                  {/* <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                    Place Bid
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/auctions"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              View All Auctions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose AutoBID?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of car auctions with our cutting-edge platform
              designed for collectors, dealers, and enthusiasts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm mb-6 group-hover:shadow-md transition-shadow duration-300">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied buyers and sellers who trust AutoBID.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                
                <div className="flex items-center">
                  {/* <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 bg-gray-300 rounded-full mr-4"
                  /> */}
                  <Image
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={1000}
                    height={1000}
                    className="w-12 h-12 bg-gray-300 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Bidding?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join AutoBID today and discover your next dream car. 
            It only takes a minute to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}