<template>
  <div class="flex flex-row justify-content-start align-items-start w-full" style="height: 100vh">
    <draggable
      class="dragColumn parent-grid flex flex-row justify-content-start align-items-start h-full"
      style="height: 100vh"
      :list="tasks"
      :group="{ name: 'g1' }"
      item-key="name"
      @change="log"
      :move="checkMove"
    >
      <template #item="{ element: column }">
        <div class="column mr-3 h-full" style="height: 100vh;s" :element-type="column.type">
          <div class="my-2 mx-0 flex flex-row justify-content-start align-items-center">
            <span class="py-1 px-2 text-sm column-name font-semibold border-round-xs w-auto">
              {{ column.name }}
            </span>
          </div>
          <div v-if="column.type === 'inventoryCategory'">
            <draggable
              class="dragCard"
              :list="column.tasks"
              :group="{ name: 'g1' }"
              item-key="name"
              @change="log"
              :move="checkMove"
            >
              <template #item="{ element: card }">
                <Card :title="card.title" :content="card.content" :element-type="card.type" />
              </template>
            </draggable>
          </div>
        </div>
      </template>
    </draggable>
    <PButton>hell</PButton>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from './Card.vue'

export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  methods: {
    log(evt) {
      console.log(evt)
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
  name: 'KanbanView'
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
