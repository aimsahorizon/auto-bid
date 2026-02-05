// app/about/page.tsx - About Page
import React from "react";
import Image from "next/image";
import { 
  Users, 
  Target, 
  Shield, 
  Globe,  
  Heart, 
  Lightbulb,
  CheckCircle,
  Building,
  Code,
  Palette,
  Briefcase
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2025",
      title: "Company Founded",
      description: "Started with a vision to revolutionize car auctions"
    },
    {
      year: "2019",
      title: "First 1,000 Users",
      description: "Reached our first major user milestone"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded operations to 15 countries worldwide"
    },
    {
      year: "2021",
      title: "$100M in Sales",
      description: "Crossed $100 million in total auction sales"
    },
    {
      year: "2022",
      title: "Mobile App Launch",
      description: "Launched iOS and Android apps for mobile bidding"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered vehicle authentication"
    },
    {
      year: "2024",
      title: "50,000+ Users",
      description: "Reached 50,000+ registered users globally"
    }
  ];

  const team = [
    {
      name: "Marian Soriano",
      role: "CEO & Co-Founder",
      icon: Briefcase,
      bio: "Computer Science student leading the vision and project management, focused on revolutionizing the automotive marketplace through innovation."
    },
    {
      name: "Emman Idulsa",
      role: "CTO & Co-Founder",
      icon: Code,
      bio: "Computer Science student and lead developer, specializing in building robust real-time systems and secure database architectures."
    },
    {
      name: "Ionyjal Amin",
      role: "Designer & Co-Founder",
      icon: Palette,
      bio: "Computer Science student and lead designer, dedicated to creating intuitive user interfaces and a seamless digital experience."
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every transaction is secure, verified, and transparent. We believe trust is the foundation of great auctions."
    },
    {
      icon: Heart,
      title: "Passion for Cars",
      description: "We're car enthusiasts ourselves. We understand the emotional connection between people and their vehicles."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We constantly push boundaries with new technology to improve the auction experience for everyone."
    },
    {
      icon: Globe,
      title: "Local Community",
      description: "We connect car lovers in Zamboanga City, breaking down geographical barriers in the automotive market."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "15", label: "Countries" },
    { number: "500M+", label: "Total Sales" },
    { number: "99.2%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              About AutoBID
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We&apos;re revolutionizing the way people buy and sell cars through transparent, 
              secure, and accessible online auctions. Our mission is to create the world&apos;s 
              most trusted automotive marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-black text-white rounded-full text-sm font-medium mb-6">
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                Making Car Auctions Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that buying and selling cars should be transparent, secure, and exciting. 
                Our platform eliminates the traditional barriers of physical auctions, allowing anyone, 
                anywhere to participate in the automotive market.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Democratize access to premium vehicles worldwide</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Ensure every transaction is secure and transparent</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Build a global community of automotive enthusiasts</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src="/about/handshake.jpg" 
                  width={1000}
                  height={1000}
                  alt="Team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border">
                <div className="text-2xl font-bold text-black">6</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
              <Users className="h-4 w-4 mr-2" />
              The Team
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are Computer Science students dedicated to building a modern, transparent, and secure auction platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <div key={index} className="relative group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black hover:bg-white transition-all duration-300 hover:shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-black rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 tracking-wide uppercase">{member.role}</div>
                  <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Get in touch with our team to learn more about 
            AutoBID and how we can help you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Building className="mr-2 h-5 w-5" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}