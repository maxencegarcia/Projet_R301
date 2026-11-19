<template>
  <NavBar :titles="[
      {text: 'Shop Login', color:'#FF0000'},
      {text: 'Viruses', color:'#FF0000' },
      {text: 'Compte bancaire', color: '#FF0000'}
  ]"
  @menu-clicked="goTo"
  />

   <h1>Welcome to DrMad app</h1>
    <router-view></router-view>
</template>

<script setup>
import {onMounted} from "vue";
import {useShopStore} from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";
import VirusesView from "@/views/VirusesView.vue";
import router from "@/router/index.js";


const shopStore = useShopStore()

// Dès que l'appli est lancée, on va chercher la liste des virus pour la stocker dans le store
onMounted(() => {
  shopStore.getAllViruses()
})

function goTo(index){
  const route =[
      "/shop/login",
      "/shop/items",
      "/bank/account"
  ];
  router.push(route[index]);
}
</script>

<style scoped></style>
