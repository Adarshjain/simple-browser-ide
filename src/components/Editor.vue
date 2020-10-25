<template>
    <EditorLeftPane :folderMap="folderMap" class="w-1/4"/>
    <div>Data content</div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { PropType } from 'vue';
  import { FileSystemDirectoryHandle, FileSystemHandleKind } from '../interface/FileSystemAPI';
  import { FolderMap } from '../interface/AppInterface';
  import EditorLeftPane from './EditorLeftPane.vue';

  @Options({
    name: 'Editor',
    props: {
      folderHandler: {
        type: Object as PropType<FileSystemDirectoryHandle>,
      },
    },
    components: {
      EditorLeftPane,
    },
  })
  export default class Editor extends Vue {
    folderHandler!: FileSystemDirectoryHandle;
    folderMap: FolderMap = {
      dirs: [],
      self: undefined,
      files: [],
    };

    async mounted() {
      await this.populateMap(this.folderHandler);
    }

    async populateMap(folderHandler: FileSystemDirectoryHandle) {
      //@ts-ignore
      for await (const entry of folderHandler.values()) {
        if (entry.kind === FileSystemHandleKind.directory) {
          this.folderMap.dirs.push(entry);
        } else {
          this.folderMap.files.push(entry);
        }
      }
    }

    // findDirectoryInMap

  }
</script>