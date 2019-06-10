<template>
  <v-toolbar
    app
    :clipped-left="clipped"
  >
    <v-btn icon @click.stop="updateLeftDrawer(true)">
      <v-icon color="#69c198">mdi-web</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <img class="pointer margin-left" @click="pagePush('index')" src="/images/ven-cash.png"/>
    <v-toolbar-title class="pointer" v-text="title" @click="pagePush('index')"></v-toolbar-title>

    <v-btn v-if="isHome" class="v-btn-min" flat @click="anchorPush('#first', -110)">Ven</v-btn>
    <v-btn v-if="isHome" class="v-btn-min" flat @click="anchorPush('#second', -60)">Ticket</v-btn>
    <v-btn v-if="isHome" class="v-btn-min" flat @click="anchorPush('#second', 200)">Contact</v-btn>

    <v-spacer></v-spacer>
    <!-- <span v-if="user.name">{{ user.ven_balance.balance }} Ven</span> -->
    <v-toolbar-items v-if="user.name">
      <v-btn dark class="hidden-xs-only">
        {{ user.ven_balance.balance }} Ven
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn small dark @click="$router.push({name: 'Basket'})" class="hidden-xs-only">
        <v-badge>
          <span slot="badge" v-if="basket.length" v-text="basket.length"></span>
          
          <v-icon
            color="grey lighten-1"
          >
            shopping_cart
          </v-icon>
          
        </v-badge>
      </v-btn>
      <v-divider vertical></v-divider>
    </v-toolbar-items>
    <v-toolbar-items v-if="!user.name">
      <login-modal/>
      <v-divider vertical></v-divider>
      <v-btn flat @click="pagePush('Register')" class="hidden-xs-only">SignUp</v-btn>
      <v-divider vertical></v-divider>
    </v-toolbar-items>
    <v-btn icon @click.stop="UPDATE_RIGHT_DRAWER(true)">
      <v-icon>menu</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import LoginModal from '@/components/LoginModal'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    LoginModal
  },
  computed: {
    ...mapGetters(
      ['leftDrawer', 'user', 'basket']
    )
  },
  // watch: {
  //   $route (to, from) {
  //     this.isHome = to.name === 'Home'
  //   }
  // },
  data () {
    return {
      // isHome: this.$router.currentRoute.name === 'Home',
      isHome: false,
      clipped: true,
      rightDrawer: false,
      title: '.world'
    }
  },
  methods: {
    ...mapMutations([
      'updateLeftDrawer', 'UPDATE_RIGHT_DRAWER'
    ]),
    anchorPush (selector, offset) {
      this.$vuetify.goTo(selector, {
        duration: 1000,
        offset: offset,
        easing: 'easeInOutCubic'
      })
    },
    pagePush (name) {
      if (name === 'Home' && this.isHome) {
        this.anchorPush('#zero', -80)
      }
      this.$router.push({name})
    },
  }
}
</script>

<style scoped>
  .v-btn-min {
    min-width: unset;
    padding: 0;
  }
  .margin-left {
    margin-left: 10px;
  }
  .pointer {
    cursor: pointer;
  }
  .v-toolbar__title:not(:first-child) {
    margin-left: 0 !important;
  }
</style>
