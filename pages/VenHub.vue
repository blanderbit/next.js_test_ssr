<template>
  <v-container fluid grid-list-sm>
    <v-layout justify-center row wrap>

      <v-flex xs12 sm6 md4 lg3 v-for="post in news" :key="`news_${post.id}`">
        <news 
          :post="post"
          :title="post.title"
          :image="post.screen"
          :description="post.summary"
          :showModal="showNews"
          itemtype="News"
        />
      </v-flex>
      
      <v-flex v-if="news" xs12 class="text-center">
        <v-btn
          @click="newsPage += 1"
          slot="activator"
          color="#424242"
          dark
        >
          Load more ({{ news.length }} / {{ venhub.news.length }})
        </v-btn>
      </v-flex>



      <v-flex xs12 sm6 md4 lg3 v-for="video in videos" :key="`video_${video.id}`">
        <news 
          :post="video"
          :title="video.title"
          :image="video.raw_thumb"
          :description="video.caption"
          :showModal="showVideo"
          itemtype="Movie"
        />
      </v-flex>
      
      <v-flex v-if="videos" xs12 class="text-center">
        <v-btn
          @click="videoPage += 1"
          slot="activator"
          color="#424242"
          dark
        >
          Load more ({{ videos.length }} / {{ venhub.video.length }})
        </v-btn>
      </v-flex>

      <v-dialog
        v-model="dialog.show"
        width="900"
      >
        <v-card>
          <v-card-title
            class="headline lighten-2"
            primary-title
            v-text="dialog.title"
          ></v-card-title>

          <v-card-text v-html="dialog.text"></v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="dialog.show = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import News from '~/components/VenHub/News.vue'

export default {
  async asyncData ({ store }) {
    return Promise.all([
      store.dispatch("fetchVenHub")
    ])
  },
  head: {
    title: 'Ven Hub'
  },
  components: {
    News
  },
  data () {
    return {
      dialog: {
        show: false,
        title: ''
      },
      newsPage: 1,
      videoPage: 1
    }
  },
  computed: {
    ...mapState([
      'venhub'
    ]),
    itemForPage: function () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 3
        case 'sm': return 2
        case 'md': return 3
        case 'lg': return 4
        case 'xl': return 4
      }
    },
    news: function () {
      return this.venhub.news.slice(0, this.newsPage * this.itemForPage)
    },
    videos: function () {
      return this.venhub.video.slice(0, this.videoPage * this.itemForPage)
    }
  },
  methods: {
    showVideo (video) {
      this.dialog.title = video.title
      this.dialog.text = '<iframe width="600" height="443" src="//youtube.com/embed/' + video.video_id + '?showinfo=0&controls=2&modestbranding=1" allowfullscreen></iframe>'
      this.dialog.show = true
    },
    showNews (news) {
      this.dialog.title = news.title
      this.dialog.text = news.content_attach
      this.dialog.show = true
    },
  },
}
</script>

<style scoped>
  .cut-text {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 80%;
    white-space: nowrap;
  }
  /* .min-height {
    min-height: 250px;
  } */
</style>
