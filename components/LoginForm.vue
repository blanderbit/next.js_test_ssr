<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button class="btn-oauth" v-on="on"><span class="divider"></span>Sign In with HubID</button>
      </template>
      <v-layout align-center justify-center>
        <v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Please sign in</v-toolbar-title>
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
                <v-text-field
                  v-model="form.email"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn flat @click="dialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!valid"
                :loading="btnLogin.loading"
                @click="submit"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    valid: function () {
      return this.form.email.length > 5 && this.form.password.length > 3
    }
  },
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    btnLogin: {
      loading: false
    },
    drawer: null,
    dialog: false
  }),
  methods: {
    ...mapActions([
      'authorizeUser'
    ]),
    submit () {
      this.btnLogin.loading = true
      this.authorizeUser(this.form).catch(() => {
        this.btnLogin.loading = false
      })
    }
  }
}
</script>

<style scoped>
.divider {
    position: absolute;
    border-right: 2px solid #f9f9f924;
    height: 30px;
    left: 45px;
    top: 5px;
}
.btn-oauth {
  position: relative;
  font-family: 'NimbusReg', 'Didact Gothic', 'Maven Pro', sans-serif;
  display: block;
  background-color: #60b8e3;
  border: 0px solid #60b8e3;
  border-radius: 10px;
  padding: 2px 0px 0 45px;
  color: #fff;
  font-size: 15px;
  line-height: 40px;
  cursor: pointer;
  outline: none;
  background-repeat: no-repeat no-repeat;
  background-position-x: 3px;
  background-position-y: 3px;
  background-image: url('https://ultra.exchange/img/ultra-exchange/logo-hub-clear.png');
  width: 60%;
  text-align: center;
  height: 40px;
  margin: 10px auto;
  font-weight: bold;
}
@media only screen and (max-width: 480px) {
  .btn-oauth {
    width: 100%;
  }
}
</style>
