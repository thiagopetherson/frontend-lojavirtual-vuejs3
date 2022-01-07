import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      console.log(products)
      state.products = products
    },
    loadBag (state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      let updatedBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updatedBag     
    },
  },
  actions: {

    loadProducts ({ commit }) {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    loadBag({ commit }) {
      
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
      
    },
    addToBag ({ commit }, product) {
      commit('addToBag', product)
    },
    removeFromBag ({ commit }, productId) {
      if (confirm('Você quer remover este item do carrinho ?')) {
        commit('removeFromBag', productId)
      }      
    }

  },
  modules: {
  }
})
