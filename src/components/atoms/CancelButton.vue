<template>
  <v-btn
    rounded
    depressed
    min-width="120"
    large
    outlined
    @click="$emit('click')"
  >
    {{ caption }}
  </v-btn>
</template>
<script>
export default {
  props: {
    caption: { type: String, default: 'キャンセル' }
  }
}
</script>
