<template>
    <div class="w-full h-full flex justify-center items-center">
        <button
                @click="chooseFolder"
                class="h-12 align-center bg-blue-400 text-white rounded-md align-middle px-2 m-4"
        >
            Choose Folder
        </button>
    </div>
</template>
<script lang="ts">
  import { fetchDir } from '../helpers/fsHelper';
  import { Options, Vue } from 'vue-class-component';
  import Editor from './Editor.vue';

  @Options({
    name: 'App',
    components: {
      ChooseFolder,
      Editor,
    },
  })
  export default class ChooseFolder extends Vue {
    async chooseFolder() {
      try {
        this.$emit('onFolderSelect', await fetchDir());
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>