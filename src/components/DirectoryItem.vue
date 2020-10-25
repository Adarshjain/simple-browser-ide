<template>
    <div class="text-sm px-2 py-1 hover:bg-blue-100 cursor-pointer flex items-center whitespace-no-wrap">
        <img @click="$emit('onExpand')" alt="chevron-right" class="h-3 w-3 mr-1" src="/assets/icons/chevron-right.svg">
        <img alt="Folder" class="h-5 w-5 mr-1" src="/assets/icons/folder.svg">
        {{directoryHandler.name}}
    </div>
    <slot></slot>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { PropType } from 'vue';
  import { FileSystemDirectoryHandle } from '../interface/FileSystemAPI';

  @Options({
    name: 'DirectoryItem',
    props: {
      directoryHandler: Object as PropType<FileSystemDirectoryHandle>,
    },
    emits: ['onExpand'],
  })
  export default class DirectoryItem extends Vue {
  }

</script>