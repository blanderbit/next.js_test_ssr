<template>
  <v-layout row justify-center>
    <v-btn
      flat
      @click.stop="LOGIN_MODAL(true)"
      class="hidden-xs-only"
    >
      SignIn
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
    >
    <v-toolbar
      color="#4e866b"
      dark
    >
      <v-toolbar-title>WELCOME TO VEN WORLD</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="LOGIN_MODAL(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-card-text class="text-xs-center">
          <login-form/>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="text-xs-center">
            <p class="pa-0 ma-0">Don't have a HubID? <a href="#" @click="LOGIN_MODAL(false), $router.push({name: 'Register'})">REGISTER</a></p>
            <p>If you do not remember your HubID password, you can <a href="https://hubculture.com/account/forgotpassword/" target="_blank">RESET IT HERE</a></p>
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import LoginForm from './LoginForm'
import { mapMutations } from 'vuex'

export default {
  components: {
    LoginForm
  },
  computed: {
    dialog: function () {
      return this.$store.state.loginModal
    }
  },
  methods: {
    ...mapMutations([
      'LOGIN_MODAL'
    ])
  }
  // data () {
  //   return {
  //     dialog: false
  //   }
  // }
}
</script>

<style scoped>
  .absolute-right {
    position: absolute;
    top: -11px;
    right: -7px;
  }
</style>
