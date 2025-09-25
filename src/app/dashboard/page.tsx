"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }

    const user = JSON.parse(userData);
    
    // Redirect based on role
    switch (user.role) {
      case 'admin':
        router.push('/dashboard/admin');
        break;
      case 'manager':
        router.push('/dashboard/manager');
        break;
      case 'client':
        router.push('/dashboard/client');
        break;
      default:
        router.push('/dashboard/client'); // Default to client view
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Redirecting to your personalized dashboard...</p>
      </div>
    </div>
  );
}
