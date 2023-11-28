<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
        hide-details variant="solo-filled"></v-text-field>
      <v-spacer></v-spacer>
      <AddBusDialog></AddBusDialog>
      &nbsp;
      <v-btn prepend-icon="mdi-delete-alert" text="删除" color="red" variant="flat" rounded></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table v-model:search="search" :loading="loading" select-strategy="single" :items="items" items-per-page="10"
      items-per-page-text="每页显示记录数量" :headers="headers" hover show-select :item-value="item => `${item.bus_id}`"
      v-model="selected" loading-text="数据加载中,请稍等">
      <template v-slot:item.detail="{ item }">
        <div class="text-end">
          <BusInfoDialog :bus_id="item.bus_id"></BusInfoDialog>
        </div>
      </template>

    </v-data-table>
  </v-card>
</template>
    
<script>
import AddBusDialog from './AddBusDialog.vue';
import BusInfoDialog from './BusInfoDialog.vue'
export default {
  components: {
    AddBusDialog,
    BusInfoDialog,
  },
  data() {
    return {
      loading: false,
      search: '',
      items: [
        {
          bus_id: '陕A12345',
          fleet_id: '123',
          year: '2019'
        },
        {
          bus_id: '陕A54321',
          fleet_id: '123',
          year: '2019'
        },
        {
          bus_id: '陕A33212',
          fleet_id: '123',
          year: '2021'
        },

      ],
      headers: [
        {
          title: '车牌号',
          key: 'bus_id',
          align: 'start',
        },
        {
          title: '所属车队',
          key: 'fleet_id',
        },
        {
          title: '购买时间',
          key: 'year'
        },
        {
          title: '更多',
          key: 'detail',
          align: 'end'
        },
      ],
      selected: [],
      snackBarTimeout: 20000,
      snackbar: true,

    }
  },
}
</script>
  