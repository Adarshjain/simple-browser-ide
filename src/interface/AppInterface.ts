import { FileSystemDirectoryHandle, FileSystemHandle } from './FileSystemAPI';

export interface FolderMap {
  dirs: FolderMap[],
  self?: FileSystemDirectoryHandle,
  files: FileSystemHandle[]
}