-- Function to track dataset views with unique view handling
CREATE OR REPLACE FUNCTION track_dataset_view(
  p_dataset_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_device device_type DEFAULT 'other',
  p_browser browser_type DEFAULT 'other',
  p_os os_type DEFAULT 'other',
  p_referrer TEXT DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  is_unique BOOLEAN := TRUE;
BEGIN
  -- Check if this is a unique view (not viewed in the last 24 hours by this user/session)
  IF p_user_id IS NOT NULL THEN
    -- Check by user_id
    SELECT FALSE INTO is_unique
    FROM dataset_views
    WHERE dataset_id = p_dataset_id 
      AND user_id = p_user_id 
      AND viewed_at > NOW() - INTERVAL '24 hours'
    LIMIT 1;
  ELSIF p_session_id IS NOT NULL THEN
    -- Check by session_id
    SELECT FALSE INTO is_unique
    FROM dataset_views
    WHERE dataset_id = p_dataset_id 
      AND session_id = p_session_id 
      AND viewed_at > NOW() - INTERVAL '24 hours'
    LIMIT 1;
  ELSIF p_ip_address IS NOT NULL THEN
    -- Check by IP address as fallback
    SELECT FALSE INTO is_unique
    FROM dataset_views
    WHERE dataset_id = p_dataset_id 
      AND ip_address = p_ip_address 
      AND viewed_at > NOW() - INTERVAL '24 hours'
    LIMIT 1;
  END IF;

  -- Insert the view record
  INSERT INTO dataset_views (
    dataset_id, 
    user_id, 
    ip_address, 
    device, 
    browser, 
    os, 
    referrer, 
    session_id, 
    is_unique
  ) VALUES (
    p_dataset_id,
    p_user_id,
    p_ip_address,
    p_device,
    p_browser,
    p_os,
    p_referrer,
    p_session_id,
    is_unique
  );

  -- Update the view_count in datasets table only if it's a unique view
  IF is_unique THEN
    UPDATE datasets SET view_count = view_count + 1 WHERE id = p_dataset_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

