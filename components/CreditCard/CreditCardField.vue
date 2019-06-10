<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-card class="form-container">
        <!-- <card
          v-model="cardDetail"
          :invert-card.sync="invertedCard"
          format-data
        >

        </card> -->
        <v-card-title primary-title>
          <v-form v-model="valid">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Card number"
                  mask="credit-card"
                  :rules="numberRules"
                  v-model="cardDetail.number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Holder name"
                  :rules="requiredRules"
                  v-model="cardDetail.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="MM/YY"
                  name="expiry"
                  :rules="expiryRules"
                  v-model="cardDetail.expiry"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  type="password"
                  label="CVC"
                  name="cvc"
                  :rules="cvcRules"
                  v-model="cardDetail.cvc"
                  @focus="invertedCard = true"
                  @blur="invertedCard = false"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-title>
      </v-card>

    </v-layout>
  </v-container>
</template>

<script>
// import Card from './Card'
import Payment from 'payment/lib'

export default {
  name: 'card-example',

  components: {
    // Card
  },

  props: [
    'card'
  ],
  // computed: {
  //   cardDetail: function () {
  //     return this.card
  //   }
  // },

  data () {
    return {
      valid: false,
      cardDetail: this.card,
      invertedCard: false,
      requiredRules: [
        v => !!v || 'Required'
      ],
      numberRules: [
        v => !!v || 'Required',
        v => Payment.fns.validateCardNumber(v) || 'Invalid card number'
      ],
      expiryRules: [
        v => !!v || 'Required',
        v => Payment.fns.validateCardExpiry(v) || 'Invalid card MM/YY'
      ],
      cvcRules: [
        v => !!v || 'Required',
        v => Payment.fns.validateCardCVC(v) || 'Invalid card CVV'
      ]
    }
  },

  watch: {
    'cardDetail.number': function () {
      this.$emit('update-card', {card: this.cardDetail, valid: this.valid})
    },
    'cardDetail.name': function () {
      this.$emit('update-card', {card: this.cardDetail, valid: this.valid})
    },
    'cardDetail.expiry': function () {
      this.$emit('update-card', {card: this.cardDetail, valid: this.valid})
    },
    'cardDetail.cvc': function () {
      this.$emit('update-card', {card: this.cardDetail, valid: this.valid})
    },
    valid: function () {
      this.$emit('update-card', {card: this.cardDetail, valid: this.valid})
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-container {
    border-radius: 10px;
    max-width: 350px;
  }
</style>
