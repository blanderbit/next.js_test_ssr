<template>
  <div>
    <v-text-field
      v-if="date2"
      readonly
      label="Date of birth"
      v-model="date2"
      box
      :disabled="disabled"
      @click:append="clear"
      append-icon="mdi-close-circle"
    ></v-text-field>

    <v-form v-model="valid">
      <v-text-field
        v-if="(!year || !valid) && !date2"
        :counter="4"
        label="Year of birth"
        v-model="year"
        hint="For example: 1978"
        :rules="rules.year"
        box
        required
      ></v-text-field>
    </v-form>

    <v-dialog
      v-if="valid"
      ref="dialog"
      v-model="modal"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-date-picker 
        v-model="showCurrent"
      ></v-date-picker>
    </v-dialog>

  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: false,
      modal: false,
      date2: this.date,
      year: '',
      rules: {
        year: [
          val => (val || '').length > 0 || 'This field is required',
          val => Number(val) > 1949 || 'Minimum year 1949',
          val => Number(val) < 2010 || 'Maximum year 2010'
        ]
      }
    }
  },
  computed: {
    showCurrent: {
      set (val) {
        this.date2 = val
        this.$emit('date-update', val)
      },
      get () {
        return `${this.year}`
      }
    }
  },
  methods: {
    clear () {
      this.date2 = ''
      this.year = ''
      this.$emit('date-update', '')
    }
  },
  watch: {
    date2 (val) {
      if (val) {
        this.$emit('date-update', val)
        this.modal = false
      }
    },
    valid (val) {
      if (!this.date2 && val && this.year) {
        this.modal = true
      }
    }
  }
}
</script>
