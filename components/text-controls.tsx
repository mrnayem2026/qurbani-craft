"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, Type } from "lucide-react"
import { useSubscription } from "./subscription-provider"
import { ScrollArea } from "./ui/scroll-area"
import { FontSelector } from "./font-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface TextLayer {
  id: string
  text: string
  font: string
  size: number
  weight: number
  color: string
  opacity: number
  x: number
  y: number
  rotation: number
  tiltX: number
  tiltY: number
  scale: number
  letterSpacing: number
  textShadow: string
  blendMode: string
  zIndex: number
}

interface TextControlsProps {
  textLayers: TextLayer[]
  selectedLayerIndex: number | null
  onSelectLayer: (index: number | null) => void
  onUpdateLayer: (index: number, updates: Partial<TextLayer>) => void
  onDuplicateLayer: (index: number) => void
  onDeleteLayer: (index: number) => void
}

export function TextControls({
  textLayers,
  selectedLayerIndex,
  onSelectLayer,
  onUpdateLayer,
  onDuplicateLayer,
  onDeleteLayer,
}: TextControlsProps) {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState("text")

  const selectedLayer = selectedLayerIndex !== null ? textLayers[selectedLayerIndex] : null

  // Reset to the text tab when selecting a new layer
  useEffect(() => {
    setActiveTab("text")
  }, [selectedLayerIndex])

  const blendModeOptions = [
    { value: "normal", label: "Normal" },
    { value: "multiply", label: "Multiply" },
    { value: "screen", label: "Screen" },
    { value: "overlay", label: "Overlay" },
    { value: "darken", label: "Darken" },
    { value: "lighten", label: "Lighten" },
    { value: "color-dodge", label: "Color Dodge" },
    { value: "color-burn", label: "Color Burn" },
    { value: "hard-light", label: "Hard Light" },
    { value: "soft-light", label: "Soft Light" },
    { value: "difference", label: "Difference" },
    { value: "exclusion", label: "Exclusion" },
    { value: "hue", label: "Hue" },
    { value: "saturation", label: "Saturation" },
    { value: "color", label: "Color" },
    { value: "luminosity", label: "Luminosity" }
  ];

  const shadowPresets = [
    { value: "none", label: "None" },
    { value: "2px 2px 4px rgba(0,0,0,0.5)", label: "Soft Shadow" },
    { value: "4px 4px 8px rgba(0,0,0,0.7)", label: "Medium Shadow" },
    { value: "6px 6px 12px rgba(0,0,0,0.9)", label: "Hard Shadow" },
    { value: "0px 0px 8px rgba(255,255,255,0.8)", label: "Glow" },
    { value: "0px 0px 4px #fff, 0px 0px 8px #fff", label: "Neon" },
    { value: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000", label: "Outline" }
  ]

  if (textLayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Type className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Text Layers</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Click the "Add Text" button to add your first text layer
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2">Text Layers</h3>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {textLayers.map((layer, index) => (
              <div
                key={layer.id}
                className={`p-2 rounded flex items-center justify-between cursor-pointer ${
                  selectedLayerIndex === index ? "bg-muted" : "hover:bg-muted/50"
                }`}
                onClick={() => onSelectLayer(index)}
              >
                <div className="truncate flex-1">
                  <span className="text-sm">{layer.text}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDuplicateLayer(index)
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="sr-only">Duplicate</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteLayer(index)
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {selectedLayer ? (
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid grid-cols-3 mx-4 my-2">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              {/* <TabsTrigger value="advanced">Advanced</TabsTrigger> */}
            </TabsList>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <TabsContent value="text" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Text Content</Label>
                    <Input
                      id="text-content"
                      value={selectedLayer.text}
                      onChange={(e) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <FontSelector
                      value={selectedLayer.font}
                      onChange={(font) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { font })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="font-size">Font Size</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.size}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={8}
                      max={1000}
                      step={1}
                      value={[selectedLayer.size]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { size: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="font-weight">Font Weight</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.weight}</span>
                    </div>
                    <Slider
                      id="font-weight"
                      min={100}
                      max={900}
                      step={100}
                      value={[selectedLayer.weight]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { weight: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="letter-spacing">Letter Spacing</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.letterSpacing}px</span>
                    </div>
                    <Slider
                      id="letter-spacing"
                      min={-5}
                      max={20}
                      step={0.5}
                      value={[selectedLayer.letterSpacing]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { letterSpacing: value[0] })}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, {
                        size: 36,
                        weight: 700,
                        letterSpacing: 1,
                      })}
                    >
                      Reset
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="style" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: selectedLayer.color }} />
                      <Input
                        id="text-color"
                        type="color"
                        value={selectedLayer.color}
                        onChange={(e) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { color: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-shadow">Text Shadow</Label>
                    <Select
                      value={selectedLayer && shadowPresets.find(preset => preset.value === selectedLayer.textShadow)?.value || shadowPresets[0].value}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { textShadow: value })}
                    >
                      <SelectTrigger id="text-shadow">
                        <SelectValue placeholder="Select a shadow style" />
                      </SelectTrigger>
                      <SelectContent>
                        {shadowPresets.map((preset) => (
                          <SelectItem key={preset.value} value={preset.value}>
                            {preset.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="position-x">X Position</Label>
                      <span className="text-sm text-gray-500">{Math.round(selectedLayer.x)}%</span>
                    </div>
                    <Slider
                      id="position-x"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedLayer.x]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { x: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="position-y">Y Position</Label>
                      <span className="text-sm text-gray-500">{Math.round(selectedLayer.y)}%</span>
                    </div>
                    <Slider
                      id="position-y"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedLayer.y]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { y: value[0] })}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, {
                        color: '#fff',
                        textShadow: 'none',
                        x: 50,
                        y: 50,
                      })}
                    >
                      Reset
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="effects" className="mt-0 space-y-4">
                  <div className="flex justify-center">
                    <Button
                      onClick={() => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        tiltX: 0,
                        tiltY: 0,
                      })}
                    >
                      Reset All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="opacity">Opacity</Label>
                      <span className="text-sm text-gray-500">{Math.round(selectedLayer.opacity * 100)}%</span>
                    </div>
                    <Slider
                      id="opacity"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[selectedLayer.opacity]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { opacity: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="scale">Scale</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.scale.toFixed(2)}x</span>
                    </div>
                    <Slider
                      id="scale"
                      min={0.1}
                      max={3}
                      step={0.05}
                      value={[selectedLayer.scale]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { scale: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="rotation">Rotation</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.rotation}°</span>
                    </div>
                    <Slider
                      id="rotation"
                      min={-360}
                      max={360}
                      step={1}
                      value={[selectedLayer.rotation]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { rotation: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tilt-x">Horizontal Tilt</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.tiltX}°</span>
                    </div>
                    <Slider
                      id="tilt-x"
                      min={-360}
                      max={360}
                      step={1}
                      value={[selectedLayer.tiltX]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { tiltX: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tilt-y">Vertical Tilt</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.tiltY}°</span>
                    </div>
                    <Slider
                      id="tilt-y"
                      min={-360}
                      max={360}
                      step={1}
                      value={[selectedLayer.tiltY]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { tiltY: value[0] })}
                    />
                  </div>
                </TabsContent>
                {/* <TabsContent value="advanced" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="blend-mode">Blend Mode</Label>
                    <Select
                      value={selectedLayer && selectedLayer.blendMode || "normal"}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { blendMode: value })}
                    >
                      <SelectTrigger id="blend-mode">
                        <SelectValue placeholder="Select a blend mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {blendModeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="z-index">Layer Order (Z-Index)</Label>
                      <span className="text-sm text-gray-500">{selectedLayer.zIndex}</span>
                    </div>
                    <Slider
                      id="z-index"
                      min={1}
                      max={20}
                      step={1}
                      value={[selectedLayer.zIndex]}
                      onValueChange={(value) => selectedLayerIndex !== null && onUpdateLayer(selectedLayerIndex, { zIndex: value[0] })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Higher values appear closer to the foreground</p>
                  </div>
                </TabsContent> */}
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Select a text layer to edit its properties</p>
          </div>
        </div>
      )}
    </div>
  )
}
