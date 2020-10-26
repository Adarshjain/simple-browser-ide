<template>
    <div class="w-full h-full"></div>
</template>
<script lang="ts">
  import * as Monaco from 'monaco-editor';
  import { Options, Vue } from 'vue-class-component';
  import { FileSystemHandle } from '@/interface/FileSystemAPI';
  import IStandaloneCodeEditor = Monaco.editor.IStandaloneCodeEditor;

  @Options<MonacoEditor>({
    name: 'MonacoEditor',
    props: ['fileHandle'],
    watch: {
      fileHandle: {
        immediate: true,
        async handler(newValue) {
          this.editor = await this.loadEditor(this.editor, newValue);
        },
      },
    },
  })
  export default class MonacoEditor extends Vue {
    editor: IStandaloneCodeEditor | undefined = undefined;
    fileHandle!: FileSystemHandle;

    async loadEditor(
      editor: IStandaloneCodeEditor | undefined,
      fileHandle: FileSystemHandle,
    ): Promise<IStandaloneCodeEditor> {
      //Clearing existing model
      Monaco.editor.getModels().forEach(model => model.dispose());
      let content = await (await fileHandle.getFile()).text();
      const model = Monaco.editor.createModel(
        content,
        undefined, // language
        Monaco.Uri.file(fileHandle.name), // uri
      );
      if (editor === undefined) {
        editor = Monaco.editor.create(this.$el, {
          model,
          theme: 'vs-dark',
        });
      } else {
        editor.setModel(model);
      }
      return editor;
    }
  }
</script>