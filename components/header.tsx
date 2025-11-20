"use client"

import Link from "next/link"
import { TrendingUp, Wallet } from "lucide-react"
import { useAccount, useBalance } from "wagmi"

export function Header() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>
              PREDICT<span className="text-primary">.MARKET</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && balance && (
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
              <Wallet className="h-4 w-4" />
              <span>
                {Number(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          )}
          {/* @ts-expect-error - Web component */}
          <appkit-button />
        </div>
      </div>
    </header>
  )
}
