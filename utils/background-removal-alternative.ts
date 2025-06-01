// This utility provides image processing for the layered text display system
// It creates a semi-transparent version of the image for the background
// and processes the foreground image to enhance the layering effect

import { removeBackground } from '@imgly/background-removal';

export interface ProcessedImage {
  originalUrl: string;
  foregroundUrl: string;
}

/**
 * Process an image for layering text between foreground and background
 * @param file The image file to process
 * @param options Optional processing options
 * @returns Promise with URLs for original and foreground images
 */
export async function processImageForLayering(
  file: File, 
  options: {
    useBackgroundRemoval?: boolean;
    foregroundOpacity?: number;
    backgroundBlur?: number;
  } = {}
): Promise<ProcessedImage> {
  // Default options
  const {
    useBackgroundRemoval = true
  } = options;



  // Create URL for the original image
  const originalUrl = URL.createObjectURL(file);
  let foregroundUrl = originalUrl;

  // If background removal is enabled, process the image
  if (useBackgroundRemoval) {
    try {


      const blob = await removeBackground(file, {
        output: {
          format: 'image/png',
          quality: 1.0
        }
      });
      
      // Create a URL for the processed image
      foregroundUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error removing background:', error);
      // Fall back to the original image if background removal fails
      foregroundUrl = originalUrl;
    }
  }

  return {
    originalUrl,
    foregroundUrl,
  };
}

/**
 * Clean up image URLs to prevent memory leaks
 * @param urls Array of URLs to revoke
 */
export function cleanupImageUrls(urls: string[]): void {
  urls.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}
