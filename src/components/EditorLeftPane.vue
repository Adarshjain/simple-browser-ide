<template>
    <div class="overflow-auto h-screen">
        <DirectoryTree :directory="directory"
                       @onExpand="$emit('onExpand',$event)"
                       @onFileClick="$emit('onFileClick',$event)"
        />
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import DirectoryTree from '@/components/DirectoryTree.vue';

  @Options({
    name: 'EditorLeftPane',
    props: ['directory'],
    components: {
      DirectoryTree,
    },
    emits: ['onExpand', 'onFileClick'],
  })
  export default class EditorLeftPane extends Vue {

  }
</script>