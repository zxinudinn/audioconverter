import Link from "next/link";
import { Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2d4e] bg-[#0a0b14] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Music className="h-6 w-6 text-[#38bdf8]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#6366f1] bg-clip-text text-transparent">ZY STUDIO</span>
            </Link>
            <p className="text-[#8b93b1] text-sm">
              Convert and upload audio to Roblox instantly
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-[#8b93b1]">
              <li><Link href="/convert" className="hover:text-white transition-colors">Convert</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-[#8b93b1]">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-[#8b93b1]">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#2a2d4e] text-center text-sm text-[#5a5f8a]">
          © 2026 ZY STUDIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}