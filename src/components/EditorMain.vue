<template>
    <div class="flex flex-col w-full">
        <Tabs :fileHandler="fileHandler" @removeFileIfActive="removeFileIfActive" @setFileAsActive="setFileAsActive"/>
        <MonacoEditor :fileHandle="internalFileHandler"/>
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { nextTick } from 'vue';
  import MonacoEditor from '@/components/MonacoEditor.vue';
  import Tabs from '@/components/Tabs.vue';
  import { MyFile } from '@/interface/AppInterface';

  @Options<EditorMain>({
    name: 'EditorMain',
    props: ['fileHandler'],
    components: {
      MonacoEditor,
      Tabs,
    },
  })
  export default class EditorMain extends Vue {
    internalFileHandler: MyFile | [] = [];

    setFileAsActive(file: MyFile | undefined) {
      nextTick(() => this.internalFileHandler = file === undefined ? [] : file);
    }
  }
</script>