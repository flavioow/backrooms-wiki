"use client"

import { useState } from "react"
import { Settings, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type NotificationTab = "geral" | "artigos" | "amizades"
type NotificationCategory = "avisos" | "forum" | "edicao" | "conquista" | "amizade"

interface Notification {
  id: string
  category: NotificationCategory
  title: string
  time: string
  read: boolean
  tabs: NotificationTab[]
}

const categoryIcons: Record<NotificationCategory, string> = {
  avisos: "📢",
  forum: "💬",
  edicao: "✏️",
  conquista: "🏅",
  amizade: "👥",
}

const notifications: Notification[] = [
  {
    id: "1",
    category: "amizade",
    title: "João enviou um pedido de amizade",
    time: "Há 2 horas",
    read: false,
    tabs: ["geral", "amizades"],
  },
  {
    id: "2",
    category: "edicao",
    title: "Sua página 'Nível 0' foi editada por Maria",
    time: "Há 4 horas",
    read: false,
    tabs: ["geral", "artigos"],
  },
  {
    id: "3",
    category: "avisos",
    title: "Manutenção do servidor em 24 horas",
    time: "Há 1 dia",
    read: true,
    tabs: ["geral"],
  },
  {
    id: "4",
    category: "conquista",
    title: "Sua página alcançou o topo da semana!",
    time: "Há 2 dias",
    read: true,
    tabs: ["geral", "artigos"],
  },
  {
    id: "5",
    category: "forum",
    title: "Novo comentário em 'Nível 0' por Pedro",
    time: "Há 3 dias",
    read: true,
    tabs: ["geral", "artigos"],
  },
]

export function NotificationsDropdown() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("geral")
  const [notifs, setNotifs] = useState(notifications)

  const filteredNotifications = notifs.filter((n) => n.tabs.includes(activeTab))

  const unreadCount = notifs.filter((n) => !n.read && n.tabs.includes(activeTab)).length

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => (n.tabs.includes(activeTab) ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">Notificações</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
            >
              <Check size={14} />
              Marcar todas como lidas
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Settings size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border px-6">
          {(["geral", "artigos", "amizades"] as NotificationTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-3 border-b-2 text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground text-sm">Nenhuma notificação</div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`px-6 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors last:border-b-0 ${
                  !notif.read ? "bg-muted/20" : ""
                }`}
              >
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0">{categoryIcons[notif.category]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent uppercase">{notif.category}</span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <p className="text-sm text-foreground mt-1">{notif.title}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 border-t border-border text-center">
          <a href="#" className="text-xs text-accent hover:underline font-medium">
            Ver todas as notificações
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
