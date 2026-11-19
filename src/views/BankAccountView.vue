<template>
  <div>
    <h1>Login</h1>

    <span>number</span><input v-model="number">
    <button @click="resetNumber">reset</button>
    <button :disabled="!isNumberValid" @click="bankStore.getAccountAmount({number})">confirm</button>
    <p v-if="bankStore.accountNumberState === 1">{{bankStore.accountAmount}}</p>

    <button :disabled="!isNumberValid" @click="bankStore.getAccountTransactions({number})">transactions</button>
    <p v-if="bankStore.accountNumberState === -1">numéro de compte erroné</p>
    <ul v-if="bankStore.accountNumberState === 1 && bankStore.accountTransactions.length > 0">
      <li v-for="transaction in bankStore.accountTransactions" :key="transaction._id">
        {{ transaction.amount }} — {{ convertDate(transaction.date.$date) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {useShopStore} from "@/stores/shop.js";
import {useBankStore} from "@/stores/bank.js";

const number = ref('')
const bankStore = useBankStore()

const isNumberValid = computed(() => /^[A-Za-z0-9]{22}-[0-9]{7}$/.test(number.value))

function convertDate(date) {
  const d = new Date(date)
  const p = n => String(n).padStart(2, '0')
  return p(d.getMonth() + 1) + '/' + p(d.getDate()) + '/' + d.getFullYear() + ' at ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds())
}

function resetNumber() {
  number.value = ''
  bankStore.resetAccountNumberState()
}
</script>
