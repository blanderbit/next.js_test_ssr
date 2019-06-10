<template>
  <v-container>
    Auth <v-btn @click="logout">logout!</v-btn>
    {{ user.name }} (ID#{{ user.id }})
    <v-layout>
      <v-flex>
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
          <v-btn
            color="primary"
            @click="authorizeUser(form)"
          >Login</v-btn>
        </v-form>
        {{form}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['logout', 'fetchAuthUser', 'authorizeUser']),
  }
}
</script>
