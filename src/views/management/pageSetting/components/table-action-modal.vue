<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="名称" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="描述" path="description">
          <n-input v-model:value="formModel.description" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="网址" path="site">
          <n-input v-model:value="formModel.site" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="图标" path="icon">
          <n-input v-model:value="formModel.icon" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="类型" path="type">
          <n-input-number v-model:value="formModel.type" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="排序" path="orderBy">
          <n-input-number v-model:value="formModel.orderBy" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" round @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" round @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormItemRule } from 'naive-ui';
import { genderOptions, userStatusOptions } from '@/constants';
import { addPage } from '@/service/api';
// import { formRules, createRequiredFormRule } from '@/utils';

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格行数据 */
  editData?: ApiPageManagement.Page | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<ApiPageManagement.Page, 'id' | 'name' | 'description' | 'site' | 'icon' | 'type' | 'orderBy'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

// const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
//   id: createRequiredFormRule('请输入用户名'),
//   name: createRequiredFormRule('请输入年龄'),
//   description: createRequiredFormRule('请选择性别'),
//   site: formRules.phone,
//   icon: formRules.email
// };

function createDefaultFormModel(): FormModel {
  return {
    id: null,
    name: null,
    description: null,
    site: null,
    icon: null,
    type: null,
    orderBy: null
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  // await formRef.value?.validate();
  const isAdd = props.type === 'add';
  await addPage(formModel, isAdd);
  window.$message?.success(isAdd ? '新增成功!' : '修改成功!');
  closeModal();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
