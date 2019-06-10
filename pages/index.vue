<template>
<v-content class="test" id="zero" itemscope itemtype="http://schema.org/WebPage">
      <section>
        <v-parallax src="/images/hubid-background.png" height="600">
          <v-layout justify-center>
            <v-btn
              @click="$router.push({name: 'VenHub'})"
              class="lighten-2" 
              color="#203956" 
              large
              dark 
            >Ven Hub</v-btn>
          </v-layout>
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="/images/ven-lion-virtual-currency-grey.57e12d29.png" height="100">
            <h1 itemprop="name" class="white--text mb-2 display-1 text-xs-center">Ticket: Ven World</h1>
            <div class="subheading mb-3 text-xs-center">15 October - 9.00am - 5.00pm</div>
            <v-btn
              v-if="!user.name"
              class="blue lighten-2 mt-5"
              dark
              large
              @click="dialogLoginOrRegister = true"
            >
              Start now
            </v-btn>
            <v-btn
              v-else
              class="blue lighten-2 mt-5"
              dark
              large
              @click="$router.push({name: 'Ticket'})"
            >
              Buy ticket
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section id="first">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Ven values nature</h2>

              <span class="subheading">
                Ven is secure
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout wrap row align-space-around justify-space-around>
                <v-flex xs12 md4>
                  <v-hover>
                    <v-card :class="`elevation-${hover ? 20 : 2}`" class="transparent resultContainer" slot-scope="{ hover }">
                      <v-card-text class="text-xs-center" itemscope itemtype="http://schema.org/WebPageElement">
                        <img itemprop="image" src="/images/bank.png">
                        <!-- <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon> -->
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center" itemprop="name">Ven is stable</div>
                      </v-card-title>
                      <v-card-text itemprop="description">
                        The value of Ven is determined by the financial markets in a weighted basket of currencies, commodities and carbon futures trading at floating exchange rates. Stability makes Ven an excellent price tool for contracts in financial markets, and a good long-term store of value for people everywhere.
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-flex>
                <v-flex xs12 md4>
                  <v-hover>
                    <v-card :class="`elevation-${hover ? 20 : 2}`" slot-scope="{ hover }" class="transparent resultContainer" itemscope itemtype="http://schema.org/WebPageElement">
                      <v-card-text class="text-xs-center">
                        <img itemprop="image" src="/images/globe.png">
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline" itemprop="name">Ven is global</div>
                      </v-card-title>
                      <v-card-text itemprop="description">
                        Ven is used to purchase anything within the Hub Culture network, and is accepted at Hub Culture Pavilions, but is mostly exchanged directly between people all around the world. Regulated Authorities and exchanges like Kraken and LMAX trade Ven professionally - with over half a billion a year moving through the financial markets. 
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-flex>
                <v-flex xs12 md4>
                  <v-hover>
                    <v-card :class="`elevation-${hover ? 20 : 2}`" slot-scope="{ hover }" class="transparent resultContainer" itemscope itemtype="http://schema.org/WebPageElement">
                      <v-card-text class="text-xs-center">
                        <img itemprop="image" src="/images/green.png">
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center" itemprop="name">Ven is green</div>
                      </v-card-title>
                      <v-card-text itemprop="description">
                        The value of Ven includes carbon futures, so the more Ven in circulation, the more carbon assets held in reserve by Hub Culture. As Ven grows, so do abilities to fund environmental protection, with over 25,000 acres of Amazon rainforest protected so far.
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id="second">
        <v-parallax src="/images/bcg.jpg">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center" itemprop="description">This ticket admits one person to Ven World, access and online materials, breakfast networking, lunch and evening closing reception.</div>
            <em>Kick-start to buy a ticket</em>
            <v-btn
              v-if="!user.name"
              class="blue lighten-2 mt-5"
              dark
              large
              @click="dialogLoginOrRegister = true"
            >
              Start now
            </v-btn>
            <v-btn
              v-else
              class="blue lighten-2 mt-5"
              dark
              large
              @click="$router.push({name: 'Ticket'})"
            >
              Buy ticket
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section id="three">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent" itemscope itemtype="http://schema.org/WebPageElement">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline" itemprop="name">Ven is a global digital currency</div>
                </v-card-title>
                <v-card-text itemprop="description">
                  Ven is a global digital currency managed by the Hub Culture network. Ven is convenient to use and can be sent to anyone, anywhere with instant clearance. It is also great for the environment, featuring carbon as an underlying component. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Contact details for Hub Culture services, executives and offices around the world.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>+1 (844) 482-2858</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Hamilton, Bermuda</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">mdi-twitter</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>@hubculture @vencurrency</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    <v-dialog
      v-model="dialogLoginOrRegister"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">HubID</v-card-title>

        <v-card-text>
          Do you have a HubID account?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            @click="$router.push({name: 'Register'})"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            @click="LOGIN_MODAL(true), dialogLoginOrRegister = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-content>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  // async asyncData ({ store }) {
  //   let {data} = await axios.get('https://id.hubculture.com/projects')
  //   store.commit('SAVE_PRODUCTS', data.data)
  // },
  head: {
    title: 'Ven world'
  },
  data () {
    return {
      dialogLoginOrRegister: false
    }
  },
  computed: mapState([
    'user'
  ]),
  methods: {
    ...mapMutations([
      'LOGIN_MODAL'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.max-width {
  max-width: 50px;
}
.resultContainer {
  min-height: 450px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.test {
  padding: 0 !important;
}
</style>
