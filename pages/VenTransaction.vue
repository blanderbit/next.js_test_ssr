<template>
  <div class="text-xs-center">
    <v-container>
      <v-layout justify-center row wrap>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="transactions"
            :pagination.sync="pagination"
            :total-items="transactionsTotal"
            :loading="loading"
            :must-sort="true"
            :rows-per-page-items="[5, 10, 25]"
            class="elevation-1"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded" class="pointer">
                <td v-if="props.item.from == $store.state.user.id">
                  <v-icon color="red">mdi-arrow-down-bold-circle</v-icon>
                </td>
                <td v-else>
                  <v-icon color="green">mdi-arrow-up-bold-circle</v-icon>
                </td>
                <td v-text="Number(props.item.to) > 0 ? props.item.user_to.name : 'You'"></td>
                <td v-text="Number(props.item.from) > 0 ? props.item.user_from.name : 'You'"></td>
                <td class="text-xs-right">{{ props.item.amount }} Ven</td>
                <td class="text-xs-right" v-text="props.item.timestamp"></td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text v-text="props.item.message"></v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  head: {
    title: 'My transactions'
  },
  data () {
    return {
      dateFrom: null,
      dateTo: null,
      menu2: null,
      menu3: null,
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {
        rowsPerPage: 10,
        sortBy: 'timestamp',
        descending: true
      },
      headers: [
        { text: '№', sortable: false, value: 'id' },
        { text: 'To', align: 'left', sortable: true, value: 'to' },
        { text: 'From', align: 'left', sortable: true, value: 'from' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'timestamp', sortable: true }
      ],
      transactions: [],
      transactionsTotal: 0
    }
  },
  watch: {
    dateFrom: function (val) {
      this.fetchTransactions()
        .then(data => {
          this.transactions = data.items
          this.transactionsTotal = data.total
        })
    },
    dateTo: function (val) {
      this.fetchTransactions()
        .then(data => {
          this.transactions = data.items
          this.transactionsTotal = data.total
        })
    },
    pagination: {
      handler () {
        this.fetchTransactions()
          .then(data => {
            this.transactions = data.items
            this.transactionsTotal = data.total
          })
      },
      deep: true
    }
  },
  mounted () {
    this.fetchTransactions()
      .then(data => {
        this.transactions = data.items
        this.transactionsTotal = data.total
      })
  },
  methods: {
    async fetchTransactions () {
      this.loading = true
      this.$store.dispatch('loading', true)
      return new Promise((resolve, reject) => {
        const { sortBy, descending } = this.pagination
        this.getTransactions(this.pagination).then(items => {
          const total = items.total
          items = items.data

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = sortBy === 'amount' ? Number(a[sortBy]) : a[sortBy]
              const sortB = sortBy === 'amount' ? Number(b[sortBy]) : b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          this.loading = false
          this.$store.dispatch('loading', false)
          resolve({
            items,
            total
          })
        })
      })
    },

    async getTransactions (params) {
      if (this.dateFrom) {
        params.dateFrom = this.dateFrom
      }
      if (this.dateTo) {
        params.dateTo = this.dateTo
      }
      params.offset = (params.page - 1) * params.rowsPerPage
      params.limit = params.rowsPerPage
      let transactions = await this.$axios.get('/transactions', {params})
      return {data: transactions.data.data.items, total: transactions.data.data.total}
    }
  }
}
</script>
