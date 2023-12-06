<template>
    <v-card elevation="0" max-width="500" class="mx-auto  pt-5" scrollable>
        <v-card-title class="py-5 font-weight-black">更新司机信息</v-card-title>
        <v-card-text>你好，请按照相关要求更新司机信息</v-card-text>
        <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">司机</div>
            <v-combobox label="请选择司机" density="compact" variant="outlined" :items="driverItems" :hide-no-data="false"
                v-model="choosedDriver">
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            暂无数据
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox>

            <div class="text-subtitle-2 font-weight-black mb-1">车队编号</div>
            <v-combobox :disabled="shouldFormDisabled" density="compact" variant="outlined" :items="fleetsItems"
                :hide-no-data="false" v-model="fleet">
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            暂无数据
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox>
            <div class="text-subtitle-2 font-weight-black mb-1">路线</div>
            <v-combobox density="compact" :disabled="shouldFormDisabled" variant="outlined" :items="lineItems"
                :hide-no-data="false" v-model="line">
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            暂无数据
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox>


            <v-row>
                <v-col>
                    <div class="text-subtitle-2 font-weight-black mb-1">性别</div>
                    <v-btn-toggle :disabled="shouldFormDisabled" density="compact" v-model="gender" color="primary"
                        class="mb-4 text-none" mandatory>
                        <v-btn value="male">男</v-btn>
                        <v-btn value="female">女</v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <div class="text-subtitle-2 font-weight-black mb-1">出生年份</div>
                    <VueDatePicker :disabled="shouldFormDisabled" v-model="year" year-picker locale="zh-cn"
                        modelHeight="255" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="loading" :loading="loading" prepend-icon="mdi-refresh" block class="text-none mb-4"
                        color="green-lighten-1" size="x-large" variant="flat">
                        恢复
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn :disabled="submitDisabled" :loading="loading" block class="text-none mb-4"
                        color="indigo-darken-3" size="x-large" variant="flat">
                        确认
                    </v-btn>

                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
  
<script>
import { getAllDriverInfo, getAllFleet } from '@/api/api'
export default {
    data() {
        return {
            dialog: false,
            gender: "female",
            did: '',
            name: '',
            loading: false,
            msg: undefined,
            alert: false,
            reply: undefined,
            driverItems: [],
            lineItems: [
                {
                    name: '1路',
                    title: '1路',
                    lno: 1
                },
                {
                    name: '2路',
                    title: '2路',
                    lno: 2
                }
            ],
            choosedDriver: null,
            line: {
                name: '1路',
                lno: 1,
                title: '1路'
            },
            year: '1997',
            fleetsItems: [
                { title: '2号车队', fno: 2 },
                { title: '3号车队', fno: 3 },
            ],
            fleet: null,

        }
    },

    components: {},
    methods: {
        async fetchAllDriverInfo() {
            try {
                const { data } = await getAllDriverInfo();
                var arr = data.driver_info
                this.driverItems = []
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        driver_id: arr[i].driver_id,
                        line_id: arr[i].driver_id,
                        fleet_id: arr[i].fleet_id,
                        title: arr[i].name,
                        props: {
                            subtitle: "工号 " + arr[i].driver_id + " 车队 " + arr[i].fleet_id,
                        }
                    }
                    this.driverItems.push(e)
                }


            } catch (err) {
                console.log(err);
            }

        },
        async fetchFleetInfo() {
            try {
                const { data } = await getAllFleet();
                this.fleetsItems = []
                var arr = data.fleet_ids;
                for (var i = 0; i < arr.length; i++) {
                    const e = {
                        title: arr[i],
                        fleet_id: arr[i],
                    }
                    this.fleetsItems.push(e);
                }
                this.fleet = { title: this.choosedDriver.fleet_id, fleet_id: this.choosedDriver.fleet_id }
            } catch (err) {
                console.log(err)
            }
        },
        async fetchAvailableLine() {

        }
    },
    computed: {
        shouldFormDisabled() {
            if (this.choosedDriver != null) {
                return false;
            }
            return true
        },
        submitDisabled() {
            if (this.choosedDriver != null && this.line != null && this.fleet != null && this.gender != null && this.year != null) {
                return false
            }
            return true
        }
    },
    mounted() {
        this.fetchAllDriverInfo();
    },
    watch: {
        choosedDriver(nv) {
            if (nv != null) {
                this.fetchFleetInfo();
            }
        }

    }
}
</script> 
