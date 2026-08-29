export type ImportRelation = {
  fromFile: string
  specifier: string
}

export async function parseTypeScriptProject(_rootDir: string): Promise<ImportRelation[]> {
  return []
}
