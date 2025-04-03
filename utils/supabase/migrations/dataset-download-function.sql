-- Function to track dataset downloads
CREATE OR REPLACE FUNCTION track_dataset_download(
  p_dataset_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_device device_type DEFAULT 'other',
  p_browser browser_type DEFAULT 'other',
  p_os os_type DEFAULT 'other',
  p_download_type TEXT DEFAULT 'full',
  p_file_format TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insert the download record
  INSERT INTO dataset_downloads (
    dataset_id, 
    user_id, 
    ip_address, 
    device, 
    browser, 
    os, 
    download_type,
    file_format
  ) VALUES (
    p_dataset_id,
    p_user_id,
    p_ip_address,
    p_device,
    p_browser,
    p_os,
    p_download_type,
    p_file_format
  );
  
  -- The trigger will automatically update the download_count in the datasets table
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

