// app/how-it-works/page.tsx - How It Works Page
import React from "react";
import { Shield, CheckCircle, FileText, Camera, Award, Users, Zap, ArrowRight, HelpCircle, Search, Gavel, CreditCard, Truck } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up and verify your identity. Add payment methods for seamless bidding.",
      details: ["Email verification", "Secure payment setup"]
    },
    {
      number: 2,
      title: "Browse & Research",
      description: "Explore our curated selection of vehicles and use filters to find the right match.",
      details: ["Vehicle history reports", "Seller ratings"]
    },
    {
      number: 3,
      title: "Place Your Bids",
      description: "Bid in real-time or set proxy bids to participate automatically.",
      details: ["Real-time updates", "Automatic increments"]
    },
    {
      number: 4,
      title: "Win & Complete Payment",
      description: "If you win, complete payment within the required window using our secure processors.",
      details: ["Instant notifications", "Secure processing"]
    },
    {
      number: 5,
      title: "Arrange Delivery",
      description: "Coordinate shipping with the seller or use our recommended partners for insured transport.",
      details: ["Vetted shippers", "Insurance options"]
    }
  ];

//   const sellerSteps = [
//     {
//       number: 1,
//       icon: UserPlus,
//       title: "Register as Seller",
//       description: "Complete seller verification process and provide business documentation if applicable.",
//       details: ["Identity verification", "Business license (if dealer)", "Banking information setup"]
//     },
//     {
//       number: 2,
//       icon: Camera,
//       title: "List Your Vehicle",
//       description: "Upload high-quality photos and detailed information about your vehicle.",
//       details: ["Professional photo guidelines", "Detailed condition reports", "Vehicle history documentation"]
//     },
//     {
//       number: 3,
//       icon: FileText,
//       title: "Set Auction Terms",
//       description: "Choose your reserve price, auction duration, and terms of sale.",
//       details: ["Reserve price options", "Auction length (3-10 days)", "Custom terms and conditions"]
//     },
//     {
//       number: 4,
//       icon: Clock,
//       title: "Monitor Your Auction",
//       description: "Track bids in real-time and communicate with potential buyers through our messaging system.",
//       details: ["Real-time bid tracking", "Buyer Q&A system", "Auction analytics dashboard"]
//     },
//     {
//       number: 5,
//       icon: DollarSign,
//       title: "Complete the Sale",
//       description: "Once sold, coordinate with the buyer for payment and delivery arrangements.",
//       details: ["Secure payment processing", "Delivery coordination", "Post-sale support"]
//     }
//   ];

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Buyer Protection",
      description: "Every purchase is protected by our comprehensive guarantee program."
    },
    {
      icon: Award,
      title: "Verified Sellers",
      description: "All sellers undergo identity verification and background checks."
    },
    {
      icon: CheckCircle,
      title: "Vehicle Inspections",
      description: "Professional inspections available for high-value vehicles."
    },
    {
      icon: Users,
      title: "Dispute Resolution",
      description: "Dedicated support team to resolve any transaction issues."
    }
  ];

  const faqItems = [
    {
      question: "What happens if I win an auction?",
      answer: "You'll receive an immediate notification and have 24 hours to complete payment. Our team will guide you through the entire process."
    },
    {
      question: "Are there any fees for buyers?",
      answer: "Yes, we charge a 5% buyer's premium on the final hammer price. This covers payment processing and buyer protection services."
    },
    {
      question: "How long do auctions typically last?",
      answer: "Most auctions run for 7 days, but sellers can choose durations between 3-10 days depending on their preferences."
    },
    {
      question: "Can I inspect a vehicle before bidding?",
      answer: "While we provide detailed photos and reports, physical inspections can be arranged with the seller for high-value vehicles."
    },
    {
      question: "What if a vehicle isn't as described?",
      answer: "We offer a comprehensive return policy and dispute resolution process. Our buyer protection covers misrepresented vehicles."
    },
    {
      question: "How do I know a seller is trustworthy?",
      answer: "All sellers are verified and rated by previous buyers. We also provide detailed seller profiles and transaction history."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              How AutoBID Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Whether you&apos;re buying your dream car or selling to collectors worldwide, 
              our platform makes automotive auctions simple, secure, and successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo Video
              </button> */}
              <a
                href="/register"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Removed buyer/seller toggle - general audience only */}

      {/* How It Works - Linear text-only timeline */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">A simple step-by-step process for all users.</p>
          </div>

          <ol className="space-y-8">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold mr-4">{step.number}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black">{step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                  {step.details && (
                    <ul className="mt-2 text-gray-700 list-disc pl-5 space-y-1">
                      {step.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-lg text-gray-600">
              We&apos;ve built comprehensive safeguards to protect every transaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm mb-6">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              $1M+ Protected in Transactions
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose AutoBID?
            </h2>
            <p className="text-lg text-gray-600">
              Advanced features that make buying and selling cars easier than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Real-Time Bidding</h3>
              <p className="text-gray-600">Experience the excitement of live auctions with instant bid updates and notifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <Camera className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">HD Photo Gallery</h3>
              <p className="text-gray-600">Detailed high-resolution photos showing every angle and detail of each vehicle.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <FileText className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Vehicle Reports</h3>
              <p className="text-gray-600">Comprehensive history reports including accident records, service history, and ownership details.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <Users className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Expert Support</h3>
              <p className="text-gray-600">Dedicated support team available 24/7 to assist with any questions or issues.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <Truck className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Shipping Network</h3>
              <p className="text-gray-600">Nationwide network of trusted shipping partners for safe and insured vehicle transport.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
              <CreditCard className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Secure Payments</h3>
              <p className="text-gray-600">Bank-level security with multiple payment options and fraud protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about using AutoBID.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <details key={index} className="group bg-white rounded-xl shadow-sm border overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <h3 className="text-lg font-medium text-black pr-4">{faq.question}</h3>
                    <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of buyers and sellers who trust AutoBID for their automotive needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/auctions"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Auctions
            </a>
            <a
              href="/sell"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              <Gavel className="mr-2 h-5 w-5" />
              Sell Your Car
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-400" />
              <span>Fully protected</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              <span>Expert support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}