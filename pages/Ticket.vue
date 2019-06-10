<template>
  <v-layout>
    <v-container>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="mx-auto"
          color=""
          max-width="600"
        >
          <v-img
            :aspect-ratio="13/9"
            src="https://s3.amazonaws.com/hc-items-medium/d6d424764cb800827ad612a1bea4c360/VenWorld-1.jpg"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                style="height: 100%;"
              >
                1,510.97 Ven
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-4"
            style="position: relative;"
          >
            <v-btn
              absolute
              color="primary"
              class="white--text zero-index"
              fab
              large
              right
              top
              @click="addToBasket"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text title mb-2">Ticket: Ven World <span class="white--text">(1,510.97 Ven)</span></div>
            <h3 class="display-1 font-weight-light orange--text mb-2">Ven World</h3>
            <div class="font-weight-light mb-2">
              <p>Get your ticket for Ven World - an Annual Meeting bringing together key stakeholders and community members to discuss technology developments and future projects related to Ven.</p>

              <p>Come and help us continue to scale the world's longest running, most stable and environmentally progressive digital currency.</p>

              <p>Don't miss it!</p>

              <p>15 October - 9.00am - 5.00pm</p>

              <p>Hub Culture @ The Fairmont Hamilton Princess, Bermuda</p>

              <p>This ticket admits one person to Ven World, access and online materials, breakfast networking, lunch and evening closing reception.</p>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-container>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    addToBasket () {
      // this.$store.dispatch('loading', true)
      this.$axios.post('/store/pavilion/7/item/1111').then(() => {
        this.$store.dispatch('fetchBasket')
        // this.$store.dispatch('loading', false)
        // this.$store.dispatch('snackbar', {text: 'Ticket added to cart'})
        this.$router.push({name: 'Basket'})
      })
    }
  }
}
</script>


<style scoped>
.zero-index {
  z-index: 0;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>