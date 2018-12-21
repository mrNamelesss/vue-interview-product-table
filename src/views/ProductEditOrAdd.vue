<template>
  <!-- 
  Manually change id of a product using browser's URL input => 
  Product component is not remounted (can lead to potential errors) => 
  use :key property to force update it 
  -->
  <Product :key="$route.params.id" />  
</template>

<script>
import Product from "@/components/Product"

export default {
  name: 'ProductEditOrAdd',
  components: {
    Product,
  },
}
</script>

<style lang="sass">

</style>
