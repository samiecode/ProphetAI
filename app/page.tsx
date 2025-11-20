import { Header } from "@/components/header"
import { MarketCard } from "@/components/market-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

// Mock data
const MARKETS = [
  {
    id: "1",
    title: "Will Bitcoin hit $100k before 2026?",
    volume: "$2.4M",
    endDate: "Dec 31, 2025",
    yesPrice: 0.65,
    noPrice: 0.35,
    category: "Crypto",
    image: "₿",
  },
  {
    id: "2",
    title: "Will SpaceX land humans on Mars by 2030?",
    volume: "$850k",
    endDate: "Jan 1, 2030",
    yesPrice: 0.12,
    noPrice: 0.88,
    category: "Space",
    image: "🚀",
  },
  {
    id: "3",
    title: "Will GPT-5 be released in 2025?",
    volume: "$1.2M",
    endDate: "Dec 31, 2025",
    yesPrice: 0.78,
    noPrice: 0.22,
    category: "AI",
    image: "🤖",
  },
  {
    id: "4",
    title: "Will the Fed cut rates in March 2025?",
    volume: "$3.1M",
    endDate: "Mar 31, 2025",
    yesPrice: 0.45,
    noPrice: 0.55,
    category: "Finance",
    image: "🏦",
  },
  {
    id: "5",
    title: "Will Apple release a foldable iPhone in 2025?",
    volume: "$500k",
    endDate: "Dec 31, 2025",
    yesPrice: 0.25,
    noPrice: 0.75,
    category: "Tech",
    image: "📱",
  },
  {
    id: "6",
    title: "Will GTA VI be delayed to 2026?",
    volume: "$1.8M",
    endDate: "Dec 31, 2025",
    yesPrice: 0.42,
    noPrice: 0.58,
    category: "Gaming",
    image: "🎮",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Market Overview</h1>
              <p className="text-muted-foreground text-lg">Trade on future events with instant settlement.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden md:flex bg-transparent">
                Create Market
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Trading</Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-lg border border-border/50">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search markets..." className="pl-9 bg-background border-border" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <Filter className="mr-2 h-3 w-3" />
                All Markets
              </Button>
              <Button variant="ghost" size="sm" className="whitespace-nowrap">
                Crypto
              </Button>
              <Button variant="ghost" size="sm" className="whitespace-nowrap">
                Tech
              </Button>
              <Button variant="ghost" size="sm" className="whitespace-nowrap">
                Politics
              </Button>
              <Button variant="ghost" size="sm" className="whitespace-nowrap">
                Sports
              </Button>
            </div>
          </div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETS.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with <span className="font-semibold text-foreground">Reown AppKit</span>. The source code is available
            on GitHub.
          </p>
        </div>
      </footer>
    </div>
  )
}
