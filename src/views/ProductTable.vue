<template>
  <v-container>
    <v-layout row mb-3>

      <v-flex xs6>
        <v-btn @click="reimportData">
          <v-icon class="vida-reimport-data-icon">replay</v-icon>
          <span>Reimport data</span> 
        </v-btn> 
      </v-flex>

      <v-spacer></v-spacer>

      <v-flex xs6 text-xs-right>
        <v-btn color="success" @click="addProduct"> 
          <span>Create product</span> 
          <v-icon class="vida-add-product-icon">add</v-icon>
        </v-btn> 
      </v-flex>

    </v-layout>

    <v-data-table
      :headers="headers"
      :items="products"
      :hide-actions="true"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.descr }}</td>
        <td class="vida-td-actions">
          <v-btn flat icon color="green" @click="editProduct(props.item)" title="Edit">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="openDialogConfirmDelete(props.item.id)" title="Delete">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <DialogConfirmDelete ref="dialogConfirmDelete" @confirm="confirmDeleting"/>

  </v-container>
</template>

<script>
import DialogConfirmDelete from '@/components/DialogConfirmDelete'

export default {
  name: 'ProductTable',
  components: {
    DialogConfirmDelete,
  },
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'descr' },
        { text: 'Actions', align: 'center', sortable: false },
      ],
    }
  },
  computed: {
    products() {
      return this.$store.getters.rawProducts
    },
  },
  methods: {
    addProduct() {
      this.$router.push(`/product-table/product-add`)
    },
    editProduct(product) {
      this.$router.push(`/product-table/product-edit/${ product.id }`)
    },
    reimportData() {
      this.$store.dispatch('pullAndFillRawProductsFromMock')
    },
    openDialogConfirmDelete(productId) {
      this.$refs['dialogConfirmDelete'].open(productId)
    },
    confirmDeleting(productId) {
      this.$store.commit('removeRawProductById', +productId)
      this.$store.dispatch('saveRawProductsToLocalStorage')
    }
  },
}
</script>

<style lang="sass">

.vida-reimport-data-icon
  margin-right: 10px

.vida-add-product-icon
  margin-left: 10px

.vida-td-actions
  text-align: center
  white-space: nowrap


</style>
