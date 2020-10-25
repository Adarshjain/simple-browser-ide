<template>
    <div class="text-sm px-2 py-1 hover:bg-blue-100 cursor-pointer flex items-center">
        <template v-if="fileType === 'directory'">
            <div class="h-3 w-3 mr-1">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </div>
            <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
            </svg>
        </template>
        <template v-else>
            <div class="h-3 w-3 mr-1"></div>
            <svg class="mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      fill-rule="evenodd"/>
            </svg>
        </template>
        {{fileHandler.name}}
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { PropType } from 'vue';
  import { FileSystemDirectoryHandle, FileSystemHandle } from '../interface/FileSystemAPI';

  @Options({
    name: 'FileItem',
    props: {
      fileHandler: Object as PropType<FileSystemDirectoryHandle | FileSystemHandle>,
      fileType: String,
    },
  })
  export default class FileItem extends Vue {
  }

</script>