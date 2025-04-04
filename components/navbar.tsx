"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import { link as linkStyles } from "@heroui/theme";

import {
  Input,
  Link,
  Button,
  Kbd,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Snippet,
  Image
} from "@heroui/react";

import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { checkUserSession } from "@/lib/services/user"
import { useEffect, useState } from "react"
import { Clipboard } from "lucide-react";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await checkUserSession()
        setUser(userData)
      } catch (error) {
        console.error("Error checking user session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  // const copyToClipboard = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setCopySuccess("Copied!");
  //     setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
  //   } catch (err) {
  //     console.error("Failed to copy: ", err);
  //   }
  // };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-black-200 hover:bg-black-300/20",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

    return (
      <div className="mx-8 my-4">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Donations</ModalHeader>
              <ModalBody>
              <div className="flex flex-col gap-4 justify-center items-center p-8">
                  <div className="flex-1 py-2">
                    <h2 className="text-gray-200">Help us keep the lights & WiFi on</h2>
                    <p>Scan or Copy to my crypto Wallet Address</p>
                    </div>
                    <div className="flex-1 py-2">
                      <Image src="images/wallet-address.png" className="w-60 h-60 rounded" />
                      </div>
                    <div>
                      <Snippet>2eTKHsS7vN9RxdWgw7kozUSamKtom9ziUCcbNLQMHtHP</Snippet>
                    </div>

                    <div>
                      <p className="text-lg text-gray-400">Or Mobile Money</p>

                      <div className="my-4"><span>Orange Money</span>
                      <Snippet color="warning">075053663</Snippet>
                    </div>

                    <div className="my-4"><span>AfriMoney</span>
                      <Snippet  color="warning">090480819</Snippet>
                    </div>
                    </div>
                  </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
          
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

        {/* <ClerkProvider> */}
          <HeroUINavbar
            maxWidth="xl"
            position="sticky"
            className="bg-black-200/20 border border-white-100/20 rounded-xl shadow-lg"
          >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                {/* <Logo /> */}
                <p className="font-bold text-white text-2xl">DataSynk</p>
              </NextLink>
            </NavbarBrand>
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden sm:flex gap-2">
              {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                <TwitterIcon className="text-default-500" />
              </Link> */}
              {/* <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                <GithubIcon className="text-default-500" />
              </Link> */}
              {/* <ThemeSwitch /> */}
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                className="text-sm font-normal text-white-600 bg-white-200/20"
                // href={siteConfig.links.sponsor}
                startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
                onPress={onOpen}
              >
                Donate
              </Button>
            </NavbarItem>

                {/*  auth check */}
                <NavbarItem className="hidden md:flex">
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : user ? (
                    <Button 
                      as={Link} 
                      href="/dashboard" 
                      className="text-sm font-normal text-white-600 bg-white-200/20"
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <Button 
                      as={Link} 
                      href="/auth/login" 
                      className="text-sm font-normal text-white-600 bg-white-200/20"
                    >
                      Login
                    </Button>
                  )}
                </NavbarItem>

          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link> */}
            {/* <ThemeSwitch /> */}
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            {searchInput}
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href="#"
                    size="lg"
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
          </HeroUINavbar>
        {/* </ClerkProvider> */}
      </div>
  );
};
