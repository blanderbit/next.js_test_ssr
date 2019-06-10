<template>
  <v-layout></v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'logout'
    ])
  },
  created () {
    this.logout()
    this.$router.push({name: 'index'})
  }
}
</script>
