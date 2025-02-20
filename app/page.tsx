'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Notebook as Robot, 
  Truck, 
  UserCheck, 
  Stethoscope, 
  Shield, 
  Car, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  LineChart,
  Target,
  ChevronRight,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const commonTeaser = {
  previewText: `The robotics revolution is fundamentally reshaping global industries, driven by breakthroughs in artificial intelligence, sensor technology, and mechanical engineering. Our comprehensive analysis reveals a market at an inflection point, with adoption rates accelerating across sectors. Key technological advances in machine learning and computer vision are enabling robots to handle increasingly complex tasks with greater autonomy and precision. This transformation is creating both opportunities and risks for investors.

Early movers in robotics technology are establishing dominant market positions, while traditional players face disruption. Our research indicates that companies successfully integrating advanced robotics solutions are seeing significant improvements in operational efficiency, with average productivity gains of 30-50% and ROI periods shortening from 24 months to just 12 months. However, this rapid evolution is also creating clear market winners and losers...`,
  stockTeaser: {
    bullish: "Including market leaders in AI integration, breakthrough robotics platforms, and companies with proven deployment success (85+ Fool Score)",
    bearish: "Including traditional players slow to adapt, companies with outdated technology stacks, and those facing margin pressure from innovative competitors"
  }
};

const categories = [
  {
    title: "Industrial Robotics",
    icon: Robot,
    description: "Manufacturing automation, smart factories, and production line robotics",
    stats: "30% CAGR in Cobots",
    teaser: {
      keyStats: [
        "2x Growth",
        "30% CAGR",
        "$11B Market"
      ],
      ...commonTeaser
    }
  },
  {
    title: "AMRs & Logistical Robotics",
    icon: Truck,
    description: "Warehouse automation, delivery robots, and supply chain optimization",
    stats: "Market size $25B by 2030",
    teaser: {
      keyStats: [
        "312% Growth",
        "68% Efficiency",
        "4.5x ROI"
      ],
      ...commonTeaser
    }
  },
  {
    title: "Humanoid & Multipurpose Robots",
    icon: UserCheck,
    description: "Service robots, collaborative robots, and general-purpose automation",
    stats: "Fastest growing segment",
    teaser: {
      keyStats: [
        "85% Adaptable",
        "2.8x Savings",
        "156 Use Cases"
      ],
      ...commonTeaser
    }
  },
  {
    title: "Health & Surgical Robotics",
    icon: Stethoscope,
    description: "Medical procedures, patient care, and healthcare automation",
    stats: "315% growth projected",
    teaser: {
      keyStats: [
        "93% Accuracy",
        "42% Recovery",
        "$8.4B Market"
      ],
      ...commonTeaser
    }
  },
  {
    title: "Defense & Military Robotics",
    icon: Shield,
    description: "Defense applications, surveillance, and military automation",
    stats: "$92B market opportunity",
    teaser: {
      keyStats: [
        "276% Growth",
        "4.2x Effect",
        "58 Countries"
      ],
      ...commonTeaser
    }
  },
  {
    title: "Autonomous Vehicles & Heavy Machinery",
    icon: Car,
    description: "Self-driving vehicles, construction automation, and heavy equipment",
    stats: "Revolutionary impact",
    teaser: {
      keyStats: [
        "187% Safety",
        "3.8x Output",
        "$142B Market"
      ],
      ...commonTeaser
    }
  }
];

const stats = [
  { value: "$986B", label: "Total Market Size by 2030" },
  { value: "16.8%", label: "Combined CAGR 2025-2030" },
  { value: "127", label: "Companies Analyzed" }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      console.log('1. Starting checkout process...');
      
      console.log('4. Creating checkout session...');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('5. API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('6. Session data:', data);

      // Redirect to Stripe's hosted checkout page
      if (data.url) {
        console.log('7. Redirecting to checkout URL:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    console.log('Category clicked:', category.title);
    setSelectedCategory(category);
    console.log('Selected category state:', category.title);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Robot className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">FoolResearch</span>
            </div>
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100')] bg-cover bg-center py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  New Research Report
                </span>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  The Future of
                  <span className="block text-indigo-200">Robotics 2025-2030</span>
                </h1>
                <p className="mt-6 text-xl text-gray-100 max-w-3xl">
                  Exclusive market intelligence and investment insights on the robotics revolution. Discover emerging trends, market leaders, and investment opportunities.
                </p>
                <div className="mt-10 flex gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-indigo-600 hover:bg-gray-50"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Get Full Report Access'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Comprehensive Coverage Across Critical Sectors
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Deep dive into six transformative areas reshaping the future of robotics and automation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer"
              >
                <Card className="relative overflow-hidden p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-100 group">
                  <div className="flex items-center justify-between mb-4">
                    <category.icon className="h-12 w-12 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600">{category.stats}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Make Informed Investment Decisions
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Market Trends Analysis</h3>
                    <p className="text-gray-600">Detailed analysis of emerging trends, market dynamics, and growth drivers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <LineChart className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Financial Projections</h3>
                    <p className="text-gray-600">Five-year market size projections and growth forecasts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Target className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Investment Opportunities</h3>
                    <p className="text-gray-600">Identification of key players and investment opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Robot arm"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Free Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Gift className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What You Get for Free
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Start with valuable insights before committing to the full report
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "Access to insights on key trends shaping robotics",
              "Exclusive previews of market shifts, winners, and losers",
              "A free investor report excerpt"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}