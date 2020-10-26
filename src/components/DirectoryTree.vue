<template>
    <div class="directory">
        <DirectoryItem
                :directoryHandler="item.self"
                :key="item.self.name"
                @onExpand="$emit('onExpand', item)"
                v-for="item in directory.dirs"
        >
            <transition name="fade">
                <DirectoryTree :directory="item"
                               @onExpand="$emit('onExpand',$event)"
                               @onFileClick="$emit('onFileClick',$event)"
                               v-if="item.isExpanded"
                />
            </transition>
        </DirectoryItem>
        <FileItem
                :fileHandler="item"
                :key="item.name"
                v-for="item in directory.files"
                @click="$emit('onFileClick',item)"
        />
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { Directory } from '@/interface/AppInterface';
  import { PropType } from 'vue';
  import FileItem from '@/components/FileItem.vue';
  import DirectoryItem from '@/components/DirectoryItem.vue';

  @Options<DirectoryTree>({
    name: 'DirectoryTree',
    props: {
      directory: Object as PropType<Directory>,
    },
    components: {
      FileItem,
      DirectoryItem,
    },
    emits: ['onExpand', 'onFileClick'],
  })
  export default class DirectoryTree extends Vue {
  }
</script>

<style>
    .directory > .directory {
        padding-left: 1.25rem;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        max-height: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        max-height: 1000px;
    }
</style>