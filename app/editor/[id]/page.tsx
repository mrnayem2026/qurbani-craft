"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { EditorHeader } from "@/components/editor-header"
import { ImageEditor } from "@/components/image-editor"
import { TextControls } from "@/components/text-controls"
import { toast } from "@/components/ui/use-toast"
import { processImageForLayering, cleanupImageUrls } from "@/utils/background-removal-alternative"

// Define the image type
interface ImageData {
  id: string
  title: string
  originalUrl: string // Original image with background
  foregroundUrl: string // Image with background removed
  text_layers: TextLayer[]
  created_at: string
}

interface TextLayer {
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
  scale: number
  letterSpacing: number
  textShadow: string
  blendMode: string
  zIndex: number
}

export default function EditorPage({ params }: { params: { id: string } }) {
  const { isLoading: isUserLoading } = useSupabase()
  const [image, setImage] = useState<ImageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [textLayers, setTextLayers] = useState<TextLayer[]>([])
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchImage = async () => {
      if (params.id === "new") {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        // Get images from local storage
        const storedImages = localStorage.getItem("QurbaniMeme_images")
        if (storedImages) {
          const images = JSON.parse(storedImages)
          const foundImage = images.find((img: ImageData) => img.id === params.id)

          if (foundImage) {
            setImage(foundImage)
            setTextLayers(foundImage.text_layers || [])
          } else {
            router.push("/dashboard")
          }
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error fetching image:", error)
        toast({
          title: "Error",
          description: "Failed to load the image.",
          variant: "destructive",
        })
        router.push("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [params.id, router])

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true)
      setIsProcessing(true)

      // Show a toast for image processing
      toast({
        title: "Processing image",
        description: "Preparing your image... This may take a moment.",
      })

      // Process the image for layering with background removal
      const { originalUrl, foregroundUrl } = await processImageForLayering(file, {
        useBackgroundRemoval: true,
        foregroundOpacity: 1,
        backgroundBlur: 2
      })

      // Create a new image object
      const newImage: ImageData = {
        id: Date.now().toString(),
        title: file.name,
        originalUrl,
        foregroundUrl,
        text_layers: [],
        created_at: new Date().toISOString(),
      }

      // Save to local storage
      const storedImages = localStorage.getItem("QurbaniMeme_images")
      const images = storedImages ? JSON.parse(storedImages) : []
      const updatedImages = [newImage, ...images]
      localStorage.setItem("QurbaniMeme_images", JSON.stringify(updatedImages))

      setImage(newImage)
      setTextLayers([])

      // Redirect to the new image editor
      if (params.id === "new") {
        router.push(`/editor/${newImage.id}`)
      }

      toast({
        title: "Image processed",
        description: "Your image is ready. You can now add text behind it.",
      })
    } catch (error) {
      console.error("Error processing image:", error)
      toast({
        title: "Processing failed",
        description: "There was a problem processing your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsProcessing(false)
    }
  }

  const handleAddTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: "Dare to Dream",
      font: "Inter",
      size: 36,
      weight: 700,
      color: "#ffffff",
      opacity: 1,
      x: 50,
      y: 50,
      rotation: 0,
      tiltX: 0,
      tiltY: 0,
      scale: 1,
      letterSpacing: 1,
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      blendMode: "normal",
      zIndex: 10
    }

    const updatedLayers = [...textLayers, newLayer]
    setTextLayers(updatedLayers)
    setSelectedLayerIndex(updatedLayers.length - 1)
    saveTextLayers(updatedLayers)
  }

  const handleUpdateTextLayer = (index: number, updates: Partial<TextLayer>) => {
    const updatedLayers = [...textLayers]
    updatedLayers[index] = { ...updatedLayers[index], ...updates }
    setTextLayers(updatedLayers)
    saveTextLayers(updatedLayers)
  }

  const handleDuplicateTextLayer = (index: number) => {
    const layerToDuplicate = textLayers[index]
    const duplicatedLayer = {
      ...layerToDuplicate,
      id: Date.now().toString(),
      x: layerToDuplicate.x + 20,
      y: layerToDuplicate.y + 20,
    }

    const updatedLayers = [...textLayers, duplicatedLayer]
    setTextLayers(updatedLayers)
    setSelectedLayerIndex(updatedLayers.length - 1)
    saveTextLayers(updatedLayers)
  }

  const handleDeleteTextLayer = (index: number) => {
    const updatedLayers = textLayers.filter((_, i) => i !== index)
    setTextLayers(updatedLayers)
    setSelectedLayerIndex(null)
    saveTextLayers(updatedLayers)
  }

  const saveTextLayers = async (layers: TextLayer[]) => {
    if (!image) return

    try {
      // Get images from local storage
      const storedImages = localStorage.getItem("QurbaniMeme_images")
      if (storedImages) {
        const images = JSON.parse(storedImages)
        const updatedImages = images.map((img: ImageData) => {
          if (img.id === image.id) {
            return { ...img, text_layers: layers }
          }
          return img
        })

        localStorage.setItem("QurbaniMeme_images", JSON.stringify(updatedImages))

        // Update the current image state
        setImage({ ...image, text_layers: layers })
      }
    } catch (error) {
      console.error("Error saving text layers:", error)
      toast({
        title: "Save failed",
        description: "Failed to save your changes.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    return () => {
      if (image) {
        cleanupImageUrls([image.originalUrl, image.foregroundUrl]);
      }
    };
  }, [image]);

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EditorHeader image={image} onAddText={handleAddTextLayer} />
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <ImageEditor
            image={image}
            textLayers={textLayers}
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={setSelectedLayerIndex}
            onUpdateLayer={handleUpdateTextLayer}
            onUploadImage={handleImageUpload}
            isLoading={isLoading}
            isProcessing={isProcessing}
          />
        </div>
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l">
          <TextControls
            textLayers={textLayers}
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={setSelectedLayerIndex}
            onUpdateLayer={handleUpdateTextLayer}
            onDuplicateLayer={handleDuplicateTextLayer}
            onDeleteLayer={handleDeleteTextLayer}
          />
        </div>
      </main>
    </div>
  )
}
