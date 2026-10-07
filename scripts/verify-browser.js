async (page) => {
  page.setDefaultTimeout(30000)
  page.setDefaultNavigationTimeout(120000)
  const previewUrl = page.url().startsWith("http://localhost:") ? new URL(page.url()).origin : "http://localhost:3001"
  const failures = []
  const assert = (condition, message) => { if (!condition) failures.push(message) }
  const assertScreenshotFit = async (name) => {
    assert(await page.locator("#project-detail img").evaluate((image) => {
      const bounds = image.getBoundingClientRect()
      const frame = image.parentElement.getBoundingClientRect()
      return bounds.width > 0 && Math.abs(bounds.width - frame.width) < 1 && Math.abs(bounds.height - frame.height) < 1
        && Math.abs(bounds.height - bounds.width * image.naturalHeight / image.naturalWidth) < 1
    }), `${name} screenshot does not fill its card or has distorted proportions`)
  }
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: "no-preference" })

  await page.goto(previewUrl, { waitUntil: "domcontentloaded", timeout: 120000 })
  await page.getByRole("heading", { level: 1 }).waitFor()
  assert((await page.title()).includes("Khuluza Tshabalala"), "Page metadata missing")
  await page.locator(".intro-screen").waitFor({ state: "detached" })
  await page.getByRole("button", { name: "Replay intro" }).click()
  await page.getByRole("button", { name: "Skip intro" }).click()
  await page.locator(".intro-screen").waitFor({ state: "detached" })
  assert(await page.locator("body").evaluate((element) => element.style.overflow) !== "hidden", "Intro did not restore scrolling")
  await page.getByRole("button", { name: "Replay intro" }).click()
  await page.getByRole("dialog").waitFor()
  await page.keyboard.press("Escape")
  await page.locator(".intro-screen").waitFor({ state: "detached" })

  const projectButtons = page.getByRole("group", { name: "Choose a project" }).getByRole("button")
  const expectedProjects = ["BLVNK", "Friday", "DRAFT", "Cost Control", "OUTCOME"]
  const expectedImages = {
    BLVNK: "/projects/blvnk-landing.png",
    DRAFT: "/projects/draft-dashboard.png",
    OUTCOME: "/projects/outcome.png",
  }
  assert(JSON.stringify(await projectButtons.locator(".project-name").allTextContents()) === JSON.stringify(expectedProjects), "Expected all five original projects in order")
  assert(await page.locator(".hero-location strong").innerText() === "5", "Hero project count is stale")
  for (let index = 0; index < await projectButtons.count(); index++) {
    const button = projectButtons.nth(index)
    const name = await button.locator(".project-name").innerText()
    await button.click()
    if (expectedImages[name]) {
      await page.waitForFunction((expectedName) => {
        const image = document.querySelector("#project-detail img")
        return image?.alt.startsWith(expectedName) && image.complete && image.naturalWidth > 0
      }, name)
      const projectImage = page.locator("#project-detail img")
      const imageUrl = new URL(await projectImage.getAttribute("src"), previewUrl)
      assert((imageUrl.searchParams.get("url") ?? imageUrl.pathname) === expectedImages[name], `Incorrect screenshot assigned to ${name}`)
      await assertScreenshotFit(name)
    } else {
      await page.waitForFunction((expectedName) => document.querySelector("#project-detail .art-top")?.textContent?.includes(expectedName), name)
      assert(await page.locator("#project-detail .workflow-strip").isVisible(), `${name} concept artwork missing`)
    }
    assert(await button.getAttribute("aria-pressed") === "true", `Project ${index + 1} selection not exposed`)
    assert(await page.locator("#project-detail h3").innerText() !== "", `Project ${index + 1} has no description`)
    assert(await page.locator('.project-select[aria-pressed="true"]').count() === 1, "More than one project selected")
  }
  assert((await page.locator("#project-detail").innerText()).includes("HOLD"), "OUTCOME research safeguards missing")
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.locator(".hero-world").scrollIntoViewIfNeeded()
  await page.locator(".globe-ready").waitFor({ timeout: 60000 })
  assert(await page.getByRole("button", { name: "Pause globe rotation" }).count() === 0, "Pause button remains")
  assert(await page.getByRole("button", { name: "Focus globe on South Africa" }).count() === 0, "Location button remains")
  assert(await page.getByText("Drag to explore", { exact: true }).count() === 0, "Visible globe instruction tag remains")
  const marker = page.locator(".home-map-marker")
  await page.waitForTimeout(400)
  const stillBefore = await marker.boundingBox()
  await page.waitForTimeout(500)
  const stillAfter = await marker.boundingBox()
  assert(Math.abs(stillBefore.x - stillAfter.x) < 2 && Math.abs(stillBefore.y - stillAfter.y) < 2, "Globe moves without user input")
  const globe = page.getByRole("region", { name: "World globe", exact: true })
  await globe.press("ArrowRight")
  await page.waitForFunction((previousX) => Math.abs(document.querySelector(".home-map-marker").getBoundingClientRect().x - previousX) > 4, stillAfter.x)
  // Let keyboard easing settle before measuring the separate drag interaction.
  await page.waitForTimeout(300)
  const dragBefore = await marker.boundingBox()
  const globeBounds = await globe.boundingBox()
  const dragX = globeBounds.x + globeBounds.width / 2
  const dragY = globeBounds.y + 260
  await page.mouse.move(dragX, dragY)
  await page.mouse.down()
  await page.mouse.move(dragX + 90, dragY, { steps: 12 })
  await page.mouse.up()
  await page.waitForFunction((previousX) => Math.abs(document.querySelector(".home-map-marker").getBoundingClientRect().x - previousX) > 4, dragBefore.x)
  const scrollBefore = await page.evaluate(() => window.scrollY)
  await page.mouse.wheel(0, 160)
  await page.waitForFunction((previousScroll) => window.scrollY > previousScroll + 20, scrollBefore)

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const name of Object.keys(expectedImages)) {
      await projectButtons.filter({ hasText: name }).click()
      await page.waitForFunction((expectedName) => {
        const image = document.querySelector("#project-detail img")
        return image?.alt.startsWith(expectedName) && image.complete && image.naturalWidth > 0
      }, name)
      await assertScreenshotFit(`${name} at ${width}px`)
    }
    const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }))
    assert(dimensions.content <= dimensions.viewport, `Horizontal overflow at ${width}px`)
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => window.scrollTo(0, 0))
  const menu = page.locator("#menu-toggle")
  await menu.click()
  assert(await menu.getAttribute("aria-expanded") === "true", "Mobile navigation did not open")
  await page.keyboard.press("Escape")
  assert(await menu.getAttribute("aria-expanded") === "false", "Escape did not close navigation")
  assert(await menu.evaluate((element) => element === document.activeElement), "Escape did not restore menu focus")
  await menu.click()
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "The journey" }).click()
  assert(await menu.getAttribute("aria-expanded") === "false", "Navigation link did not close menu")
  assert(page.url().endsWith("#journal"), "Journal anchor failed")

  assert(await page.locator('.event-entry time[datetime="2026-07-01"]').count() === 1, "Google date missing")
  const summitImage = page.getByRole("img", { name: "Google Cloud Summit Johannesburg promotional artwork for 1 July 2026" })
  assert(await summitImage.getAttribute("src") === "/events/google-cloud-summit-2026.webp", "Google Summit brand image missing")
  assert(await summitImage.evaluate((image) => getComputedStyle(image).objectFit) === "contain", "Google Summit artwork is cropped")
  assert(await page.locator('.event-entry time[datetime="2026-08-19"]').count() === 1, "AWS date missing")
  assert(await page.locator('#up-next time[datetime="2026-11-03"]').count() === 1, "Dell date missing")
  assert(await page.locator('a[href="mailto:khuluza0@gmail.com"]').count() > 0, "Email contact missing")

  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto(previewUrl, { waitUntil: "domcontentloaded" })
  await page.locator(".intro-screen").waitFor({ state: "detached" })
  assert(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior) === "auto", "Reduced motion still uses smooth scrolling")
  assert(await page.getByRole("button", { name: "Pause globe rotation" }).count() === 0, "Reduced motion exposes automatic rotation")
  await page.keyboard.press("Tab")
  assert(await page.getByRole("link", { name: "Skip to content" }).evaluate((element) => element === document.activeElement), "Skip link is not first in keyboard order")
  await page.keyboard.press("Enter")
  assert(page.url().endsWith("#main"), "Skip link failed")

  await page.locator("#contact").scrollIntoViewIfNeeded()
  for (const image of await page.getByRole("img").all()) {
    if (await image.evaluate((element) => element.tagName === "IMG")) await image.scrollIntoViewIfNeeded()
  }
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0), null, { timeout: 60000 })
  assert(await page.locator("img:not([alt])").count() === 0, "An image has no alt text")
  assert(errors.length === 0, `Browser errors: ${errors.join(", ")}`)
  const browser = page.context().browser()
  if (browser) {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const staticPage = await context.newPage()
    await staticPage.goto(previewUrl)
    assert(await staticPage.getByRole("heading", { level: 1 }).isVisible(), "Hero requires JavaScript")
    assert(await staticPage.getByRole("heading", { name: "Google Cloud Summit" }).isVisible(), "Event content requires JavaScript")
    await context.close()
  }
  if (failures.length) throw new Error(failures.join("\n"))
  return { passed: true, projects: expectedProjects.length, widths: [1440, 768, 390, 320], checks: ["intro skip/replay/Escape", "manual globe drag/keyboard", "selection and screenshot mapping", "navigation", "keyboard", "dates", "contact", "images and Summit branding", "reduced motion", "browser errors"] }
}
