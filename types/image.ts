export interface ImageData {
  id: string
  title: string
  originalUrl: string // Original image with background
  foregroundUrl: string // Image with background removed
  text_layers: TextLayer[]
  created_at: string
}

export interface TextLayer {
  id: string
  text: string
  font: string
  size: number
  weight: number
  color: string
  opacity: number
  x: number
  y: number
  rotation: number
  tiltX: number
  tiltY: number
}

