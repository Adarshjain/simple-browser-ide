import { FileSystemDirectoryHandle, FileSystemHandle, FileSystemPermissionMode } from '@/interface/FileSystemAPI';

export async function fetchDir(): Promise<FileSystemDirectoryHandle> {
  if (!('showDirectoryPicker' in window)) {
    throw new Error('browser does not support this feature');
  }
  try {
    return await window.showDirectoryPicker();
  } catch (e) {
    //TODO: gracefully handle rejections, not like you handle your breakup
    throw new Error('browser does not support this feature');
  }
}

export async function writeToFile(fileHandle: FileSystemHandle, data) {
  const writable = await fileHandle.createWritable();
  await writable.write(data);
  await writable.close();
}

export async function getPermission(handle): Promise<boolean> {
  const opts = { mode: FileSystemPermissionMode.readwrite };
  if (await handle.queryPermission(opts) === 'granted') {
    return true;
  }
  return await handle.requestPermission(opts) === 'granted';
}