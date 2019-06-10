<template>
  <v-footer
    height="auto"
    grid-list-xl
     itemscope itemtype="http://schema.org/SiteNavigationElement"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex xs6 sm3 md2
        v-for="(link, i) in links"
        :key="`links_${i}_${link.name}`"
        itemprop="name"
      >
        <v-btn
          color="white"
          @click="redirect(link)"
          flat
          round
          itemprop="url"
        >
          {{ link.title }}
        </v-btn>
      </v-flex>
      <v-flex
        primary
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2019 — <strong>Ven.world</strong>
      </v-flex>
    </v-layout>
  </v-footer>

</template>

<script>
export default {
  data () {
    return {
      links: [
        {title: 'Home', name: 'index'},
        {title: 'About Us', name: 'About', link: 'https://hubculture.com/aboutus/'},
        {title: 'Help', name: 'Help', link: 'https://hubculture.com/help/'},
        {title: 'Privacy', name: 'Dev', link: 'https://hubculture.com/privacy/'},
        {title: 'API', name: 'Dev', link: 'https://api.hubculture.com/'},
        {title: 'Investor Centre', name: 'Dev', link: 'https://hubculture.com/investors/'}
      ]
    }
  },
  methods: {
    redirect (item) {
      if (!item.link) {
        this.$router.push({name: item.name})
      } else {
        window.open(item.link, '_blank')
      }
    }
  }
}
</script>
