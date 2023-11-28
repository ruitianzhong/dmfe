<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
                hide-details variant="solo-filled"></v-text-field>
            <v-spacer></v-spacer>
            <AddNewLineDialog></AddNewLineDialog>
            &nbsp;
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table v-model:search="search" :loading="loading" :items="items" items-per-page="10"
            items-per-page-text="每页显示记录数量" :headers="headers" hover v-model="selected" loading-text="数据加载中,请稍等">
            <template v-slot:item.detail="{ item }">
                <div class="text-end">
                    <LineInfoDialog :line_id="item.line_id"></LineInfoDialog>
                </div>
            </template>

        </v-data-table>
    </v-card>
</template>
      
<script>
import AddNewLineDialog from '@/components/AddNewLineDialog.vue';
import LineInfoDialog from '@/components/LineInfoDialog.vue'
export default {
    components: {
        AddNewLineDialog,
        LineInfoDialog,
    },
    data() {
        return {
            loading: false,
            search: '',
            items: [
                {
                    line_id: '825',
                    fleet_id: 1
                },
                {
                    line_id: '咸阳68',
                    fleet_id: 2
                },
                {
                    line_id: '27',
                    fleet_id: '23',
                },

            ],
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
    