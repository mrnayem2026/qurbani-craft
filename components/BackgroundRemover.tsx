"use client";

import React, { useState, useEffect } from "react";
import { removeBackground } from "@imgly/background-removal";
import { Spinner } from "@/components/ui/spinner";

interface BackgroundRemoverProps {
  imageUrl: string;
  onProcessed: (foregroundUrl: string, originalUrl: string) => void;
}

export function BackgroundRemover({ imageUrl, onProcessed }: BackgroundRemoverProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically process the image when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      processImage();
    }
  }, [imageUrl]);

  const processImage = async () => {
    if (!imageUrl) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Process the image with background removal
      const foregroundBlob = await removeBackground(blob, {
        // Keep the background transparent so we can position text behind
        output: {
          format: 'image/png',
          quality: 1.0
        }
      });
      
      // Create URLs for both images
      const foregroundUrl = URL.createObjectURL(foregroundBlob);
      
      // Pass both URLs to the parent component
      onProcessed(foregroundUrl, imageUrl);
    } catch (err) {
      console.error('Error removing background:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {isProcessing && (
        <div className="w-full flex justify-center items-center py-2">
          <Spinner size="md" className="text-primary mr-2" />
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}