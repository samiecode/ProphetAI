"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Clock } from "lucide-react"
import { BettingModal } from "./betting-modal"

interface MarketProps {
  id: string
  title: string
  volume: string
  endDate: string
  yesPrice: number
  noPrice: number
  image?: string
  category: string
}

export function MarketCard({ market }: { market: MarketProps }) {
  const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO" | null>(null)
  const yesPercentage = Math.round(market.yesPrice * 100)
  const noPercentage = Math.round(market.noPrice * 100)

  return (
    <>
      <Card className="overflow-hidden border-border bg-card hover:border-primary/50 transition-colors duration-300">
        <CardHeader className="p-0">
          <div className="relative h-32 w-full bg-gradient-to-br from-secondary to-background p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50 backdrop-blur border border-border/50 text-muted-foreground">
                {market.category}
              </span>
              {market.image && (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                  {market.image}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{market.volume} Vol</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Ends {market.endDate}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold text-lg leading-tight min-h-[3rem] line-clamp-2">{market.title}</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary font-medium">Yes {yesPercentage}%</span>
              <span className="text-destructive font-medium">No {noPercentage}%</span>
            </div>
            <Progress value={yesPercentage} className="h-2 bg-destructive" indicatorClassName="bg-primary" />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary bg-transparent"
            onClick={() => setSelectedOutcome("YES")}
          >
            Buy Yes {market.yesPrice.toFixed(2)}
          </Button>
          <Button
            variant="outline"
            className="border-destructive/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
            onClick={() => setSelectedOutcome("NO")}
          >
            Buy No {market.noPrice.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>

      {selectedOutcome && (
        <BettingModal
          isOpen={!!selectedOutcome}
          onClose={() => setSelectedOutcome(null)}
          marketTitle={market.title}
          outcome={selectedOutcome}
          price={selectedOutcome === "YES" ? market.yesPrice : market.noPrice}
        />
      )}
    </>
  )
}
