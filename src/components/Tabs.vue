<template>
    <div class="flex overflow-x-auto">
        <div
                :key="file.path"
                @click.stop="makeTabActive(file)"
                class="flex p-1 cursor-pointer border-solid border-r border-l border-current border-gray-100"
                tabindex="1"
                v-for="file in fileHandlers"
        >
            <span class="text-xs mr-2">{{file.name}}</span>
            <img @click.stop="closeTab(file)" class="w-3" src="/assets/icons/close.svg" tabindex="1">
        </div>
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { MyFile } from '@/interface/AppInterface';

  @Options<Tabs>({
    props: ['fileHandler'],
    watch: {
      fileHandler: {
        immediate: true,
        handler(newFileHandler) {
          this.updateHandlersList(newFileHandler);
        },
      },
    },
    emits: ['setFileAsActive', 'removeFileIfActive'],
  })
  export default class Tabs extends Vue {
    fileHandler!: MyFile;
    fileHandlers: (MyFile & { isActive?: boolean })[] = [];

    updateHandlersList(fileHandler: MyFile) {
      this.fileHandlers.forEach(file => file.isActive = false);
      let foundFileIndex = this.getFileIndex(fileHandler);
      if (foundFileIndex === -1) {
        this.fileHandlers.push(fileHandler);
        foundFileIndex = this.fileHandlers.length - 1;
      }
      let foundHandler = this.fileHandlers[foundFileIndex];
      this.makeTabActive(foundHandler);
    }

    getFileIndex(fileHandler: MyFile): number {
      return this.fileHandlers.findIndex(file => `${file.path.join('/')}` === `${fileHandler.path.join('/')}`);
    }

    closeTab(fileHandler: (MyFile & { isActive?: boolean })) {
      let foundFileIndex = this.getFileIndex(fileHandler);
      this.fileHandlers.splice(foundFileIndex, 1);
      if (fileHandler.isActive) {
        if (this.fileHandlers.length > 0) {
          this.makeTabActive(this.fileHandlers[this.fileHandlers.length - 1]);
        } else {
          this.$emit('setFileAsActive', undefined);
        }
      }
    }

    makeTabActive(fileHandler: (MyFile & { isActive?: boolean })) {
      this.fileHandlers.forEach(file => file.isActive = false);
      fileHandler.isActive = true;
      this.$emit('setFileAsActive', fileHandler);
    }
  }
</script>