<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddFleetDialog @refresh="refresh"></AddFleetDialog>
            <v-btn icon="mdi-refresh" @click="refresh()" :loading="refresh_loading" class="ml-3" variant="flat"
                rounded></v-btn>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <FleetInfoDialog @refresh="fetchFleetDetailedInfo()" :fleet_id="item.fleet_id"></FleetInfoDialog>
                </div>
            </template>

        </v-data-table>
    </v-card>
</template>
      
<script>
import AddFleetDialog from '@/components/fleet/AddFleetDialog.vue';
import FleetInfoDialog from '@/components/fleet/FleetInfoDialog.vue'
import { getAllFleetDetailedInfo } from '@/api/api';
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
        }
    },

    mounted() {
        this.fetchFleetDetailedInfo();
    },
    methods: {
        async fetchFleetDetailedInfo() {
            try {
                this.loading = true
                const { data } = await getAllFleetDetailedInfo()
                var info = data.fleets_info
                this.items = []
                for (var i = 0; info != null && i < info.length; i++) {
                    var e = {
                        fleet_id: info[i].fleet_id,
                        captain_name: info[i].has_captain ? info[i].captain_name : '空缺',
                        captain_id: info[i].has_captain ? info[i].captain_id : '空缺',
                        has_captain: info[i].has_captain
                    }
                    this.items.push(e);
                }
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }

        },
        refresh() {
            this.fetchFleetDetailedInfo()

        }
    }
}
</script>
    