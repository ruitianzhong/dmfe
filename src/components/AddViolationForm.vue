<template>
    <v-card elevation="0" max-width="500" class="mx-auto  pt-5" scrollable>
        <v-card-title class="py-5 font-weight-black">录入新的违章信息</v-card-title>
        <v-card-text>你好，请按照相关要求填写司机信息</v-card-text>
        <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">司机</div>
            <v-form validate-on="submit lazy" @submit.prevent="submit">
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


                <div class="text-subtitle-2 font-weight-black mb-1">车辆</div>
                <v-combobox label="请选择违章车辆" density="compact" variant="outlined" :disabled="choosedDriver == null"
                    :items="violationCars" :hide-no-data="false" v-model="choosedBus">
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                暂无数据
                            </v-list-item-title>
                        </v-list-item>
                    </template>

                </v-combobox>
                <div class="text-subtitle-2 font-weight-black mb-1">站点</div>
                <v-combobox label="请选择违章站点" density="compact" variant="outlined" :disabled="choosedDriver == null"
                    :items="violationStops" :hide-no-data="false" v-model="choosedStop">
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                暂无数据
                            </v-list-item-title>
                        </v-list-item>
                    </template>

                </v-combobox>


                <div class="text-subtitle-2 font-weight-black mb-1">违章类型</div>
                <v-combobox label="请选择违章类型" density="compact" variant="outlined" :disabled="choosedDriver == null"
                    :items="violationTypes" :hide-no-data="false" v-model="choosedType">
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                暂无数据
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                </v-combobox>
                <div class="text-subtitle-2 font-weight-black mb-1">违章时间</div>
                <VueDatePicker v-model="date" :disabled="choosedDriver == null" locale="zh-cn" placeholder="请选择违章的时间"
                    :max-date="new Date()" />
                {{ date }}
                {{ date == null ? undefinded : Date.parse(date) }}
                <ViolationDetailDialog :disabled="!shouldSubmit" :violation-info="violationInfo()"></ViolationDetailDialog>
            </v-form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import ViolationDetailDialog from './ViolationDetailDialog.vue'
import { getAllDriverInfo, getAllViolationTypes, getStopsByLineId } from '@/api/api'
export default {
    data() {
        return {
            dialog: false,
            gender: "female",
            did: '',
            name: '',
            loading: false,
            year: new Date().getFullYear(),
            msg: undefined,
            alert: false,
            reply: undefined,
            driverItems: [],
            violationTypes: [],
            violationStops: [],
            violationCars: [],
            choosedDriver: null,
            choosedType: null,
            date: null,
            choosedBus: null,
            choosedStop: null,
        }
    },
    components: { ViolationDetailDialog },
    methods: {
        async fetchAllDriverInfo() {
            try {
                const { data } = await getAllDriverInfo();
                this.driverItems = []
                var arr = data.driver_info;
                for (var i = 0; i < arr.length; i++) {
                    var item = {
                        driver_id: arr[i].driver_id,
                        title: arr[i].name,
                        props: {
                            subtitle: '工号 ' + arr[i].driver_id + ' 车队 ' + arr[i].fleet_id
                        },
                        line_id: arr[i].line_id,
                        name: arr[i].name
                    }
                    this.driverItems.push(item);
                }
            } catch (err) {
                console.log(err)
            }


        },

        async fetchViolationType() {
            try {
                const { data } = await getAllViolationTypes();
                var arr = data.violation_types;
                this.violationTypes = []
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        violation_typ_id: arr[i],
                        title: arr[i],
                    }
                    this.violationTypes.push(e)
                }
            } catch (err) {
                console.log(err)
            }
        },
        async submit() {
            this.loading = true

            const results = await this.sendDriverInfo('user data')
            this.reply = results
            this.loading = false
            this.alert = true

        },
        violationInfo() {
            if (this.date != null && this.choosedDriver != null && this.choosedBus != null && this.choosedStop != null && this.choosedType != null) {
                return {
                    driver_id: this.choosedDriver.driver_id,
                    name: this.choosedDriver.name,
                    choosedBus: this.choosedBus,
                    choosedStop: this.choosedStop,
                    date: this.date,
                    choosedType: this.choosedType,
                    line: this.choosedDriver.line_id
                }
            } else {
                return {
                    noData: true
                }
            }

        },

        async fetchLineStops() {
            var param = "line_id=" + this.choosedDriver.line_id;
            try {
                var { data } = await getStopsByLineId(param);
                this.violationStops = [];
                var arr = data.stop_ids
                for (var i = 0; i < arr.length; i++) {
                    const e = {
                        stop_id: arr[i],
                        title: arr[i]
                    }
                    this.violationStops.push(e);
                }

                arr = data.bus_ids;
                this.violationCars = []
                for (i = 0; i < arr.length; i++) {
                    const e = {
                        bus_id: arr[i],
                        title: arr[i],
                    }
                    this.violationCars.push(e)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async sendDriverInfo(userName) {
            return new Promise(resolve => {
                clearTimeout(this.timeout)

                this.timeout = setTimeout(() => {
                    if (!userName) return resolve('Please enter a user name.')
                    if (userName === 'johnleider')
                        return resolve('User name already taken. Please try another one.')
                    var reply = { type: "error", msg: "已经存在相同id用户", title: '错误' } // mcoking the data
                    return resolve(reply)
                }, 1000)
            })
        },
    },
    computed: {
        shouldSubmit() {
            return this.date != null && this.choosedDriver != null && this.choosedBus != null && this.choosedStop != null && this.choosedType != null
        }
    },
    mounted() {
        this.fetchAllDriverInfo();
        this.fetchViolationType();
    },
    watch: {
        choosedDriver(nv) {
            this.choosedBus = null
            this.choosedStop = null
            this.choosedType = null
            if (nv != null) {
                this.fetchLineStops();
            }
        }
    }
}
</script> 
