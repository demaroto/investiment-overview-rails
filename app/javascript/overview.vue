<template>
    <h3>Overview Component</h3>
</template>

<script>

import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import axios from 'axios'

Vue.use(VueNativeSock, 'wss://api2.poloniex.com', { 
	'Sec-WebSocket-Protocol': true,
	reconnection: true,
	format: 'json'
	 })
	 

	 	  var poloniex = new Vue()
	 	  var eventHub = new Vue()
	        var poloniexSocket = ""
	    
//Recupera o alvo atual
poloniex.$options.sockets.onopen = (event) => {
  poloniexSocket = event.currentTarget
  
};



//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (res) => {
	if (res.data == '[1010]'){ 
		//Estado ocioso
	}else{
    eventHub.$emit('updatePair', res)
	}

}
   

  
	 

	 
export default {

   data: function () {
    return {
   
    }
  },
  created:function() {
    
    
  },
  mounted: function(){
     var vm = this;
     console.log(poloniex)
    
      //Envia para o ActionCable
     //App.poloniex.ticker(eventHub.pairs)

/*
  //Get pairs from poloniex
  axios
      .get('https://poloniex.com/public?command=returnTicker')
      .then(response => {
        this.poloniex_erro = false
        this.poloniex_info = response.data
          }).catch(erro => {
        this.poloniex_erro = true
      })
      */
  
  },
  updated:function() {

  },
  methods:{
    

    }
}

</script>
