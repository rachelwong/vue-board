<template>
  <div class="flex flex-row justify-content-start align-items-start w-full">
    <draggable
      class="dragColumn parent-grid flex flex-row justify-content-start align-items-start h-full"
      :list="tasks"
      :group="{ name: 'g1' }"
      item-key="name"
      @change="log"
      :move="checkMove"
    >
      <template #item="{ element: column }">
        <div class="column mr-3 h-full">
          <div class="my-2 mx-0 flex flex-row justify-content-start align-items-center">
            <span class="py-1 px-2 text-sm column-name font-semibold border-round-xs w-auto">
              {{ column.name }}
            </span>
          </div>
          <draggable
            class="dragCard"
            :list="column.tasks"
            :group="{ name: 'g1' }"
            item-key="name"
            :move="checkMove"
          >
            <template #item="{ element: card }">
              <Card :title="card.title" :content="card.content" />
            </template>
          </draggable>
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
      // Prevent cards from being dragged into columns and vice versa
      if (evt.from.classList.contains('dragCard') && evt.to.classList.contains('dragColumn')) {
        return false
      }
      if (evt.from.classList.contains('dragColumn') && evt.to.classList.contains('dragCard')) {
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
