<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
        hide-details variant="solo-filled"></v-text-field>
      <v-spacer></v-spacer>
      <AddBusDialog @refresh="updateCarInfo()"></AddBusDialog>
      &nbsp;
      <v-btn icon="mdi-refresh" :loading="refresh_loading" @click="refresh()" variant="flat" rounded></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table v-model:search="search" :loading="table_loading" select-strategy="single" :items="items"
      items-per-page="10" items-per-page-text="每页显示记录数量" :headers="headers" hover :item-value="item => `${item.bus_id}`"
      loading-text="数据加载中,请稍等">
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
import { getAllBus } from '@/api/api'
export default {
  components: {
    AddBusDialog,
    BusInfoDialog,
  },
  data() {
    return {
      loading: false,
      search: '',
      items: [],
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
          title: '所属线路',
          key: 'line_id',
        },
        {
          title: '更多',
          key: 'detail',
          align: 'end'
        },
      ],
      refresh_loading: false,
      table_loading: true,

    }

  },
  methods: {
    async updateCarInfo() {
      this.table_loading = true;
      try {
        const { data } = await getAllBus();
        this.items = data.bus_info;
        this.table_loading = false;
        return;
      } catch (err) {
        console.log(err)
      }
      this.table_loading = false;
    },
    refresh() {
      this.refresh_loading = true;
      this.updateCarInfo();
      this.refresh_loading = false;
    }

  },
  mounted() {
    this.updateCarInfo();
  }
}
</script>
  