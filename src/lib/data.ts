type Level = { id: string; name: string }
type Entity = { id: string; name: string }
type ObjectItem = { id: string; name: string }
type Phenomenon = { id: string; name: string }
type Group = { id: string; name: string }
type Template = { id: string; name: string }
type Category = { id: string; name: string }
type Information = { id: string; name: string }
type Adm = { id: string; name: string }

export interface NamespaceDataMap {
  levels: Level
  entities: Entity
  objects: ObjectItem
  phenomena: Phenomenon
  groups: Group
  templates: Template
  category: Category
  information: Information
  adm: Adm
}
