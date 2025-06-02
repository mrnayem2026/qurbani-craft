import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Heart, Beef } from "lucide-react"

const features = [
  {
    id: "meme",
    title: "Meme Mubarak",
    description:
      "Create hilarious and heartwarming Eid memes to share with family and friends. Spread joy and laughter this festive season.",
    icon: Smile,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    id: "cards",
    title: "Card-e-Barakah",
    description:
      "Design beautiful digital Eid cards with Islamic patterns and heartfelt messages. Send blessings to your loved ones.",
    icon: Heart,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    id: "meat",
    title: "Meat Mate",
    description:
      "Organize and distribute Qurbani meat efficiently. Keep track of shares and ensure fair distribution in your community.",
    icon: Beef,
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {features.map((feature) => {
        const IconComponent = feature.icon
        return (
          <Card
            key={feature.id}
            className={`group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${feature.bgGradient} hover:scale-105 relative overflow-hidden`}
          >
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-16 -translate-y-16" />
            </div>

            <CardHeader className="text-center pb-4 relative z-10">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center relative z-10">
              <Button
                className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold py-3 rounded-xl group-hover:scale-105`}
                size="lg"
              >
                Create Now
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
