"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { EditorHeader } from "@/components/editor-header";
import { ImageEditor } from "@/components/image-editor";
import { TextControls } from "@/components/text-controls";
import { toast } from "@/components/ui/use-toast";
export default function NewEditorPage() {
  const { isLoading } = useSupabase();
  const [image, setImage] = useState(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(
    null
  );


  // Handle template parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const templateUrl = searchParams.get("template");

  // Initialize image from template if provided
  useEffect(() => {
    if (templateUrl) {
      setImage({
        id: Date.now().toString(),
        title: "Template Image",
        url: decodeURIComponent(templateUrl),
        text_layers: [],
        created_at: new Date().toISOString(),
      });
    }
  }, [templateUrl]);

  const handleImageUpload = async (file: File) => {
    try {
      // Create object URL for the uploaded file
      const url = URL.createObjectURL(file);

      // Create a new image object
      const newImage = {
        id: Date.now().toString(),
        title: file.name,
        url,
        text_layers: [],
        created_at: new Date().toISOString(),
      };

      // Save to local storage
      const storedImages = localStorage.getItem("QurbaniCraft_images");
      const images = storedImages ? JSON.parse(storedImages) : [];
      const updatedImages = [newImage, ...images];
      localStorage.setItem(
        "QurbaniCraft_images",
        JSON.stringify(updatedImages)
      );

      // Set the current image
      setImage(newImage);

      toast({
        title: "Image uploaded",
        description: "You can now add text to your image.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description:
          "There was a problem uploading your image. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EditorHeader
        onUploadImage={handleImageUpload}
        image={image}
        onAddText={() => {
          if (!image) return;
          const newLayer = {
            id: Date.now().toString(),
            text: "Hamba Mubarak",
            font: "Arial",
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
            letterSpacing: 0,
            textShadow: "none",
            blendMode: "normal",
            zIndex: (image.text_layers?.length || 0) + 1,
          };
          const updatedImage = {
            ...image,
            text_layers: [...(image.text_layers || []), newLayer],
          };
          setImage(updatedImage);
          setSelectedLayerIndex((updatedImage.text_layers?.length || 1) - 1);

          // Update local storage
          const storedImages = localStorage.getItem("QurbaniCraft_images");
          const images = storedImages ? JSON.parse(storedImages) : [];
          const updatedImages = images.map((img: any) =>
            img.id === image.id ? updatedImage : img
          );
          localStorage.setItem(
            "QurbaniCraft_images",
            JSON.stringify(updatedImages)
          );
        }}
      />
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 flex items-center justify-center">
          <ImageEditor
            image={image}
            textLayers={image?.text_layers || []}
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={setSelectedLayerIndex}
            onUpdateLayer={(index, updates) => {
              if (!image) return;
              const updatedLayers = [...(image.text_layers || [])];
              updatedLayers[index] = { ...updatedLayers[index], ...updates };
              const updatedImage = { ...image, text_layers: updatedLayers };
              setImage(updatedImage);

              // Update local storage
              const storedImages = localStorage.getItem("QurbaniCraft_images");
              const images = storedImages ? JSON.parse(storedImages) : [];
              const updatedImages = images.map((img: any) =>
                img.id === image.id ? updatedImage : img
              );
              localStorage.setItem(
                "QurbaniCraft_images",
                JSON.stringify(updatedImages)
              );
            }}
            onUploadImage={handleImageUpload}
            isLoading={false}
          />
        </div>
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l">
          <TextControls
            textLayers={image?.text_layers || []}
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={setSelectedLayerIndex}
            onUpdateLayer={(index, updates) => {
              if (!image) return;
              const updatedLayers = [...(image.text_layers || [])];
              updatedLayers[index] = { ...updatedLayers[index], ...updates };
              const updatedImage = { ...image, text_layers: updatedLayers };
              setImage(updatedImage);

              // Update local storage
              const storedImages = localStorage.getItem("QurbaniCraft_images");
              const images = storedImages ? JSON.parse(storedImages) : [];
              const updatedImages = images.map((img: any) =>
                img.id === image.id ? updatedImage : img
              );
              localStorage.setItem(
                "QurbaniCraft_images",
                JSON.stringify(updatedImages)
              );
            }}
            onDuplicateLayer={(index) => {
              if (!image) return;
              const layerToDuplicate = image.text_layers[index];
              const newLayer = {
                ...layerToDuplicate,
                id: Date.now().toString(),
                x: layerToDuplicate.x + 10,
                y: layerToDuplicate.y + 10,
              };
              const updatedImage = {
                ...image,
                text_layers: [...image.text_layers, newLayer],
              };
              setImage(updatedImage);
              setSelectedLayerIndex(updatedImage.text_layers.length - 1);

              // Update local storage
              const storedImages = localStorage.getItem("QurbaniCraft_images");
              const images = storedImages ? JSON.parse(storedImages) : [];
              const updatedImages = images.map((img: any) =>
                img.id === image.id ? updatedImage : img
              );
              localStorage.setItem(
                "QurbaniCraft_images",
                JSON.stringify(updatedImages)
              );
            }}
            onDeleteLayer={(index) => {
              if (!image) return;
              const updatedLayers = [...image.text_layers];
              updatedLayers.splice(index, 1);
              const updatedImage = { ...image, text_layers: updatedLayers };
              setImage(updatedImage);
              setSelectedLayerIndex(null);

              // Update local storage
              const storedImages = localStorage.getItem("QurbaniCraft_images");
              const images = storedImages ? JSON.parse(storedImages) : [];
              const updatedImages = images.map((img: any) =>
                img.id === image.id ? updatedImage : img
              );
              localStorage.setItem(
                "QurbaniCraft_images",
                JSON.stringify(updatedImages)
              );
            }}
          />
        </div>
      </main>
    </div>
  );
}
