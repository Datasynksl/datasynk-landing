-- Function to update like count
CREATE OR REPLACE FUNCTION update_dataset_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE datasets SET like_count = like_count + 1 WHERE id = NEW.dataset_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE datasets SET like_count = like_count - 1 WHERE id = OLD.dataset_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment count
CREATE OR REPLACE FUNCTION update_dataset_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_deleted = FALSE THEN
    UPDATE datasets SET comment_count = comment_count + 1 WHERE id = NEW.dataset_id;
  ELSIF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND NEW.is_deleted = TRUE AND OLD.is_deleted = FALSE) THEN
    UPDATE datasets SET comment_count = comment_count - 1 WHERE id = COALESCE(NEW.dataset_id, OLD.dataset_id);
  ELSIF TG_OP = 'UPDATE' AND NEW.is_deleted = FALSE AND OLD.is_deleted = TRUE THEN
    UPDATE datasets SET comment_count = comment_count + 1 WHERE id = NEW.dataset_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update download count
CREATE OR REPLACE FUNCTION update_dataset_download_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE datasets SET download_count = download_count + 1 WHERE id = NEW.dataset_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update share count
CREATE OR REPLACE FUNCTION update_dataset_share_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE datasets SET share_count = share_count + 1 WHERE id = NEW.dataset_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update average rating
CREATE OR REPLACE FUNCTION update_dataset_avg_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating_value NUMERIC(3,2);
BEGIN
  SELECT AVG(rating)::NUMERIC(3,2) INTO avg_rating_value
  FROM dataset_ratings
  WHERE dataset_id = COALESCE(NEW.dataset_id, OLD.dataset_id);
  
  UPDATE datasets SET avg_rating = avg_rating_value
  WHERE id = COALESCE(NEW.dataset_id, OLD.dataset_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_dataset_like_count
AFTER INSERT OR DELETE ON dataset_likes
FOR EACH ROW EXECUTE FUNCTION update_dataset_like_count();

CREATE TRIGGER trigger_update_dataset_comment_count
AFTER INSERT OR UPDATE OR DELETE ON dataset_comments
FOR EACH ROW EXECUTE FUNCTION update_dataset_comment_count();

CREATE TRIGGER trigger_update_dataset_download_count
AFTER INSERT ON dataset_downloads
FOR EACH ROW EXECUTE FUNCTION update_dataset_download_count();

CREATE TRIGGER trigger_update_dataset_share_count
AFTER INSERT ON dataset_shares
FOR EACH ROW EXECUTE FUNCTION update_dataset_share_count();

CREATE TRIGGER trigger_update_dataset_avg_rating
AFTER INSERT OR UPDATE OR DELETE ON dataset_ratings
FOR EACH ROW EXECUTE FUNCTION update_dataset_avg_rating();

