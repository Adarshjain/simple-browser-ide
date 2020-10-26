<template>
    <div class="text-sm px-2 py-1 cursor-pointer flex items-center whitespace-no-wrap">
        <div class="icon--small"></div>
        <img alt="File" class="icon" src="/assets/icons/file.svg">
        {{fileHandler.name}}
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  @Options({
    name: 'FileItem',
    props: ['fileHandler'],
  })
  export default class FileItem extends Vue {
  }

</script>
<style src="@/icon.css"></style>