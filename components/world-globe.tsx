"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useInView, useReducedMotion } from "motion/react"
import type { Map as GlobeMap } from "maplibre-gl"

export default function WorldGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<GlobeMap | null>(null)
  const longitudeRef = useRef(24)
  const latitudeRef = useRef(-26.2)
  const inView = useInView(shellRef)
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !inView) return
    const container = containerRef.current
    let cancelled = false
    let map: GlobeMap | undefined
    let observer: ResizeObserver | undefined

    setReady(false)
    import("maplibre-gl").then(({ Map, Marker, setWorkerUrl, getVersion }) => {
      if (cancelled) return
      try {
        setWorkerUrl(`/maps/maplibre/${getVersion()}/maplibre-gl-worker.mjs`)
        map = new Map({
          container,
          style: "/maps/style.json",
          center: [longitudeRef.current, latitudeRef.current],
          zoom: Math.log2(container.clientWidth / 145),
          interactive: true,
          dragRotate: false,
          scrollZoom: false,
          boxZoom: false,
          doubleClickZoom: false,
          touchZoomRotate: false,
          touchPitch: false,
          keyboard: false,
          cooperativeGestures: true,
          attributionControl: false,
          canvasContextAttributes: { antialias: true, alpha: true },
        })
        mapRef.current = map
        map.getCanvas().tabIndex = -1
        map.on("moveend", () => {
          if (!map) return
          const center = map.getCenter()
          longitudeRef.current = center.lng
          latitudeRef.current = center.lat
        })
        map.on("style.load", () => {
          map?.setProjection({ type: "globe" })
        })
        map.on("load", () => {
          if (cancelled || !map) return
          const marker = document.createElement("div")
          marker.className = "home-map-marker"
          marker.innerHTML = '<span class="map-marker-dot"></span><span class="map-marker-label">Johannesburg<span>Building here</span></span>'
          new Marker({ element: marker, anchor: "center" }).setLngLat([28.04, -26.2]).addTo(map)
          setReady(true)
        })
        map.on("error", () => {
          // Retain the local fallback if the public basemap is unavailable.
          if (!cancelled && !map?.isStyleLoaded()) setReady(false)
        })
        observer = new ResizeObserver(() => {
          map?.resize()
          map?.setZoom(Math.log2(container.clientWidth / 145))
        })
        observer.observe(container)
      } catch {
        // The decorative globe has a local fallback for devices without WebGL.
        setReady(false)
      }
    }).catch(() => { if (!cancelled) setReady(false) })

    return () => {
      cancelled = true
      observer?.disconnect()
      map?.remove()
      mapRef.current = null
    }
  }, [inView])

  const rotateWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const map = mapRef.current
    if (!map || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return
    event.preventDefault()
    const center = map.getCenter()
    const longitude = center.lng + (event.key === "ArrowLeft" ? -12 : event.key === "ArrowRight" ? 12 : 0)
    const latitude = Math.max(-75, Math.min(75, center.lat + (event.key === "ArrowUp" ? 8 : event.key === "ArrowDown" ? -8 : 0)))
    map.easeTo({ center: [longitude, latitude], duration: reducedMotion ? 0 : 220 })
  }

  return (
    <div ref={shellRef} className={`globe-shell ${ready ? "globe-ready" : ""}`}>
      <div className="globe-fallback" aria-hidden="true" />
      <span id="globe-instructions" className="sr-only">Drag to rotate the globe or use the arrow keys.</span>
      <div ref={containerRef} className="globe-map" role="region" aria-label="World globe" aria-describedby={ready ? "globe-instructions" : undefined}
        tabIndex={ready ? 0 : -1} onKeyDown={rotateWithKeyboard} />
      <div className="map-credit"><a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a></div>
    </div>
  )
}
