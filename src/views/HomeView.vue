<template>
  <div style="">
    <h1 class="heading mb-0 mt-6">Job Application Tracker</h1>
    <DetailSidebar
      v-if="!!Object.keys(selectedTask).length"
      :visible="openDetailSideBar"
      :item="selectedTask"
      :statuses="statusColumns"
      @remove-task="($event) => removeTask($event)"
      @update-task="($event) => updateTask($event)"
      @close-details="closeDetails"
    />
    <MessageModal
      :visible="!!Object.keys(modalMessage).length"
      :modal-header="modalMessage.modalHeader"
      :message="modalMessage.message"
      @close-modal="modalMessage = {}"
    />
    <div class="toolbar">
      <PButton
        class="py-1 px-2 mt-2 flex flex-row justify-content-between align-items-center"
        @click="createNewTask"
      >
        <span class="material-icons mr-1">add</span>
        <span>New</span>
      </PButton>
    </div>
    <KanbanView
      class="w-full mt-3"
      :tasks="listData"
      @open-details="($event) => openDetails($event)"
      @add-column="($event) => addColumn($event)"
      @add-task="addTaskItem"
      @remove-column="removeColumn"
      @error="($event) => (modalMessage = $event)"
    />
  </div>
</template>

<script>
import { toRaw } from 'vue'
import clonedeep from 'lodash/cloneDeep'

import KanbanView from '../components/KanbanView.vue'
import MessageModal from '../components/MessageModal.vue'
import DetailSidebar from '../components/DetailSidebar.vue'

export default {
  name: 'HomeView',
  components: {
    KanbanView,
    MessageModal,
    DetailSidebar
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
    openDetails(item) {
      this.openDetailSideBar = true
      this.selectedTask = clonedeep(toRaw(item))
    },
    closeDetails() {
      this.selectedTask = {}
      this.openDetailSideBar = false
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
    createNewTask() {
      this.openDetailSideBar = true
      this.selectedTask = {
        id: '',
        title: '',
        content: '',
        status: '',
        type: 'inventoryItem'
      }
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
    },
    removeTask(task) {
      if (task.id === '') return
      const indexToRemove = this.listData
        .find((col) => col.name === task.status)
        .tasks.findIndex((x) => x.id === task.id)
      if (indexToRemove > -1) {
        this.listData.find((col) => col.name === task.status).tasks.splice(indexToRemove, 1)
        localStorage.setItem('tasks', JSON.stringify(this.listData))
      }
    },
    updateTask(task) {
      if (!this.statusColumns.some((col) => col.name === task.status)) this.addColumn(task.status)

      if (task.id === null || task.id === '') {
        this.listData
          .find((col) => col.name === task.status)
          .tasks.push({
            ...task,
            id: this.listData.find((col) => col.name === task.status).tasks.length + 1
          })
      } else {
        this.listData
          .find((col) => col.name === task.status)
          .tasks.map((item) => {
            if (item.id === task.id) {
              return Object.assign(item, task)
            }
            return item
          })
      }
      localStorage.setItem('tasks', JSON.stringify(this.listData))
    }
  },
  data() {
    return {
      listData: [],
      modalMessage: {},
      selectedTask: {},
      openDetailSideBar: false,
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
              type: 'inventoryItem',
              status: 'Open'
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
              type: 'inventoryItem',
              status: 'In progress'
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
  computed: {
    statusColumns() {
      if (!this.listData.length) return []
      return this.listData
        .filter((item) => item.type === 'inventoryCategory')
        .map((item) => {
          return { id: item.id, name: item.name }
        })
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
.toolbar {
  margin: 0 9.6rem;
}
</style>
