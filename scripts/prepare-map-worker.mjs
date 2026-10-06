import { copyFile, mkdir, readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const packagePath = require.resolve("maplibre-gl/package.json")
const { version } = JSON.parse(await readFile(packagePath, "utf8"))
const destination = new URL(`../public/maps/maplibre/${version}/`, import.meta.url)
await mkdir(destination, { recursive: true })

// Module workers import the shared file relatively; serve both from the same versioned directory.
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  await copyFile(join(dirname(packagePath), "dist", file), new URL(file, destination))
}
