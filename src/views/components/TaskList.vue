<template>
  <custom-dialog
    v-model:visible="state.isShow"
    width="80vw"
    custom-class="task-list"
    :title="$t('baseTaskList.t146')"
    :show-confirm="false"
    :append-to-body="true"
    :cancel-text="$t('baseTaskList.t121')"
    @cancel="hide"
  >
    <div class="list-container">
      <!-- 查询区域 -->
      <custom-query
        v-model="state.form"
        @resetForm="resetForm"
        @queryForm="getList"
      >
        <el-form-item>
          <el-input
            v-model.trim="state.form.taskName"
            v-designform
            :placeholder="$t('baseTaskList.t147')"
            maxlength="20"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="state.form.taskStatus"
            v-designform
            :placeholder="$t('baseTaskList.t148')"
            clearable
          >
            <el-option
              v-for="(item, index) in state.Dict.TASK_STATUS"
              :key="index"
              :label="item.dictName"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="state.form.timeRange"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            :start-placeholder="$t('baseTaskList.t149')"
            :end-placeholder="$t('baseTaskList.t150')"
            clearable
          />
        </el-form-item>
      </custom-query>
      <!-- 表格区域 -->
      <el-table
        class="custom-table"
        height="300"
        :data="state.tableInfo.list"
        @selection-change="selectTable"
      >
        <template v-for="item in tableHeaderList">
          <el-table-column
            v-if="item.show"
            :key="item.title"
            :label="item.title"
            :prop="item.key"
            :fixed="item.fixed"
            :align="item.align"
            :width="item.width"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <template v-if="item.key == 'createTime'">
                {{ $filters.dateFormat(scope.row[item.key]) }}
              </template>
              <template v-else-if="item.key == 'proccess'">
                <el-progress :percentage="scope.row[item.key]" />
              </template>
              <template v-else-if="item.key == 'taskStatus'">
                {{ getStatusName(scope.row[item.key], 'TASK_STATUS') }}
              </template>

              <span v-else>{{ scope.row[item.key] }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          :label="$t('baseTaskList.t151')"
          class-name="operate"
          min-width="160"
        >
          <template #default="scope">
            <el-tooltip :content="$t('baseTaskList.t152')" placement="top">
              <el-button
                class="circle"
                :disabled="![1, 2].includes(scope.row.taskStatus)"
                @click.prevent="lookRow(scope.row)"
              >
                <svg class="icon" aria-hidden="true" width="14px" height="14px">
                  <use xlink:href="#iconsearch" />
                </svg>
              </el-button>
            </el-tooltip>
            <el-tooltip :content="$t('baseTaskList.t153')" placement="top">
              <el-button
                class="circle"
                :disabled="![2].includes(scope.row.taskStatus)"
                @click.prevent="downloadRow(scope.row)"
              >
                <svg class="icon" aria-hidden="true" width="14px" height="14px">
                  <use xlink:href="#iconrelated" />
                </svg>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <custom-pagination
        :page-num="state.pageInfo.pageNum"
        :page-size="state.pageInfo.pageSize"
        :total="state.tableInfo.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      />
    </div>
  </custom-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import lodash from 'lodash';
import { basicApi } from '@/api';

interface TableType {
  id: number;
  version: number;
  taskCode: string;
  filePath: string;
  [key: string]: unknown;
}
interface TableHeaderList {
  key: string;
  title: string;
  show?: boolean;
  fixed?: string;
  align?: string;
  width?: string | number;
  minWidth?: string | number;
}
interface TaskListState {
  isShow: boolean;
  createTime: string;
  form: {
    taskName: string;
    taskStatus: string;
    timeRange: string[];
    beginTime: string;
    endTime: string;
  };
  Dict: {
    [key: string]: Array<{
      dictKey: string;
      dictValue: string;
      dictName: string;
    }>;
  };
  tableInfo: {
    list?: TableType[];
    total?: number;
  };
  rowSelected: TableType[];
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
}

export default defineComponent({
  name: 'TaskList',
  setup() {
    const $i18n = useI18n();

    const state: TaskListState = reactive({
      isShow: false,
      createTime: '',
      form: {
        taskName: '',
        taskStatus: '',
        timeRange: [],
        beginTime: '',
        endTime: '',
      },
      Dict: {},
      tableInfo: {},
      rowSelected: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
    });

    const excelTitle = {
      subItemId: `${$i18n.t('baseTaskList.t154')}`,
      bizUniqueCode: `${$i18n.t('baseTaskList.t155')}`,
      message: `${$i18n.t('baseTaskList.t156')}`,
      remark: `${$i18n.t('baseTaskList.t157')}`,
      reportTime: `${$i18n.t('baseTaskList.t158')}`,
      resultEnum: `${$i18n.t('baseTaskList.t159')}`,
    };

    const tableHeaderList: TableHeaderList[] = [
      {
        title: `${$i18n.t('baseTaskList.t147')}`,
        key: 'taskName',
        minWidth: 130,
        show: true,
      },
      {
        title: `${$i18n.t('baseTaskList.t149')}`,
        key: 'createTime',
        minWidth: 130,
        show: true,
      },
      {
        title: `${$i18n.t('baseTaskList.t148')}`,
        key: 'taskStatus',
        minWidth: 130,
        show: true,
      },
      {
        title: `${$i18n.t('baseTaskList.t160')}`,
        key: 'proccess',
        minWidth: 130,
        show: true,
      },
    ];

    // 获取列表
    const getList = async (refresh = true) => {
      if (refresh) {
        state.pageInfo.pageNum = 1;
      }

      if (state.form.timeRange?.length) {
        state.form.beginTime = state.form.timeRange[0];
        state.form.endTime = state.form.timeRange[1];
      } else {
        state.form.beginTime = '';
        state.form.endTime = '';
      }
      await basicApi
        .getTaskList({
          queryParam: lodash.omit(state.form, ['timeRange']),
          pageNum: state.pageInfo.pageNum,
          pageSize: state.pageInfo.pageSize,
        })
        .then((res) => {
          if (res.status) {
            state.tableInfo = res.data;
          }
        });
    };

    // 获取数据字典
    const getDict = async () => {
      await basicApi
        .getDict({
          dictTypeList: ['TASK_STATUS'], // 任务状态
          systemProjectCode: 'oms',
        })
        .then((res) => {
          state.Dict = res.data;
        });
    };

    // 显示弹窗
    const show = () => {
      // Object.assign($data, ($options.data as Function).call(this));
      state.isShow = true;
      getDict();
      getList();
    };

    // 隐藏弹窗
    const hide = () => {
      state.isShow = false;
    };

    // 选择表格
    const selectTable = (arr: Array<TableType>) => {
      state.rowSelected = arr;
    };

    // 查看
    const lookRow = (row: TableType) => {
      basicApi
        .getTaskDetailList({
          queryParam: {
            taskCode: row.taskCode,
            resultEnum: 'FAIL',
          },
          pageNum: 1,
          pageSize: 100,
        })
        .then((res) => {
          if (res.status) {
            if (res.data.length) {
              // const exportData = {
              //     excelName: `${$i18n.t('baseTaskList.t161')}`,
              //     excelData: res.data,
              // };
            } else {
              ElMessage.warning(`${$i18n.t('baseTaskList.t162')}`);
            }
          }
        });
    };

    // 下载
    const downloadRow = (row: TableType) => {
      window.open(row.filePath);
    };

    // 重置表单
    const resetForm = () => {
      state.createTime = '';
      getList();
    };

    // 根据code获取对应状态名称
    const getStatusName = (value: string, key: string) => {
      let item = state.Dict[key]?.find((item) => item.dictValue === `${value}`);
      if (!item)
        item = state.Dict[key]?.find((item) => item.dictKey === `${value}`);
      return item?.dictName;
    };

    // pageNum改变
    const handleCurrentChange = (val: number) => {
      state.pageInfo.pageNum = val;
      getList(false);
    };

    // pageSize改变
    const handleSizeChange = (val: number) => {
      state.pageInfo.pageSize = val;
      getList();
    };

    return {
      state,
      excelTitle,
      tableHeaderList,
      getList,
      selectTable,
      show,
      hide,
      lookRow,
      downloadRow,
      resetForm,
      getStatusName,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.task-list {
  .list-container {
    height: inherit;
    overflow: hidden;
    padding: 0 20px;
  }
}
</style>
