"use client"

import type * as React from "react"
import Link from "next/link"

import {
    NavigationMenu as NavMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useTranslations } from "next-intl"

type NavigationItem = {
    title: string
    href: string
    description: string | null
}

type NavigationSection = {
    key: string
    items: NavigationItem[]
}

export const navigationSections: readonly NavigationSection[] = [
    {
        key: "explore",
        items: [
            { title: "home", href: "/", description: "Explore the Backrooms universe" },
            { title: "community", href: "/community", description: "Get information from other explorers" },
            { title: "sandbox", href: "/sandbox", description: "Space for testing and experimentation" },
            { title: "archive", href: "/archive", description: "History and documentation database" },
        ],
    },
    {
        key: "library",
        items: [
            { title: "levels", href: "/levels", description: "Explore all documented levels" },
            { title: "entities", href: "/entities", description: "Catalog of entities and creatures" },
            { title: "objects", href: "/objects", description: "Unique items and artifacts found" },
            { title: "groups", href: "/groups", description: "Organizations within the Backrooms" },
            { title: "canons", href: "/canons", description: "Different narratives and universes" },
        ],
    },
    {
        key: "rules",
        items: [
            { title: "rules", href: "/rules", description: null },
            { title: "guides", href: "/guides", description: null },
            { title: "faq", href: "/faq", description: null },
            { title: "staff", href: "/staff", description: null },
            { title: "discord", href: "https://discord.com/app", description: null },
        ],
    },
] as const

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: React.ReactNode }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href} className="no-underline">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export function NavigationMenu() {
    const t = useTranslations("components.navigationMenu")

    return (
        <NavMenu>
            <NavigationMenuList className="flex-wrap">
                {navigationSections.map((section) => (
                    <NavigationMenuItem key={section.key}>
                        <NavigationMenuTrigger>{t(`${section.key}.key`)}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {section.key === "explore" ? (
                                <ExploreMenu sectionKey={section.key} items={section.items} t={t} />
                            ) : (
                                <DefaultMenu sectionKey={section.key} items={section.items} t={t} />
                            )}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavMenu>
    )
}

function ExploreMenu({
    sectionKey,
    items,
    t,
}: {
    sectionKey: string
    items: NavigationItem[]
    t: ReturnType<typeof useTranslations>
}) {
    const lead = items?.[0]

    return (
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {lead && (
                <li className="row-span-4">
                    <NavigationMenuLink asChild>
                        <a
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                            href={lead.href}
                        >
                            <div className="mb-2 text-lg font-medium sm:mt-4">
                                {t(`${sectionKey}.items.${lead.title}.title`)}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                                {lead.description ? t(`${sectionKey}.items.${lead.title}.description`, { default: lead.description }) : null}
                            </p>
                        </a>
                    </NavigationMenuLink>
                </li>
            )}

            {items.slice(1).map((item) => (
                <ListItem
                    key={item.title}
                    href={item.href}
                    title={t(`${sectionKey}.items.${item.title}.title`)}
                >
                    {item.description ? t(`${sectionKey}.items.${item.title}.description`, { default: item.description }) : null}
                </ListItem>
            ))}
        </ul>
    )
}

function DefaultMenu({
    sectionKey,
    items,
    t,
}: {
    sectionKey: string
    items: NavigationItem[]
    t: ReturnType<typeof useTranslations>
}) {
    return (
        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {items.map((item) => (
                <ListItem
                    key={item.title}
                    href={item.href}
                    title={t(`${sectionKey}.items.${item.title}.title`)}
                >
                    {item.description ? t(`${sectionKey}.items.${item.title}.description`, { default: item.description }) : null}
                </ListItem>
            ))}
        </ul>
    )
}
