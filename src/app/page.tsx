"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Added this import
import Layout from "@/components/Layout";
import { createPageUrl } from "@/lib/utils";
import { 
  CheckCircle, 
  Brain, 
  TrendingUp, 
  Smartphone,
  ArrowRight,
  Star,
  Users,
  Clock,
  Award,
  ExternalLink
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: CheckCircle,
      title: "1000+ Practice Questions",
      description: "Comprehensive question bank covering all NCLEX-RN topics with detailed explanations."
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get personalized feedback and explanations powered by advanced AI technology."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics and performance insights."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Study anywhere, anytime with our responsive mobile-optimized platform."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "NurseID helped me pass my NCLEX on the first try! The AI explanations were incredibly helpful.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      text: "The practice questions are spot-on and really prepared me for the real exam format.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      text: "I love how I can track my progress and see exactly where I need to improve.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1594824792696-12ad4b2ba3df?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Students Helped" },
    { icon: Award, value: "95%", label: "Pass Rate" },
    { icon: Clock, value: "24/7", label: "Study Access" }
  ];

  return (
    <Layout currentPageName="Home">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
                Get Licensed
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Faster
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Prepare for the Nurse Exam with Confidence using our AI-powered platform 
                with 1000+ practice questions and personalized feedback.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link 
                  href={createPageUrl("Auth")}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                
                <a 
                  href="https://ai-assistant-for-us-nurses.zapier.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-purple-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <Brain className="w-5 h-5" />
                  Try AI Assistant
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Highlight Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50 border-y border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Your Personal AI Nursing Assistant
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get instant answers to nursing questions, study tips, and personalized guidance 
                from our specialized AI assistant trained specifically for nursing students.
              </p>
              <a 
                href="https://ai-assistant-for-us-nurses.zapier.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                Chat with AI Assistant Now
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Free to use • No registration required • Available 24/7
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to
                <span className="block text-blue-600">Succeed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools and resources you need to ace your nursing exam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Get full access to all features with our affordable monthly subscription.
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  $9.99
                  <span className="text-2xl text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600">Full Access to Everything</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "1000+ Practice Questions",
                  "AI-Powered Explanations",
                  "Progress Analytics", 
                  "Mobile Access",
                  "24/7 Support",
                  "Regular Content Updates"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={createPageUrl("Auth")}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Loved by Future
                <span className="block text-blue-600">Nurses</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of nursing students who have successfully passed their exams with NurseID.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p> {/* Escaped quotes here */}
                  <div className="flex items-center gap-4">
                    <Image // Changed to Next.js Image component
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48} // Added width
                      height={48} // Added height
                      className="rounded-full object-cover" // Kept existing classes
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">Registered Nurse</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}