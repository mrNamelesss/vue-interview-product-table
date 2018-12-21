<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>VidaXL </span>
        <span class="font-weight-light">Product table</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="darkTheme = !darkTheme">
          <v-icon>invert_colors</v-icon>
        </v-btn>
      </v-toolbar-items>
      
    </v-toolbar>

    <v-content>
      <transition name="vida-fade" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      darkTheme: true,
    }
  },
  created() {
    this.$store.dispatch('initialize')
  },
}
</script>

<style lang="sass">

.vida-fade-enter-active, .vida-fade-leave-active
  transition: opacity 0.15s
.vida-fade-enter, .vida-fade-leave-to
  opacity: 0



::-webkit-scrollbar
  width: 4px
  height: 4px

::-webkit-scrollbar-track
  background: #222

::-webkit-scrollbar-thumb
  background: #666
  transition: all 0.2s
  &:hover
    background: #888

::-webkit-scrollbar-corner, ::-webkit-resizer
  background: #333
  
</style>

