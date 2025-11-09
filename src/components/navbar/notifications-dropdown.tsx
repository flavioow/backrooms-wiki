"use client"

import { useState } from "react"
import * as Icons from "lucide-react"
import { Settings, Check, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"

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

const categoryIcons: Record<NotificationCategory, keyof typeof Icons> = {
  avisos: "Megaphone",
  forum: "MessageCircle",
  edicao: "Pencil",
  conquista: "CircleStar",
  amizade: "Users",
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

type LucideIconComponent = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>
>

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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="text-foreground" />
          {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="flex flex-col px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">Notificações</h2>
          <div className="flex items-center gap-2">
            <Button onClick={markAllAsRead} variant="link">
              <Check size={14} />
              Marcar todas como lidas
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-4 border-b border-border px-6 py-2">
          {(["geral", "artigos", "amizades"] as NotificationTab[]).map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`capitalize ${
                activeTab === tab
                  ? "text-accent hover:text-accent font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground text-sm">Nenhuma notificação</div>
          ) : (
            filteredNotifications.map((notif) => {
              const IconName = categoryIcons[notif.category]
              const Icon = Icons[IconName] as LucideIconComponent

              return (
                <div
                  key={notif.id}
                  className={`px-6 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors last:border-b-0 ${
                    !notif.read ? "bg-muted/20" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <span className="text-xl flex-shrink-0">
                      {Icon ? <Icon className="text-muted-foreground" /> : <Icons.CircleHelp />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-accent uppercase">{notif.category}</span>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                      <p className="text-sm text-foreground mt-1">{notif.title}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border text-center">
          <a href="#" className="text-xs text-accent hover:underline font-medium">
            Ver todas as notificações
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
