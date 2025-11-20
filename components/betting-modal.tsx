"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAccount } from "wagmi"
import { useAppKit } from "@reown/appkit/react"
import { Loader2 } from "lucide-react"

interface BettingModalProps {
  isOpen: boolean
  onClose: () => void
  marketTitle: string
  outcome: "YES" | "NO"
  price: number
}

export function BettingModal({ isOpen, onClose, marketTitle, outcome, price }: BettingModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected } = useAccount()
  const { open } = useAppKit()

  const handleBet = async () => {
    if (!isConnected) {
      open()
      return
    }

    setIsLoading(true)
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      setAmount("")
    }, 2000)
  }

  const potentialReturn = amount ? (Number(amount) / price).toFixed(2) : "0.00"
  const potentialProfit = amount ? (Number(amount) / price - Number(amount)).toFixed(2) : "0.00"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Place Bet</DialogTitle>
          <DialogDescription>
            You are betting{" "}
            <span className={outcome === "YES" ? "text-primary font-bold" : "text-destructive font-bold"}>
              {outcome}
            </span>{" "}
            on:
            <br />
            <span className="text-foreground font-medium mt-1 block">{marketTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/30 border border-border/50">
              <span className="text-muted-foreground">Price</span>
              <span className="font-mono font-medium">{price.toFixed(2)} ETH</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/30 border border-border/50">
              <span className="text-muted-foreground">Potential Return</span>
              <span className="font-mono font-medium text-primary">+{potentialReturn} Shares</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Est. Profit: <span className="text-primary">{potentialProfit} ETH</span> if you win
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleBet}
            disabled={!amount || isLoading}
            className={
              outcome === "YES"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isConnected ? "Connect Wallet" : `Buy ${outcome}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
