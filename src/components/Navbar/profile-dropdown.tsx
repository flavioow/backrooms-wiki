"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, ArrowRightLeft } from "lucide-react"

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center text-xs font-bold text-accent">
            JD
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        {/* Profile Section */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-lg font-bold text-accent flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">@johndoe</p>
              <p className="text-sm text-muted-foreground truncate">John Doe</p>
            </div>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors flex-shrink-0">
              <ArrowRightLeft size={16} className="text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded bg-muted/30 border border-border/50">
            <span className="text-lg">💚</span>
            <span className="text-sm text-foreground">Explorando os Backrooms...</span>
          </div>
        </div>

        {/* Profile Links */}
        <div className="px-3 py-3 border-b border-border space-y-1">
          {[
            { label: "Perfil", icon: "👤" },
            { label: "Configurações", icon: "⚙️" },
            { label: "Itens Salvos", icon: "🔖" },
            { label: "Amizades", icon: "👥" },
            { label: "Organizações", icon: "🏢" },
            { label: "Contribuições", icon: "📝" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <div className="px-3 py-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-foreground hover:bg-muted/50 transition-colors">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
