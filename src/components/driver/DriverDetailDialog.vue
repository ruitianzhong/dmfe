<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
            <v-btn color="transparent" rounded="false" elevation="0" v-bind="props" icon="mdi-dots-horizontal"
                density="compact"> </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">司机 {{ driver_info.name }} 的信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list-item :prepend-avatar="avatar" :title="driver_info.name" :subtitle="'工号 ' + driver_info.driver_id"
                    lines="two" append-icon="mdi-bus-side">
                </v-list-item>
                <v-list-item prepend-icon="mdi-calendar" title="出生年份" :subtitle="driver_info.year"></v-list-item>

                <v-list-item prepend-icon="mdi-gender-male-female" title="性别" :subtitle="driver_info.gender"></v-list-item>
                <v-list-item prepend-icon="mdi-counter" title="所属车队编号" :subtitle="driver_info.fleet_id"></v-list-item>

                <v-skeleton-loader v-if="loading" type="list-item-two-line"></v-skeleton-loader>
                <v-list-item prepend-icon="mdi-account-box" title="线路队长" v-else
                    :subtitle="this.fleet_captain.driver_id != '' ? this.fleet_captain.name + ' ' + this.fleet_captain.driver_id : '该车队暂时没有队长'"></v-list-item>
                <v-list-item prepend-icon="mdi-road" title="路线"
                    :subtitle="driver_info.line_id != '' ? driver_info.line_id : '暂未分配路线'"></v-list-item>

                <br />
                <span class="py-5 font-weight-black">司机 {{ name }} 违章记录查询</span>
                <v-divider></v-divider>
                <br />
                <VueDatePicker v-model="date" range placeholder="请选择查询的范围" :max-date="new Date()" />
                <br />
                <center>
                    <v-btn type="submit" prepend-icon="mdi-magnify" class="text-none align-center " color="indigo-darken-3"
                        size="small" variant="text" @click="getViolationRecords()"
                        :disabled="date == null || date[0] == undefined && date[1] == undefined">
                        查询
                    </v-btn>
                </center>
                <br />
                <v-data-table v-if="show_table" :items="violation_items" items-per-page="5" items-per-page-text="每页显示记录数量"
                    :headers="violation_headers" hover :item-value="item => `${item.time}`" loading-text="数据加载中,请稍等"
                    no-data-text="暂无数据" :loading="query_loading">
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
</template>
  
<script>
import { getLineCaptainByDriverId, violationByTimeRangeDriverId } from '@/api/api';
export default {
    props: ['driver_info'],
    data() {
        return {
            loading: true,
            query_loading: false,
            dialog: false,
            show_table: false,
            date: null,
            violation_headers: [
                {
                    title: '时间',
                    key: 'time',
                    align: 'start',
                },
                {
                    title:"车牌号",
                    key:"bus_id",
                },
                {
                    title:"线路",
                    key:"line_id"
                },
                {
                    title: "违章站点",
                    key:"stop_id"
                },
                {
                    title: '违章种类',
                    key: 'violation_type_id',
                    align: 'end'
                }
            ],
            violation_items: [],
            fleet_captain: {
                driver_id: '',
                name: '',
            },
            avatar: ''
        }
    },
    onMounted() {
    },
    watch: {
        dialog(newDialog) {
            if (newDialog == true) {
                this.loading = true;
                this.getLineCaptain();
                this.loading = false;
                this.avatar = "https://api.multiavatar.com/" + this.driver_info.driver_id + ".png"
            }
        }
    },
    methods: {
        async getLineCaptain() {
            try {
                const param = "driver_id=" + this.driver_info.driver_id;
                const { data } = await getLineCaptainByDriverId(param);
                this.fleet_captain.driver_id = data.driver_id
                this.fleet_captain.name = data.name
            } catch (err) {
                console.log(err);
            }
        },
        async getViolationRecords() {
            try {
                this.query_loading = true
                this.show_table = true
                if (this.date == null || this.date[0] == undefined || this.date[1] == undefined) {
                    return
                }
                const start = Date.parse(this.date[0]) / 1000, end = Date.parse(this.date[1]) / 1000
                var param = "driver_id=" + this.driver_info.driver_id + '&start=' + start + '&end=' + end;
                const { data } = await violationByTimeRangeDriverId(param);
                var violations = data.violations;
                this.violation_items = []
                for (var i = 0; violations != null && i < violations.length; i++) {
                    var d = new Date(violations[i].time * 1000)
                    var violation = {
                        violation_type_id: violations[i].violation_type_id,
                        time: d.getFullYear() + "." + d.getMonth() + '.' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
                        driver_id:violations[i].driver_id,
                        stop_id :violations[i].stop_id,
                        line_id:violations[i].line_id,
                        bus_id:violations[i].bus_id,
                    };
                    this.violation_items.push(violation);
                }
                this.query_loading = false;

            } catch (err) {
                console.log(err);
            }
        },
    },

}
</script>
  