async (page) => {
  const previewUrl = page.url().startsWith("http://localhost:") ? new URL(page.url()).origin : "http://localhost:3001"
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(previewUrl, { waitUntil: "domcontentloaded", timeout: 120000 })
  await page.locator(".intro-screen").waitFor({ state: "detached" })
  await page.locator(".globe-ready").waitFor({ timeout: 60000 })
  await page.waitForFunction(() => !document.getAnimations().some((animation) => animation.playState === "running"))
  await page.screenshot({ path: "output/playwright/portfolio-desktop.png" })
  await page.screenshot({ path: "output/playwright/portfolio-full.png", fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(previewUrl, { waitUntil: "domcontentloaded", timeout: 120000 })
  await page.locator(".intro-screen").waitFor({ state: "detached" })
  await page.locator(".globe-ready").waitFor({ timeout: 60000 })
  await page.waitForFunction(() => !document.getAnimations().some((animation) => animation.playState === "running"))
  await page.screenshot({ path: "output/playwright/portfolio-mobile.png" })
  return { globeReady: await page.locator(".globe-ready").count(), errors }
}
