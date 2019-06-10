<template>
  <div>
    <user-search
      :callback="sendVen"
      completeBtnName="Send"
    ></user-search>
  </div>
</template>

<script>
import UserSearch from '@/components/UserSearch/UserSearch'

export default {
  components: {
    UserSearch
  },
  methods: {
    sendVen (data) {
      // this.$store.dispatch('loading', true)
      let params = {
        amount: data.amount,
        email: data.user.email,
        message: data.message
      }
      this.$axios.post('/transactions', params).then(response => {
        // this.$store.dispatch('loading', false)
        this.$store.dispatch('snackbar', {text: 'The transaction was successful'})
        this.$axios.get('/user').then((response) => {
          this.$store.dispatch('setUser', response.data.data)
        })
        this.$router.go(-1)
      }).catch(error => {
        // this.$store.dispatch('loading', false)
        this.$store.dispatch('snackbar', {text: error.response.data.errors[0], color: 'error'})
      })
    }
  }
}
</script>
