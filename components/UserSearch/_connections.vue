<template>
  <div>
    <v-list subheader>
      <v-subheader v-text="answer"></v-subheader>
      <v-list-tile
        v-for="user in users"
        :key="user.id"
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
  </div>
</template>

<script>
// import axios from 'axios'
import debounce from 'lodash/debounce'

export default {
  props: {
    question: {
      required: true
    }
  },
  data () {
    return {
      answer: 'Start typing a name in the search bar',
      users: []
    }
  },
  watch: {
    question: function (newQuestion, oldQuestion) {
      this.answer = 'I\'m waiting for you to finish typing...'
      this.debouncedGetAnswer()
    }
  },
  methods: {
    getAnswer: function () {
      if (this.question.length < 3) {
        this.answer = 'Enter more than 3 characters'
        return
      }
      this.answer = 'Search...'
      var options = {
        params: {
          search: this.question
        }
      }
      this.$axios.get('/users/search', options).then((response) => {
        this.answer = 'Found'
        this.users = response.data.data
      }).catch((error) => {
        this.users = []
        if (error.response.status === 400) {
          this.answer = 'Only available to authorized users'
          return
        }
        this.answer = error.response.data.errors[0]
      })
    }
  },
  created () {
    this.debouncedGetAnswer = debounce(this.getAnswer, 1000)
  }

}
</script>
