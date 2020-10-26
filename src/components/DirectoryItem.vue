<template>
    <div class="text-sm px-2 py-1 cursor-pointer flex items-center whitespace-no-wrap">
        <img @click="$emit('onExpand')" alt="chevron-right" class="icon--small" src="/assets/icons/chevron-right.svg">
        <img alt="Folder" class="icon" src="/assets/icons/folder.svg">
        <span>{{directoryHandler.name}}</span>
    </div>
    <slot></slot>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  @Options({
    name: 'DirectoryItem',
    props: ['directoryHandler'],
    emits: ['onExpand'],
  })
  export default class DirectoryItem extends Vue {
  }

</script>
<style src="@/icon.css"></style>