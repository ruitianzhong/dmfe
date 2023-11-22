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
            <v-combobox density="compact" variant="outlined" :items="fleetsItems" :hide-no-data="false" v-model="fleet">
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            暂无数据
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox>
            <div class="text-subtitle-2 font-weight-black mb-1">路线</div>
            <v-combobox density="compact" variant="outlined" :items="lineItems" :hide-no-data="false" v-model="line">
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
                    <v-btn-toggle density="compact" v-model="gender" color="primary" class="mb-4 text-none" mandatory>
                        <v-btn value="male">男</v-btn>
                        <v-btn value="female">女</v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <div class="text-subtitle-2 font-weight-black mb-1">出生年份</div>
                    <VueDatePicker v-model="year" year-picker locale="zh-cn" modelHeight="255" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="loading" :loading="loading" prepend-icon="mdi-refresh" block class="text-none mb-4" color="green-lighten-1"
                        size="x-large" variant="flat">
                        恢复
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn :disabled="loading" :loading="loading" block class="text-none mb-4" color="indigo-darken-3"
                        size="x-large" variant="flat">
                        确认
                    </v-btn>

                </v-col>

            </v-row>
        </v-card-text>
    </v-card>
</template>
  
<script>
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
            driverItems: [
                {
                    name: 'Alice',
                    did: '00000',
                    title: "Alice",
                    props: {
                        subtitle: "工号 00000 车队 01",

                    }
                },
                {
                    name: 'Bob',
                    did: '00001',
                    title: 'Bob',
                    props: {
                        subtitle: "工号 00001 车队 02",
                    }
                },
                {
                    name: 'Cindy',
                    did: '00002',
                    title: 'Cindy',
                    props: {
                        subtitle: "工号 00002 车队03"
                    }
                }
            ],
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
            fleet: {
                title: '2号车队',
                fno: 3,
            }

        }
    },

    components: {},
    methods: {
        async submit() {
            this.loading = true

            const results = await this.sendDriverInfo('user data')
            this.reply = results
            this.loading = false
            this.alert = true

        },
        violationInfo() {
            if (this.date != null && this.choosedDriver != null) {
                return {
                    did: this.choosedDriver.did,
                    name: this.choosedDriver.name,
                    choosedBus: this.choosedBus,
                    choosedStop: this.choosedStop,
                    date: this.date,
                    choosedType: this.choosedType,
                    line: this.line,
                }
            } else {
                return {
                    noData: true
                }
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
    },
}
</script> 
