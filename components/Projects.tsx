"use client"
import { StickyScroll } from "./ui/stickScrollReveal"
import Image from "next/image"
import { CardBody, CardContainer, CardItem } from "./ui/3dCard"
import ContributionsShowcase from "./Contributions"
import {cover1, cover2, cover3} from "@/public/images";
import { GridBackgroundDemo } from "./ui/gridBg"

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
]

const projects = [
  {
    title: "FEN - Map-Based Search Engine",
    description: "A next-gen search engine leveraging geospatial intelligence to provide precise and efficient search results.",
    cover: cover1,
    content: "Empowers users with location-based insights and mapping tools."
  },
  {
    title: "Kredit AI - AI-Powered Credit Scoring",
    description: "A smart credit assessment tool using AI to analyze financial data and provide accurate credit scores.",
    cover: cover2,
    content: "Helping businesses and individuals access fair and data-driven credit evaluations."
  },
  {
    title: "Anny AI - AI-Powered Data Structuring",
    description: "An intelligent data structuring system that organizes, verifies, and labels datasets for businesses and researchers.",
    cover: cover3,
    content: "Enhancing data usability and decision-making with AI-driven automation."
  }
];

export default function StickyScrollRevealDemo() {
  return (
    <>
      <GridBackgroundDemo >
      <div className="p-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">Project Showcase</h1>
        <p className="text-default-500 hover:text-white max-w-xl mx-auto">
          Showcase our innovative solutions that empower your data journey.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((item) => (
          <CardContainer className="inter-var w-full min-h-32 h-[30rem]" key={item.title}>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black-200/20 dark:border-white/[0.2] border-black/[0.1] w-32 sm:w-[30rem] h-full rounded-xl p-6 border backdrop-blur-sm">
            <CardItem translateZ="100" className="w-full my-4">
              <Image
                src={item.cover}
                height="700"
                width="700"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                {item.title}
              </CardItem>
              <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {item.description}
              </CardItem>
              {/* <CardItem translateZ="100" className="w-full mt-4">
                {item.content}
              </CardItem> */}
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
      </GridBackgroundDemo>
      {/* <StickyScroll content={content} /> */}
      <ContributionsShowcase />
    </>
  )
}

