<template>
  <div id="app">
    <p>{{ message }}</p>
    <input type="text" v-model="channel" placeholder="Canal" />
    <select v-model="command">
      <option value="subscribe">Subscribe</option>
      <option value="unsubscribe">Unsubscribe</option>
    </select>
    <button v-on:click.stop.prevent="action(command, channel)">Iniciar</button>
    <button v-on:click.stop.prevent="channels()">Canais</button>
  </div>
</template>

<script>
//App.cable 
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'wss://api2.poloniex.com', { 
	'Sec-WebSocket-Protocol': true,
	reconnection: true,
	format: 'json'
	 })
	 

	 	 var poloniex = new Vue()
	    var poloniexSocket = ""
	    
//Recupera o alvo atual
poloniex.$options.sockets.onopen = (event) => {
  //Inscreve-se no canal 1002 // Ticker Data
  event.currentTarget.sendObj({'command': 'subscribe', 'channel': 1002});
  poloniexSocket = event.currentTarget
  //console.log(poloniexSocket)
  
};



//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (res) => {
	if (res.data == '[1010]'){ 
		//Estado ocioso
	}else{
		//console.log(JSON.parse(res.data))
		//Enviando para o ActionCable Rails
		App.poloniex.ticker(JSON.parse(res.data))
	}

}
   
	 function poloniexWebSocket(command, channel){
    poloniexSocket.sendObj({'command': command, 'channel': channel});
	 }
	 
	 function showChannels(){
	   console.log(poloniexSocket);
	 }
	



 var eventHub = new Vue()
 console.log(App)
eventHub.$emit('test', 'Oiii')



export default {
  data: function () {
    return {
      message: "Hello Vue!",
      channel: '',
      command: ''
    }
  },
  mounted: () => {
    eventHub.$on('test', function (msg) {
      console.log(msg)
  })
  },
  methods:{
    	action: (command, channel) => {
    	  console.log('clicou', command, channel)
    	poloniexWebSocket(command, channel)
    	},
    	test: (command) => console.log(command),
    	channels:() => showChannels()
    	
    }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
