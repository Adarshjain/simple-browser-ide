<template>
    <EditorLeftPane :directory="directory" @onExpand="expandDir" class="w-1/4"/>
    <div>Data content</div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { PropType } from 'vue';
  import { FileSystemDirectoryHandle, FileSystemHandleKind } from '../interface/FileSystemAPI';
  import { Directory } from '../interface/AppInterface';
  import EditorLeftPane from './EditorLeftPane.vue';
  import { clone, sortFn } from '../helpers/common';

  @Options({
    name: 'Editor',
    props: {
      directoryHandle: {
        type: Object as PropType<FileSystemDirectoryHandle>,
      },
    },
    components: {
      EditorLeftPane,
    },
    emits: ['onExpand'],
  })
  export default class Editor extends Vue {
    directoryHandle!: FileSystemDirectoryHandle;
    directory: Directory = {
      dirs: [],
      self: undefined,
      files: [],
      isExpanded: false,
      path: [],
      hasPopulated: false,
    };

    async mounted() {
      await this.populateMap(this.directoryHandle, this.directory);
    }

    async populateMap(directoryHandle: FileSystemDirectoryHandle, loadInto: Directory) {
      if (loadInto.self === undefined) {
        loadInto.self = directoryHandle;
        loadInto.path = [...loadInto.path, directoryHandle.name];
      }
      loadInto.hasPopulated = true;
      //@ts-ignore
      for await (const entry of directoryHandle.values()) {
        if (entry.kind === FileSystemHandleKind.directory) {
          loadInto.dirs.push({
            self: entry,
            isExpanded: false,
            dirs: [],
            files: [],
            path: [...loadInto.path, entry.name],
            hasPopulated: false,
          });
          loadInto.dirs.sort((itemA, itemB) => sortFn((itemA.self?.name || ''), (itemB.self?.name || '')));
        } else {
          loadInto.files.push(entry);
          loadInto.files.sort((itemA, itemB) => sortFn(itemA.name, itemB.name));
        }
      }
    }

    async expandDir(directory: Directory) {
      let foundDir = await this.findDirectoryInMap(this.directory, clone(directory.path.slice(1)));
      if (foundDir === undefined || foundDir.self === undefined) {
        return;
      }
      if (directory.isExpanded) {
        foundDir.isExpanded = false;
      } else {
        if (!foundDir.hasPopulated) {
          await this.populateMap(foundDir.self, foundDir);
        }
        foundDir.isExpanded = true;
      }
    }

    async findDirectoryInMap(directory: Directory, path: string[]): Promise<Directory | undefined> {
      let dirName = path.shift();
      for await (const innerDir of directory.dirs) {
        if (innerDir.self?.kind === FileSystemHandleKind.directory && innerDir.self.name === dirName) {
          if (path.length === 0) {
            return innerDir;
          }
          return await this.findDirectoryInMap(innerDir, path);
        }
      }
    }

  }
</script>