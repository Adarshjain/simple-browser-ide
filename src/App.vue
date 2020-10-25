<template>
    <div class="w-screen h-screen flex">
        <ChooseFolder @onFolderSelect="onFolderSelect" v-if="!hasChosenFolder"/>
        <Editor :folder-handler="folderHandler" v-else/>
    </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import ChooseFolder from './components/ChooseFolder.vue';
  import Editor from './components/Editor.vue';
  import { FileSystemDirectoryHandle } from './interface/FileSystemAPI';
  import './style.css';

  declare global {
    interface Window {
      showDirectoryPicker?: any
    }
  }

  @Options({
    name: 'App',
    components: {
      ChooseFolder,
      Editor,
    },
  })
  export default class App extends Vue {
    hasChosenFolder = false;
    //If class member is undefined, it'll not be reactive, so using a dummy object
    folderHandler: FileSystemDirectoryHandle | {} = {};

    onFolderSelect(folderHandlerParam: FileSystemDirectoryHandle) {
      this.hasChosenFolder = true;
      this.folderHandler = folderHandlerParam;
    }
  }

</script>