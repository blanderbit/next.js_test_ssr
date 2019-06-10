<template>
  <v-navigation-drawer
    temporary
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
  >
    <v-list>
      <v-list-tile
        v-for="(item, i) in products"
        :key="`items_${i}`"
        @click="redirect(item.link)"
      >
        <v-list-tile-action>
          <v-img :src="item.logo"></v-img>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

    </v-list>
  </v-navigation-drawer>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'products'
    ]),
    drawer: {
      get: function () {
        return this.$store.state.drawer.left
      },
      set: function (val) {
        if (val === false) {
          this.$store.commit('updateLeftDrawer', false)
        }
      }
    }
  },
  data () {
    return {
      clipped: true,
      miniVariant: true,
    }
  },
  methods: {
    redirect (link) {
      window.open(link, '_blank')
    },
  },
}
</script>
