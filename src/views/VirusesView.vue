<template>
  <div>
    <h1>Les virus</h1>
    <p>Le tableau dans le store : {{ shopStore.viruses }}</p>

    <span>Filtres :</span><label for="filterpriceactive">par prix</label><input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <hr />
    <div v-if="filterPriceActive">
      <label for="filterprice">prix inférieur à : </label><input type="number" v-model="priceFilter" id="filterprice">
    </div>

    <span>Filtres :</span><label for="filterNameActive">par nom</label><input type="checkbox" v-model="filterNameActive" id="filterNameActive">
    <hr />
    <div v-if="filterNameActive">
      <label for="filtername">nom = : </label><input type="search" v-model="nameFilter" id="filtername">
    </div>

    <span>Filtres :</span><label for="filterStockActive">par Stock</label><input type="checkbox" v-model="filterStockActive" id="filterStockActive">
    <hr />
    <div v-if="filterStockActive">
      <label for="filterstock">stock : </label>
      <input type="checkbox" v-model="stockFilter" id="filterstock">
    </div>
    <hr />

    <CheckedList :data="filterViruses"
                 :fields="['name', 'price']"
                 item-check
                 :item-button="{show: true, text: 'Info'}"
                 :list-button="{show: true, text: 'Select'}"
                 :checked="checked"
                 @checked-changed="changeSelection($event)"
                 @item-button-clicked="showVirusInfos($event)"
                 @list-button-clicked="showVirusNames()"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useShopStore } from "@/stores/shop.js"
import CheckedList from "@/components/CheckedList.vue"

const shopStore = useShopStore()
const priceFilter = ref(0)
const nameFilter = ref("")
const stockFilter = ref(false)
const filterPriceActive = ref(false)
const filterNameActive = ref(false)
const filterStockActive = ref(false)
const selected = ref([])



const filterVirusesByPrice = computed(() => {
  let price = parseInt(priceFilter.value)
  if (isNaN(price)) return []
  if (price > 0) return shopStore.viruses.filter(v => v.price < price)
  return shopStore.viruses
})

const filterVirusesByName = computed(() => {
  if (nameFilter.value !== "") return shopStore.viruses.filter(v => v.name.includes(nameFilter.value) )
  return shopStore.viruses
})

const filterVirusesByStock = computed(() => {
  if (stockFilter.value !== false) return shopStore.viruses.filter(v => v.stock > 0)
  return shopStore.viruses
})

const filterViruses = computed(() => {
  let list = shopStore.viruses
  if (filterPriceActive.value) {
    let price = parseInt(priceFilter.value)
    if (!isNaN(price) && price > 0) list = list.filter(v => v.price < price)
  }
  if (filterNameActive.value && nameFilter.value !== "") list = list.filter(v => v.name.includes(nameFilter.value))
  if (filterStockActive.value && stockFilter.value) list = list.filter(v => v.stock > 0)
  return list
})

const checked = computed(() => {
  return filterViruses.value.map(v => selected.value.includes(shopStore.viruses.findIndex(el => el === v)))
})

function changeSelection(idx) {
  let v = filterViruses.value[idx]
  let i = shopStore.viruses.findIndex(el => el === v)
  let j = selected.value.indexOf(i)
  if (j !== -1) selected.value.splice(j, 1)
  else selected.value.push(i)
}

function showVirusInfos(idx) {
  let v = filterViruses.value[idx]
  alert(v.name + ", stock = " + v.stock + ", en vente = " + v.sold)
}

function showVirusNames() {
  alert(selected.value.map(idx => shopStore.viruses[idx].name).join(" "))
}

watch(filterViruses, () => {
  selected.value = selected.value.filter(idx => filterViruses.value.includes(shopStore.viruses[idx]))
})

</script>
