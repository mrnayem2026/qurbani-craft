import { removeBackground } from "@imgly/background-removal"

export async function removeImageBackground(file: File): Promise<Blob> {
  try {
    // Configure the library with the correct public path
    // This tells the library where to find its WASM files
    const blob = await removeBackground(file, {
      publicPath: "/background-removal/",
      debug: true,
      progress: (key, current, total) => {
        console.log(`Progress: ${key} ${current}/${total}`)
      },
    })

    return blob
  } catch (error) {
    console.error("Error removing background:", error)
    // Return the original file as a fallback
    return file
  }
}

