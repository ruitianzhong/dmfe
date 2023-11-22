<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" block class="text-none mb-4 mt-10" color="indigo-darken-3" size="x-large"
                    variant="flat" :disabled="disabled">
                    继续
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="py-5 font-weight-black">请确认司机 {{ violationInfo.name }} 的违章信息</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="violationInfo.name"
                        :subtitle="'工号 ' + violationInfo.did" lines="two" append-icon="mdi-bus-side">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-road" title="时间"
                        :subtitle="violationInfo.date.toLocaleString()"></v-list-item>
                    <v-list-item prepend-icon="mdi-bus-stop" title="站点"
                        :subtitle="violationInfo.choosedStop.title"></v-list-item>
                    <v-list-item prepend-icon="mdi-road" title="路线" :subtitle="violationInfo.line.name"></v-list-item>
                    <v-list-item prepend-icon="mdi-bus" title="车辆" :subtitle="violationInfo.choosedBus.title"></v-list-item>
                    <v-list-item prepend-icon="mdi-alert-box" title="违章类型"
                        :subtitle="violationInfo.choosedType.title"></v-list-item>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" variant="text" @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>
export default {
    props: ['violationInfo', 'disabled'],
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
  