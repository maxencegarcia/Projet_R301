<template>
  <div>
    <button v-for="(item, index) in titles" :key="item.text" :style="{backgroundColor: item.color}" @click="$emit('menu-clicked', index)">
      {{ item.text }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  titles: Array
})
defineEmits(['menu-clicked'])


// ce format [ {text: "menu1", color: "color1} , {text: "menu2", color: "color2}, ... ]

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>