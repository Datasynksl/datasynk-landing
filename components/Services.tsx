"use client"

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { LampDemo } from "./ui/lamp";

export default function Services() {
  return (
    <section className="p-4">
      <LampDemo>
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold mb-4 text-black-100">Key Features</h2>
        <p className="text-default-500 hover:text-white max-w-xl mx-auto">
          Empowering your data journey with comprehensive solutions that drive insights and innovation.
        </p>
      </div>
      <div className="max-w-full gap-6 grid grid-cols-12 grid-rows-2 px-8">
        <Card className="bg-black-100 col-span-12 sm:col-span-4 h-[300px] group">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">AI</p>
            <h4 className="text-white font-medium text-large">AI-powered data structuring</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="
              z-0 w-full h-full object-cover 
              group-hover:filter-none 
              filter grayscale-[0.75] 
              transition-all duration-300 ease-in-out
            "
            src="./images/28765373.jpg"
          />
        </Card>
        <Card className="bg-black-100 col-span-12 sm:col-span-4 h-[300px] group">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Dataset</p>
            <h4 className="text-white font-medium text-large">Verified and labeled datasets</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="
              z-0 w-full h-full object-cover 
              group-hover:filter-none 
              filter grayscale-[0.75] 
              transition-all duration-300 ease-in-out
            "
            src="./images/37872862.jpg" 
          />
        </Card>
        <Card className="bg-black-100 col-span-12 sm:col-span-4 h-[300px] group">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">API</p>
            <h4 className="text-white font-medium text-large">Custom API access for businesses</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="
              z-0 w-full h-full object-cover opacity-50
              group-hover:filter-none 
              filter grayscale-[0.75] 
              transition-all duration-300 ease-in-out
            "
            src="./images/121313.jpg"
          />
        </Card>
        <Card isFooterBlurred className="bg-black-100 w-full h-[300px] col-span-12 sm:col-span-5 group">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Growth</p>
            <h4 className="text-white font-medium text-2xl">Data-driven decision-making tools</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="
              z-0 w-full h-full object-cover scale-125 -translate-y-6
              group-hover:filter-none 
              filter grayscale-[0.75] 
              transition-all duration-300 ease-in-out
            "
            src="./images/297898972.jpg"
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">Available soon.</p>
              <p className="text-black text-tiny">Data-driven decision-making tools</p>
            </div>
            <Button className="text-tiny" color="primary" radius="full" size="sm">
              Notify Me
            </Button>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="bg-black-100 w-full h-[300px] col-span-12 sm:col-span-7 group">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Fen</p>
            <h4 className="text-white/90 font-medium text-xl">Map-based search engine</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="
              z-0 w-full h-full object-cover opacity-50
              group-hover:filter-none 
              filter grayscale-[0.75] 
              transition-all duration-300 ease-in-out
            "
            src="./images/378953.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="./images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Visit FEN</p>
                <p className="text-tiny text-white/60">search anything in SL.</p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Get App
            </Button>
          </CardFooter>
        </Card>
      </div>
      </LampDemo>
    </section>
  );
}