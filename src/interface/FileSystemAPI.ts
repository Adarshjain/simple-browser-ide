/*
*
* Rough interface defined from https://wicg.github.io/file-system-access/
* TODO: Implement proper Iterator interface
* */


export interface FileSystemDirectoryHandle extends FileSystemHandle {
  entries: Iterator<FileSystemHandle>
  getDirectoryHandle: (name: string, options: FileSystemGetDirectoryOptions) => Promise<FileSystemDirectoryHandle>
  getFileHandle: (name: string, options: FileSystemGetFileOptions) => Promise<FileSystemHandle>
  removeEntries: (name: string, options: FileSystemRemoveOptions) => Promise<void>
  resolve: (possibleDescent: FileSystemHandle) => Promise<string[]>
  keys: () => Iterator<FileSystemHandle>
  values: Iterator<FileSystemHandle>
}


export interface FileSystemHandle {
  kind: FileSystemHandleKind
  name: string
  isSameEntry: (fileSystemHandle: FileSystemHandle) => Promise<boolean>
  queryPermission: (descriptor: FileSystemHandlePermissionDescriptor) => Promise<string>
  requestPermission: (descriptor: FileSystemHandlePermissionDescriptor) => Promise<string>
}

export interface FileSystemHandlePermissionDescriptor {
  mode: FileSystemPermissionMode
}


export interface FileSystemGetFileOptions {
  create?: boolean
}

export interface FileSystemGetDirectoryOptions {
  create?: boolean
}

export interface FileSystemRemoveOptions {
  recursive?: boolean;
}

export interface FileSystemHandle {
  kind: FileSystemHandleKind
  name: string
  getFile: () => Promise<File>
  createWritable: (option?: FileSystemCreateWritableOptions) => FileSystemWritableFileStream & WritableStream
}

export interface WritableStream {
  readonly locked: boolean
  abort: (reason?: any) => Promise<undefined>
  close: () => Promise<undefined>;
  getWriter: () => WritableStreamDefaultWriter;
}

export interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean
}

export interface FileSystemWritableFileStream {
  write: (data: FileSystemWriteChunkType) => Promise<void>
  seek: (position: number) => Promise<void>
  truncate: (size: number) => Promise<void>
}

type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams;

export interface WriteParams {
  type: WriteCommandType
  size?: number
  position?: number
  data?: BufferSource | Blob | string
}

export enum FileSystemPermissionMode {
  read = 'read',
  readwrite = 'readwrite'
}

export enum WriteCommandType {
  write = 'write',
  seek = 'seek',
  truncate = 'truncate',
}

export enum FileSystemHandleKind {
  file = 'file',
  directory = 'directory',
}