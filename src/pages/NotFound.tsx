
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center h-full p-4 mt-20">
        <div className="text-6xl font-bold text-purple mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-neutral-300 mb-8 text-center">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} className="bg-purple hover:bg-purple/90">
          Back to Home
        </Button>
      </div>
    </MobileLayout>
  );
};

export default NotFound;
