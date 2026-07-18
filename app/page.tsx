
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Music, Youtube, Zap, CheckCircle, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "File Upload",
      description: "Convert your local audio files to any format with ease.",
    },
    {
      icon: <Youtube className="h-10 w-10 text-primary" />,
      title: "YouTube & SoundCloud",
      description: "Download and convert audio from YouTube and SoundCloud URLs.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Roblox Integration",
      description: "Upload your converted audio directly to Roblox.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Fast Conversion",
      description: "High-speed processing with FFmpeg technology.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Your files are processed securely and never stored.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Multiple Formats",
      description: "Support MP3, WAV, OGG, FLAC, and many more formats.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Convert Audio <br />
                <span className="gradient-text">Like Never Before</span>
              </h1>
              <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
                The modern audio converter that supports file uploads, YouTube, SoundCloud, and Roblox integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/convert">
                  <Button variant="default" size="lg" className="text-lg h-14 px-8">
                    Start Converting
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="text-lg h-14 px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
              Everything you need to convert and manage your audio files in one place.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-glow hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Ready to <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-muted mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust AudioConverter for their audio conversion needs.
              </p>
              <Link href="/register">
                <Button variant="default" size="lg" className="text-lg h-14 px-8">
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
