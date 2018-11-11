<template>
  <div class="current">
    <table style="width:100%;border:1px solid #000">
      <thead>
        <tr>
          <th>
            Paridade
          </th>
          <th>
            Comprando por
          </th>
          <th>
            Vendendo por
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{pairCurrent}}</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{currentValues.buy}}</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{currentValues.sell}}</td>
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
let poloniex = new Vue()
let poloniexSocket = ""
let eventHub = new Vue()

//Recupera o alvo atual
poloniex.$options.sockets.onopen = (event) => {
  poloniexSocket = event.currentTarget
  
};

//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (res) => {
	if (res.data == '[1010]'){ 
		//Estado ocioso
	}else{

    eventHub.$emit('onViewPair', res)
	}

}

export default{
  data:function(){
    return {
      viewPair: {},
      pair: '',
      currentValues: {}
    }
  },
  props:{
    pairCurrent:String
  },
  computed:{
    
  },
  mounted:function(){
    
     var vm = this
     
      eventHub.$on('onViewPair', function (res) {
      if(JSON.parse(res.data).length > 2){
        if(JSON.parse(res.data)[2][0][0] == 'o'){
          let typeTrade = JSON.parse(res.data)[2][0][1] // 1 for buy or 0 for sell
          let price = JSON.parse(res.data)[2][0][2] // Price
          let id = JSON.parse(res.data)[0] // id pair
              if(typeTrade == 1){
                vm.currentValues.buy = price
              }else{
                vm.currentValues.sell = price
              }
              vm.currentValues.pair = vm.pairCurrent
              vm.viewPair = {'id': id,'price': price, 'type': typeTrade}
              
              vm.$forceUpdate()
            
        }
      }
   
}) 
  },
  updated:function(){
    this.getDataWebSocket()
    
  },
  methods:{
    
    getDataWebSocket:function(){
      poloniexSocket.sendObj({'command': 'subscribe', 'channel': this.pairCurrent})

    },
  }
}

</script>

