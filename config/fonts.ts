import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap", // Allows text to be shown with a system font while Google Font loads
  fallback: [
    "system-ui", 
    "-apple-system", 
    "BlinkMacSystemFont", 
    "Segoe UI", 
    "Roboto", 
    "Oxygen", 
    "Ubuntu", 
    "Cantarell", 
    "Open Sans", 
    "Helvetica Neue", 
    "sans-serif"
  ]
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
  fallback: [
    "Courier New", 
    "Courier", 
    "monospace"
  ]
});
