import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Validation schemas
const signupSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export async function signUp(formData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) {
  // Validate input
  const validatedData = signupSchema.parse(formData);

  try {
    // Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password
    });

    if (authError) throw authError;

    // If user is created successfully, insert additional user info
    if (authData.user) {
      const { error: userInfoError } = await supabase
        .from('UserInfo')
        .insert({
          user_id: authData.user.id,
          firstname: validatedData.firstname,
          lastname: validatedData.lastname,
          username: validatedData.email.split('@')[0] // Use email prefix as username
        });

      if (userInfoError) throw userInfoError;

      return { 
        success: true, 
        message: 'Account created successfully. Please check your email to confirm.',
        user: authData.user 
      };
    }

    throw new Error('User creation failed');
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function login(formData: {
  email: string;
  password: string;
}) {
  // Validate input
  const validatedData = loginSchema.parse(formData);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password
    });

    if (error) throw error;

    return { 
      success: true, 
      message: 'Login successful',
      user: data.user 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}