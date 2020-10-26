import { FileSystemDirectoryHandle, FileSystemHandle } from './FileSystemAPI';

export interface Directory {
  dirs: Directory[],
  self?: FileSystemDirectoryHandle,
  files: MyFile[],
  isExpanded: boolean,
  path: string[], //This is to map path to specific place in this map for faster traversal
  hasPopulated: boolean
}

export type MyFile = MyFileInt & FileSystemHandle

export interface MyFileInt {
  path: string[], //This is to map path to specific place in this map for faster traversal
}