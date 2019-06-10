<template>
  <v-app dark>
    <left-drawer></left-drawer>
    <app-header></app-header>

    <v-content>
      <nuxt />
    </v-content>

    <right-drawer></right-drawer>

    <app-footer></app-footer>

    <v-snackbar
      v-model="snackbar"
      :color="$store.state.snackbar.color"
      :top="true"
      :left="true"
      :timeout="$store.state.snackbar.timeout"
    >
      {{ $store.state.snackbar.text }}
    </v-snackbar>


  </v-app>
</template>

<script>
import AppHeader from '~/components/App/Header'
import AppFooter from '~/components/App/Footer'
import LeftDrawer from '~/components/App/LeftDrawer'
import RightDrawer from '~/components/App/RightDrawer'

export default {
  components: {
    AppHeader, AppFooter, LeftDrawer, RightDrawer
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.snackbar.model
      },
      set () {
        this.$store.commit('SNACKBAR_DISABLE')
      }
    }
  }
}
</script>
