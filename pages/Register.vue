<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register HubID</v-toolbar-title>
            </v-toolbar>
            <v-progress-linear
              :active="btnLogin.loading"
              class="ma-0"
              color="green lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
            <v-card-text>
              <v-form>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.first" prepend-icon="person" label="First name" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.last" prepend-icon="person" label="Last name" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.email" prepend-icon="person" label="Email" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.mobile" prepend-icon="phone" label="Phone number" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.password" prepend-icon="lock" label="Password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.repassword" prepend-icon="lock" label="Re-password" type="password"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-switch
                  v-model="switch1"
                >
                  <template slot="label">
                    <v-layout row>
                      <v-container fluid>
                        <v-flex>
                          I have read and agree to the <a href="#" @click.stop.prevent="dialogTerms = true">Terms & Conditions</a>
                        </v-flex>
                      </v-container>
                    </v-layout>
                  </template>
                </v-switch>
              </v-form>
            </v-card-text>
            <v-card-actions>
              Have an account?&nbsp;&nbsp;<a href="#" @click.stop="$store.dispatch('updateLoginModal', true)">SIGN IN</a>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!btnRegister" :loading="btnLogin.loading" @click="submit">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>


    <v-dialog v-model="dialogTerms" width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Terms & Conditions HubCulture</span>
        </v-card-title>
        <v-card-text>
          <terms></terms>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="dialogTerms = false, switch1 = false">Disagree</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogTerms = false, switch1 = true">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'

  import Terms from '~/components/Terms'

  export default {
    components: {
      Terms
    },
    computed: {
      btnRegister: function () {
        return this.switch1 && this.form.first && this.form.last && this.form.email && this.form.password && this.form.mobile && this.form.password === this.form.repassword
      }
    },
    data: () => ({
      btnLogin: {
        loading: false
      },
      dialogTerms: false,
      drawer: null,
      switch1: false,
      form: {
        first: '',
        last: '',
        email: '',
        password: '',
        repassword: '',
        mobile: ''
      }
    }),
    methods: {
      ...mapActions([
        'authorizeByToken'
      ]),
      submit () {
        this.btnLogin.loading = true
        this.$axios.post('/user', this.form).then(response => {
          this.authorizeByToken(response.data.data.token)
          this.$router.push({name: 'index'})
        }).catch(error => {
          this.$store.dispatch('errors', error.response.data.errors)
        })
        this.btnLogin.loading = false
      }
    }
  }
</script>
