<template>
  <PCard
    :id="id"
    class="w-full mb-2 card"
    :class="onHover ? 'hover' : ''"
    @focus="onHover = !onHover"
    @focusout="onHover = !onHover"
    @mouseover="onHover = !onHover"
    @mouseout="onHover = !onHover"
  >
    <template #title>
      <span v-if="title" class="card-title text-sm font-semibold line-height-4">{{ title }}</span>
      <span v-else class="card-title--empty text-sm font-semibold line-height-4s">Untitled</span>
    </template>
    <template #content>
      <p v-if="content" class="card-content text-sm">
        {{ content }}
      </p>
    </template>
  </PCard>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Card',
  props: {
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      onHover: false
    }
  },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.card {
  background: inherit;
  transition: background ease-out 0.6s;

  &.hover {
    cursor: pointer;
    background-color: var(--bluegray-50);
  }
}

.card-title {
  &--empty {
    color: var(--surface-400);
  }
}
</style>
