// app/leaderboard/page.tsx - Main Leaderboard Page
"use client";

import React, { useState } from "react";
import { Trophy, Filter, Calendar, TrendingUp, Gavel, User } from "lucide-react";

// Components
import Podium from "@/components/leaderboard/Podium";
import SellerTable from "@/components/leaderboard/SellerTable";
import BuyerTable from "@/components/leaderboard/BuyerTable";
import Achievements from "@/components/leaderboard/Achievements";
import RecentSales from "@/components/leaderboard/RecentSales";

// Data and Types
import { topSellers, topBuyers, achievements, recentHighSales } from "@/data/leaderboard";
import { LeaderboardCategory } from "@/types/leaderboard";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("month");
  const [category, setCategory] = useState<LeaderboardCategory>("sellers");

  const currentData = category === "sellers" ? topSellers : topBuyers;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Live Rankings Updated Daily
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              Leaderboard
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the top performers in our auction community. 
              From the biggest sellers to the most successful buyers, 
              see who&apos;s leading the automotive auction world.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">View:</span>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                <button
                  onClick={() => setCategory("sellers")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-center ${
                    category === "sellers"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Top Sellers
                </button>
                <button
                  onClick={() => setCategory("buyers")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-center ${
                    category === "buyers"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Top Buyers
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* allow horizontal scroll on small screens if Podium is wide */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[640px] sm:min-w-0">
              <Podium data={currentData} category={category} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Leaderboard Table */}
      <section className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-4 py-4 sm:px-6 sm:py-6 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                {category === "sellers" ? "Top Sellers" : "Top Buyers"} Ranking
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Updated daily based on {timeframe} performance
              </p>
            </div>

            <div className="overflow-x-auto">
              {category === "sellers" ? (
                <SellerTable sellers={topSellers} />
              ) : (
                <BuyerTable buyers={topBuyers} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <Achievements achievements={achievements} />

      {/* Recent High-Value Sales */}
      <RecentSales sales={recentHighSales} />

      {/* Statistics Overview */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Community Statistics
              </h2>
              <p className="text-sm sm:text-lg text-gray-300">
                Our thriving auction ecosystem by the numbers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">$2.45M</div>
                <div className="text-gray-300 text-sm sm:text-base">Highest Monthly Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">47</div>
                <div className="text-gray-300 text-sm sm:text-base">Most Vehicles Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-gray-300 text-sm sm:text-base">Best Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">$875K</div>
                <div className="text-gray-300 text-sm sm:text-base">Highest Single Sale</div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <p className="text-gray-300 mb-4">
                Want to see your name on the leaderboard?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/sell"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <Gavel className="mr-2 h-4 w-4" />
                  Start Selling
                </a>
                <a
                  href="/auctions"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                >
                  <User className="mr-2 h-4 w-4" />
                  Start Bidding
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            Ready to Compete?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of successful buyers and sellers in our marketplace. 
            Start your journey to the top of the leaderboard today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Join AutoBID
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}