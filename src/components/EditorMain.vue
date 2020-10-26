<template>
    <MonacoEditor :fileHandle="fileHandle"/>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import MonacoEditor from '@/components/MonacoEditor.vue';

  @Options<EditorMain>({
    name: 'EditorMain',
    props: ['fileHandle'],
    components: {
      MonacoEditor,
    },
  })
  export default class EditorMain extends Vue {

  }
</script>