import type { namespaces } from "./namespaces"

export type Namespace = keyof typeof namespaces

export type NamespaceParams = {
  namespace: Namespace
  slug?: string
}
