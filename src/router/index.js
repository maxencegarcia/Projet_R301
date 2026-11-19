import { createRouter, createWebHistory } from 'vue-router'
import VirusesView from "@/views/VirusesView.vue";
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopOrders from "@/views/ShopOrders.vue";
import ShopPay from "@/views/ShopPay.vue";



const routes = [
    // route pour afficher la liste des virus
  {
    path: '/shop/items',
    name: 'shopitems',
    component: VirusesView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/shop/home',
    name: 'shop home',
    component: ShopHome,
    alias: '/shop'
  },
  {
    path: '/shop/login',
    name: 'shop login',
    component: ShopLogin,
  },
  {
    path: '/shop/buy',
    name: 'shopbuy',
    component: ShopBuy,
  },
  {
    path: '/shop/orders',
    name: 'shoporders',
    component: ShopOrders,
  },
  {
    path: '/shop/orders/:id',
    name: 'shoporder',
    component: ShopOrders,
  },
  {
    path: '/shop/orders/:orderid',
    name: 'shoporder',
    component: ShopPay,
  },
    // route pour se loguer
  {
    path: '/shop/login',
    name: 'shoplogin',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la 1ère route.
    component: () => import('@/views/ShopLoginView.vue')
  },
  {
    path: '/bank/account',
    name: 'bankaccount',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la 1ère route.
    component: () => import('@/views/BankAccountView.vue')
  },
    // route pour accéder au compte bancaire
    // A COMPLETER

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
