"use client";
import Link from "next/link";
import { LoadingLink } from "@/components/ui/loading-link";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Eye, 
  Code,
  BookOpen,
  Play,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  MessageCircle,
  HelpCircle,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathways = [
    {
      icon: Users,
      title: "Analytics for beginners and small businesses",
      description: "For anyone who's new to MetricFlow or simply needs to understand its fundamentals.",
      href: "/dashboard",
      color: "bg-blue-50 text-blue-600",
      gradient: "from-blue-100 to-blue-200"
    },
    {
      icon: TrendingUp,
      title: "Analytics for marketing specialists and digital analysts",
      description: "For marketers or data analysts looking to explore MetricFlow, including advanced features and capabilities.",
      href: "/dashboard",
      color: "bg-green-200 text-green-800",
      gradient: "from-green-300 to-green-400"
    },
    {
      icon: Code,
      title: "Analytics for developers",
      description: "For developers who want to tag a website or app, set up events or ecommerce, or build custom Analytics functionality.",
      href: "/dashboard",
      color: "bg-purple-50 text-purple-600",
      gradient: "from-purple-100 to-purple-200"
    }
  ];

  const videos = [
    {
      title: "Get started with MetricFlow",
      description: "Learn how to set up MetricFlow on a website for the first time using our tracking script.",
      thumbnail: "chart", // Will use chart icon
      duration: "5:32"
    },
    {
      title: "Turn insights into ROI with MetricFlow",
      description: "Learn how MetricFlow helps you uncover relevant customer insights to drive performance.",
      thumbnail: "trending", // Will use trending icon
      duration: "8:15"
    },
    {
      title: "Best practices for website tracking",
      description: "Learn the best practice methods for setting up your MetricFlow tracking implementation.",
      thumbnail: "code", // Will use code icon
      duration: "12:45"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "What's New",
      description: "Learn about new features and functionality in the release notes for MetricFlow.",
      href: "#"
    },
    {
      icon: MessageCircle,
      title: "Community",
      description: "Ask MetricFlow questions to a community of practitioners to help accomplish your data collection goals.",
      href: "#"
    },
    {
      icon: HelpCircle,
      title: "Ask an expert",
      description: "Find certified partners who can support you every step of the way.",
      href: "#"
    }
  ];

  const developerResources = [
    {
      icon: Code,
      title: "Developer documentation",
      description: "Learn how to use MetricFlow APIs and developer products to automate your measurement solutions.",
      href: "#"
    },
    {
      icon: Globe,
      title: "Sample code",
      description: "Get started with MetricFlow for developers using our client libraries and code samples on GitHub.",
      href: "#"
    },
    {
      icon: Lightbulb,
      title: "Demos and Tools",
      description: "Discover what's possible with the MetricFlow platform using our demos and tools for developers.",
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className={`bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-fade-in-left">
              <div className="bg-blue-600 rounded p-1.5 transform hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">MetricFlow</span>
              <span className="text-gray-400 animate-pulse">|</span>
              <span className="text-gray-600 animate-fade-in-right">Analytics for Developers</span>
            </div>
            
            <div className="flex items-center space-x-4 animate-fade-in-right">
              {!user ? (
                <SignInButton mode="modal" signUpForceRedirectUrl={"/dashboard"}>
                  <Button variant="outline" size="sm" className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
                    Get Started
                  </Button>
                </SignInButton>
              ) : (
                <div className="flex items-center space-x-4">
                  <LoadingLink 
                    href="/dashboard"
                    loadingText="Loading your dashboard..."
                  >
                    <Button variant="outline" size="sm" className="hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer">Dashboard</Button>
                  </LoadingLink>
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 leading-tight">
              <span className="inline-block animate-fade-in-up">Start learning about</span><br />
              <span className="font-medium text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent inline-block animate-fade-in-up-delayed animate-pulse-slow">
                MetricFlow
              </span>
            </h1>
            
            <div className="prose prose-lg text-gray-600 max-w-3xl space-y-4">
              <p className={`leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                MetricFlow is the go-to platform for millions of website and app owners seeking to gain a deeper 
                understanding of their website and app performance. With MetricFlow, you can fine-tune your digital 
                strategy, optimize your campaigns, and take your online presence to new heights.
              </p>
              <p className={`leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                New to MetricFlow? Check out our free courses to get started. Looking for developer documentation? 
                See MetricFlow for developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-50 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-40 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-normal text-gray-900 mb-12 text-center animate-fade-in-up hover:text-blue-600 transition-colors duration-300 cursor-default">Choose your path</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pathways.map((pathway, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden animate-fade-in-up hover:border-blue-200 cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${pathway.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                  <div className={`w-20 h-20 rounded-full ${pathway.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                    <pathway.icon className="h-10 w-10 group-hover:animate-bounce" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all duration-300" />
                  
                  {/* Enhanced floating particles */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-ping group-hover:bg-white/60"></div>
                  <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/50 rounded-full animate-pulse group-hover:animate-bounce"></div>
                  <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce group-hover:bg-white/50"></div>
                  <div className="absolute top-8 right-12 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${pathway.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-lg`}>
                    <pathway.icon className="h-6 w-6 group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {pathway.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {pathway.description}
                  </p>
                  <LoadingLink 
                    href={pathway.href}
                    loadingText="Loading your dashboard..."
                  >
                    <Button variant="outline" className="w-full justify-center group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </LoadingLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="prose prose-lg text-gray-600 max-w-none animate-fade-in-up">
            <h3 className="text-2xl font-medium text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300 cursor-default">
              Take the MetricFlow Academy course
            </h3>
            <div className="relative">
              <p className="leading-relaxed hover:text-gray-800 transition-colors duration-200 text-lg">
                MetricFlow provides free courses to help you get started with website analytics. First, learn how 
                MetricFlow works and create your account and property. Then, learn how to navigate the MetricFlow 
                interface, use reports for your business, and manage the data you send.
              </p>
              
              {/* Decorative elements */}
              <div className="absolute -left-4 top-2 w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
              <div className="absolute -right-2 bottom-4 w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            {/* Call to action button */}
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <LoadingLink 
                href="/dashboard"
                loadingText="Loading your dashboard..."
              >
                <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-50 rounded-full opacity-50 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-normal text-gray-900 mb-12 text-center animate-fade-in-up hover:text-blue-600 transition-colors duration-300">
            Watch MetricFlow videos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {videos.map((video, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden cursor-pointer animate-fade-in-up hover:border-blue-200"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        {video.thumbnail === 'chart' && <BarChart3 className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />}
                        {video.thumbnail === 'trending' && <TrendingUp className="h-8 w-8 text-green-800 group-hover:animate-pulse" />}
                        {video.thumbnail === 'code' && <Code className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 group-hover:scale-125 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 animate-pulse-slow shadow-lg group-hover:shadow-xl">
                        <Play className="h-6 w-6 text-gray-800 ml-1 group-hover:text-white group-hover:animate-bounce" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded group-hover:bg-blue-600 transition-colors duration-300 hover:scale-110">
                      {video.duration}
                    </div>
                    
                    {/* Enhanced animated elements */}
                    <div className="absolute top-3 left-3 w-2 h-2 bg-white/40 rounded-full animate-ping group-hover:bg-blue-300"></div>
                    <div className="absolute top-6 right-8 w-1 h-1 bg-white/30 rounded-full animate-bounce group-hover:animate-ping"></div>
                    <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse group-hover:animate-bounce"></div>
                  </div>
                  <div className="p-6 group-hover:bg-blue-50/50 transition-colors duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button variant="outline" className="inline-flex items-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer">
              Watch more on the MetricFlow YouTube channel
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full opacity-25 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-normal text-gray-900 mb-12 text-center animate-fade-in-up hover:text-blue-600 transition-colors duration-300">
            Continue learning
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group animate-fade-in-up hover:border-blue-200 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4 group-hover:bg-blue-50/30 transition-colors duration-300">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-md group-hover:shadow-lg">
                    <resource.icon className="h-6 w-6 group-hover:animate-bounce" />
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 group-hover:bg-blue-50/20 transition-colors duration-300">
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {resource.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-lg"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute top-16 left-16 w-36 h-36 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full opacity-35 animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-green-50 to-teal-50 rounded-full opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-normal text-gray-900 mb-12 text-center animate-fade-in-up hover:text-purple-600 transition-colors duration-300">
            Developer resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {developerResources.map((resource, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group animate-fade-in-up hover:border-purple-200 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4 group-hover:bg-purple-50/30 transition-colors duration-300">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-md group-hover:shadow-lg">
                    <resource.icon className="h-6 w-6 group-hover:animate-bounce" />
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 group-hover:bg-purple-50/20 transition-colors duration-300">
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {resource.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="mt-4 flex justify-end">
                    <Code className="h-4 w-4 text-gray-400 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-lg"></div>
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-1 h-1 bg-purple-200 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white border-t border-gray-200 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-8 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-8 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-15 animate-float-delayed"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-xl font-medium text-gray-900 mb-4 animate-fade-in-up hover:text-blue-600 transition-colors duration-300">
            Didn't find what you were looking for?
          </h3>
          <p className="text-gray-600 mb-6 animate-fade-in-up hover:text-gray-800 transition-colors duration-200" style={{ animationDelay: '0.1s' }}>
            Search the MetricFlow documentation to find what you're looking for.
          </p>
          
          <div className="max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex group">
              <input
                type="text"
                placeholder="Search documentation..."
                className="flex-1 px-4 py-3 h-12 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 hover:shadow-md cursor-text"
              />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 hover:shadow-lg h-12 px-6 cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            {/* Decorative search suggestions */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                API docs
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                Getting started
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                Tutorials
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Light Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-15 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="bg-blue-600 rounded-lg p-2 transform hover:scale-110 hover:rotate-12 transition-all duration-300 group-hover:shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white group-hover:animate-pulse" />
                </div>
                <span className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">MetricFlow</span>
              </div>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg hover:text-gray-800 transition-colors duration-200">
                The modern analytics platform that helps you understand your website visitors 
                and grow your business with actionable insights.
              </p>
              <div className="flex space-x-5">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 transform hover:rotate-12 cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 transform hover:rotate-12 cursor-pointer"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 transform hover:rotate-12 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 transform hover:rotate-12 cursor-pointer"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-gray-900 font-semibold mb-6 text-lg hover:text-blue-600 transition-colors duration-300">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Features</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Pricing</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>API</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Integrations</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-gray-900 font-semibold mb-6 text-lg hover:text-blue-600 transition-colors duration-300">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Documentation</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Tutorials</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Blog</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Community</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-gray-900 font-semibold mb-6 text-lg hover:text-blue-600 transition-colors duration-300">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>About</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Careers</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Contact</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group hover:translate-x-1 cursor-pointer">
                    <span>Support</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="py-8 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">Stay updated</h3>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Get the latest analytics insights and product updates delivered to your inbox.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 flex-1 md:w-64 hover:border-blue-300 hover:shadow-md group-hover:shadow-lg cursor-text"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 h-12 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-xl flex items-center justify-center cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm flex items-center hover:text-gray-700 transition-colors duration-200 cursor-default">
                © 2025 MetricFlow. All rights reserved. Made with <Heart className="h-4 w-4 text-red-500 mx-1 hover:animate-bounce cursor-pointer" /> for developers.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Cookie Policy
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
