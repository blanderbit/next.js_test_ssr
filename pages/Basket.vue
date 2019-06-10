<template>
  <v-container fluid grid-list-sm>
    <v-layout align-center justify-space-between row wrap>

      <!-- <v-flex xs5 v-for="item in items" :key="item.id">
        <div class="subheading" v-text="item.item_info.name"></div>
        <v-img :src="item.item_info.image.main" aspect-ratio="1.4" contain></v-img>
      </v-flex> -->

      <v-flex xs12 sm5 md4 lg3 v-for="item in basket" :key="item.id">
        <v-hover >
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-img
              :aspect-ratio="1.4"
              :src="item.item_info.image.main"
            ></v-img>
            <v-card-title>
              <div>
                <span class="headline">
                  <!-- <v-badge color="green"> -->
                      <!-- <span slot="badge" v-text="item.quantity"></span> -->
                    <span>{{item.item_info.name}}</span>
                  <!-- </v-badge> -->
                </span>
                <div class="d-flex">
                  <v-chip color="teal" text-color="white">
                    {{ item.item_info.currency_value }} {{item.item_info.currency_code}}&nbsp;
                    <span>({{ (new Intl.NumberFormat().format(item.item_info.currency_value * item.quantity)) }} {{item.item_info.currency_code}})</span>
                  </v-chip>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-menu bottom right transition="scale-transition">
                <v-btn
                  slot="activator"
                  dark
                  icon
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list>
                  <v-list-tile
                    @click="removeBasket(item)"
                    color="red"
                  >
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12 v-if="basket.length">
        <a v-if="token" class="v-btn primary" color="primary" :href="linkCheckout" target="_blank">Checkout</a>
      </v-flex>
      <v-flex v-else>
        <v-alert
          :value="true"
          type="warning"
          outline
        >
          Your basket is empty
        </v-alert>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head: {
    title: 'Basket'
  },
  computed: {
    ...mapState([
      'basket'
    ]),
    linkCheckout () {
      if (!this.token) {
        return null
      }
      return process.env.hubUrl + '/api/auth/login/?access_token=65023e9706562b85b3ec90640bf95888078cc24e&user_id=' + this.$store.state.user.id + '&token=' + this.token + '&callback_url=/store/basket/index/'
    }
  },
  data () {
    return {
      token: null
    }
  },
  methods: {
    removeBasket (item) {
      this.$axios.delete('/store/basket/item/' + item.item_info.id).then(response => {
        this.$store.dispatch('fetchBasket')
        // this.$store.dispatch('snackbar', {text: item.item_info.name + ' removed from the basket'})
      }).catch(error => {
        this.$store.dispatch('errors', error.response.data.errors)
      })
    },
    fetchToken () {
      this.$axios.get('/token').then(response => {
        // let token = response.data.data.token
        this.token = response.data.data.token
        // window.open('https://hubculture.com/api/auth/login/?access_token=65023e9706562b85b3ec90640bf95888078cc24e&user_id=' + this.$store.state.user.id + '&token=' + token + '&callback_url=/store/basket/index/', '_blank')
      })
    }
  },
  created () {
    this.fetchToken()
  }
}
</script>
