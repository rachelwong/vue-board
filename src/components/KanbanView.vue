<template>
  <div class="flex flex-row justify-content-start align-items-start w-full" style="height: 100vh">
    <draggable
      class="dragColumn parent-grid flex flex-row justify-content-start align-items-start h-full"
      style="height: 100vh"
      :list="tasks"
      @start="drag = true"
      @end="drag = false"
      :group="{ name: 'g1' }"
      item-key="name"
      @change="log"
      :move="checkMove"
    >
      <template #item="{ element: column }">
        <div class="column mr-3 h-full" style="height: 100vh;s" :element-type="column.type">
          <div class="my-2 mx-0 flex flex-row justify-content-between align-items-center">
            <span class="py-1 px-2 text-sm column-name font-semibold border-round-xs w-auto">
              {{ column.name }}
            </span>
            <div>
              <PButton
                class="p-0 my-0 ml-0 mr-1 border-round-sm"
                @click="$emit('add-task', column)"
              >
                <span class="material-icons text-sm">add</span>
              </PButton>
              <PButton class="p-0 m-0 border-round-sm" @click="$emit('remove-column', column)">
                <span class="material-icons text-sm">close</span>
              </PButton>
            </div>
          </div>
          <div v-if="column.type === 'inventoryCategory'">
            <draggable
              class="dragCard"
              :list="column.tasks"
              :group="{ name: 'g1' }"
              item-key="name"
              @start="drag = true"
              @end="drag = false"
              @change="log"
              :move="checkMove"
            >
              <template #item="{ element: card }">
                <Card
                  @click="$emit('open-details', card)"
                  :title="card.title"
                  :content="card.content"
                  :element-type="card.type"
                />
              </template>
            </draggable>
          </div>
        </div>
      </template>
    </draggable>
    <div class="relative">
      <PButton
        @click="openNewColumnForm = !openNewColumnForm"
        class="p-1 flex flex-row justify-content-center align-items-center"
      >
        <span class="material-icons p-0 m-0">
          {{ openNewColumnForm ? 'close' : 'add' }}
        </span>
      </PButton>
      <PCard v-if="openNewColumnForm" class="right-0 absolute block">
        <template #content>
          <div class="flex flex-row align-items-center">
            <form @submit.prevent="createNewColumn">
              <PInputText
                v-model="newColumnName"
                type="text"
                class="p-inputtext-xs"
                placeholder="New group"
                @focus="openNewColumnForm = true"
              />
              <PButton class="px-2 py-1 m-0 text-sm ml-1" @click="createNewColumn">
                <span>Done</span>
                <span class="material-icons text-sm">keyboard_return</span>
              </PButton>
            </form>
          </div>
        </template>
      </PCard>
    </div>
  </div>
</template>

<script>
import { isProxy, toRaw } from 'vue'

import draggable from 'vuedraggable'
import Card from './Card.vue'

export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      drag: false,
      openNewColumnForm: false,
      newColumnName: '',
      alertDuplicateColumn: false
    }
  },
  methods: {
    log(evt) {
      console.log('LOG', evt, this.tasks)
    },
    createNewColumn() {
      if (this.newColumnName && isProxy(this.tasks)) {
        const hasDuplicate = toRaw(this.tasks).findIndex(
          (item) =>
            item.type === 'inventoryCategory' &&
            item.name.toLowerCase().trim() === this.newColumnName.toLowerCase().trim()
        )
        if (hasDuplicate < 0) {
          this.$emit('add-column', this.newColumnName)
          this.newColumnName = ''
        } else {
          this.$emit('error', {
            modalHeader: 'Try a different group name',
            message: 'This group name has already been taken'
          })
        }
      }
      this.openNewColumnForm = false
    },
    checkMove(evt) {
      const itemElem = evt.draggedContext.element
      // no items outside a category
      if (itemElem.type === 'inventoryItem') {
        if (evt.to.childNodes.length > 0) {
          let k = 0
          for (let i = 0; i < evt.to.childNodes.length; i += 1) {
            if (evt.to.childNodes[i].getAttribute('element-type') === 'inventoryCategory') {
              k += 1
            }
          }
          if (k === evt.to.childNodes.length) {
            return false
          }
        } else {
          return true
        }
      }
      if (evt.from !== evt.to && itemElem.type === 'inventoryCategory') {
        return false
      }
      return true
    }
  },
  components: {
    draggable,
    Card
  },
  name: 'KanbanView',
  watch: {
    openNewColumnForm: {
      immediate: true,
      handler(val) {
        if (!val) this.newColumnName = ''
      }
    }
  }
}
</script>

<style scoped>
.parent-grid {
  margin-left: 9.6rem;
}

.column {
  width: 260px;
}

.column-name {
  color: var(--surface-900);
  background: var(--bluegray-50);
}
</style>
