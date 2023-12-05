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
                        :subtitle="'工号 ' + violationInfo.driver_id" lines="two" append-icon="mdi-bus-side">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-road" title="时间"
                        :subtitle="violationInfo.date.toLocaleString()"></v-list-item>
                    <v-list-item prepend-icon="mdi-bus-stop" title="站点"
                        :subtitle="violationInfo.choosedStop.title"></v-list-item>
                    <v-list-item prepend-icon="mdi-road" title="路线" :subtitle="violationInfo.line"></v-list-item>
                    <v-list-item prepend-icon="mdi-bus" title="车辆" :subtitle="violationInfo.choosedBus.title"></v-list-item>
                    <v-list-item prepend-icon="mdi-alert-box" title="违章类型"
                        :subtitle="violationInfo.choosedType.title"></v-list-item>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" variant="text" @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="submitViolationRecord()" :loading="loading">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>
import { addViolationRecord } from '@/api/api';
export default {
    props: ['violationInfo', 'disabled'],
    data() {
        return {
            dialog: false,
            loading:false,
            year: '1990',
            gender: '男',
            fleet_id: '12345',
            fleet_leader: 'Alice',
            start: null,
            end: null,
            date: null,
            alert: false,
        }
    },
    onMounted() {
    },

    methods: {
        async submitViolationRecord() {

            const param = {
                violation_type_id: this.violationInfo.choosedType.violation_type_id,
                time: Date.parse(this.violationInfo.date) / 1000,
                stop_id: this.violationInfo.choosedStop.stop_id,
                bus_id: this.violationInfo.choosedBus.bus_id,
                driver_id: this.violationInfo.driver_id,
            }
            this.loading = true
            const { data } = await addViolationRecord(param)
            if (data.code == "100") {
                this.$emit("failure", data.msg)
            } else {
                this.$emit("success")
            }
            this.loading= false;
            this.dialog = false;
        }

    },

}
</script>
  