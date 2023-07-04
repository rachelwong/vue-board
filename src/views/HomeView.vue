<template>
  <div style="">
    <h1 class="heading mb-0 mt-6">Job Application Tracker</h1>
    <KanbanView class="w-full mt-3" :tasks="listData" />
  </div>
</template>

<script>
import KanbanView from '../components/KanbanView.vue'

export default {
  name: 'HomeView',
  components: {
    KanbanView
  },
  methods: {},
  data() {
    return {
      listData: [
        {
          id: 1,
          name: 'Open',
          type: 'inventoryCategory',
          tasks: [
            {
              id: 1,
              title: 'task 2',
              content: 'task 2 do something heres',
              type: 'inventoryItem'
            }
          ]
        },
        {
          id: 2,
          name: 'In progress',
          type: 'inventoryCategory',
          tasks: [
            {
              id: 1,
              title: 'task 4',
              content: 'task 4 do something heres',
              type: 'inventoryItem'
            }
          ]
        },
        {
          id: 3,
          name: 'Completed',
          type: 'inventoryCategory',
          tasks: []
        }
      ]
    }
  },
  mounted() {
    // console.log('MOUNTED', app)
  }
}
</script>

<style scoped lang="scss">
.heading {
  padding-left: 9.6rem;
}
</style>
