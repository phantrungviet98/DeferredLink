export const getMobileOperatingSystem = (navigator: Navigator, window: Window) => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "ios";
  }

  return "unknown";
}