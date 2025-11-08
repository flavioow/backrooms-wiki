import { notFound } from "next/navigation"
import { RenderNamespace } from "@/components/RenderNamespace"
import { fetchArticle } from "@/lib/fetchArticle"
import { namespaces } from "@/lib/namespaces"
import type { NamespaceParams } from "@/lib/types"

export default async function NamespaceIndex(props: {
  params: Promise<NamespaceParams>
}) {
  const { namespace, slug } = await props.params
  const namespaceConfig = namespaces[namespace]

  if (!namespaceConfig) notFound()
  //   if (namespaceConfig.access === "adm-only") requireRole("ADMINISTRATOR")

  const data = await fetchArticle(namespace, slug)

  return (
    <RenderNamespace
      namespace={namespace}
      data={data}
    />
  )
}
