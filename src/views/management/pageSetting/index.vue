<template>
  <!-- <div> -->
    <!-- <n-card class="h-160px rounded-8px shadow-sm gap-16px"> -->
    <!-- <table-search-modal v-model:model="searchParams" class="pb-24px" @search="getTableData" /> -->
    <TableSearchModal v-model:model="searchParams" class="pb-24px" @search="getTableData" />
    <!-- </n-card> -->
    <n-card title="" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="end">
          <n-space :size="18">
            <n-button size="small" type="primary" round @click="handleAddTable">
              <icon-ic-round-plus class="mr-4px text-20px" />
              新增
            </n-button>
            <n-button size="small" type="error" round>
              <icon-ic-round-delete class="mr-4px text-20px" />
              删除
            </n-button>
            <n-button size="small" type="success" round>
              <icon-uil:export class="mr-4px text-20px" />
              导出Excel
            </n-button>
            <n-button size="small" type="primary" @click="getTableData">
              <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              刷新表格
            </n-button>
            <column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :row-key="row => row.id"
          :pagination="pagination"
          flex-height
          class="flex-1-hidden"
        />
        <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  <!-- </div> -->
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
// import { genderLabels, userStatusLabels } from '@/constants';
import { getPages, deletePage } from "@/service/api";
import { useBoolean, useLoading } from "@/hooks/index";
import SvgIcon from '@/components/custom/svg-icon.vue';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';
import ColumnSetting from './components/column-setting.vue';
import TableSearchModal from './components/table-search-modal.vue';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

// 对应子组件初始化值,必须先设定 不然会导致子组件初始化失败
// const searchParams = ref<ApiPageManagement.PageSearchParams>({
//   name: null,
//   type: null
// });
const searchParams = ref<ApiPageManagement.Page>({
  name: null,
  type: null
});

const tableData = ref<ApiPageManagement.Page[]>([]);
function setTableData(data: ApiPageManagement.Page[]) {
  tableData.value = data;
}

async function getTableData() {
  startLoading();
  const { data } = await getPages(searchParams.value);
  if (data) {
    setTimeout(() => {
      setTableData(data.list);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<ApiPageManagement.Page>> = ref([
  {
    type: 'selection',
    align: 'center'
  },
  {
    key: 'id',
    title: '序号',
    align: 'center'
  },
  {
    key: 'name',
    title: '名称',
    align: 'center'
  },
  {
    key: 'description',
    title: '描述',
    align: 'center'
  },
  {
    key: 'icon',
    title: '图标',
    align: 'center',
    width: 60,
    render: row => {
      const icon = row.icon;
      return (
        <div class="flex-center">
          <SvgIcon icon={icon} class="text-icon" />
        </div>
      );
    }
  },
  {
    key: 'type',
    title: '类型',
    align: 'center'
  },
  {
    key: 'orderBy',
    title: '排序',
    align: 'center'
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns<ApiPageManagement.Page>>;

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<ApiPageManagement.Page | null>(null);

function setEditData(data: ApiPageManagement.Page | null) {
  editData.value = data;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

function handleEditTable(rowId: number | null) {
  const findItem = tableData.value.find(item => item.id === rowId);
  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

function handleDeleteTable(rowId?: number | null) {
  deletePage([rowId]);
  window.$message?.info(`点击了删除，rowId为${rowId}`);
}

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
