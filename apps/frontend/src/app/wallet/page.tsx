import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import WalletSideBar from "./WalletSideBar";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <WalletSideBar/>
      <div className="flex flex-1 flex-col sm:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <h1 className="text-lg font-semibold">Portfolio</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="text-2xl font-semibold">Solana Balance</div>
              <div className="text-5xl font-bold">2.45 SOL</div>
              <div className="text-xl text-muted-foreground">$75.32</div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Portfolio</h2>
                <Button size="sm" variant="outline">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Asset
                </Button>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Bitcoin" />
                      <AvatarFallback>BTC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Bitcoin</div>
                      <div className="text-sm text-muted-foreground">BTC</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="font-medium">0.25 BTC</div>
                      <div className="text-sm text-muted-foreground">
                        $7,500
                      </div>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Ethereum" />
                      <AvatarFallback>ETH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Ethereum</div>
                      <div className="text-sm text-muted-foreground">ETH</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="font-medium">1.75 ETH</div>
                      <div className="text-sm text-muted-foreground">
                        $5,250
                      </div>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Solana" />
                      <AvatarFallback>SOL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Solana</div>
                      <div className="text-sm text-muted-foreground">SOL</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="font-medium">2.45 SOL</div>
                      <div className="text-sm text-muted-foreground">
                        $75.32
                      </div>
                    </div>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
