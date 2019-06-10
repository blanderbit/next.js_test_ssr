export default {

  updateLeftDrawer (state, value) {
    state.drawer.left = value
  },

  LOGIN_MODAL (state, value) {
    state.loginModal = value
  },

  SAVE_BASKET (state, value) {
    state.basket = value
  },

  UPDATE_RIGHT_DRAWER (state, value) {
    state.drawer.right = value
  },

  SAVE_VEN_HUB (state, venhub) {
    state.venhub = venhub
  },

  SAVE_PRODUCTS (state, products) {
    state.products = products
  },

  SAVE_USER (state, user) {
    state.user = user
  },

  SAVE_PARTNERS (state, partners) {
    state.partners = partners
  },

  SNACKBAR (state, snackbar) {
    state.snackbar = snackbar
  },

  SNACKBAR_DISABLE (state) {
    state.snackbar.model = false
  },

  SAVE_ENV (state, env) {
    state.env = env
  },

  LOADING (state, isLoading) {
    state.loading = isLoading
  },
  
}