<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddNewLineDialog></AddNewLineDialog>
            <v-btn icon="mdi-refresh" @click="refresh()" :loading="refresh_loading" class="ml-3" variant="flat"
                rounded></v-btn>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <LineInfoDialog :line_id="item.line_id"></LineInfoDialog>
                </div>
            </template>
            <template v-slot:item.modify="{ item }">
                <LineCaptainDialog :line_id="item.line_id"></LineCaptainDialog>
            </template>

        </v-data-table>
    </v-card>
</template>
      
<script>
import AddNewLineDialog from '@/components/AddNewLineDialog.vue';
import LineInfoDialog from '@/components/LineInfoDialog.vue'
import LineCaptainDialog from './LineCaptainDialog.vue';
import { getAllLineInfo } from '@/api/api';
export default {
    components: {
        AddNewLineDialog,
        LineInfoDialog,
        LineCaptainDialog,
    },
    data() {
        return {
            loading: false,
            refresh_loading: false,
            search: '',
            items: [],
            headers: [
                {
                    title: '路线名',
                    key: 'line_id',
                    align: 'start',
                },
                {
                    title: '所属车队',
                    key: 'fleet_id',
                },

                {
                    title: '路队长工号',
                    key: 'driver_id'
                },
                {
                    title: '更新',
                    key: 'modify',

                },
                {
                    title: '更多',
                    key: 'detail',
                    align: 'end'
                },
            ],
        }
    },
    methods: {
        async updateLineInfo() {
            try {
                this.loading = true;
                const { data } = await getAllLineInfo();
                var arr = data.all_info;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].driver_id == '') {
                        arr[i].driver_id = "空缺"
                    }
                }
                this.items = arr
            }
            catch (err) {
                console.log(err)
            }
            this.loading = false;

        },
        refresh() {
            this.refresh_loading = true;
            this.updateLineInfo()
            this.refresh_loading = false;
        }
    },
    mounted() {
        this.updateLineInfo();
    }
}
</script>
    