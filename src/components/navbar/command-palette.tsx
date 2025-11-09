"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface SearchResult {
    id: string
    title: string
    description: string
    category: string
}

interface CommandPaletteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])

    const allResults: SearchResult[] = [
        { id: "1", title: "Nível 0 - Lobby", description: "O ponto de partida para toda jornada", category: "Níveis" },
        { id: "2", title: "Nível 1 - Hallways", description: "Corredores infinitos e labirintos", category: "Níveis" },
        { id: "3", title: "Nível 2 - Habitats", description: "Áreas de vida e comunidades", category: "Níveis" },
        {
            id: "4",
            title: "Smilers",
            description: "Entidades humanoides com sorrisos perturbadores",
            category: "Entidades",
        },
        { id: "5", title: "Partygoers", description: "Entidades festivas e perigosas", category: "Entidades" },
        { id: "6", title: "Regras dos Backrooms", description: "Diretrizes de sobrevivência", category: "Informações" },
        { id: "7", title: "Como Escapar", description: "Métodos conhecidos de saída", category: "Guia" },
        { id: "8", title: "Classe 1", description: "Classificação de dificuldade", category: "Classificação" },
    ]

    useEffect(() => {
        if (search.trim() === "") {
            setResults([])
            return
        }

        const filtered = allResults.filter(
            (result) =>
                result.title.toLowerCase().includes(search.toLowerCase()) ||
                result.description.toLowerCase().includes(search.toLowerCase()),
        )
        setResults(filtered)
    }, [search])

    if (!open) return null

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => onOpenChange(false)} />

            {/* Command Palette */}
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                        <Search size={20} className="text-muted-foreground flex-shrink-0" />
                        <Input
                            autoFocus
                            type="text"
                            placeholder="Pesquisar páginas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 !bg-transparent text-foreground border-none outline-none placeholder-muted-foreground"
                        />
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            <X size={18} className="text-muted-foreground" />
                        </Button>
                    </div>

                    {/* Results */}
                    <div className="max-h-96 overflow-y-auto">
                        {results.length === 0 && search && (
                            <div className="px-4 py-8 text-center text-muted-foreground">Nenhum resultado encontrado</div>
                        )}
                        {results.map((result) => (
                            <Button variant="ghost"
                                key={result.id}
                                onClick={() => onOpenChange(false)}
                                className="w-full text-left px-4 py-3 border-b border-border transition-colors flex flex-col gap-1"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-foreground">{result.title}</span>
                                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{result.category}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{result.description}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
