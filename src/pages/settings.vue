<template>
  <v-layout>
    <v-flex class="text-center">
      <v-text-field
        v-model="token"
        :label="acccessTokenInput.label"
        :hint="acccessTokenInput.hint"
        :placeholder="acccessTokenInput.placeholder"
        :shaped="acccessTokenInput.shaped"
        :outlined="acccessTokenInput.outlined"
        :rounded="acccessTokenInput.rounded"
        :solo="acccessTokenInput.solo"
        :single-line="acccessTokenInput.singleLine"
        :filled="acccessTokenInput.filled"
        :clearable="acccessTokenInput.clearable"
        :persistent-hint="acccessTokenInput.persistentHint"
        :loading="acccessTokenInput.loading"
        :flat="acccessTokenInput.flat"
        :counter="acccessTokenInput.counterEn ? counter : false"
        :dense="acccessTokenInput.dense"
      ></v-text-field>
      <!-- <v-text-field
        v-model="refleshToken"
        :label="refleshTokenInput.label"
        :hint="refleshTokenInput.hint"
        :placeholder="refleshTokenInput.placeholder"
        :shaped="refleshTokenInput.shaped"
        :outlined="refleshTokenInput.outlined"
        :rounded="refleshTokenInput.rounded"
        :solo="refleshTokenInput.solo"
        :single-line="refleshTokenInput.singleLine"
        :filled="refleshTokenInput.filled"
        :clearable="refleshTokenInput.clearable"
        :persistent-hint="refleshTokenInput.persistentHint"
        :loading="refleshTokenInput.loading"
        :flat="refleshTokenInput.flat"
        :counter="refleshTokenInput.counterEn ? counter : false"
        :dense="refleshTokenInput.dense"
      ></v-text-field> -->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { tokenStore } from '~/store'

export default Vue.extend({
  data: () => ({
    acccessTokenInput: {
      // token: '',
      label: 'アクセストークン',
      hint: 'Microsoft365 Access Tokenを入力してください',
      placeholder: 'access tokenを入力してください',
      shaped: false,
      outlined: true,
      rounded: false,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      persistentHint: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false
    },
    refleshTokenInput: {
      // token: '',
      label: 'リフレッシュトークン',
      hint: 'Reflesh Tokenを入力してください',
      placeholder: 'reflesh tokenを入力してください',
      shaped: false,
      outlined: true,
      rounded: false,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      persistentHint: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false
    }
  }),
  computed: {
    token: {
      get() {
        return tokenStore.token
      },
      set(value: string) {
        tokenStore.setToken(value)
      }
    },
    refleshToken: {
      get() {
        return tokenStore.refleshToken
      },
      set(value: string) {
        tokenStore.setRefleshToken(value)
      }
    }
  }
})
</script>
