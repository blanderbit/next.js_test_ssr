<template>
  <v-container fluid grid-list-sm>
    <v-layout justify-center row wrap fill-height>
    
      <v-flex xs12 sm6 md4 lg3 v-for="partner in partners" :key="partner.id">
        <v-hover >
          <v-card
            height="100%"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-img
              :aspect-ratio="1.4"
              :src="partner.backgroundimg"
            ></v-img>
            <v-card-title>
              <div class="headline" v-text="partner.title"></div>
              <div v-text="partner.description"></div>
              <v-spacer></v-spacer>
              <v-btn
                slot="activator"
                dark
                icon
                @click="redirect(partner.link)"
              >
                <v-icon>mdi-link-variant</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>

      
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async asyncData ({ store }) {
    return Promise.all([
      store.dispatch("fetchPartners")
    ])
  },
  computed: {
    ...mapState([
      'partners'
    ])
  },
  methods: {
    redirect (link) {
      window.open(link, '_blank')
    }
  }
}
</script>
