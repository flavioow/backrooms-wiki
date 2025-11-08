import type { NamespaceDataMap } from "./data"
import { namespaces } from "./namespaces"
import type { Namespace } from "./types"

export async function fetchArticle<N extends Namespace>(
  namespace: N,
  slug?: string,
): Promise<NamespaceDataMap[N][]> {
  // hard coded
  const mockData = [
    { id: "1", name: `${namespaces[namespace].singularName ?? namespace}-1` },
    { id: "2", name: `${namespaces[namespace].singularName ?? namespace}-2` },
  ] as NamespaceDataMap[N][]

  return slug ? mockData.filter((d) => d.id === slug) : mockData
}
