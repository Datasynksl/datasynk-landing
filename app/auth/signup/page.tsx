"use client"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { Spotlight } from "@/components/ui/spotlight"
import { useRouter } from "next/navigation"
import { registerUser, signInWithOAuth } from "@/lib/services/user"

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
)

const BottomGradient = () => (
  <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-b from-transparent to-neutral-600 dark:to-zinc-800" />
)

export default function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstname = formData.get("firstname") as string
    const lastname = formData.get("lastname") as string

    const result = await registerUser(email, password, { firstname, lastname, email })

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(typeof result.error === "string" ? result.error : "An error occurred during signup")
    }
    console.log(result)
    
    setIsLoading(false)
  }

  const handleOAuthSignUp = async (provider: 'github' | 'google') => {
    setIsLoading(true)
    setError("")

    const result = await signInWithOAuth(provider)

    if (result.success) {
      // The user will be redirected to the OAuth provider's login page
    } else {
      setError(typeof result.error === "string" ? result.error : "An error occurred during OAuth signup")
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="-top-60 right-60 md:right-0 md:-top-20" fill="blue" />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Datasynk</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Sign up to get started</p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Edward" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Bob" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="username@mail.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => handleOAuthSignUp('github')}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Sign up with GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => handleOAuthSignUp('google')}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Sign up with Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  )
}