<template>
    <div class="directory">
        <DirectoryItem
                :directoryHandler="item.self"
                :key="item.self.name"
                @onExpand="$emit('onExpand', item)"
                v-for="item in directory.dirs"
        >
            <transition name="fade">
                <DirectoryTree :directory="item" @onExpand="$emit('onExpand',$event)" v-if="item.isExpanded"/>
            </transition>
        </DirectoryItem>
        <FileItem
                :fileHandler="item"
                :key="item.name"
                v-for="item in directory.files"
        />
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { Directory } from '../interface/AppInterface';
  import { PropType } from 'vue';
  import FileItem from './FileItem.vue';
  import DirectoryItem from './DirectoryItem.vue';

  @Options({
    name: 'DirectoryTree',
    props: {
      directory: Object as PropType<Directory>,
    },
    components: {
      FileItem,
      DirectoryItem,
    },
    emits: ['onExpand'],
  })
  export default class DirectoryTree extends Vue {
  }
</script>

<style>
    .directory > .directory {
        padding-left: 1.25rem;
    }
</style>