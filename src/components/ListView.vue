<template>
  <div class="flex flex-column h-full">
    <ListItem
      v-for="(task, taskIndex) in list"
      :task="task"
      :key="taskIndex"
      @create-new="$emit('create-new')"
      @open-details="($event) => $emit('open-details', $event)"
    />
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

<style lang="scss" scoped></style>
