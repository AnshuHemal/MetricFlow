"use client"

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect } from 'react'
import { LoadingProvider } from '@/contexts/LoadingContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { Toaster } from '@/components/ui/sonner';

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user, isLoaded } = useUser();
    
    useEffect(() => {
        // Only try to create user when Clerk has finished loading and user exists
        if (isLoaded && user) {
            createNewUser();
        }
    }, [user, isLoaded]);

    const createNewUser = async () => {
        try {
            // Additional validation
            if (!user?.primaryEmailAddress?.emailAddress) {
                return;
            }

            const result = await axios.post('/api/user');
        } catch (error: unknown) {
            // Better error handling with proper typing
            if (axios.isAxiosError(error)) {
                // Only log critical errors (not 401 which is expected when not authenticated)
                if (error.response?.status !== 401) {
                    console.error('Critical user creation error:', error.response?.data);
                }
            } else if (error instanceof Error) {
                console.error('User creation error:', {
                    message: error.message,
                    name: error.name,
                });
            } else {
                console.error('Unknown error during user creation:', error);
            }
        }
    }

    return (
        <LoadingProvider>
            <NavigationProvider>
                {children}
                <Toaster />
            </NavigationProvider>
        </LoadingProvider>
    )
}

export default Provider

