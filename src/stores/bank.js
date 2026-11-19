import { ref } from 'vue'
import { defineStore } from 'pinia'

import BankService from '@/services/bankaccount.service.js'
import ShopService from "@/services/shop.service.js";

export const useBankStore = defineStore('bank', () => {
    const accountAmount = ref(0)
    const shopUser = ref(null)
    const accountTransactions = ref([])
    const accountNumberState = ref(0)


    async function banklogin(data) {
        let response = await BankService.getAccountAmount(data)
        if (response.error === 0) {
            shopUser.value = response.data
        } else {
            console.log(response.data)
        }
    }

    async function getAccountAmount(data) {
        let response = await BankService.getAccountAmount(data)
        if (response.error === 0) {
            accountAmount.value = response.data
            accountNumberState.value = 1
        } else {
            console.log(response.data)
            accountNumberState.value = -1
        }
    }

    async function getAccountTransactions(data) {
        let response = await BankService.getAccountTransactions(data)
        if (response.error === 0) {
            accountTransactions.value = response.data
            accountNumberState.value = 1
        }
        else {
            console.log(response.data)
            accountNumberState.value = -1
        }
    }

    function resetAccountNumberState() {
        accountNumberState.value = 0
    }

    return { accountAmount, shopUser, accountTransactions, accountNumberState, banklogin, getAccountAmount, getAccountTransactions, resetAccountNumberState }

})
