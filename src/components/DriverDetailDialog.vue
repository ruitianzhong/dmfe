<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ props }">
                <v-btn color="transparent" rounded="false" elevation="0" v-bind="props" icon="mdi-dots-horizontal"
                    density="compact"> </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="py-5 font-weight-black">司机 {{ name }} 的信息</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="name"
                        :subtitle="'工号 ' + did" lines="two" append-icon="mdi-bus-side">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-calendar" title="出生年份" :subtitle="year"></v-list-item>
                    <v-list-item prepend-icon="mdi-gender-male-female" title="性别" :subtitle="gender"></v-list-item>
                    <v-list-item prepend-icon="mdi-counter" title="所属车队编号"
                        :subtitle="fleet_id ? fleet_id : '暂未分配车队'"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-box" title="车队队长" v-if="fleet_id != undefined"
                        :subtitle="fleet_leader ? fleet_leader : '该车队暂时没有队长'"></v-list-item>
                    <v-list-item prepend-icon="mdi-road" title="路线" :subtitle="line ? line : '暂未分配路线'"></v-list-item>


                    <br />
                    <span class="py-5 font-weight-black">司机 {{ name }} 违章记录查询</span>
                    <v-divider></v-divider>
                    <br />
                    <VueDatePicker v-model="date" range placeholder="请选择查询的范围" :max-date="new Date()" />
                    <br />
                    <center>
                        <v-btn type="submit" prepend-icon="mdi-magnify" class="text-none align-center "
                            color="indigo-darken-3" size="small" variant="text">
                            查询
                        </v-btn>
                    </center>
                    <br />
                    <v-data-table :items="violation_items" items-per-page="5" items-per-page-text="每页显示记录数量"
                        :headers="violation_headers" hover :item-value="item => `${item.time}`" loading-text="数据加载中,请稍等">
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        关闭
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>
export default {
    props: ['did', 'name'],
    data() {
        return {
            dialog: false,
            year: '1990',
            gender: '男',
            fleet_id: '12345',
            fleet_leader: 'Alice',
            start: null,
            end: null,
            date: null,
            violation_headers: [

                {
                    title: '时间',
                    key: 'time',
                    align: 'start',
                },
                {
                    title: '违章种类',
                    key: 'type',
                    align: 'end'
                }
            ],
            violation_items: [
                {
                    time: '2023-03-03',
                    type: '闯红灯',
                },
                {
                    time: '2023-02-02',
                    type: '不礼让行人'
                }
            ]
        }
    },
    onMounted() {
    }

}
</script>
  