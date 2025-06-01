"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { useSubscription } from "@/components/subscription-provider"
import { Button } from "@/components/ui/button"
import { Plus, Upload, ImageIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { EmptyState } from "@/components/empty-state"
import { ImageCard } from "@/components/image-card"
import type { ImageData } from "@/types/image"

export default function DashboardPage() {
  const { isLoading: isUserLoading } = useSupabase()
  const { isLoading: isSubscriptionLoading } = useSubscription()
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoadingImages(true)

        // Get images from local storage
        const storedImages = localStorage.getItem("QurbaniMeme_images")
        if (storedImages) {
          setImages(JSON.parse(storedImages))
        } else {
          setImages([])
        }
      } catch (error) {
        console.error("Error fetching images:", error)
        toast({
          title: "Error",
          description: "Failed to load your images.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingImages(false)
      }
    }

    fetchImages()
  }, [])

  const handleCreateNew = () => {
    router.push("/editor/new")
  }

  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id)
    setImages(updatedImages)
    localStorage.setItem("QurbaniMeme_images", JSON.stringify(updatedImages))
    toast({
      title: "Image deleted",
      description: "Your image has been deleted successfully.",
    })
  }

  const isLoading = isUserLoading || isSubscriptionLoading || isLoadingImages

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Images</h1>
            <p className="text-gray-500 dark:text-gray-400">Upload and edit images with text behind them</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>

        {images.length === 0 ? (
          <EmptyState
            icon={<ImageIcon className="h-12 w-12 text-gray-400" />}
            title="No images yet"
            description="Upload your first image to get started"
            action={
              <Button onClick={handleCreateNew}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onEdit={() => router.push(`/editor/${image.id}`)}
                onDelete={() => handleDeleteImage(image.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

