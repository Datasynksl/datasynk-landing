"use client";
import type React from "react"; // Import React
import { Button, Input, Tabs, Tab } from "@heroui/react";
import { cn } from "@/lib/cn";
import { Bell, Grid, LayoutGrid, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg", active && "bg-gray-100")}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function FolderItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </Link>
  );
}

function FileCard({ title, metadata, thumbnail }: { title: string; metadata: string; thumbnail: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black-200">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{metadata}</p>
      </div>
    </div>
  );
}

const RecentIcon = (props?:any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const StarredIcon = (props?:any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
    />
  </svg>
);

const SharedIcon = (props?:any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
    />
  </svg>
);

export default function FileManager() {
  return (
    <div className="flex h-screen bg-white dark:bg-black-100">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white dark:bg-black-200">
        <div className="p-4">
          <h1 className="text-xl font-bold">Showpad</h1>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="#" icon={<LayoutGrid className="h-4 w-4" />} active>
            All content
          </NavItem>
          <NavItem href="#" icon={<Grid className="h-4 w-4" />}>Presentations</NavItem>
          <NavItem href="#" icon={<Bell className="h-4 w-4" />}>Analytics</NavItem>
          <div className="py-3">
            <div className="px-3 text-xs font-medium uppercase text-gray-500">Collections</div>
            <div className="mt-2">
              <FolderItem href="#">Product Demos</FolderItem>
              <FolderItem href="#">Case Studies</FolderItem>
              <FolderItem href="#">Sales Collateral</FolderItem>
              <FolderItem href="#">Training Materials</FolderItem>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-black-200 px-6 py-4">
          <div className="w-96 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search files..." className="pl-9" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="md">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="md">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image src="/placeholder.svg" alt="Avatar" width={32} height={32} className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create
            </Button>
            <Button variant="bordered" className="gap-2">Upload</Button>
            <Button variant="bordered" className="gap-2">Create folder</Button>
            <Button variant="bordered" className="gap-2">Record</Button>
          </div>

          <div className="mb-6">
            <Tabs aria-label="File Options" color="primary" variant="bordered">
              <Tab
                key="recent"
                title={
                  <div className="flex items-center space-x-2">
                    <RecentIcon className="h-5 w-5" />
                    <span>Recent</span>
                  </div>
                }
              />
              <Tab
                key="starred"
                title={
                  <div className="flex items-center space-x-2">
                    <StarredIcon className="h-5 w-5" />
                    <span>Starred</span>
                  </div>
                }
              />
              <Tab
                key="shared"
                title={
                  <div className="flex items-center space-x-2">
                    <SharedIcon className="h-5 w-5" />
                    <span>Shared</span>
                  </div>
                }
              />
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FileCard title="Q4 Sales Deck" metadata="Shared folder • 8 presentations" thumbnail="/placeholder.svg" />
            <FileCard title="Product Videos" metadata="Shared folder • 5 videos" thumbnail="/placeholder.svg" />
            <FileCard title="ROI Calculator" metadata="Shared file • 1 Excel" thumbnail="/placeholder.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}
