<template>
  <v-container fluid>
    <v-layout align-center justify-center>
        <v-flex xs12 md10 lg8>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step editable :complete="e1 > 1" step="1">Select recipient</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">Fill in the required fields</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">Data checking</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-toolbar
                  dark
                  tabs
                >
                  <v-icon @click="$router.go(-1)">arrow_back</v-icon>

                  <v-text-field
                    v-model="search"
                    class="mx-3"
                    label="User name or email"
                    prepend-inner-icon="search"
                    solo-inverted
                  ></v-text-field>

                  <v-tabs
                    slot="extension"
                    v-model="tabs"
                    centered
                    color="transparent"
                    slider-color="white"
                  >
                    <v-tab key="friends">Friends</v-tab>
                    <v-tab key="connections">Connections</v-tab>
                  </v-tabs>
                </v-toolbar>


                <v-tabs-items v-model="tabs">

                  <v-tab-item key="friends">
                    <friends-search
                      v-on:choose-user="e1 = 2, form.user = $event"
                    ></friends-search>

                  </v-tab-item>

                  <v-tab-item key="connections">
                    <v-card>
                      <v-card-text>
                        <user-search 
                          :question="search"
                          v-on:choose-user="e1 = 2, form.user = $event"
                        ></user-search>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                </v-tabs-items>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card>
                  <v-card-text>
                    <v-form v-model="btnStep2Disabled">
                      <v-layout align-center justify-center row wrap>
                          <v-flex xs12 sm8>
                            <v-text-field
                              v-model="form.amount"
                              :rules="amountRules"
                              label="Amount"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm8>
                            <v-textarea
                              :rules="requiredRules"
                              v-model="form.message"
                              label="Message"
                            ></v-textarea>
                          </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-card-actions>
                  <v-btn @click="e1 = 1"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 1</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!btnStep2Disabled"
                    color="primary"
                    @click="e1 = 3"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>

              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card>
                  <v-card-text>
                    <div>
                      <v-chip v-if="form.user.name">
                        <v-avatar>
                          <img :src="form.user.picture ? form.user.picture.thumbnail : 'https://s3.amazonaws.com/hc-profiles-thumb/i/user_default.gif'" alt="trevor">
                        </v-avatar>
                        {{ form.user.name }}
                      </v-chip>
                      <div v-else>
                        User: {{ form.user.email }}
                      </div>
                    </div>
                    <div>Amount: {{ form.amount }}</div>
                    <div>Message: {{ form.message }}</div>
                  </v-card-text>
                </v-card>


                <v-card-actions>
                  <v-btn @click="e1 = 2"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 2</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="complete"
                    depressed
                  >
                  {{completeBtnName}}
                  </v-btn>
                </v-card-actions>

              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import UserSearch from './_connections'
import FriendsSearch from './_friends'

export default {
  components: {
    UserSearch, FriendsSearch
  },
  props: [
    'callback', 'completeBtnName'
  ],
  data () {
    return {
      btnStep2Disabled: false,
      validFormEmail: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      amountRules: [
        v => !!v || 'Field is required',
        v => Number.isInteger(Number(v)) || 'Only numbers',
        v => Number(v) > 0 || 'The amount should not less 1 Ven'
      ],
      requiredRules: [
        v => !!v || 'Field is required'
      ],
      search: '',
      tabs: 0,
      e1: 1,
      form: {
        user: {
          email: ''
        },
        amount: 50,
        message: ''
      }
    }
  },
  watch: {
    search () {
      this.tabs = 1
    }
  },
  methods: {
    complete () {
      this.callback(this.form)
    }
  }
}
</script>

<style scoped>
  .v-stepper__content {
    padding: 0!important;
  }
</style>
