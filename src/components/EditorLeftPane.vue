<template>
    <div class="overflow-auto h-screen">
        <FileItem
                :fileHandler="item"
                :fileType="item.kind"
                :key="item.name"
                v-for="item in folderMap.dirs"
        />
        <FileItem
                :fileHandler="item"
                :fileType="item.kind"
                :key="item.name"
                v-for="item in folderMap.files"
        />
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { FolderMap } from '../interface/AppInterface';
  import { PropType } from 'vue';
  import FileItem from './FileItem.vue';

  @Options({
    name: 'EditorLeftPane',
    props: {
      folderMap: Object as PropType<FolderMap>,
    },
    components: {
      FileItem,
    },
  })
  export default class EditorLeftPane extends Vue {

  }
</script>