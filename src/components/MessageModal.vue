<template>
  <PDialog v-model:visible="computedVisible" modal :header="modalHeader" :style="{ width: '50vw' }">
    <p>
      {{ message }}
    </p>
    <PButton @click="computedVisible = false" class="py-2 px-4 mt-4">Ok</PButton>
  </PDialog>
</template>

<script>
export default {
  name: 'MessageModal',
  props: {
    message: {
      type: String,
      default: ''
    },
    modalHeader: {
      type: String,
      default: 'Alert'
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    computedVisible: {
      get() {
        return this.visible
      },
      set() {
        this.$emit('close-modal')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
