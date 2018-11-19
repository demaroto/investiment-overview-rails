
<template>
  <div class="overview">
    <h3>Suas Criptomoedas</h3>
    <table style="width:100%;" v-if="myPairs">
      <thead>
        <tr>
          <th>Paridade</th>
          <th>Tipo</th>
          <th>Valor Desejado</th>
          <th>Valor Atual</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pair in myPairs">
           <td>{{pair.pair_name}}</td>
           <td>{{pair.type_trade}}</td>
           <td>{{pair.price}}</td>
           <td>{{pair.currentValue}}</td>
           <td><input type="button" value="Remover" class="btn-remover" @click.prevent="destroyPair(pair.id, $event)"/></td>
        </tr>
      </tbody>
    </table>
  </div>
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
	   var self = this
	    
//Recupera o alvo atual
poloniex.$options.sockets.onopen = (event) => {
  poloniexSocket = event.currentTarget
  //poloniexSocket.sendObj({'command': 'subscribe', 'channel': 'BTC_LTC'})
   
};

//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (res) => {
	if (res.data == '[1010]'){ 
		//Estado ocioso
	}else{
    eventHub.$emit('onViewPair', res)
	}

}
   
export default {

   data: function () {
    return {
      myPairs:[],
      poloniex:{}
    }
  },
  created:function() {
    
    
  },
  mounted: function(){
     var vm = this;
      vm.getPairsToOverview()
      //Permissão de notificação
      Notification.requestPermission()
      eventHub.$on('onViewPair', function (res) {
        if(JSON.parse(res.data).length > 2){
        if(JSON.parse(res.data)[2][0][0] == 'o'){
          let typeTrade = JSON.parse(res.data)[2][0][1] // 1 for buy or 0 for sell
          let price = JSON.parse(res.data)[2][0][2] // Price
          let id = JSON.parse(res.data)[0] // id pair
                //vm.getPairsToOverview()
                let formatType = typeTrade == 1 ? 'buy' : 'sell'
                if(vm.myPairs){
                vm.myPairs.forEach(function(current, index){
                  if(current.pair_id == id && current.type_trade == formatType){
                    vm.myPairs[index].currentValue = price
                    //Validação de Valores e Notificação
                    
                      if(vm.myPairs[index].type_trade == 'buy'){
                            if(vm.myPairs[index].currentValue <= vm.myPairs[index].price){
                              let myPar = vm.myPairs[index].pair_name
                              let typePar = vm.myPairs[index].type_trade
                              let myValue = vm.myPairs[index].price
                              let poloniexValue = vm.myPairs[index].currentValue
                              if(((myValue-poloniexValue) * 100 / myValue) < 95){
                                vm.$vnode.elm.getElementsByTagName('tbody')[0].children[index].classList.add('active-tr-table')
                                vm.notificationShow("Investiment Overview: Compra", myPar, typePar, myValue, poloniexValue)
                              }
                            }else{
                              
                                vm.$vnode.elm.getElementsByTagName('tbody')[0].children[index].classList.remove('active-tr-table')
                             
                            }
                      }else{
                          if(vm.myPairs[index].currentValue >= vm.myPairs[index].price){
                               let myPar = vm.myPairs[index].pair_name
                              let typePar = vm.myPairs[index].type_trade
                              let myValue = vm.myPairs[index].price
                              let poloniexValue = vm.myPairs[index].currentValue
                              if(((myValue-poloniexValue) * 100 / myValue) < 95){
                                //Add class Notification
                               vm.$vnode.elm.getElementsByTagName('tbody')[0].children[index].classList.add('active-tr-table')
                                vm.notificationShow("Investiment Overview: Venda", myPar, typePar, myValue, poloniexValue)
                              }
                            }
                            
                          else{
                           
                              vm.$vnode.elm.getElementsByTagName('tbody')[0].children[index].classList.remove('active-tr-table')  
                          
                          }
                      }
                  }
                })
                }
              vm.$forceUpdate()
         
            
        }
      }
      })
      
      //Envia para o ActionCable
     //App.poloniex.ticker(eventHub.pairs)

  },
  updated:function() {

  },
  methods:{
    getPairsToOverview:function(){
      let vm = this
      let pairs = []
      axios.get('/api/v1/pairs')
      .then(function (response) {
        //Consulta a lista de acompanhamentos
        vm.myPairs = response.data.data
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }).then(function(data){
        if(vm.myPairs){
       vm.myPairs.forEach(function(current, index){
        vm.getDataWebSocket(current.pair_name)
         
       })
        }
      })
  
    },
    destroyPair:function(id, event){
      let vm = this
      axios.delete('/api/v1/pairs/'+id, {
        id: id 
      }).then(function(response){
        console.log(response.data.data)
        vm.getPairsToOverview()
      }).catch(function(error){
        console.log(error)
      })
    },
    getDataWebSocket:function(channel){
      //poloniexSocket.sendObj({'command': 'subscribe', 'channel': channel})
      poloniex.$options.sockets.onopen = (event) => {
        poloniexSocket = event.currentTarget
        poloniexSocket.sendObj({'command': 'subscribe', 'channel': channel})
         
      };
    },
    displaySelect:function(){
      console.log('Display Select')
      
    },
    notificationShow:function(titulo, moeda, tipo, myValue, currentValue){
       if (Notification.permission === "granted") {
     var notification = new Notification(titulo, {
            icon: '/assets/Home/iconNotifications.png',
          body: "Paridade: " + moeda + "\nTipo: " + tipo + "\nValor Desejado: " + myValue + "\nValor Atual: " + currentValue
        });
        notification.onclick = function(event){
          event.preventDefault();
          window.location.href = window.location.href
          
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(titulo, {
            icon: '/assets/Home/iconNotifications.png',
           body: "Paridade: " + moeda + "Tipo: " + tipo + "\nValor Desejado: " + myValue + "\nValor Atual: " + currentValue
        });
      }
    });
      }
    },
    noticationPage:function(){
      
    }

    }
}

</script>

