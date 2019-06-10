<template>
  <v-form v-model="valid">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <field label="City" :value="form.city" :disabled="disabled" @update="form.city = $event" :rules="nameRules"></field>
      </v-flex>
      <v-flex xs12 sm6>
        <field label="Street Address" :value="form.streetAdress" :disabled="disabled" @update="form.streetAdress = $event" :rules="nameRules"></field>
      </v-flex>
      <v-flex xs12 sm6>
        <field label="Postal Code" :value="form.postalCode" :disabled="disabled" @update="form.postalCode = $event" :rules="nameRules"></field>
      </v-flex>
      <v-flex xs12 sm6>
        <field label="House Number" :value="form.houseNumber" :disabled="disabled" @update="form.houseNumber = $event" :rules="nameRules"></field>
      </v-flex>
      <v-flex xs12 sm6>
        <date-of-birth :date="form.dateOfBirth" :disabled="disabled" @date-update="form.dateOfBirth = $event"></date-of-birth>
      </v-flex>
      <v-flex xs12 sm6>
        <field label="Phone number" :value="form.telephoneNumber" :disabled="disabled" @update="form.telephoneNumber = $event" :rules="mobileRules"></field>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          box
          :disabled="disabled"
          v-model="form.countryCode2"
          :items="countries"
          :filter="customFilter"
          :rules="requiredRules"
          item-value="alpha2Code"
          color="white"
          item-text="name"
          label="State"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
// import axios from 'axios'
import Field from '@/components/FormBuy/Field'
import DateOfBirth from '@/components/DateOfBirth'

export default {
  components: {
    Field, DateOfBirth
  },
  props: {
    values: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    form: {
      set () {
        this.$emit('update', this.form)
      },
      get () {
        return this.values
      }
    }
  },
  data () {
    return {
      valid: false,
      countries: [],
      requiredRules: [
        v => !!v || 'Required'
      ],
      nameRules: [
        v => !!v || 'Required',
        v => v.length <= 35 || 'Not more than 35 characters'
      ],
      mobileRules: [
        v => !!v || 'Required',
        v => Number.isInteger(Number(v)) || 'Only number',
        v => Number(v) > 0 || 'Wrong format'
      ]
    }
  },
  methods: {
    fetchCountries () {
      this.$axios.get('/country/list').then(response => {
        this.countries = response.data.data
      })
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.alpha2Code.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    }
  },
  created () {
    this.fetchCountries()
  },
  watch: {
    valid: function (val) {
      this.$emit('validate', val)
    }
  }
}
</script>
