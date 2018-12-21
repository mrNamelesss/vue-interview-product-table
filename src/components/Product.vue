<template>
  <v-container>

    <v-layout row class="vida-product-head">
      <v-flex xs12 text-xs-center>
        <v-btn flat icon color="grey" class="vida-product-back-button" title="Back" @click="cancel">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <h5 class="headline font-weight-light">
          {{ alreadyExists ? 'Edit product details' : 'Add new product' }}
        </h5>
        <span class="subheading font-weight-light vida-product-subheader" v-if="alreadyExists">
          id: {{ id }}
        </span>
      </v-flex>
    </v-layout>

    <v-form v-if="!notFound" ref="productForm" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        label="Name"
        clearable
        :rules="[v => !!v || 'Name is required']"
        required
      ></v-text-field>
      <v-text-field
        v-model="descr"
        label="Description"
        clearable
      ></v-text-field>

      <br />

      <v-btn
        color="success"
        :disabled="!valid"
        @click="save"
      >
        save
      </v-btn>
      <v-btn @click="cancel">cancel</v-btn>
    </v-form>

    <v-layout v-else row class="vida-product-not-found">
      <v-flex xs12 text-xs-center>
        <h2 class="display-3 error--text">
          Product not found :(
        </h2>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      name: '',
      descr: '',
      valid: false,
      notFound: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    alreadyExists() {
      return !!this.id
    },
  },
  mounted() {
    if (this.alreadyExists) {
      const product = this.$store.getters.getRawProductById(this.id)
      if (!product) {
        this.notFound = true
        return
      }
      this.name = product.name
      this.descr = product.descr
    } else {
      this.name = ''
      this.descr = ''
    }
  },
  methods: {
    save() {
      if (this.$refs.productForm.validate()) {
        if (this.alreadyExists) {
          const updatedProduct = { 
            id: +this.id,
            name: this.name,
            descr: this.descr,
          }
          this.$store.commit('replaceRawProduct', updatedProduct)
          this.$store.dispatch('saveRawProductsToLocalStorage').then(this.cancel)
        } else {
          const newProduct = {
            name: this.name,
            descr: this.descr,
          }
          this.$store.commit('addNedRawProduct', newProduct)
          this.$store.dispatch('saveRawProductsToLocalStorage').then(this.cancel)
        }
      }
    },
    cancel() {
      this.$router.push(`/product-table`)
    },
  },

}
</script>

<style lang="sass">

.vida-product-back-button
  float: left
  margin: 0

.vida-product-head
  margin-bottom: 40px

.vida-product-subheader
  opacity: 0.5

</style>
