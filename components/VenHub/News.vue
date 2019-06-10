<template>
  <div>
    <v-hover >
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto min-height"
        itemscope 
        :itemtype="`http://schema.org/${itemtype}`"
      >
        <v-img @click="showModal(post)"
          :aspect-ratio="1.2"
          :src="image"
          class="pointer"
        >
          <v-container
            fill-height
            fluid
            pa-2
          >
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <v-btn>{{itemtype}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title primary-title>
          <div @click="showModal(post)" class="pointer cut-text" itemprop="name" v-text="title"></div>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions>
        </v-card-actions>
          <v-slide-y-transition>
          <v-card-text itemprop="description" v-show="show" v-html="description"></v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    itemtype: {
      type: String,
      required: true,
    },
    post: {
      type: Object,
      required: true
    },
    title: {
      type: String
    },
    image: {
      type: String
    },
    description: {
      type: String
    },
    showModal: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
