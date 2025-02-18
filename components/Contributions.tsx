"use client"

import React, { useRef } from 'react'
import { CardBody, CardContainer, CardItem } from "./ui/3dCard"
import Image from "next/image"
import { Twitter, DiscIcon as Discord, ChevronLeft, ChevronRight } from "lucide-react"
import {contBg} from '@/public/images';

const contributors = [
  {
    tag: "#Telecom #orangesl",
    name: "Dtele",
    description: "Topic: Phone number validator",
    image:contBg,
  },
  {
    tag: "#Tribes",
    name: "Tribally",
    description: "Topic: Determine peoples tribe by surname",
    image:contBg,
  },
  {
    tag: "#Medicine-validator",
    name: "Medically",
    description: "Topic: Verify medication validity",
    image:contBg,
  },
  {
    tag: "#AI Research",
    name: "AILab",
    description: "Topic: Advanced Machine Learning Models",
    image:contBg,
  },
  {
    tag: "#Data Science",
    name: "DataPro",
    description: "Topic: Predictive Analytics Platform",
    image:contBg,
  }
]

export default function ContributionsShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of container width
      
      current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full min-h-auto bg-gradient-to-b from-black-100 to-black-200 p-16 pt-16 relative rounded-lg">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-4 text-white">Contributions</h1>
        <p className="text-default-500 hover:text-white max-w-xl mx-auto">
          Showcase of projects built with Datasynk, and you can contribute too!
        </p>
      </div>
      
      <div className="relative group">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
          bg-black/50 hover:bg-black/70 text-white p-2 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
          hidden md:block"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
          bg-black/50 hover:bg-black/70 text-white p-2 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
          hidden md:block"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide scroll-smooth"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {contributors.map((profile) => (
            <CardContainer 
              key={profile.name} 
              className="inter-var flex-shrink-0 scroll-snap-align-start"
              style={{ scrollSnapAlign: 'center' }}
            >
              <CardBody className="group/card relative w-[400px] h-[240px] rounded-xl p-6 border border-white/[0.2] bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/50">
                <div className="relative w-full h-full">
                  <CardItem translateZ="50" className="text-xs font-medium text-violet-400/90 mb-2">
                    {profile.tag}
                  </CardItem>

                  <div className="flex gap-4">
                    <CardItem translateZ="100" className="w-[100px] h-[100px]">
                      <Image
                        src={profile.image || "/placeholder.svg"}
                        height={100}
                        width={100}
                        className="rounded-lg object-cover grayscale"
                        alt={profile.name}
                      />
                    </CardItem>

                    <div className="flex flex-col justify-between py-2">
                      <CardItem translateZ="50" className="text-2xl font-medium text-white">
                        {profile.name}
                      </CardItem>
                      <CardItem as="p" translateZ="60" className="text-sm text-neutral-300 max-w-sm mt-2">
                        {profile.description}
                      </CardItem>
                    </div>
                  </div>

                  <CardItem translateZ="100" className="flex items-center gap-4 mt-8">
                    <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                      <Discord className="w-5 h-5" />
                    </a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  )
}
