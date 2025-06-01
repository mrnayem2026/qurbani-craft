"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { EditorHeader } from "@/components/editor-header"
import { ImageEditor } from "@/components/image-editor"
import { TextControls } from "@/components/text-controls"
import { toast } from "@/components/ui/use-toast"
import { processImageForLayering } from "@/utils/background-removal-alternative"

export default function NewEditorPage() {
  const { isLoading } = useSupabase()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (file: File) => {
    try {
      setIsProcessing(true)

      // Show a toast for image processing
      toast({
        title: "Processing image",
        description: "Preparing your image... This may take a moment.",
      })

      // Process the image for layering
      const { originalUrl, foregroundUrl } = await processImageForLayering(file)

      // Create a new image object
      const newImage = {
        id: Date.now().toString(),
        title: file.name,
        originalUrl,
        foregroundUrl,
        text_layers: [],
        created_at: new Date().toISOString(),
      }

      // Save to local storage
      const storedImages = localStorage.getItem("textbackdrop_images")
      const images = storedImages ? JSON.parse(storedImages) : []
      const updatedImages = [newImage, ...images]
      localStorage.setItem("textbackdrop_images", JSON.stringify(updatedImages))

      // Redirect to the new image editor
      router.push(`/editor/${newImage.id}`)

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
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EditorHeader image={null} onAddText={() => {}} />
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <ImageEditor
            image={null}
            textLayers={[]}
            selectedLayerIndex={null}
            onSelectLayer={() => {}}
            onUpdateLayer={() => {}}
            onUploadImage={handleImageUpload}
            isLoading={false}
            isProcessing={isProcessing}
          />
        </div>
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l">
          <TextControls
            textLayers={[]}
            selectedLayerIndex={null}
            onSelectLayer={() => {}}
            onUpdateLayer={() => {}}
            onDuplicateLayer={() => {}}
            onDeleteLayer={() => {}}
          />
        </div>
      </main>
    </div>
  )
}

