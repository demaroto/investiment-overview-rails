<template>
  <div id="app" >

    <div class="col-lg-12">
      <div class="col-lg-6">
        <select v-model="channel" class="form-control">
          <option disabled value="">Escolha uma criptomoeda</option>
          <option v-for="(item, index) in poloniex_info" :value="{name: index, id: item.id}" :key="item.id">{{ index }}</option>
        </select>    
      </div>
      <div class="col-lg-6">
        <p>{{message}}</p>
      </div>
    </div>
    <div class="section">
      <!-- Component da Paridade Selecionada -->
    <div class="componentPair">
      <pair-component :pairCurrent="channel"></pair-component>
    </div>
    <!-- Tabela de acompanhamento -->
    <div class="tabela">
      

	  </div>
  </div>
  </div>
  

</template>

<script>

import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import axios from 'axios'
import PairComponent from './pair_selected'

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
   

  
	 
	 function showChannels(){
	   console.log(poloniexSocket);
	 }
	 
export default {
  name: 'PainelComponent',
  components:{
    PairComponent
  },
   data: function () {
    return {
      message: '',
      channel: '',
      command: '',
      pairs: [],
      subscriptions:[],
      quantidade: 0,
      poloniex_info: '',
      poloniex_erro: false
    }
  },
  created:function() {
    
    
  },
  mounted: function(){
     var vm = this;
    
      //Envia para o ActionCable
     //App.poloniex.ticker(eventHub.pairs)

  //Get pairs from poloniex
  axios
      .get('https://poloniex.com/public?command=returnTicker')
      .then(response => {
        this.poloniex_erro = false
        this.poloniex_info = response.data
          }).catch(erro => {
        this.poloniex_erro = true
      })
  
  },
  updated:function() {

  },
  methods:{
    	action: function(command, channel)  {
    	  //this.subscriptions.indexOf(channel)
    	  if(command == 'subscribe'){
    	    if(this.subscriptions.indexOf(channel) == -1){
    	    this.subscriptions.push(channel)
    	    this.message = 'New channel has added: '+channel+'.Waiting for data...'
    	    this.quantidade = this.quantidade + 1
    	    }
    	  }else if(command == 'unsubscribe'){
    	    if(this.subscriptions.indexOf(channel) > -1){
    	      this.subscriptions.splice(this.subscriptions.indexOf(channel), 1)
    	      this.message = 'Channel has removed: '+channel
    	      this.quantidade = this.quantidade - 1
    	      let chave = this.pairs.map((valor) => parseInt(valor.id)).indexOf(parseInt(channel))
    	      if(chave > -1){
    	        this.pairs[chave] = []
    	      }
    	    }
    	  }
    	poloniexSocket.sendObj({'command': command, 'channel': channel});
    	},
    	channels:function() {showChannels()},
    	key:function(id){alert(id)}

    }
}

</script>
