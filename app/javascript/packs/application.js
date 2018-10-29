import Vue from 'vue'
import Painel from '../painel.vue'

document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: "#vue",
    render: h => h(Painel)
    
  })

})
