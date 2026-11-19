<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <input type="checkbox"
             v-if="itemCheck"
             :checked="checked[indexRow]"
             @change="$emit('checked-changed', indexRow)"
      >
      <span v-for="(field, indexCol) in fields" :key="indexCol">
        {{ item[field] }}
      </span>
      <button v-if="itemButton && itemButton.show" @click="$emit('item-button-clicked', indexRow)">{{ itemButton.text }}</button>
    </p>
    <button v-if="listButton && listButton.show" @click="$emit('list-button-clicked')">{{ listButton.text }}</button>
  </div>
</template>

<script setup>
defineProps({
  data: Array, // les données sources
  fields: Array, // le tableau contenant le nom des champs
  itemCheck: Boolean, // s'il y a des case à cocher
  checked: Array, // le tableau des cases cochées
  itemButton: Object, // l'objet pour les boutons d'items
  listButton: Object, // l'objet pour le bouton de liste
})
defineEmits(['checked-changed', 'item-button-clicked', 'list-button-clicked'])
</script>

<style scoped>
</style>