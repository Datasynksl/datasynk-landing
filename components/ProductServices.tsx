"use client"

import type React from "react"
import { Box, ChartBar, Lock, Map, Search, Settings, Sparkles, Table, ToyBrick } from "lucide-react"
import { GlowingEffect } from "./ui/glowingEffect"
import { BackgroundBeamsWithCollision } from "./ui/bgBeamCollion"

export default function ProductServices() {
  return (
  <BackgroundBeamsWithCollision>
    <section className="bg-transparent py-32 mt-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-semibold mb-4 text-white">we offer</h2>
        <p className="text-default-500 max-w-xl mx-auto">
          real-time solutions for products that rely solely on data
        </p>
      </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Structured datasets"
            description=" for developers & businesses"
        />

        <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Map className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Map Coordinates"
            description="map coordinates for your next big project"
        />

        <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<ToyBrick className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Data labeling for AI applications."
            description="cut down on cost and save time to build you desired AI"
        />

        <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Table className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Data refineing and management"
            description="We organized & manage your company data for rapid growth "
        />

        <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<ChartBar className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Data Analysis"
            description="data analytics helps your business grow fast"
        />
        </ul>
    </section>
    </BackgroundBeamsWithCollision>
  )
}

interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border border-white/30 p-2  md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-black-200/50">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}