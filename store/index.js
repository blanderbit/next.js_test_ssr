export const state = () => ({
  loading: false,
  loginModal: false,
  venhub: [],
  partners: [],
  products: [],
  user: {
    name: '',
  },
  snackbar: {
    model: false,
    timeout: 1000,
    color: 'success',
    text: ''
  },
  basket: [],
  drawer: {
    left: false,
    right: false
  },
  env: {}
})