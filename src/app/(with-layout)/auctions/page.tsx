// app/auctions/page.tsx - Browse Auctions Page
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Clock, 
  MapPin, 
  Heart, 
  Eye,
  Gavel,
  SortAsc,
  Car,
  Calendar,
  DollarSign,
  ChevronDown,
  X
} from "lucide-react";

export default function AuctionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    year: "",
    condition: "",
    location: ""
  });

  const auctions = [
    {
      id: 1,
      title: "2019 Porsche 911 GT3",
      year: 2019,
      make: "Porsche",
      model: "911 GT3",
      image: "/cars/porsche.jpg",
      images: ["/cars/porsche.jpg", "/cars/porsche.jpg"],
      currentBid: 145000,
      reserveMet: true,
      timeLeft: "2d 14h 32m",
      endDate: "2024-09-20T18:00:00",
      bids: 47,
      watchers: 156,
      location: "Los Angeles, CA",
      mileage: 8420,
      condition: "Excellent",
      seller: "Premium Auto Group",
      featured: true,
      description: "Immaculate GT3 with full service history and track package."
    },
    {
      id: 2,
      title: "1967 Ford Mustang Shelby GT500",
      year: 1967,
      make: "Ford",
      model: "Mustang Shelby GT500",
      image: "/cars/ford-mustang.jpg",
      images: ["/cars/ford-mustang.jpg"],
      currentBid: 89500,
      reserveMet: false,
      timeLeft: "5d 8h 15m",
      endDate: "2024-09-23T15:30:00",
      bids: 23,
      watchers: 89,
      location: "Detroit, MI",
      mileage: 45230,
      condition: "Very Good",
      seller: "Classic Car Collective",
      featured: false,
      description: "Numbers-matching Shelby with original 428 Cobra Jet engine."
    },
    {
      id: 3,
      title: "2021 McLaren 720S",
      year: 2021,
      make: "McLaren",
      model: "720S",
      image: "/cars/mclaren.jpg",
      images: ["/cars/mclaren.jpg", "/cars/mclaren.jpg"],
      currentBid: 267000,
      reserveMet: true,
      timeLeft: "1d 6h 44m",
      endDate: "2024-09-19T12:15:00",
      bids: 31,
      watchers: 203,
      location: "Miami, FL",
      mileage: 2150,
      condition: "Like New",
      seller: "Elite Motors",
      featured: true,
      description: "Stunning McLaren in Volcano Orange with carbon fiber package."
    },
    {
      id: 4,
      title: "1969 Dodge Charger R/T",
      year: 1969,
      make: "Dodge",
      model: "Charger R/T",
      image: "/cars/dodge.jpg",
      images: ["/cars/dodge.jpg"],
      currentBid: 78500,
      reserveMet: false,
      timeLeft: "3d 12h 20m",
      endDate: "2024-09-22T09:45:00",
      bids: 18,
      watchers: 67,
      location: "Phoenix, AZ",
      mileage: 67890,
      condition: "Good",
      seller: "Heritage Automotive",
      featured: false,
      description: "Restored Charger R/T with original 440 Magnum V8."
    },
    {
      id: 5,
      title: "2020 Tesla Model S Performance",
      year: 2020,
      make: "Tesla",
      model: "Model S Performance",
      image: "/cars/tesla.jpg",
      images: ["/cars/tesla.jpg"],
      currentBid: 67900,
      reserveMet: true,
      timeLeft: "4d 18h 35m",
      endDate: "2024-09-23T21:20:00",
      bids: 12,
      watchers: 45,
      location: "Seattle, WA",
      mileage: 15670,
      condition: "Excellent",
      seller: "Electric Auto Sales",
      featured: false,
      description: "Low-mileage Model S Performance with Ludicrous mode."
    },
    {
      id: 6,
      title: "1963 Chevrolet Corvette Split Window",
      year: 1963,
      make: "Chevrolet",
      model: "Corvette Split Window",
      image: "/cars/chevrolet.jpg",
      images: ["/cars/chevrolet.jpg", "/cars/chevrolet.jpg"],
      currentBid: 125000,
      reserveMet: false,
      timeLeft: "6d 9h 12m",
      endDate: "2024-09-25T06:30:00",
      bids: 35,
      watchers: 112,
      location: "Dallas, TX",
      mileage: 52340,
      condition: "Very Good",
      seller: "Vintage Motorsports",
      featured: true,
      description: "Rare split-window Corvette with matching numbers 327/340hp."
    }
  ];

  const categories = [
    "All Categories",
    "Sports Cars",
    "Luxury Cars",
    "Classic Cars",
    "Electric Vehicles",
    "Muscle Cars",
    "Supercars",
    "Motorcycles"
  ];

  const priceRanges = [
    "All Prices",
    "Under $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000+"
  ];

  const conditions = [
    "All Conditions",
    "Like New",
    "Excellent",
    "Very Good",
    "Good",
    "Fair"
  ];

  const sortOptions = [
    { value: "ending-soon", label: "Ending Soon" },
    { value: "newest", label: "Newly Listed" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "most-bids", label: "Most Bids" },
    { value: "most-watched", label: "Most Watched" }
  ];

  const getTimeLeft = (timeLeft: string) => {
    const parts = timeLeft.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]} ${parts[2]}`;
    }
    return timeLeft;
  };

  const getTimeColor = (timeLeft: string) => {
    const days = parseInt(timeLeft.split('d')[0]);
    if (days <= 1) return "text-red-600";
    if (days <= 3) return "text-orange-600";
    return "text-gray-600";
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = searchQuery === "" || 
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Live Auctions
              </h1>
              <p className="text-lg text-gray-600">
                Discover and bid on exceptional vehicles from trusted sellers worldwide.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                {filteredAuctions.length} Active Auctions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by make, model, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-black focus:border-transparent min-w-[180px]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent">
                    {categories.map(category => (
                      <option key={category} value={category.toLowerCase().replace(' ', '-')}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent">
                    {priceRanges.map(range => (
                      <option key={range} value={range.toLowerCase().replace(' ', '-')}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="From"
                      className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="To"
                      className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent">
                    {conditions.map(condition => (
                      <option key={condition} value={condition.toLowerCase().replace(' ', '-')}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button className="px-4 py-2 text-gray-600 hover:text-black transition-colors duration-200">
                  Clear All
                </button>
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auctions Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {auction.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium z-10">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex space-x-2 z-10">
                      <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                      <div className="px-2 py-1 bg-black/70 text-white rounded text-xs flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {auction.watchers}
                      </div>
                    </div>
                    
                    <Image 
                      src={auction.image} 
                      alt={auction.title}
                      height={1000}
                      width={1000}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {!auction.reserveMet && (
                      <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Reserve Not Met
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{auction.year}</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {auction.location}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                      {auction.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {auction.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Current Bid</div>
                        <div className="text-2xl font-bold text-black">
                          ${auction.currentBid.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Time Left</div>
                        <div className={`text-sm font-medium flex items-center ${getTimeColor(auction.timeLeft)}`}>
                          <Clock className="h-4 w-4 mr-1" />
                          {getTimeLeft(auction.timeLeft)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Gavel className="h-4 w-4 mr-1" />
                        {auction.bids} bids
                      </div>
                      <div>{auction.mileage?.toLocaleString()} miles</div>
                      <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {auction.condition}
                      </div>
                    </div>
                    
                    <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
                      Place Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-1/3 relative">
                      <div className="aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                        {auction.featured && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium z-10">
                            Featured
                          </div>
                        )}
                        <Image 
                          src={auction.image} 
                          alt={auction.title}
                          height={1000}
                          width={1000}
                          className="w-full h-full object-cover"
                        />
                        {!auction.reserveMet && (
                          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                            Reserve Not Met
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">{auction.year} • {auction.location}</span>
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Heart className="h-4 w-4 text-gray-600" />
                              </button>
                              <div className="flex items-center text-xs text-gray-500">
                                <Eye className="h-3 w-3 mr-1" />
                                {auction.watchers}
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-black mb-2">
                            {auction.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4">
                            {auction.description}
                          </p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-1" />
                              {auction.mileage?.toLocaleString()} miles
                            </div>
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {auction.condition}
                            </div>
                            <div className="flex items-center">
                              <Gavel className="h-4 w-4 mr-1" />
                              {auction.bids} bids
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-6">
                          <div className="text-sm text-gray-500 mb-1">Current Bid</div>
                          <div className="text-3xl font-bold text-black mb-2">
                            ${auction.currentBid.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 mb-1">Time Left</div>
                          <div className={`text-sm font-medium flex items-center justify-end mb-4 ${getTimeColor(auction.timeLeft)}`}>
                            <Clock className="h-4 w-4 mr-1" />
                            {getTimeLeft(auction.timeLeft)}
                          </div>
                          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}