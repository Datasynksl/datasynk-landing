"use client"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { Spotlight } from "@/components/ui/spotlight"
import { useRouter } from "next/navigation"
import { loginUser, signInWithOAuth } from "@/lib/services/user"
import { FloatingPaths } from "@/components/ui/BackgroundPath"

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>
}

const BottomGradient = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await loginUser(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(
        result.error?.message || "An error occurred during login"
      )
    }

    setIsLoading(false)
  }

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true)
    setError("")

    const result: any = await signInWithOAuth(provider)

    if (result.success) {
      // The user will be redirected to the OAuth provider's login page
    } else {
      setError(result?.error.message || "An error occurred during OAuth login")
      setIsLoading(false)
    }
  }

  return (
    <section className="relative">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <Spotlight className="-top-60 right-60 md:right-0 md:-top-20" fill="blue" />
      <div className="z-10 relative">
        <FloatingPaths position={1} />
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black-200/50 z-20 relative backdrop-blur-md">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome Back to Datasynk</h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to access your Datasynk account
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </LabelInputContainer>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"} &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => handleOAuthLogin('github')}
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">Login with GitHub</span>
                <BottomGradient />
              </button>
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => handleOAuthLogin('google')}
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">Login with Google</span>
                <BottomGradient />
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-neutral-600 dark:text-neutral-300 text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Sign up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}