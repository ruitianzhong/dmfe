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
            <div class="text-subtitle-2 font-weight-black mb-1">司机姓名</div>
            <v-text-field density="compact" v-model="name" :counter="15" label="姓名" hint="姓名在15个字符以内" variant="outlined"
                :disabled="shouldFormDisabled">
            </v-text-field>

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

            <div class="text-subtitle-2 font-weight-black mb-1">路线
                <span class="text-subtitle-2 font-weight-black mb-3" v-if="this.choosedDriver != null">(原路线 {{ originLine()
                }})
                </span>


            </div>
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
                    <v-btn :disabled="loading" prepend-icon="mdi-refresh" block class="text-none mb-4"
                        color="green-lighten-1" size="x-large" variant="flat">
                        恢复
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn :disabled="submitDisabled" :loading="loading" block class="text-none mb-4"
                        color="indigo-darken-3" size="x-large" variant="flat" @click="submitNewInfo()">
                        确认
                    </v-btn>

                </v-col>
            </v-row>
            <v-alert v-model="alert" @click:close="alert = false" :type="alertType" :text="msg" variant="outlined"
                closable></v-alert>
        </v-card-text>
    </v-card>
</template>
  
<script>
import { getAllDriverInfo, getAllFleet, getLineByFleetId, modifyDriverInfo } from '@/api/api'
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
            lineItems: [],
            choosedDriver: null,
            line: null,
            year: '1997',
            fleetsItems: [],
            fleet: null,
            alertType: "",

        }
    },

    components: {},
    methods: {

        originLine() {
            if (this.choosedDriver != null && this.choosedDriver.line_id != '') {
                return this.choosedDriver.line_id
            } else {
                return "未分配车队"
            }
        },
        async fetchAllDriverInfo() {
            try {
                const { data } = await getAllDriverInfo();
                var arr = data.driver_info
                this.driverItems = []
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        driver_id: arr[i].driver_id,
                        line_id: arr[i].line_id,
                        fleet_id: arr[i].fleet_id,
                        name: arr[i].name,
                        title: arr[i].name,
                        gender: arr[i].gender,
                        year: arr[i].year,
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
        async submitNewInfo() {
            const param = {
                year: this.year,
                fleet_id: this.fleet.fleet_id,
                line_id: this.line.line_id,
                gender: this.gender,
                driver_id: this.choosedDriver.driver_id,
                name: this.name,
            }
            this.loading = true
            try {

                const { data } = await modifyDriverInfo(param)
                if (data.code == '200') {
                    this.alertType = "success"
                    this.msg = "成功修改工号 " + param.driver_id + " 的信息"
                } else {
                    this.alertType = "error"
                    this.msg = data.msg
                }
                this.alert = true

                this.fleet = null;
                this.fleetsItems = []
                this.lineItems = []
                this.year = null
                this.name = ''
                this.choosedDriver = null
                this.fetchAllDriverInfo()
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }

        },
        async fetchAvailableLine() {
            if (this.fleet != null) {
                var param = "fleet_id=" + this.fleet.fleet_id
                this.lineItems = []
                try {
                    const { data } = await getLineByFleetId(param)
                    var arr = data.line_id;
                    for (var i = 0; i < arr.length; i++) {
                        var e = {
                            title: arr[i],
                            line_id: arr[i]
                        }
                        this.lineItems.push(e)
                    }
                    if (this.choosedDriver.fleet_id == this.fleet.fleet_id && this.choosedDriver.line_id != '') {
                        this.line = { title: this.choosedDriver.line_id, line_id: this.choosedDriver.line_id }
                    }
                } catch (err) {
                    console.log(err)
                }
            }
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
            if (this.choosedDriver != null && this.line != null && this.fleet != null && this.gender != null && this.year != null && this.name != '') {
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
                this.name = nv.name
                if (nv.gender == "男") {
                    this.gender = "male"
                } else {
                    this.gender = "female"
                }
                this.year = nv.year

            } else {
                this.fleet = null;
                this.fleetsItems = []
                this.lineItems = []
                this.year = null
                this.name = ''
            }
        },
        fleet(nv) {
            this.line = null;
            if (nv != null) {
                this.fetchAvailableLine()
            }
        }

    }
}
</script> 
