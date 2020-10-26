<template>
    <div class="w-full h-full flex justify-center items-center">
        <button
                @click="chooseDirectory"
                class="h-12 align-center bg-blue-400 text-white rounded-md align-middle px-2 m-4"
        >
            Choose Directory
        </button>
    </div>
</template>
<script lang="ts">
  import { fetchDir, getPermission } from '@/helpers/fsHelper';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    name: 'App',
    emits: ['onDirectorySelect'],
  })
  export default class ChooseDirectory extends Vue {
    async chooseDirectory() {
      try {
        const dir = await fetchDir();
        const permission = await getPermission(dir);
        if (!permission) {
          alert('Edit permission required!');
          return;
        }
        this.$emit('onDirectorySelect', dir);
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>