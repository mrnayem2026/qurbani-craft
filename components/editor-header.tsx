"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import type { ImageData } from "@/types/image";
import { ThemeToggle } from "./dashboard/theme-toggle";
import { toast } from "sonner"

interface EditorHeaderProps {
  image: ImageData | null;
  onAddText: () => void;
  onUploadImage: (file: File) => Promise<void>;
}

export function EditorHeader({
  image,
  onAddText,
  onUploadImage,
}: EditorHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (!editorRef.current) {
      editorRef.current = document.querySelector("#image-editor");
    }

    if (!editorRef.current) {
      toast(
        "Something went wrong. Please try again later.",
        {
          description: "Error downloading image.",
        }
      )
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

      toast("Image downloaded successfully", {
        description: "Your image has been saved to your downloads folder.",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
     
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCreateNew = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadImage(file);
    e.target.value = "";
  };

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
          <ThemeToggle />
          {image ? (
            <>
              <Button onClick={handleCreateNew}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Template
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </>
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
