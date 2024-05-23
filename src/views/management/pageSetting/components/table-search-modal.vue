<script setup lang="ts">
import { ref, defineOptions } from 'vue';
import type { FormInst } from 'naive-ui';

defineOptions({ name: 'TableSearchModal' });

const formRef = ref<FormInst | null>(null);
const model = defineModel<ApiPageManagement.Page>('model', { required: true });
</script>
<template>
  <n-collapse :default-expanded-names="['default-expanded-names']">
    <n-collapse-item title="" name="default-expanded-names">
      <n-card :bordered="false" size="small" class="card-wrapper">
        <n-form ref="formRef" label-placement="left" :label-width="80" :model="model">
          <n-grid responsive="screen" item-responsive>
            <n-form-item-grid-item span="18 s:9 m:6" label="名称" path="name">
              <n-input v-model:value="model.name" placeholder="输入名称" />
            </n-form-item-grid-item>
            <n-form-item-grid-item span="18 s:9 m:6" label="类型" path="type">
              <n-input-number v-model:value="model.type" placeholder="输入类型" :min="1" />
            </n-form-item-grid-item>
          </n-grid>
        </n-form>
      </n-card>
    </n-collapse-item>
  </n-collapse>
</template>
<style scoped></style>
