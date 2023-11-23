<script >
import { defineComponent } from "vue";
import { VChart } from "@visactor/vchart";


export default defineComponent({

    setup() {
        let vchart;
        let chart = null;
        const createOrUpdateChart = () => {
            const container = document.getElementById("123");
            if (container && !vchart) {
                // chart = new VChart(parseSpec(chartProps), {
                //   dom: container,
                // });
                vchart = new VChart({
                    type: 'pie',
                    data: [
                        {
                            id: 'id0',
                            values: [
                                { type: 'oxygen', value: '46.60' },
                                { type: 'silicon', value: '27.72' },
                                { type: 'aluminum', value: '8.13' },
                                { type: 'iron', value: '5' },
                                { type: 'calcium', value: '3.63' },
                                { type: 'sodium', value: '2.83' },
                                { type: 'potassium', value: '2.59' },
                                { type: 'others', value: '3.5' }
                            ]
                        }
                    ],
                    outerRadius: 0.8,
                    valueField: 'value',
                    categoryField: 'type',
                    title: {
                        visible: true,
                        text: '违章类型'
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
                                    value: datum => datum['value'] + '%'
                                }
                            ]
                        }
                    }
                }, { dom: '123' });
                vchart.renderAsync();
                // chart.renderAsync();
                return true;
            } else if (chart) {
                // chart.updateSpec(parseSpec(chartProps));
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
            choosedFleet: [{
                title: '全部',
                fid: -1,
            }],
            fleetItems: [
                {
                    title: '全部',
                    fid: -1,
                },
                {
                    title: '1号车队',
                    fid: 1,
                },
                {
                    title: '2号车队',
                    fid: 2,
                }
            ],
        }
    },

    mounted() {
        this.createOrUpdateChart();
    },

    updated() {
        this.createOrUpdateChart();
    },

    beforeUnmount() {
        this.releaseChart();
    },
});
</script>

<!-- <template>
  <h1>this is a demo of barchart</h1>

<div class="barchart-container" id="barchart-container"></div>
  <div class="abc" id="123"></div>

</template> -->


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
                :hide-no-data="false" v-model="choosedFleet" multiple>
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
    </v-row>
    <table>

        <div class="treemap-container" id="123"></div>

    </table>
</template> 


<style scoped>
.treemap-container {
    width: 100%;
    height: 400px;
}
</style>

