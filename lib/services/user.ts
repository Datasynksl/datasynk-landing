import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

interface UserData {
  firstname: string
  lastname: string
  email: string
}

export async function registerUser(email: string, password: string, userData: UserData) {
  try {
    // Sign up the user without email verification
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        // Disable email verification
        data: {
          email_confirmed: true,
        },
      },
    })

    if (authError) throw authError

    // Insert user data into the UserInfo table
    const { data: userDataInserted, error: userError } = await supabase
      .from("userinfo")
      .insert({
        user_id: authData.user!.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.email,
      })
      .single()

    if (userError) throw userError

    return { success: true, data: authData }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Ensure Supabase client is properly initialized
    if (!supabase) {
      throw new Error("Supabase client not initialized")
    }

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: {
          message: error.message || "Login failed",
        },
      }
    }

    if (!data.user) {
      return {
        success: false,
        error: {
          message: "No user found after login",
        },
      }
    }

    // Check if user exists in UserInfo table
    const { data: userInfoData, error: userInfoError } = await supabase
      .from("userinfo")
      .select("*")
      .eq("user_id", data.user.id)
      .single()

    if (userInfoError && userInfoError.code !== "PGRST116") {
      console.error("UserInfo retrieval error:", userInfoError)
      return {
        success: false,
        error: {
          message: "Error retrieving user information",
        },
      }
    }

    // No need to check for email verification
    return {
      success: true,
      user: data.user,
      userInfo: userInfoData || null,
    }
  } catch (error) {
    console.error("Unexpected login error:", error)
    return {
      success: false,
      error: {
        message: "An unexpected error occurred during login",
      },
    }
  }
}

export const checkUserSession = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (user) {
    const { data: userData, error: userError } = await supabase
      .from("userinfo")
      .select(`
        id,
        firstname,
        lastname,
        username,
        created_at,
        updated_at
      `)
      .eq("user_id", user.id)
      .single()

    if (userError) {
      throw userError
    }

    return {
      ...user,
      ...userData,
    }
  }

  return null
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    window.location.href = "/"
    return { success: true }
  } catch (error) {
    console.error("Error logging out:", error)
    return { success: false, error }
  }
}

export async function signInWithOAuth(provider: "github" | "google") {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error signing in with OAuth:", error)
    return { success: false, error }
  }
}

export async function handleOAuthCallback() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) throw error

    if (session) {
      // Check if user exists in UserInfo table
      const { data: existingUser, error: userError } = await supabase
        .from("UserInfo")
        .select("*")
        .eq("user_id", session.user.id)
        .single()

      if (userError && userError.code !== "PGRST116") {
        // PGRST116 means no rows returned, which is expected if the user doesn't exist
        throw userError
      }

      if (!existingUser) {
        // If user doesn't exist in UserInfo table, create a new entry
        const { error: insertError } = await supabase.from("UserInfo").insert({
          user_id: session.user.id,
          firstname: session.user.user_metadata.full_name?.split(" ")[0] || "",
          lastname: session.user.user_metadata.full_name?.split(" ").slice(1).join(" ") || "",
          username: session.user.email,
        })

        if (insertError) throw insertError
      }

      return { success: true, session }
    }

    return { success: false, error: new Error("No session found") }
  } catch (error) {
    console.error("Error handling OAuth callback:", error)
    return { success: false, error }
  }
}

