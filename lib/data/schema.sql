-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the UserInfo table
CREATE TABLE IF NOT EXISTS UserInfo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique ID for each user
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Links to Supabase auth.users table
    firstname TEXT, -- User's first name
    lastname TEXT, -- User's last name
    username TEXT UNIQUE NOT NULL, -- Unique username
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Timestamp for when the record was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- Timestamp for when the record was last updated
);

-- Add an index on the user_id column for faster lookups
CREATE INDEX IF NOT EXISTS idx_userinfo_user_id ON UserInfo(user_id);

-- Add an index on the username column for faster lookups
CREATE INDEX IF NOT EXISTS idx_userinfo_username ON UserInfo(username);

-- Trigger to update the `updated_at` column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_userinfo_updated_at
BEFORE UPDATE ON UserInfo
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();