// src/app/dashboard/page.tsx
import React, { Suspense } from 'react';
import DashboardContent from './DashboardContent'; // Import the new component

// Optional: You can add a loading fallback here if you wish
// This will be displayed on the server during prerendering
const LoadingDashboard = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading dashboard...</p>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingDashboard />}>
      <DashboardContent />
    </Suspense>
  );
}