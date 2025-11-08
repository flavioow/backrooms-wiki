type NamespaceConfig = {
  singularName: string | null
  layout: "default" | "noIndexPage" | "adm"
  access: "public" | "admOnly"
}

// Each namespace has an associated page (parameter "singularName")
// While the namespace is always named in plural, its page is in singular

// Always add “singularName” when pages need a prefix
// Example of use: /levels/level-0
// Note that the prefix "level" is taken from "singularName"

export const namespaces = {
  levels: {
    singularName: "level",
    layout: "default",
    access: "public",
  },
  entities: {
    singularName: "entity",
    layout: "default",
    access: "public",
  },
  objects: {
    singularName: "object",
    layout: "default",
    access: "public",
  },
  phenomena: {
    singularName: "phenomenon",
    layout: "default",
    access: "public",
  },
  groups: {
    singularName: "group",
    layout: "default",
    access: "public",
  },
  templates: {
    singularName: "template",
    layout: "default",
    access: "public",
  },
  category: {
    singularName: null,
    layout: "default",
    access: "public",
  },
  information: {
    singularName: null,
    layout: "noIndexPage",
    access: "public",
  },
  adm: {
    singularName: null,
    layout: "adm",
    access: "admOnly",
  },
} as const satisfies Record<string, NamespaceConfig>
