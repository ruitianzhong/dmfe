<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddNewStopDialog></AddNewStopDialog>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover v-model="selected" loading-text="数据加载中,请稍等">
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
export default {
    components: {
        AddNewStopDialog,
        StopInfoDialog,
    },
    data() {
        return {
            loading: false,
            search: '',
            items: [
                {
                    stop_id: '钟楼'
                },
                {
                    stop_id: '市图书馆',
                },
                {
                    stop_id: '小寨',
                },

            ],
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
            snackBarTimeout: 20000,
            snackbar: true,

        }
    },
}
</script>
    