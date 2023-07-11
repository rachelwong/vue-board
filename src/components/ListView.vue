<template>
  <div class="flex flex-column h-full">
    <ListItem
      v-for="(task, taskIndex) in list"
      :task="task"
      :key="taskIndex"
      @create-new="$emit('create-new')"
      @open-details="($event) => $emit('open-details', $event)"
    />
    <PButton
      class="list-item-btn--add font-semibold w-full px-2 py-1"
      size="small"
      @click="$emit('create-new')"
    >
      <span class="material-icons mr-2">add</span>
      <span class="flex flex-row flex-wrap text-left">New</span>
    </PButton>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  name: 'ListView',
  components: {
    ListItem
  },
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    list() {
      return this.tasks
        .flat()
        .map((item) => item.tasks)
        .flat()
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.list-item-btn--add {
  color: var(--surface-400);
  background: var(--surface-0);
  border: none;

  .material-icons {
    color: var(--surface-300);
  }

  &:hover,
  &:focus {
    color: var(--surface-900);
    background: var(--surface-100);
    .material-icons {
      color: var(--surface-400);
    }
  }
}
</style>
