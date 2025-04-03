-- Create enum types for device information
CREATE TYPE device_type AS ENUM ('desktop', 'mobile', 'tablet', 'other');
CREATE TYPE browser_type AS ENUM ('chrome', 'firefox', 'safari', 'edge', 'opera', 'other');
CREATE TYPE os_type AS ENUM ('windows', 'macos', 'linux', 'ios', 'android', 'other');

-- Table for tracking dataset views
CREATE TABLE dataset_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  device device_type,
  browser browser_type,
  os os_type,
  referrer TEXT,
  session_id TEXT,
  is_unique BOOLEAN DEFAULT TRUE,
  
  -- Add RLS policies later
  CONSTRAINT fk_dataset_views_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE
);

-- Table for tracking dataset likes
CREATE TABLE dataset_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only like a dataset once
  CONSTRAINT unique_dataset_like UNIQUE (dataset_id, user_id),
  CONSTRAINT fk_dataset_likes_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE,
  CONSTRAINT fk_dataset_likes_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Table for dataset comments
CREATE TABLE dataset_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES dataset_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  
  CONSTRAINT fk_dataset_comments_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE,
  CONSTRAINT fk_dataset_comments_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_dataset_comments_parent FOREIGN KEY (parent_comment_id) REFERENCES dataset_comments(id) ON DELETE CASCADE
);

-- Table for tracking dataset downloads
CREATE TABLE dataset_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  device device_type,
  browser browser_type,
  os os_type,
  download_type TEXT, -- e.g., 'full', 'sample', 'partial'
  file_format TEXT, -- e.g., 'csv', 'json', 'excel'
  
  CONSTRAINT fk_dataset_downloads_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE
);

-- Table for dataset shares
CREATE TABLE dataset_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  share_method TEXT, -- e.g., 'email', 'twitter', 'facebook', 'link'
  recipient_email TEXT, -- if shared via email
  
  CONSTRAINT fk_dataset_shares_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE
);

-- Table for dataset ratings
CREATE TABLE dataset_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  review_text TEXT,
  
  -- Ensure a user can only rate a dataset once
  CONSTRAINT unique_dataset_rating UNIQUE (dataset_id, user_id),
  CONSTRAINT fk_dataset_ratings_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE,
  CONSTRAINT fk_dataset_ratings_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add columns to the datasets table for aggregated metrics
ALTER TABLE datasets ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE datasets ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;
ALTER TABLE datasets ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE datasets ADD COLUMN IF NOT EXISTS share_count INTEGER DEFAULT 0;
ALTER TABLE datasets ADD COLUMN IF NOT EXISTS avg_rating NUMERIC(3,2) DEFAULT NULL;

-- Create indexes for performance
CREATE INDEX idx_dataset_views_dataset_id ON dataset_views(dataset_id);
CREATE INDEX idx_dataset_views_user_id ON dataset_views(user_id);
CREATE INDEX idx_dataset_views_viewed_at ON dataset_views(viewed_at);

CREATE INDEX idx_dataset_likes_dataset_id ON dataset_likes(dataset_id);
CREATE INDEX idx_dataset_likes_user_id ON dataset_likes(user_id);

CREATE INDEX idx_dataset_comments_dataset_id ON dataset_comments(dataset_id);
CREATE INDEX idx_dataset_comments_user_id ON dataset_comments(user_id);
CREATE INDEX idx_dataset_comments_parent_id ON dataset_comments(parent_comment_id);

CREATE INDEX idx_dataset_downloads_dataset_id ON dataset_downloads(dataset_id);
CREATE INDEX idx_dataset_downloads_user_id ON dataset_downloads(user_id);

CREATE INDEX idx_dataset_shares_dataset_id ON dataset_shares(dataset_id);
CREATE INDEX idx_dataset_shares_user_id ON dataset_shares(user_id);

CREATE INDEX idx_dataset_ratings_dataset_id ON dataset_ratings(dataset_id);
CREATE INDEX idx_dataset_ratings_user_id ON dataset_ratings(user_id);

