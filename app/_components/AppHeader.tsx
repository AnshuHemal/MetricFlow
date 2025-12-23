"use client";
import React, { useEffect, useState } from 'react';
import { BarChart3, User, Settings, Bell } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoadingLink } from '@/components/ui/loading-link';

function AppHeader() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'shadow-lg' : 'shadow-sm'}`}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className={`flex items-center space-x-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="bg-blue-600 rounded-lg p-2 transform hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                            <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                MetricFlow
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">Analytics Dashboard</p>
                        </div>
                    </div>

                    {/* Navigation and Actions */}
                    <div className={`flex items-center space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        {/* Quick Actions */}
                        <div className="hidden md:flex items-center space-x-2">
                            <LoadingLink 
                              href="/dashboard/new"
                              loadingText="Setting up new website..."
                            >
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                                >
                                    Add Website
                                </Button>
                            </LoadingLink>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-3">
                            <div className="transform hover:scale-110 transition-all duration-200">
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8 hover:shadow-lg transition-shadow duration-200"
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-purple-50 rounded-full opacity-15 animate-float-delayed"></div>
            </div>
        </header>
    );
}

export default AppHeader;
