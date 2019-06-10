<template>
  <div>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="drawer"
      fixed
      app
    >
      <v-list>

        <v-list-tile avatar v-if="user.name">

          <v-list-tile-avatar v-if="user.picture">
            <img :src="user.picture.thumbnail">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-badge>
              <v-icon @click="myVenDialog = true" slot="badge" dark small>mdi-vuejs</v-icon>
              <v-list-tile-title v-text="user.name"></v-list-tile-title>
            </v-badge>
          </v-list-tile-content>
          
          <v-list-tile-action>
            <v-btn icon @click.stop="right = !right">
              <v-icon>compare_arrows</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="user.name"></v-divider>
        <template>

          <v-list-tile class="nav-link hidden-sm-and-up" @click="$store.dispatch('updateLoginModal', true)">
            <v-list-tile-action>
              <v-icon>mdi-login</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>SignIn</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(menu, i) in menuItems" :key="i + menu.name" :class="`nav-link ${menu.class}`" :to="{name: menu.name}">
            <v-list-tile-action>
              <v-icon :color="menu.grey ? 'grey darken-1' : ''" v-text="menu.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title :class="menu.grey ? 'grey--text text--darken-1' : ''" v-text="menu.title"></v-list-tile-title>
          </v-list-tile>


          <v-list-group v-if="user.name">
            
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon color="#69c198">mdi-vuejs</v-icon>
                <!-- <v-avatar :size="24" color="#69c198">V</v-avatar> -->
              </v-list-tile-action>

              <v-list-tile-title>Ven</v-list-tile-title>
            </v-list-tile>

              <v-list-tile class="nav-link" :to="{name: 'VenBuy'}">
                <v-list-tile-action>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Buy</v-list-tile-title>
              </v-list-tile>

              <v-list-tile class="nav-link" :to="{name: 'VenSend'}">
                <v-list-tile-action>
                  <v-icon>mdi-arrow-up</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Send</v-list-tile-title>
              </v-list-tile>

              <v-list-tile class="nav-link" :to="{name: 'VenRequest'}">
                <v-list-tile-action>
                  <v-icon>mdi-arrow-down</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Request</v-list-tile-title>
              </v-list-tile>

              <v-list-tile class="nav-link" :to="{name: 'VenTransaction'}">
                <v-list-tile-action>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Transactions</v-list-tile-title>
              </v-list-tile>

          </v-list-group>

          <v-list-tile class="nav-link" :to="{name: 'Logout'}" v-if="user.name">
            <v-list-tile-action>
              <v-icon color="grey darken-1">mdi-exit-to-app</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Logout</v-list-tile-title>
          </v-list-tile>

        </template>

      </v-list>


    </v-navigation-drawer>

    <v-dialog
      v-model="myVenDialog"
      max-width="290"
      v-if="user.name"
    >
      <v-card>
        <v-card-title class="headline">Balance: {{ user.ven_balance.balance }} Ven</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="myVenDialog = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    drawer: {
      get: function () {
        return this.$store.state.drawer.right
      },
      set: function (val) {
        if (val === false) {
          this.UPDATE_RIGHT_DRAWER(false)
        }
      }
    },
    user: function () {
      return this.$store.state.user
    },
    menuItems: function () {
      if (this.user.name) {
        return [
          {title: 'Basket', name: 'Basket', icon: 'shopping_cart', class: 'hidden-sm-and-up'},
          {title: 'Buy ticket', name: 'Ticket', icon: 'mdi-ticket'},
          {title: 'Profile', name: 'Profile', icon: 'mdi-account'},
          {title: 'Partners', name: 'Partners', icon: 'mdi-web'}
          // {title: 'Logout', name: 'Logout', icon: 'mdi-exit-to-app', grey: true}
        ]
      }
      return [
        // {title: 'SignIn', name: 'Login', icon: 'mdi-login', class: 'hidden-sm-and-up'},
        {title: 'SignUp', name: 'Register', icon: 'mdi-account-multiple-plus', class: 'hidden-sm-and-up', divider: true},
        {title: 'Partners', name: 'Partners', icon: 'mdi-web', class: ''}
      ]
    }
  },
  data () {
    return {
      myVenDialog: false,
      right: true
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_RIGHT_DRAWER'
    ])
  }
}
</script>
