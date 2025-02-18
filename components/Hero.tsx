import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { Spotlight } from "@/components/ui/spotlight";
import { GridBackgroundDemo } from "@/components/ui/gridBg";

export default function Hero() {
  return (
    <div className="">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        /> 
        <Spotlight
          className="-top-60 right-60 md:right-0 md:-top-20"
          fill="blue"
        />
        <Spotlight
          className="top-0 right-0 -translate-x-full md:translate-x-16"
          fill="violet"
        />
  
        <GridBackgroundDemo>
          <div className="h-[25rem] w-full flex flex-col items-center justify-center">
            <div className="inline-block max-w-auto text-center justify-center">
              <h1 className={cn(title({ size: "xl" }), " sm:text-7xl font-light relative z-20 bg-clip-text text-white")}>
                <span>Focus on your &nbsp;</span>
                <span className={title({ color: "violet", size: "xl" })}>business &nbsp;</span>
                <br />
                <span>let's handle data</span>
              </h1>
              
              <div className={subtitle({ class: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-500 font-medium block max-w-xl mx-auto" })}>
                Access and manage data easily.
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                isExternal
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                })}
                href={siteConfig.links.docs}
              >
                Documentation
              </Link>
              <Link
                isExternal
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href={siteConfig.links.github}
              >
                <GithubIcon size={20} />
                GitHub
              </Link>
            </div>

            {/* <div className="mt-8">
              <Snippet hideCopyButton hideSymbol variant="bordered">
                <div className="inline-flex items-center">
                  Get started by editing <Code color="primary" className="ml-2">app/page.tsx</Code>
                </div>
              </Snippet>
            </div> */}
          </div>
        </GridBackgroundDemo>
    </div>
  );
}
