"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "./ui/use-toast";
import html2canvas from "html2canvas";
import type { ImageData } from "@/types/image";
import { useRouter } from "next/navigation";

interface EditorHeaderProps {
  image: ImageData | null;
  onAddText: () => void;
}

export function EditorHeader({ image, onAddText }: EditorHeaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()

  console.log(router)

  const handleDownload = async () => {
    if (!editorRef.current) {
      editorRef.current = document.querySelector("#image-editor");
    }

    if (!editorRef.current) {
      toast({
        title: "Error",
        description: "Could not find the editor element.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDownloading(true);

      // Use html2canvas to capture the editor
      const canvas = await html2canvas(editorRef.current, {
        allowTaint: true,
        useCORS: true,
      });

      // Create a download link
      const link = document.createElement("a");
      link.download = `QurbaniCraft-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Image downloaded",
        description: "Your image has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading your image.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCreateNew = () => {
    router.push("/editor/new")
  }


  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <h1 className="font-medium">{image ? image.title : "New Image"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {image ? (
            <Button onClick={handleCreateNew}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          ) : null}
          <Button
            variant="outline"
            size="sm"
            onClick={onAddText}
            disabled={!image}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading || !image}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </header>
  );
}
