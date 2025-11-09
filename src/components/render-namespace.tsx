"use client"

import type { NamespaceDataMap } from "@/lib/data"
import type { Namespace } from "@/lib/types"

type Props<N extends Namespace> = {
    namespace: N
    data: NamespaceDataMap[N][]
    slug?: string
    locale?: string
    isArticle?: boolean
}

export function RenderNamespace<N extends Namespace>({
    namespace,
    data,
    slug,
}: Props<N>) {
    const isArticle = Boolean(slug)

    return (
        <section>
            <h1>
                {isArticle
                    ? `Viewing ${namespace}: ${data[0].name ?? "Unknown"}`
                    : `Listing all ${namespace}`}
            </h1>

            {!isArticle && (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <a href={`/${namespace}/${item.id}`}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
