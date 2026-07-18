
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#2a2d4e]",
        scrolled ? "bg-[#0a0b14]/95 backdrop-blur-xl" : "bg-[#0a0b14]"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-8 w-8 text-[#38bdf8]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#6366f1] bg-clip-text text-transparent">ZY STUDIO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#8b93b1] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/convert" className="text-[#8b93b1] hover:text-white transition-colors">
              Convert
            </Link>
            <Link href="/pricing" className="text-[#8b93b1] hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/convert">
              <Button variant="default" className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black">
                Convert Now
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pt-4"
          >
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-[#8b93b1] hover:text-white transition-colors py-2">
                Home
              </Link>
              <Link href="/convert" className="text-[#8b93b1] hover:text-white transition-colors py-2">
                Convert
              </Link>
              <Link href="/pricing" className="text-[#8b93b1] hover:text-white transition-colors py-2">
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-[#2a2d4e]">
                <Link href="/convert">
                  <Button variant="default" className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-black">
                    Convert Now
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
