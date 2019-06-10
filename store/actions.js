const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

function getCookieToken (req) {
  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    try {
      return JSON.parse(parsed.auth).accessToken
    } catch (err) {
      return false
      // No valid cookie found
    }
  }
  return false
}

export default {

  async nuxtServerInit({ dispatch, commit }, { req }) {
    commit('SAVE_ENV', {
      baseUrl: process.env.baseURL,
      hubUrl: process.env.hubUrl,
    })

    const accessToken = getCookieToken(req)

    if (accessToken) {
      this.$axios.setToken(accessToken, 'Bearer')
      await dispatch('fetchAuthUser')
      await dispatch('fetchBasket')
    }
    // commit('setAuth', auth)
    await dispatch('fetchProducts')
  },

  async authorizeUser ({ dispatch }, credentials) {
    await this.$axios.post('/auth', credentials).then(res => {
      dispatch('authorizeByToken', res.data.data.token)
    }).catch(error => {
      reject("some message");
      // commit('SAVE_USER', error.response.data)
    })
  },


  loading ({ commit }, loading) {
    commit('LOADING', loading)
  },

  authorizeByToken ({ dispatch }, token) {
    const auth = {
      accessToken: token
    }
    Cookie.set('auth', auth)
    Cookie.set('token', token)
    this.$axios.setToken(auth.accessToken, 'Bearer')
    dispatch('fetchAuthUser')
    dispatch('fetchBasket')
  },

  logout ({ commit }) {
    Cookie.remove('auth')
    Cookie.remove('token')
    commit('SAVE_USER', {})
  },

  async fetchPartners ({ commit }) {
    await this.$axios.get('/partners/list').then(res => {
      commit('SAVE_PARTNERS', res.data.data)
    }).catch(err => {
      commit('SAVE_PARTNERS',[])
    })
  },

  async fetchVenHub ({ commit }) {
    await this.$axios.get('/v2/hub/237').then(res => {
      commit('SAVE_VEN_HUB', res.data.data)
    }).catch(err => {
      commit('SAVE_VEN_HUB',[])
    })
  },

  snackbar ({ commit }, snackbar) {
    snackbar.model = true
    commit('SNACKBAR', snackbar)
  },


  async fetchBasket ({ commit }) {
    await this.$axios.get('/v2/store/basket').then(res => {
      commit('SAVE_BASKET', res.data.data)
    }).catch(err => {
      commit('SAVE_BASKET',[])
    })
  },

  async fetchAuthUser({ commit, dispatch }) {
    await this.$axios.get('/user').then(res => {
      // dispatch('fetchBasket')
      commit('SAVE_USER', res.data.data)
    }).catch(error => {
      // dispatch('logout')
    })
    // commit('SAVE_USER', data.data)
  },

  async fetchProducts({ commit }) {
    const { data } = await this.$axios.get('/projects')
    commit('SAVE_PRODUCTS', data.data)
  }
}