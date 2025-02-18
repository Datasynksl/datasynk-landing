"use client"

import Link from 'next/link'
import { Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black-200 text-white py-12 px-4 md:px-8 h-32 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link href="/api" className="hover:text-primary transition-colors">API Documentation</Link></li>
            <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <Link 
              href="https://twitter.com/datasynk" 
              target="_blank" 
              className="text-neutral-300 hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link 
              href="https://linkedin.com/company/datasynk" 
              target="_blank" 
              className="text-neutral-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link 
              href="https://github.com/datasynk" 
              target="_blank" 
              className="text-neutral-300 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-8 border-t border-white/10">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Datasynk. All rights reserved.
        </p>
      </div>
    </footer>
  )
}