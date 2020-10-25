<template>
    <div class="text-sm px-2 py-1 hover:bg-blue-100 cursor-pointer flex items-center whitespace-no-wrap">
        <div class="h-3 w-3 mr-1"></div>
        <img alt="File" class="h-5 w-5 mr-1" src="/assets/icons/file.svg">
        {{fileHandler.name}}
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { PropType } from 'vue';
  import { FileSystemHandle } from '../interface/FileSystemAPI';

  @Options({
    name: 'FileItem',
    props: {
      fileHandler: Object as PropType<FileSystemHandle>,
    },
  })
  export default class FileItem extends Vue {
  }

</script>