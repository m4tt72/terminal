export interface FileSystemNode {
  type: 'file' | 'directory';
  contents: string | Record<string, FileSystemNode>;
}
