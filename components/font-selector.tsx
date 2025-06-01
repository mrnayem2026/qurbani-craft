"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FontSelectorProps {
  value: string
  onChange: (value: string) => void
}

// All fonts available to everyone
const ALL_FONTS = [
  { value: "var(--font-inter)", label: "Inter" },
  { value: "var(--font-roboto)", label: "Roboto" },
  { value: "var(--font-lato)", label: "Lato" },
  { value: "var(--font-montserrat)", label: "Montserrat" },
  { value: "var(--font-oswald)", label: "Oswald" },
  { value: "var(--font-pacifico)", label: "Pacifico" },
  { value: "var(--font-anek-bangla)", label: "Anek Bangla" },
  { value: "var(--font-noto-sans-bengali)", label: "Noto Sans Bengali" },
  { value: "var(--font-noto-serif-bengali)", label: "Noto Serif Bengali" },
  { value: "var(--font-atma)", label: "Atma" },
  { value: "var(--font-playfair-display)", label: "Playfair Display" },
  { value: "var(--font-galada)", label: "Galada" },
  { value: "var(--font-dancing-script)", label: "Dancing Script" },
  { value: "var(--font-hind-siliguri)", label: "Hind Siliguri" },
  
];

export function FontSelector({ value, onChange }: FontSelectorProps) {
  const [open, setOpen] = useState(false)
  const [fonts] = useState<{ value: string; label: string }[]>(ALL_FONTS)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFonts = searchTerm
    ? fonts.filter((font) => font.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : fonts

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          style={{ fontFamily: value }}
        >
          <span className="truncate">{value}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search fonts..." onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {filteredFonts.map((font) => (
                <CommandItem
                  key={font.value}
                  value={font.label}
                  onSelect={() => {
                    onChange(font.label)
                    setOpen(false)
                  }}
                  style={{ fontFamily: font.value }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === font.value ? "opacity-100" : "opacity-0")} />
                  {font.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

