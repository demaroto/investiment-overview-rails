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
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{pairCurrent.name}}</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{currentValues.buy}}</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{currentValues.sell}}</td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">Porcentagem (%)</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold"><input type="number" v-model="percentWish.buy" /></td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold"><input type="number" v-model="percentWish.sell" /></td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">Desejado</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{valuesWish.buy}}</td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold">{{valuesWish.sell}}</td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold"></td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold"><button @click="addPairToOverview(pairCurrent.name, 'buy', valuesWish.buy)">Sinalizar Compra</button></td>
        <td style="width:auto;text-align:center;color:#157887;font-weight:bold"><button @click="addPairToOverview(pairCurrent.name, 'sell', valuesWish.sell)">Sinalizar Venda</button></td>
      </tr>
      </tbody>
    </table>
    <div>
      <overview-component></overview-component>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import axios from 'axios'
import OverviewComponent from './overview'
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
  components:{
    OverviewComponent
  },
  data:function(){
    return {
      viewPair: {},
      pair: '',
      currentValues: {},
      valuesWish: {'buy':'','sell':''},
      percentWish: {'buy':0,'sell':0}
    }
  },
  props:{
    pairCurrent:{}
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
          
          if(vm.pairCurrent.id == id){
           // if(vm.viewPair.id == id){
              if(typeTrade == 1){
                vm.currentValues.buy = price
              }else{
                vm.currentValues.sell = price
              }
           // }
          
              vm.currentValues.pair = vm.pairCurrent.name
              vm.viewPair = {'id': id,'price': price, 'type': typeTrade}
              vm.calcWish()
              vm.$forceUpdate()
          }
            
        }
      }
   
}) 
  },
  updated:function(){
    this.getDataWebSocket()
    
  },
  methods:{
    
    getDataWebSocket:function(){
      poloniexSocket.sendObj({'command': 'subscribe', 'channel': this.pairCurrent.name})

    },
    calcWish:function(){
      this.percentWish.sell == '' ? this.percentWish.sell = 0 : this.percentWish.sell 
      this.percentWish.buy == '' ? this.percentWish.buy = 0 : this.percentWish.buy 
      this.valuesWish.buy = (this.currentValues.buy - (this.percentWish.buy * this.currentValues.buy / 100)).toFixed(8)
      this.valuesWish.sell = (parseFloat(this.currentValues.sell) + (parseFloat(this.currentValues.sell) * parseFloat(this.percentWish.sell) / 100)).toFixed(8)
    },
    addPairToOverview:function(pairValue, typeValue, priceValue){
      axios.post('/api/v1/pairs', {
        "pair": pairValue,
        "type_trade": typeValue,
        "price": priceValue
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getPairsToOverview:function(){
      axios.get('/api/v1/pairs')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }
}

</script>

