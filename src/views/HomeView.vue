<template>
  <div style="">
    <h1 class="heading mb-0 mt-6">Job Application Tracker</h1>
    <MessageModal
      :visible="!!Object.keys(modalMessage).length"
      :modal-header="modalMessage.modalHeader"
      :message="modalMessage.message"
      @close-modal="modalMessage = {}"
    />
    <KanbanView
      class="w-full mt-3"
      :tasks="listData"
      @add-column="($event) => addColumn($event)"
      @add-task="addTaskItem"
      @remove-column="removeColumn"
      @error="($event) => (modalMessage = $event)"
    />
  </div>
</template>

<script>
import KanbanView from '../components/KanbanView.vue'
import MessageModal from '../components/MessageModal.vue'

export default {
  name: 'HomeView',
  components: {
    KanbanView,
    MessageModal
  },
  methods: {
    initStore() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'))
      if (!storedTasks || !storedTasks.length) {
        this.listData = this.defaultData
      } else {
        this.listData = storedTasks.sort((a, b) => a.id - b.id)
      }
    },
    addColumn(columnName) {
      this.listData.push({
        id: Math.max(...this.listData.map((item) => item.id)) + 1,
        name: columnName,
        type: 'inventoryCategory',
        tasks: []
      })
    },
    removeColumn(column) {
      this.listData = this.listData.filter((item) => item.id !== column.id)
      localStorage.setItem('tasks', JSON.stringify(this.listData))
    },
    addTaskItem(column) {
      this.listData = this.listData.map((col) => {
        if (col.id === column.id) {
          col.tasks.unshift({
            id: col.tasks.length + 1,
            title: '',
            content: '',
            type: 'inventoryItem',
            status: col.name
          })
          col.tasks.sort((a, b) => b.id - a.id)
        }
        return col
      })
    }
  },
  data() {
    return {
      listData: [],
      modalMessage: {},
      defaultData: [
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
    this.initStore()
  }
}
</script>

<style scoped lang="scss">
.heading {
  padding-left: 9.6rem;
}
</style>
