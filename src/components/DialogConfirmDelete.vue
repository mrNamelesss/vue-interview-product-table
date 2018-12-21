<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="showDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">Delete?</v-card-title>

        <v-card-text>
          Are you sure you want to delete item with id <span class="font-weight-bold red--text">{{ productId }}</span>? This action cannot be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat="flat"
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="confirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogConfirmDelete',
  data() {
    return {
      showDialog: false,
      productId: undefined,
    }
  },
  methods: {
    open(productId) {
      this.productId = productId
      this.showDialog = true
    },
    close() {
      this.showDialog = false
    },
    confirm() {
      this.$emit('confirm', this.productId)
      this.showDialog = false
    },
  }
}
</script>

<style lang="sass">


</style>
