import {
  Zap,
  ShoppingCart,
  BarChart,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  Phone,
  Video,
  Cloud,
  Globe,
  Shield,
  Camera,
  Music,
  Book,
  Briefcase,
  Coffee,
  Cpu,
  Database,
  Headphones,
  Heart,
  Image,
  Key,
  Laptop,
  Map,
  Printer,
  Rocket,
  Scissors,
  Truck,
  Wifi,
} from "lucide-react"
import type React from "react"

export type Dataset = {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType
  color: string
}

export const categories = [
  "All",
  "Analytics",
  "Marketing",
  "Productivity",
  "Sales",
  "Finance",
  "Communication",
  "Cloud Services",
  "Security",
  "Design",
  "Development",
  "Human Resources",
  "Customer Support",
  "E-commerce",
  "Social Media",
]

type IconMapType = {
  [key: string]: React.ComponentType
}

const iconMap: IconMapType = {
  Zap,
  ShoppingCart,
  BarChart,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  Phone,
  Video,
  Cloud,
  Globe,
  Shield,
  Camera,
  Music,
  Book,
  Briefcase,
  Coffee,
  Cpu,
  Database,
  Headphones,
  Heart,
  Image,
  Key,
  Laptop,
  Map,
  Printer,
  Rocket,
  Scissors,
  Truck,
  Wifi,
}

const iconKeys = Object.keys(iconMap)

const colorPalette = [
  "#FF4A00",
  "#96BF48",
  "#E37400",
  "#FFE01B",
  "#F06A6A",
  "#FFCC22",
  "#6772E5",
  "#F22F46",
  "#2D8CFF",
  "#0061FF",
  "#00A1E0",
  "#D32D27",
  "#4CAF50",
  "#9C27B0",
  "#FF9800",
  "#795548",
  "#607D8B",
  "#3F51B5",
  "#00BCD4",
  "#FFC107",
]

function generateDatasets(count: number): Dataset[] {
  const datasets: Dataset[] = []

  for (let i = 0; i < count; i++) {
    const iconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)]
    const category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1] // Exclude 'All'
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]

    datasets.push({
      id: `${i + 1}`,
      name: `Dataset ${i + 1}`,
      description: `This is a detailed description for Dataset ${i + 1}. It provides ${category.toLowerCase()} services to streamline your workflow and improve efficiency. With powerful features and easy integration, it's an essential tool for modern businesses looking to optimize their operations and stay ahead in the competitive market.`,
      category,
      icon: iconMap[iconKey] as React.ComponentType,
      color,
    })
  }

  return datasets
}

export const datasets = generateDatasets(1000)