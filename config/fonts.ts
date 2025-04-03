// config/fonts.ts
import NextFont  from "next/font/local";

export const titilliumWeb = NextFont({
  src: [
    {
      path: "./fonts/Titillium_Web/TitilliumWeb-Regular.ttf", 
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Titillium_Web/TitilliumWeb-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-titillium-web",
});