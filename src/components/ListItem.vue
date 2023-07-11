<template>
  <div
    class="w-full flex flex-row justify-content-between align-items-center mb-1 relative list-item"
    @mouseover="showControls = true"
    @mouseleave="showControls = false"
    @focus="showControls = true"
    @focusout="showControls = false"
  >
    <div class="absolute list-item-controls" v-show="showControls">
      <PButton
        size="small"
        class="p-0 h-full mr-1 list-item-controls__btn"
        @click="$emit('create-new')"
      >
        bel
        <span class="material-icons">add</span>
      </PButton>
      <PButton size="small" class="p-0 h-full mr-2 list-item-controls__btn">
        <span class="material-icons">drag_indicator</span>
      </PButton>
    </div>
    <PButton
      class="list-item-btn font-semibold w-full px-2 py-1"
      size="small"
      @click="$emit('open-details', task)"
    >
      <span class="material-icons mr-2">feed</span>
      <span class="flex flex-row flex-wrap text-left">{{ task.title }}</span>
    </PButton>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    task: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      showControls: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.list-item-controls {
  transform: translate(-100%);
}

.list-item-controls__btn {
  background: var(--surface-100);
  color: var(--surface-400);
  border: none;
}
.list-item-btn {
  color: var(--surface-900);
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
