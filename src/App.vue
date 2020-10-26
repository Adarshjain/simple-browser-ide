<template>
    <div class="w-screen h-screen flex">
        <ChooseDirectory @onDirectorySelect="onDirectorySelect" v-if="!hasChosenDirectory"/>
        <Editor :directoryHandle="directoryHandle" v-else/>
    </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import ChooseDirectory from './components/ChooseDirectory.vue';
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
      ChooseDirectory,
      Editor,
    },
  })
  export default class App extends Vue {
    hasChosenDirectory = false;
    //If a class member in vue is undefined, it'll not be reactive, so using a dummy object
    directoryHandle: FileSystemDirectoryHandle | {} = {};

    onDirectorySelect(directoryHandle: FileSystemDirectoryHandle) {
      this.hasChosenDirectory = true;
      this.directoryHandle = directoryHandle;
    }
  }

</script>
<style>
    body {
        background-color: #1F1F1F;
        color: #FFFFFF;
    }
</style>