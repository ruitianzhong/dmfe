<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddFleetDialog></AddFleetDialog>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover v-model="selected" loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <FleetInfoDialog :fleet_id="item.fleet_id" ></FleetInfoDialog>
                </div>
            </template>

        </v-data-table>
    </v-card>
</template>
      
<script>
import AddFleetDialog from '@/components/AddFleetDialog.vue';
import FleetInfoDialog from '@/components/FleetInfoDialog.vue'
export default {
    components: {
        AddFleetDialog,
        FleetInfoDialog,
    },
    data() {
        return {
            loading: false,
            search: '',
            items: [
                {
                    fleet_id: 1,
                    captain_name: '张三',
                    captain_id: 12,
                },
                {
                    captain_name: '李四',
                    fleet_id: 2,
                    captain_id: 33
                },

            ],
            headers: [
                {
                    title: '车队',
                    key: 'fleet_id',
                    align: 'start',
                },
                {
                    title: '队长工号',
                    key: 'captain_id',
                },
                {
                    title: '队长姓名',
                    key: 'captain_name'
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
    