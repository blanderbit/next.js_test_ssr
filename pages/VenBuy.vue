<template>
<v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 md9>
      <v-stepper v-model="e1" v-if="user.name">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Ven</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Payment</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">Data</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4">CreditCard</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5">Checking</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-text>
                <v-form v-model="validStep1">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        v-model="form.ven"
                        :rules="amountRules"
                        label="Count Ven"
                        required
                        box
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="currencyLoaded">
                      <div class="text-xs-center">
                          <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                      </div>
                    </v-flex>
                    <v-flex xs12 sm5 v-for="(currency, i) in currencies" :key="i" class="currencies">
                      <v-text-field
                        class="input-calculator"
                        :value="currency * form.ven * 100 / 100"
                        :prefix="i"
                        v-on:change="form.ven = 1 / currency * 100 / 100 * $event"
                      />
                      <div class="ven">
                      </div>
                      <div class="currency" style="margin-left: 10px">
                        1 {{ i }} = {{ 1 / currency * 100 / 100 }} Ven
                      </div>
                    </v-flex>

                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat @click="$router.go(-1)"><v-icon left dark>mdi-cancel</v-icon> Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!validStep1"
                  color="primary"
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>

              </v-card-actions>
              
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">

            <v-container fluid grid-list-sm>
              <v-layout align-center justify-space-between row wrap fill-height>
              
                <v-flex xs6 sm3 md3 lg2>
                  <v-hover >
                    <v-card
                      
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 12 : 2}`"
                      class="mx-auto min-height"
                    >
                      <v-img
                        class="pointer"
                        @click="paypal"
                        :src="`ssssss/images/paypal_new.png`"
                        aspect-ratio="1.7"
                        contain
                      ></v-img>
                      <v-card-title>
                        PayPal
                      </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>
              
                <v-flex xs6 sm3 md3 lg3>
                  <v-hover >
                    <v-card
                      
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 12 : 2}`"
                      class="mx-auto min-height"
                    >
                      <v-img
                        class="pointer"
                        @click="$router.push({name: 'CryptocurrencyBuy', params: {ven: form.ven}})"
                        :src="`baseURL/images/cryptocurrency.jpg`"
                        aspect-ratio="1.7"
                        contain
                      ></v-img>
                      <v-card-title>
                        Сryptocurrency
                      </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>

                <v-flex xs6 sm3 md3 lg2 v-for="payment in paymentmethods" :key="payment.id">
                  <v-hover >
                    <v-card
                      
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 12 : 2}`"
                      class="mx-auto min-height"
                    >
                      <v-img
                        class="pointer"
                        @click="e1 = 3, form.PaymentMethodId = payment.id, paymentCurrent = payment"
                        :src="payment.image_url"
                        aspect-ratio="1.7"
                        contain
                      ></v-img>
                      <v-card-title>
                        <div class="" v-text="payment.name"></div>
                      </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat @click="e1 = 1"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 1</v-btn>
                </v-flex>

                
              </v-layout>
            </v-container>

          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-card-text>
                <form-buy
                  :values="form"
                  @update="form = $event"
                  @validate="validStep3 = $event"
                ></form-buy>
              </v-card-text>
            </v-card>

            <v-card-actions>
              <v-btn flat @click="e1 = 2"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 2</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!validStep3 || !form.dateOfBirth"
                color="primary"
                @click="e1 = 4, checkingForm = true"
              >
                Continue
              </v-btn>

            </v-card-actions>

          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card>
              <credit-card 
                :card="{number: card.number, name: card.name, expiry: card.expiry, cvc: card.cvc}"
                v-on:update-card="cardUpdate($event)"
              ></credit-card>
            </v-card>
            <v-card-actions>
              <v-btn flat @click="e1 = 3"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 3</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!validStep4"
                color="primary"
                @click="e1 = 5"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card>
              <v-container>
                <!-- <card v-model="card"></card> -->
              </v-container>
              <v-card-text>

                <form-buy
                  v-if="checkingForm"
                  :values="form"
                  :disabled="true"
                  @update="form = $event"
                  @validate="validStep3 = $event"
                ></form-buy>

              </v-card-text>
            </v-card>

            <v-card-actions>
              <v-btn flat @click="e1 = 4" :disabled="btn.donatDisable"><v-icon left dark>mdi-arrow-left-bold-circle</v-icon> Step 4</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="donat"
                :disabled="btn.donatDisable"
              >
                Pay
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
import CreditCard from '@/components/CreditCard/CreditCardField'
// import Card from '@/components/CreditCard/Card'
import FormBuy from '@/components/FormBuy/FormBuy'

export default {
  components: {
    FormBuy, CreditCard
  },
  computed: {
    config: function () {
      return this.$store.state.config
    },
    user: function () {
      return this.$store.state.user
    },
    card: function () {
      return {
        number: this.form.cardNumber,
        name: this.form.cardHolder,
        expiry: this.form.cardExpirationDate,
        cvc: this.form.cardCCV
      }
    },
    forms: function () {
      return this.form
    }
  },
  data () {
    return {
      checkingForm: false,
      menu2: false,
      date: null,
      validStep1: false,
      validStep2: false,
      validStep3: false,
      validStep4: false,
      currencyLoaded: false,
      e1: 1,
      token: '',
      amountRules: [
        v => !!v || 'Required',
        v => Number(v) === +Number(v) || Number(v) !== (Number(v) | 0) || Number.isInteger(Number(v)) || 'Only numbers',
        v => Number(v) > 0 || 'The amount should not less than 1 Ven',
        v => Number(v) > 49 || 'Not less than 50 Ven'
      ],
      form: {
        ven: 50,
        PaymentMethodId: '',
        dateOfBirth: '',
        streetAdress: 'test',
        postalCode: '70252',
        houseNumber: '234',
        telephoneNumber: '5345345345',
        city: 'test',
        countryCode2: 'UA',
        cardNumber: '',
        cardHolder: '',
        cardExpirationDate: '',
        cardCCV: ''
      },
      btn: {
        donatDisable: false
      },
      currencies: [],
      currencyUSD: null,
      paymentmethods: [],
      paymentCurrent: {
        name: ''
      }
    }
  },
  methods: {
    paypal () {
      // window.open(process.env.hubUrl + '/api/auth/login/?access_token=65023e9706562b85b3ec90640bf95888078cc24e&user_id=' + this.user.id + '&token=' + this.token + '&callback_url=' + encodeURIComponent('/ven/topup?type=1&method=paypal&amount=' + this.form.ven), '_system', 'location=yes')
    },
    cardUpdate (data) {
      this.form.cardNumber = data.card.number
      this.form.cardHolder = data.card.name
      this.form.cardExpirationDate = data.card.expiry
      this.form.cardCCV = data.card.cvc
      this.validStep4 = data.valid
    },
    donat () {
      this.btn.donatDisable = true
      this.$store.dispatch('loading', true)
      this.$axios.post('/kalixa/send', this.form).then(response => {
        this.btn.donatDisable = false
        this.$store.dispatch('loading', false)
        this.$store.dispatch('snackbar', { text: 'You have successfully acquired ' + this.form.ven + ' Ven' })
        this.$router.push({ name: 'VenTransaction' })
        this.$axios.get('/user').then((response) => {
          this.$store.dispatch('setUser', response.data.data)
        })
      }).catch(error => {
        this.btn.donatDisable = false
        this.$store.dispatch('loading', false)
        this.$store.dispatch('errors', error.response.data.errors)
      })
    },
    fetchCurrencies () {
      this.currencyLoaded = true
      fetch('https://apilaravel.ven.vc/newrpc', {method: 'POST', body: '{"jsonrpc":"2.0","method":"listPrices","id":1}'})
      .then(response => {
        return response.json()
      }).then(json => {
        this.currencyLoaded = false
        this.currencies = json.result

        const ordered = {}
        ordered['USD'] = this.currencies['USD']
        Object.keys(this.currencies).sort().forEach((key) => {
          if (key === 'USD') {
            this.currencyUSD = this.currencies[key]
            return
          }
          ordered[key] = this.currencies[key]
        })
        this.currencies = ordered
      }).catch(error => {
        console.error('error', error.response)
      })
    },
    fetchMethods () {
      this.$axios.get('/kalixa/paymentmethods').then(response => {
        this.paymentmethods = response.data.data
      })
    },
    fetchToken () {
      this.$axios.get('/token').then(response => {
        this.token = response.data.data.token
      })
    }
  },
  created () {
    
    this.fetchMethods()
    this.fetchCurrencies()
    this.fetchToken()
  }
}
</script>

<style lang="scss">
  .input-calculator {
    .v-input__control {
      .v-input__slot {
        .v-text-field__slot {
          margin-left: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .min-height {
    min-height: 160px;
  }
  .payment {
    padding: 10px;
  }
  .currencies {
    background-color: rgba(47, 47, 47, 0.8);;
    padding: 15px 0px;
    border: 4px solid #424242;
    border-radius: 12px;
    // text-align: center;
    font-size: 12px;
    .currency {
      // background-color: aquamarine;
    }
    .ven {
      span {
        color: #67be96;
      }
      // background-color: burlywood;
    }
  }
</style>
