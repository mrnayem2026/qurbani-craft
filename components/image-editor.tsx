"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageData {
  id: string;
  title: string;
  originalUrl: string;
  foregroundUrl: string;
  text_layers: any[];
  created_at: string;
}

interface TextLayer {
  id: string;
  text: string;
  font: string;
  size: number;
  weight: number;
  color: string;
  opacity: number;
  x: number;
  y: number;
  rotation: number;
  tiltX: number;
  tiltY: number;
  scale: number;
  letterSpacing: number;
  textShadow: string;
  blendMode: string;
  zIndex: number;
}

interface ImageEditorProps {
  image: ImageData | null;
  textLayers: TextLayer[];
  selectedLayerIndex: number | null;
  onSelectLayer: (index: number | null) => void;
  onUpdateLayer: (index: number, updates: Partial<TextLayer>) => void;
  onUploadImage: (file: File) => Promise<void>;
  isLoading: boolean;
  isProcessing: boolean;
}

export function ImageEditor({
  image,
  textLayers,
  selectedLayerIndex,
  onSelectLayer,
  onUpdateLayer,
  onUploadImage,
  isLoading,
  isProcessing,
}: ImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [draggedLayerIndex, setDraggedLayerIndex] = useState<number | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadImage(file);

    // Reset the input value so the same file can be selected again
    e.target.value = "";
  };

  const handleLayerMouseDown = (index: number, e: React.MouseEvent) => {
    if (!editorRef.current) return;

    const editorRect = editorRef.current.getBoundingClientRect();
    const layerElement = e.currentTarget as HTMLElement;
    const layerRect = layerElement.getBoundingClientRect();

    // Calculate the offset from the mouse position to the layer's top-left corner
    const offsetX = e.clientX - layerRect.left;
    const offsetY = e.clientY - layerRect.top;

    setDraggedLayerIndex(index);
    setDragOffset({ x: offsetX, y: offsetY });
    onSelectLayer(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedLayerIndex === null || !editorRef.current) return;

    const editorRect = editorRef.current.getBoundingClientRect();

    // Calculate the new position relative to the editor
    const x =
      ((e.clientX - editorRect.left - dragOffset.x) / editorRect.width) * 100;
    const y =
      ((e.clientY - editorRect.top - dragOffset.y) / editorRect.height) * 100;

    onUpdateLayer(draggedLayerIndex, { x, y });
  };

  const handleMouseUp = () => {
    setDraggedLayerIndex(null);
  };

  useEffect(() => {
    // Add mouse up event listener to the window to handle cases where the mouse is released outside the editor
    window.addEventListener("mouseup", handleMouseUp);

    // Update canvas size when the editor element is mounted or resized
    const updateCanvasSize = () => {
      if (editorRef.current) {
        setCanvasSize({
          width: editorRef.current.offsetWidth,
          height: editorRef.current.offsetHeight,
        });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-md mx-auto p-6">
        <div className="mb-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
          <h2 className="text-2xl font-bold mb-2">Processing Image</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Preparing your image... This may take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full max-w-md mx-auto p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Upload an Image</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Upload an image to start adding text behind it
          </p>
        </div>
        <Button onClick={handleUploadClick} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div
      id="image-editor"
      ref={editorRef}
      className="relative w-full max-w-2xl aspect-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      onMouseMove={draggedLayerIndex !== null ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
    >
      {/* Background (original image) */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-white dark:bg-gray-900">
          <Image
            src={image.originalUrl || "/placeholder.svg"}
            alt={image.title || "Original image"}
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Text layers (top layer) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {textLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={`absolute cursor-move pointer-events-auto ${
              selectedLayerIndex === index ? " " : ""
            }`}
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transformOrigin: "center",
              transform: `scale(${layer.scale || 1}) skew(${layer.tiltX || 0}deg, ${layer.tiltY || 0}deg) rotate(${layer.rotation || 0}deg)`,
              opacity: layer.opacity,
              color: layer.color,
              fontFamily: layer.font,
              fontSize: `${layer.size}px`,
              fontWeight: layer.weight,
              letterSpacing: layer.letterSpacing
                ? `${layer.letterSpacing}px`
                : "normal",
              textShadow: layer.textShadow || "none",
              // mixBlendMode: layer.blendMode || "normal",
              // zIndex: layer.zIndex || 10,
              lineHeight: 1.2,
              maxWidth: "80%",
              textAlign: "center",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              userSelect: "none",
              transition: "text-shadow 0.3s ease, transform 0.3s ease",
            }}
            onMouseDown={(e) => handleLayerMouseDown(index, e)}

          >
            {layer.text}
          </div>
        ))}
      </div>

      {/* Foreground (image below text) */}
      <div className="relative z-10">
        <div className="w-full h-auto">
          <Image
            src={image.foregroundUrl || "/placeholder.svg"}
            alt={image.title || "Foreground image"}
            width={800}
            height={600}
            className="w-full h-auto"
            style={{
              objectFit: "contain",
              pointerEvents: "none",
            }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
