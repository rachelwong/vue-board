<template>
  <div class="">
    <PSidebar
      v-model:visible="localVisible"
      class="w-full md:w-20rem lg:w-30rem"
      position="right"
      :dismissable="false"
      @hide="$emit('close-details')"
    >
      <template #header>
        <div class="flex w-full justify-content-start align-items-center">
          <h3>Edit Task</h3>
        </div>
      </template>
      <form
        @submit.prevent="submitTask"
        class="p-0 m-0 flex-column flex justify-content-between align-items-start h-full"
      >
        <div class="w-full">
          <div
            v-for="(value, key, index) in taskToEdit"
            :key="index"
            class="flex flex-row justify-content-between align-items-center w-full mb-2 mt-1"
          >
            <span class="text-capitalise w-7rem">{{ key }}</span>
            <PInputText
              v-if="key !== 'status'"
              v-model="taskToEdit[key]"
              type="text"
              class="p-inputtext-sm w-full"
            />
            <PDropdown
              v-if="key === 'status'"
              v-model="selectedStatus"
              :modelValue="selectedStatus"
              :options="statuses"
              optionLabel="name"
              optionValue="name"
              placeholder="Select a status"
              class="w-full"
            />
          </div>
        </div>
        <PButton type="submit" label="Submit" />
      </form>
    </PSidebar>
  </div>
</template>

<script>
export default {
  name: 'DetailSidebar',
  data() {
    return {
      taskToEdit: {
        type: Object,
        default: () => ({})
      },
      localVisible: this.visible,
      selectedStatus: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    },
    statuses: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    submitTask() {
      const payload = {
        id: this.item.status === this.selectedStatus ? this.item.id : null, // if status changes, new id reset
        title: this.taskToEdit.title,
        content: this.taskToEdit.content,
        type: 'inventoryItem',
        status: this.selectedStatus
      }
      if (this.item.status !== this.selectedStatus)
        // if status changed, remove the old item from old column
        this.$emit('remove-task', { id: this.item.id, status: this.item.status })
      this.$emit('update-task', payload)
      this.localVisible = false
    }
  },
  mounted() {
    const { id, type, ...task } = this.item
    this.taskToEdit = task
    this.selectedStatus = task.status
  }
}
</script>

<style lang="scss" scoped></style>
