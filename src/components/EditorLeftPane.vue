<template>
    <div class="overflow-auto h-screen">
        <DirectoryTree :directory="directory" @onExpand="$emit('onExpand',$event)"/>
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { Directory } from '../interface/AppInterface';
  import { PropType } from 'vue';
  import FileItem from './FileItem.vue';
  import DirectoryTree from './DirectoryTree.vue';

  @Options({
    name: 'EditorLeftPane',
    props: {
      directory: Object as PropType<Directory>,
    },
    components: {
      FileItem,
      DirectoryTree,
    },
    emits: ['onExpand'],
  })
  export default class EditorLeftPane extends Vue {

  }
</script>