/**
 * Global scroll state — updated by Lenis in page.tsx,
 * read by CameraRig inside the R3F canvas.
 * Using a plain object (not React state) avoids
 * React re-renders on every scroll tick.
 */
export const scrollState = {
  progress: 0,  // 0 → 1 across the full page
  y: 0,         // raw pixel scroll position
};
