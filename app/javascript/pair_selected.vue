<template>
  <div class="current">
     <div class="section-select-table" v-if="pairCurrent.name">
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
        <td>{{pairCurrent.name}}</td>
        <td>{{currentValues.buy}}</td>
        <td>{{currentValues.sell}}</td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td>Porcentagem (%)</td>
        <td><input type="number" v-model="percentWish.buy" step="0.5"/></td>
        <td><input type="number" v-model="percentWish.sell" step="0.5"/></td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td>Desejado</td>
        <td>{{valuesWish.buy}}</td>
        <td>{{valuesWish.sell}}</td>
      </tr>
      <tr v-if="currentValues.buy && currentValues.sell">
        <td>Sinalizar</td>
        <td><button @click="addPairToOverview(pairCurrent.id, 'buy', valuesWish.buy, pairCurrent.name)" class="btn-sinalizar-compra">Sinalizar Compra</button></td>
        <td><button @click="addPairToOverview(pairCurrent.id, 'sell', valuesWish.sell, pairCurrent.name)" class="btn-sinalizar-venda">Sinalizar Venda</button></td>
      </tr>
      </tbody>
    </table>
    </div>
    <div>
      <overview-component ref="overviewComponent"></overview-component>
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
var poloniex = new Vue()
var poloniexSocket = ""
var eventHub = new Vue()

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
              if(typeTrade == 1){
                vm.currentValues.buy = price
              }else{
                vm.currentValues.sell = price
              }
           
              vm.currentValues.pair = vm.pairCurrent.name
              vm.viewPair = {'id': id,'price': price, 'type': typeTrade}
              vm.calcWish()
              vm.$forceUpdate()
          }
            
        }
      }
   
    }) 
     vm.$forceUpdate()
  },
  updated:function(){
    this.getDataWebSocket()
  },
  methods:{
    
    getDataWebSocket:function(){
      if(this.pairCurrent.name){
      poloniexSocket.sendObj({'command': 'subscribe', 'channel': this.pairCurrent.name})
      
      }// poloniex.$options.sockets.onopen = (event) => {
      //   poloniexSocket = event.currentTarget
      //   poloniexSocket.sendObj({'command': 'subscribe', 'channel': this.pairCurrent.name})
         
      // };
    },
    calcWish:function(){
      this.percentWish.sell == 0 ? this.percentWish.sell = 0 : this.percentWish.sell 
      this.percentWish.buy == 0 ? this.percentWish.buy = 0 : this.percentWish.buy 
      this.valuesWish.buy = (this.currentValues.buy - (this.percentWish.buy * this.currentValues.buy / 100)).toFixed(8)
      this.valuesWish.sell = (parseFloat(this.currentValues.sell) + (parseFloat(this.currentValues.sell) * parseFloat(this.percentWish.sell) / 100)).toFixed(8)
    },
    addPairToOverview:function(pairValue, typeValue, priceValue, pairNameValue){
      let vm = this
      axios.post('/api/v1/pairs', {
        pair_id: pairValue,
        type_trade: typeValue,
        price: priceValue,
        pair_name: pairNameValue
      })
      .then(function (response) {
        //Adicionado com sucesso
        vm.$refs.overviewComponent.getPairsToOverview()
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function(){
       
      });
    }
  }
}

</script>

