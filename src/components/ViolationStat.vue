<script >
import { defineComponent } from "vue";
import { VChart } from "@visactor/vchart";
import { getAllFleet, violationStatByTimeRangeAndFleetId } from '@/api/api'

export default defineComponent({

    setup() {
        let vchart = null;
        const createOrUpdateChart = (nv) => {
            const container = document.getElementById("123");
            if (container && !vchart) {
                vchart = new VChart({
                    type: 'pie',
                    data: [
                        {
                            id: 'id0',
                            values: [],
                        }
                    ],
                    outerRadius: 0.8,
                    valueField: 'value',
                    categoryField: 'type',
                    title: {
                        visible: false,
                        text: '违章类型饼图'
                    },
                    legends: {
                        visible: true,
                        orient: 'left'
                    },
                    label: {
                        visible: true
                    },
                    tooltip: {
                        mark: {
                            content: [
                                {
                                    key: datum => datum['type'],
                                    value: datum => datum['value']
                                }
                            ]
                        }
                    }
                }, { dom: '123' });
                vchart.renderAsync();
                // chart.renderAsync();
                return true;
            } else if (vchart) {
                vchart.updateSpec({
                    type: 'pie',
                    data: [
                        {
                            id: 'id0',
                            values: nv,
                        }
                    ],
                    outerRadius: 0.8,
                    valueField: 'value',
                    categoryField: 'type',
                    title: {
                        visible: false,
                        text: '违章类型饼图'
                    },
                    legends: {
                        visible: true,
                        orient: 'left'
                    },
                    label: {
                        visible: true
                    },
                    tooltip: {
                        mark: {
                            content: [
                                {
                                    key: datum => datum['type'],
                                    value: datum => datum['value']
                                }
                            ]
                        }
                    }
                });
                // chart.renderAsync();
                vchart.renderAsync();
                return true;
            }
            return false;
        };

        const releaseChart = () => {
            if (vchart) {
                vchart.release();
                vchart = null;
            }
        };

        return {
            createOrUpdateChart,
            releaseChart,
        };
    },
    data() {
        return {
            choosedFleet: null,
            fleetItems: [],
            date: null,
            violation_data: [],
            copy: [],
            ready: false,
        }
    },

    methods: {
        async fetchFleetItem() {
            try {
                const { data } = await getAllFleet()
                var arr = data.fleet_ids;
                this.fleetItems = [];
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        title: arr[i],
                        fleet_id: arr[i],
                    }
                    this.fleetItems.push(e);
                }
            } catch (err) {
                console.log(err);
            }

        },
        async fetchViolationInfo() {
            if (this.choosedFleet != null && this.date != null && this.date[0] != undefined && this.date[1] != undefined) {
                var start = Date.parse(this.date[0]) / 1000, end = Date.parse(this.date[1]) / 1000, fleet_id = this.choosedFleet.fleet_id;
                var param = "start=" + start + "&end=" + end + "&fleet_id=" + fleet_id;
                console.log(param)
                try {
                    this.violation_data = [];
                    const { data } = await violationStatByTimeRangeAndFleetId(param);
                    var arr = data.violation_stat;
                    var temp = [];
                    for (var i = 0; arr != null && i < arr.length; i++) {
                        var e = {
                            type: arr[i].violation_type_id,
                            value: arr[i].count,
                        }
                        temp.push(e);
                    }
                    this.violation_data = temp;
                    this.copy = temp;
                    this.createOrUpdateChart(temp);

                } catch (err) {
                    console.log(err)
                }
            }
        },
        query() {
            this.fetchViolationInfo();
        }

    },
    computed: {
        show() {
            return this.date != null && this.choosedFleet != null && this.date[0] != undefined && this.date[1] != undefined;
        }
    },
    mounted() {
        this.fetchFleetItem();
        this.createOrUpdateChart(this.violation_data);
    },
    watch: {
    },

    updated() {
        this.createOrUpdateChart();
    },
    beforeUnmount() {
        this.releaseChart();
    },
});
</script>




<template>
    <v-app-bar border flat density="compact">

        <v-app-bar-title>
            <v-icon color="blue">mdi-database</v-icon>
            车队违章数据透视
        </v-app-bar-title>
    </v-app-bar>
    <br />
    <v-row class="d-flex pe-2 text-center ml-10" justify="center">
        <v-col cols="5">
            <v-combobox label="请选择车队" height="1" density="compact" width="300" variant="outlined" :items="fleetItems"
                :hide-no-data="false" v-model="choosedFleet">
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            暂无数据
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox>
        </v-col>
        <v-col cols="5">
            <VueDatePicker v-model="date" range placeholder="请选择查询的时间范围" :max-date="new Date()" locale="zh-cn" />
        </v-col>
        <v-col cols="2">
            <v-btn text="查询" variant="flat" color="#07C160" prepend-icon="mdi-magnify" @click="query()"
                :disabled="!(choosedFleet != null && date != null && date[0] != undefined && date[1] != undefined)"></v-btn>
        </v-col>
    </v-row>
    <v-table v-if="ready">
        <thead>
            <tr>
                <th class="text-left">
                    违章类型
                </th>
                <th class="text-left">
                    次数
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in copy" :key="item.type">
                <td>{{ item.type }}</td>
                <td>{{ item.value }}</td>
            </tr>
        </tbody>
    </v-table>
    <div class="treemap-container" id="123"></div>
</template> 


<style scoped>
.treemap-container {
    width: 100%;
    height: 400px;
}
</style>

