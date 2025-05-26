'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  // Set current date/time after component mounts
  useEffect(() => {
    setCurrentDateTime("2025-05-26 05:41:37");
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/company_logo.png"
              alt="Company Logo"
              width={150}
              height={45}
              className="h-8 w-auto"
            />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Headset Borrow System
            </h1>
          </div>
          
          <div className="flex items-center">
            {currentDateTime && (
              <div className="mr-4 text-sm text-gray-600">
                {currentDateTime}
              </div>
            )}
            {session?.user && (
              <div className="mr-4 text-sm font-medium text-gray-700">
                Welcome, {session.user.name}!
              </div>
            )}
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="destructive"
              size="sm"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name:</strong> {session?.user?.name}</p>
              <p><strong>Username:</strong> {session?.user?.username}</p>
              <p><strong>Employee ID:</strong> {session?.user?.employeeId}</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Placeholder cards for future dashboard content */}
          <Card>
            <CardHeader>
              <CardTitle>Total Headsets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}