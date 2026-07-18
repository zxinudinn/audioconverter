
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: isAnnual ? 0 : 0,
      period: "/month",
      features: [
        "5 conversions per day",
        "File upload only",
        "Basic formats (MP3, WAV)",
        "Standard quality",
      ],
      limitations: [
        "No YouTube/SoundCloud",
        "No Roblox integration",
        "Priority support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: isAnnual ? 9.99 : 12.99,
      period: "/month",
      features: [
        "Unlimited conversions",
        "All source types (YouTube, SoundCloud, Roblox)",
        "All output formats",
        "High quality output",
        "Priority support",
      ],
      limitations: [],
      cta: "Subscribe Now",
      popular: true,
    },
    {
      name: "Pro",
      price: isAnnual ? 19.99 : 24.99,
      period: "/month",
      features: [
        "Everything in Premium",
        "Batch conversion",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Team management",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your audio conversion needs.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-secondary"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-primary transition-transform ${
                    isAnnual ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted"}`}>
                Annually <span className="text-xs text-primary">(Save 23%)</span>
              </span>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full transition-all ${plan.popular ? "border-primary card-glow" : ""}`}>
                    {plan.popular && (
                      <div className="bg-primary text-background text-center py-1 text-sm font-medium rounded-t-xl">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="flex items-baseline gap-1 mt-4">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-muted">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 text-muted shrink-0" />
                          <span className="text-sm text-muted">{limitation}</span>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Link href={plan.name === "Free" ? "/register" : "/register"}>
                        <Button
                          variant={plan.popular ? "default" : "outline"}
                          className="w-full"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
