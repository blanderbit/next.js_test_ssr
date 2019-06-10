<template>
  <v-card>

    <v-card-text>
      <v-list subheader>
        <v-subheader>My friends</v-subheader>
        <v-list-tile
          v-for="user in friends"
          :key="`friend_${user.id}`"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="user.picture ? user.picture.thumbnail : 'https://s3.amazonaws.com/hc-profiles-thumb/i/user_default.gif'">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="user.name"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn small color="primary" :loading="user.loader" @click="$emit('choose-user', user)">choose</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card-text>

    <v-card-text class="text-center">
      <v-pagination
        v-model="friendsPage"
        :length="friendsTotal"
        :total-visible="13"
      ></v-pagination>
    </v-card-text>

  </v-card>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      friends: [],
      friendsTotal: 0,
      friendsPage: 1,
      friendsForPage: 10
    }
  },
  watch: {
    friendsPage (val) {
      this.fetchFriends(val)
    }
  },
  methods: {
    fetchFriends (page) {
      const offset = (page - 1) * this.friendsForPage
      // this.$store.dispatch('loading', true)
      this.$axios.get('/friends', {
        params: {
          limit: this.friendsForPage,
          offset: offset
        }
      }).then(response => {
        const data = response.data.data
        this.friendsTotal = Math.ceil(data.total / this.friendsForPage)
        this.friends = data.items
        // this.$store.dispatch('loading', false)
      })
    }
  },
  created () {
    this.fetchFriends(1)
  }
}
</script>
