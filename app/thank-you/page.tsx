'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-gray-600 mb-8">
            Your full report access will be emailed to you shortly. Please check your inbox for further instructions.
          </p>
          <Link href="/">
            <Button className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}