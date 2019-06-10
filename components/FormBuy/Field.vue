<template>
  <div>
    <v-text-field
      v-model="model"
      :rules="rules"
      :disabled="disabled"
      :label="label"
      required
      box
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    model: function (val) {
      this.$emit('update', val)
    }
  }
}
</script>
