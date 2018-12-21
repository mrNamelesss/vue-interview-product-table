import Vue from 'vue'
import Vuex from 'vuex'
import mockedProducts from '@/mocks/products.json'


Vue.use(Vuex)





/**
 * STATE
 */
const state = {
  
  rawProducts: [],

}
/**
 * /STATE
 */

 
/**
 * GETTERS
 */
const getters = {
  rawProducts: (state) => state.rawProducts,
  getRawProductById: (getters) => (id) => getters.rawProducts.find(rawProduct => rawProduct.id === +id),
}
/**
 * /GETTERS
 */


/**
 * MUTATIONS
 */
const mutations = {
  ['fillRawProducts']: (state, rawProducts) => state.rawProducts = rawProducts,
  // ['pushRawProduct']: (state, newRawProduct) => state.rawProducts.push(newRawProduct),
  ['replaceRawProduct']: (state, updatedRawProduct) => state.rawProducts.splice(state.rawProducts.findIndex(rawProduct => rawProduct.id === updatedRawProduct.id), 1, updatedRawProduct),
  ['removeRawProductById']: (state, rawProductId) => state.rawProducts.splice(state.rawProducts.findIndex(rawProduct => rawProduct.id === rawProductId), 1),
  ['addNedRawProduct']: (state, newRawProduct) => {
    let largestId = -1
    state.rawProducts.forEach(rawProduct => {
      if (rawProduct.id > largestId) largestId = rawProduct.id
    })
    state.rawProducts.push({ ...newRawProduct, id: largestId + 1 })
  },
  
}
/**
 * /MUTATIONS
 */


/**
 * ACTIONS
 */
const actions = {

  initialize({ getters, commit, dispatch }) {
    return dispatch('pullAndFillRawProducts')
  },

  pullAndFillRawProducts({ getters, commit, dispatch }) {
    // if local storage is empty => import mocked data
    return new Promise((resolve, reject) => {
      dispatch('pullAndFillRawProductsFromLocalStorage').then(resolve)
        .catch(() => {
          dispatch('pullAndFillRawProductsFromMock').then(resolve)
        })
    })
  },

  pullAndFillRawProductsFromLocalStorage({ getters, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        const lsProducts = JSON.parse(localStorage.getItem('vidaProducts'))
        if (!lsProducts) return reject()
        commit('fillRawProducts', lsProducts)
        return resolve()
      } catch(e) {
        return reject()
      }
    })
  },


  pullAndFillRawProductsFromMock({ getters, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('fillRawProducts', JSON.parse(JSON.stringify(mockedProducts)))
      return dispatch('saveRawProductsToLocalStorage')
    })
  },

  saveRawProductsToLocalStorage({ getters, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('vidaProducts', JSON.stringify(getters.rawProducts))
        return resolve()
      } catch(e) {
        return reject()
      }
    })
  },

}
/**
 * /ACTIONS
 */





// const strict = process.env.NODE_ENV !== 'production'
const strict = false


export default new Vuex.Store({ 
  strict, 
  state, 
  mutations, 
  getters, 
  actions 
})
