-- Enable RLS on all tables
ALTER TABLE dataset_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for dataset_views
CREATE POLICY "Anyone can view dataset_views counts" ON dataset_views
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own views" ON dataset_views
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for dataset_likes
CREATE POLICY "Anyone can view dataset_likes" ON dataset_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON dataset_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON dataset_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for dataset_comments
CREATE POLICY "Anyone can view dataset_comments" ON dataset_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON dataset_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON dataset_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON dataset_comments
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for dataset_downloads
CREATE POLICY "Anyone can view dataset_downloads counts" ON dataset_downloads
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own downloads" ON dataset_downloads
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for dataset_shares
CREATE POLICY "Anyone can view dataset_shares counts" ON dataset_shares
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own shares" ON dataset_shares
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for dataset_ratings
CREATE POLICY "Anyone can view dataset_ratings" ON dataset_ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON dataset_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON dataset_ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON dataset_ratings
  FOR DELETE USING (auth.uid() = user_id);

