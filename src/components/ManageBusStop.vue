<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddNewStopDialog @refresh="updateStops()"></AddNewStopDialog>
            <v-btn icon="mdi-refresh" @click="refresh()" :loading="refresh_loading" class="ml-3" variant="flat"
                rounded></v-btn>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <StopInfoDialog :stop_id="item.stop_id"></StopInfoDialog>
                </div>
            </template>

        </v-data-table>
    </v-card>
</template>
      
<script>
import AddNewStopDialog from '@/components/AddNewStopDialog.vue';
import StopInfoDialog from '@/components/StopInfoDialog.vue'
import { getAllStops } from '@/api/api';
export default {
    components: {
        AddNewStopDialog,
        StopInfoDialog,
    },
    data() {
        return {
            loading: false,
            search: '',
            items: [],
            headers: [
                {
                    title: '站名',
                    key: 'stop_id',
                    align: 'start',
                },
                {
                    title: '更多',
                    key: 'detail',
                    align: 'end'
                },
            ],
            selected: [],
            refresh_loading: false,

        }
    },
    methods: {
        async updateStops() {
            try {
                this.loading = true;
                const { data } = await getAllStops();
                var arr = data.stop_ids;
                this.items = []
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        stop_id: arr[i],
                    }
                    this.items.push(e);
                }
                this.loading = false;
                return;

            } catch (err) {
                console.log(err)
            }
            this.loading = false;
        },
        refresh() {
            this.refresh_loading = true;
            this.updateStops()
            this.refresh_loading = false;
        }

    },
    mounted() {
        this.updateStops();
    }
}
</script>
    