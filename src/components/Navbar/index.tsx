"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { NavigationMenu } from "./navigation-menu"
import { useEffect, useState } from "react"
import { Menu, Moon, Search, Sun, X } from "lucide-react"
import { Input } from "../ui/input"
import { Kbd, KbdGroup } from "../ui/kbd"
import { NotificationsDropdown } from "./notifications-dropdown"
import { ProfileDropdown } from "./profile-dropdown"
import { CommandPalette } from "./command-palette"

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const [commandOpen, setCommandOpen] = useState(false)

    useEffect(() => {
        // Darkmode check
        const isDarkMode = document.documentElement.classList.contains("dark")
        setIsDark(isDarkMode)

        // Command Cmd+K / Ctrl+K to open command palette
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setCommandOpen(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    },[])

    const toggleTheme = () => {
        const html = document.documentElement
        if (html.classList.contains("dark")) {
            html.classList.remove("dark")
            setIsDark(false)
        } else {
            html.classList.add("dark")
            setIsDark(true)
        }
    }

  return (
    <>
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <nav className="fixed top-0 w-[calc(100%-1rem)] m-2 z-50 bg-card/75 backdrop-blur-md rounded-md">
            <div className="container-wrapper">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-6">
                        {/* Mobile menu toggle */}
                        <Button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                            {menuOpen ? <X size={24}/> : <Menu size={24} />}
                        </Button>

                        <Link href="/" className="font-bold text-lg text-accent">Rooms</Link>

                        <div className="hidden md:block">
                            <NavigationMenu />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap6">
                        <div onClick={() => setCommandOpen(true)} className="hidden lg:flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 border border-border cursor-pointer hover:bg-muted/70 transition-colors">
                            <Search size={16} className="text-muted-foreground" />
                            <Input type="text" placeholder="Search pages..." onClick={() => setCommandOpen(true)} readOnly className="w-40 cursor-pointer" />
                            <KbdGroup>
                                <Kbd>⌘</Kbd>
                                <Kbd>K</Kbd>
                            </KbdGroup>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <Button onClick={toggleTheme}>
                            {isDark ? (
                                <Sun size={18} className="text-foreground" />
                            ) : (
                                <Moon size={18} className="text-foreground" />
                            )}
                        </Button>
                        <NotificationsDropdown />
                        <ProfileDropdown />
                    </div>
                </div>
                {/* Mobile Navigation Menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4">
                        <NavigationMenu />
                    </div>
                )}
            </div>
        </nav>
    </>
  )
}
