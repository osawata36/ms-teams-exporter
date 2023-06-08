<template>
  <v-btn
    rounded
    depressed
    min-width="120"
    large
    color="primary"
    @click="$emit('click')"
  >
    {{ caption }}
  </v-btn>
</template>
<script>
export default {
  props: {
    caption: { type: String, default: '実行' }
  }
}
</script>
