<template>
    <div class="w-full" style="flex: 1"></div>
</template>
<script lang="ts">
  import * as Monaco from 'monaco-editor';
  import { Options, Vue } from 'vue-class-component';
  import { FileSystemHandle } from '@/interface/FileSystemAPI';
  import { writeToFile } from '@/helpers/fsHelper';
  import IStandaloneCodeEditor = Monaco.editor.IStandaloneCodeEditor;

  @Options<MonacoEditor>({
    name: 'MonacoEditor',
    props: ['fileHandle'],
    watch: {
      fileHandle: {
        immediate: true,
        async handler(newValue) {
          if (newValue.kind !== 'file') {
            if (this.editor !== undefined) {
              this.editor.dispose();
            }
            return;
          }
          const editor = await this.loadEditor(this.editor, newValue);
          if (editor !== undefined) {
            this.editor = editor;
          }
        },
      },
    },
  })
  export default class MonacoEditor extends Vue {
    editor: IStandaloneCodeEditor | undefined = undefined;
    fileHandle!: FileSystemHandle;

    mounted() {
      window.addEventListener('keyup', async event => {
        if (event.ctrlKey && event.key == 's') { //ctrl + s key to save
          if (this.editor !== undefined) {
            const value = this.editor.getValue();
            await writeToFile(this.fileHandle, value);
            event.preventDefault();
            return false;
          }
        }
      });
    }


    async loadEditor(
      editor: IStandaloneCodeEditor | undefined,
      fileHandle: FileSystemHandle,
    ): Promise<IStandaloneCodeEditor | undefined> {
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
        return editor;
      } else {
        editor.setModel(model);
      }

    }
  }
</script>