export interface DeviceInfo {
    device: "desktop" | "mobile" | "tablet" | "other"
    browser: "chrome" | "firefox" | "safari" | "edge" | "opera" | "other"
    os: "windows" | "macos" | "linux" | "ios" | "android" | "other"
  }
  
  export function getDeviceInfo(): DeviceInfo {
    if (typeof window === "undefined") {
      return {
        device: "other",
        browser: "other",
        os: "other",
      }
    }
  
    const userAgent = window.navigator.userAgent.toLowerCase()
  
    // Detect device type
    let device: DeviceInfo["device"] = "desktop"
    if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
      device = "tablet"
    } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent)) {
      device = "mobile"
    }
  
    // Detect browser
    let browser: DeviceInfo["browser"] = "other"
    if (/chrome|chromium|crios/i.test(userAgent) && !/edg|edge/i.test(userAgent)) {
      browser = "chrome"
    } else if (/firefox|fxios/i.test(userAgent)) {
      browser = "firefox"
    } else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
      browser = "safari"
    } else if (/edg|edge/i.test(userAgent)) {
      browser = "edge"
    } else if (/opera|opr/i.test(userAgent)) {
      browser = "opera"
    }
  
    // Detect OS
    let os: DeviceInfo["os"] = "other"
    if (/windows/i.test(userAgent)) {
      os = "windows"
    } else if (/macintosh|mac os x/i.test(userAgent)) {
      os = "macos"
    } else if (/linux/i.test(userAgent) && !/android/i.test(userAgent)) {
      os = "linux"
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
      os = "ios"
    } else if (/android/i.test(userAgent)) {
      os = "android"
    }
  
    return { device, browser, os }
  }
  
  