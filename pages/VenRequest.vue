<template>
  <div>
    <user-search
      :callback="requestVen"
      completeBtnName="Request"
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
    requestVen (data) {
      this.$store.dispatch('loading', true)
      this.$axios.post('/v2/transactions/request', {
        user: data.user.id,
        amount: data.amount,
        message: data.message
      }).then(response => {
        this.$store.dispatch('loading', false)
        this.$store.dispatch('snackbar', { text: data.amount + ' Ven is requested' })
        this.$router.go(-1)
      }).catch(error => {
        this.$store.dispatch('loading', false)
        this.$store.dispatch('snackbar', {text: error.response.data.errors[0], color: 'error'})
      })
    }
  }
}
</script>
