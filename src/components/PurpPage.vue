<script setup lang="ts" > 
import usePurpPage from '.././common/ts/PurpPage'
defineProps<{ msg: string }>()
const {count}  = usePurpPage();
</script>
<template>
    <h1>{{ msg }}</h1>
    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>