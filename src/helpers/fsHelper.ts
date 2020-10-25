import { FileSystemDirectoryHandle } from '../interface/FileSystemAPI';

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