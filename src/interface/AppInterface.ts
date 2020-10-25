import { FileSystemDirectoryHandle, FileSystemHandle } from './FileSystemAPI';

export interface Directory {
  dirs: Directory[],
  self?: FileSystemDirectoryHandle,
  files: FileSystemHandle[],
  isExpanded: boolean,
  path: string[], //This is to map path to specific place in this map for faster traversal
  hasPopulated: boolean
}