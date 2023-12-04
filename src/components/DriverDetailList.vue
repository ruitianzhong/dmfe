<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-information"></v-icon> &nbsp;
            司机信息
            <v-spacer></v-spacer>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <DetailDialog :driver_info="item"></DetailDialog>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>
    
<script>
import DetailDialog from './DriverDetailDialog.vue';
import { getAllDriverInfo } from '@/api/api'
export default {

    components: { DetailDialog },
    data() {
        return {
            loading: true,
            search: '',
            items: [],
            headers: [
                {
                    title: '工号',
                    key: 'driver_id',
                    align: 'start',
                },
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '性别',
                    key: 'gender'
                },
                {
                    title: "出生年份",
                    key: 'year',
                },
                {
                    title: '更多',
                    key: 'detail',
                    align: 'end'
                }

            ],
        }
    },
    methods: {
        async getItems() {
            try {
                this.loading = true;
                console.log("test")
                const { data } = await getAllDriverInfo();
                this.items = data.driver_info;
                this.loading = false;
            } catch (err) {
                console.log(err);
            }

        }
    },
    mounted() {
        this.getItems();
    },
    unmounted() {
        this.items = null;
        this.loading = false;
    }
}
</script>
  