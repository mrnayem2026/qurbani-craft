"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ImageData {
  id: string
  title: string
  originalUrl: string
  foregroundUrl: string
  text_layers: any[]
  created_at: string
}

interface ImageCardProps {
  image: ImageData
  onEdit: () => void
  onDelete: () => void
}

export function ImageCard({ image, onEdit, onDelete }: ImageCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      onDelete()
    } catch (error) {
      console.error("Error deleting image:", error)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-white dark:bg-gray-900">
            {/* Show the background with reduced opacity */}
            <div className="absolute inset-0">
              <Image
                src={image.originalUrl || "/placeholder.svg?height=300&width=300"}
                alt={image.title || "Original image"}
                fill
                className="object-cover opacity-20"
              />
            </div>

            {/* Show the foreground image with blend mode */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={image.foregroundUrl || "/placeholder.svg?height=300&width=300"}
                alt={image.title || "Foreground image"}
                fill
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowDeleteDialog(true)} disabled={isDeleting}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

