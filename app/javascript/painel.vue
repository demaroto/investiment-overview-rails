<template>
  <div id="app" >
    <div class="col-lg-12">
      <div class="col-lg-6">
        <input type="text" v-model="channel" placeholder="Canal" class="form-control" />    
        
      </div>
      <div class="col-lg-6">
        <select v-model="command" class="form-control">
          <option value="subscribe">Subscribe</option>
          <option value="unsubscribe">Unsubscribe</option>
        </select>
      </div>
      <div class="col-lg-3">
        <button v-on:click.stop.prevent="action(command, channel)" class="btn btn-primary">Iniciar</button>
    <button v-on:click.stop.prevent="channels()" class="btn btn-success">Canais</button>
      </div>
    </div>
    
    
    <table class="table">
		<caption>Poloniex online - {{quantidade}}</caption>
		<thead>
			<tr>
				<th>ID</th>
				<th>NAME</th>
				<th>ASK</th>
				<th>BID</th>
			</tr>
		</thead>
		<tbody id="pairs" >
		  <tr v-for="pair in pairs">
		    <td>{{pair.id}}</td>
		    <td></td>
		    <td>{{pair.ask}}</td>
		    <td>{{pair.bid}}</td>
		  </tr>
		</tbody>
	</table>

  </div>
  

</template>

<script>

import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
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
  //Inscreve-se no canal 1002 // Ticker Data
  //event.currentTarget.sendObj({'command': 'subscribe', 'channel': 1002});
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
   
	 function poloniexWebSocket(command, channel){
    poloniexSocket.sendObj({'command': command, 'channel': channel});
	 }
	 
	 function showChannels(){
	   console.log(poloniexSocket);
	 }
	 
export default {
  data: function () {
    return {
      message: "Hello Vue!",
      channel: '',
      command: '',
      pairs: [],
      quantidade: 0
    }
  },
  created:function() {
    
    
  },
  mounted: function(){
   let vm = this;
      eventHub.$on('updatePair', function (res) {
      console.log(JSON.parse(res.data[2][0]))
    if(JSON.parse(res.data)[0] == 1002)
    {
      var id = JSON.parse(res.data)[2][0]
      var ask = JSON.parse(res.data)[2][2]
      var bid = JSON.parse(res.data)[2][3]
      if(vm.pairs == undefined)
      {
        vm.pairs =  [{'id': id,'ask': ask, 'bid': bid}]
      }else{
        let chave = vm.pairs.map((valor) => valor.id ).indexOf(id)
        if(chave > -1)
        {
          vm.pairs[chave] = {'id': id,'ask': ask, 'bid': bid}
        }else{
          vm.pairs.push({'id': id,'ask': ask, 'bid': bid})
          vm.quantidade = vm.quantidade + 1
        }
        
      }

      App.poloniex.ticker(eventHub.pairs)
      //renderiza(eventHub.pairs)
    }
  })
  },
  updated:function() {

  },
  methods:{
    	action: (command, channel) => {
    	  console.log('clicou', command, channel)
    	poloniexWebSocket(command, channel)
    	},
    	channels:() => showChannels()
  
    	    
    	
    	
    }
}
</script>

<style scoped>

</style>
