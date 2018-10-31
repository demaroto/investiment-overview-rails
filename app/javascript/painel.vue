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
        <p>{{message}}</p>
      </div>
      <div class="col-lg-3">
        <button v-on:click.stop.prevent="action(command, channel)" class="btn btn-primary">Iniciar</button>
    <button v-on:click.stop.prevent="channels()" class="btn btn-success">Canais</button>
      </div>
    </div>
    
    
    <table class="table">
		<caption>Acompanhando: {{quantidade}}</caption>
		<thead>
			<tr>
				<th>ID</th>
				<th>NAME</th>
				<th>PRICE</th>
				<th>TYPE</th>
			</tr>
		</thead>
		<tbody id="pairs" >
		  <tr v-for="pair in pairs">
		    <td>{{pair.id}}</td>
		    <td></td>
		    <td>{{pair.price}}</td>
		    <td>
		      <span v-if="pair.type == 0">Buy</span>
          <span v-else-if="pair.type == 1">Sell</span>	
          <span v-else></span>	
		    </td>
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
   

  
	 
	 function showChannels(){
	   console.log(poloniexSocket);
	 }
	 
export default {
  data: function () {
    return {
      message: '',
      channel: '',
      command: '',
      pairs: [],
      subscriptions:[],
      quantidade: 0
    }
  },
  created:function() {
    
    
  },
  mounted: function(){
   var vm = this;
      eventHub.$on('updatePair', function (res) {
      if(JSON.parse(res.data).length > 2){
        if(JSON.parse(res.data)[2][0][0] == 'o'){
          let typeTrade = JSON.parse(res.data)[2][0][1] // 1 for buy or 0 for sell
          let price = JSON.parse(res.data)[2][0][2] // Price
          let id = JSON.parse(res.data)[0] // id pair
           let chave = vm.pairs.map((valor) => valor.id ).indexOf(id)
            if(chave > -1)
            {
              vm.pairs[chave] = {'id': id,'price': price, 'type': typeTrade}
            }else{
              vm.pairs.push({'id': id, 'price': price, 'type': typeTrade})
              
              vm.message = ''
            }
            console.log(vm.pairs)
            vm.$forceUpdate();
        }
      }

     App.poloniex.ticker(eventHub.pairs)

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
    	        this.$forceUpdate()
    	      }
    	    }
    	  }
    	poloniexSocket.sendObj({'command': command, 'channel': channel});
    	},
    	channels:function() {showChannels()}
  
    	    
    	
    	
    }
}

</script>
