import type { CeramicDoc } from 'kontext-common';

export function flattenDoc<T>(
  doc: CeramicDoc<T>
): T & { docID: string; schemaDocID?: string } {
  const { content, metadata, id } = doc;
  return {
    ...content,
    docID: id.toUrl(),
    schemaDocID: metadata.schema,
  };
}

export function prefixCeramicDocID(docID: string): string {
  return `ceramic://${docID.replace('ceramic://', '')}`;
}
