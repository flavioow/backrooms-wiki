import { notFound } from "next/navigation"
import { use } from "react"
import { RenderNamespace } from "@/components/RenderNamespace"
import { fetchArticle } from "@/lib/fetchArticle"
import { namespaces } from "@/lib/namespaces"

type SlugParams = {
  params: Promise<{
    locale: string
    namespace: keyof typeof namespaces
    slug: string
  }>
}

export default function NamespaceSlugPage({ params }: SlugParams) {
  const { locale, namespace, slug } = use(params)

  const namespaceConfig = namespaces[namespace]
  if (!namespaceConfig) notFound()

  const data = use(fetchArticle(namespace, slug))

  return (
    <RenderNamespace
      locale={locale}
      namespace={namespace}
      slug={slug}
      data={data}
      isArticle
    />
  )
}
