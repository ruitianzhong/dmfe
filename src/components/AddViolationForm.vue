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
               <ViolationDetailDialog  :disabled="!shouldSubmit" :violation-info="violationInfo()" ></ViolationDetailDialog>
            </v-form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import ViolationDetailDialog from './ViolationDetailDialog.vue'
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
            violationTypes: [
                {
                    title: '闯红灯',
                    vid: '111'
                },
                {
                    title: '未礼让行人',
                    vid: '112'
                }
            ],
            violationStops:[
                {
                    title:'省体育馆',
                    sno:'省体育馆'
                },
                {
                    title:'篮球中心',
                    sno:'篮球中心'
                }
            ],
            violationCars:[
                {
                    title:'陕A12345',
                    bno:'陕A12345'
                },
                {
                    title:'陕A54321',
                    bno:'陕A12345'
                }

            ],

            choosedDriver: null,
            choosedType: null,
            date: null,
            choosedBus:null,
            choosedStop:null,
        }
    },

    components: { ViolationDetailDialog },
    methods: {
        async submit() {
            this.loading = true

            const results = await this.sendDriverInfo('user data')
            this.reply = results
            this.loading = false
            this.alert = true

        },
        violationInfo(){
           if (this.date!=null&&this.choosedDriver != null && this.choosedBus != null && this.choosedStop != null && this.choosedType != null) {
                return {
                    did: this.choosedDriver.did,
                    name: this.choosedDriver.name,
                    choosedBus: this.choosedBus.bno,
                    choosedStop: this.choosedStop.sno,
                    date: this.date,
                    choosedType: this.choosedType
                }
            } else {
                return {
                    noData:true
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
    computed:{
        shouldSubmit(){
            return this.date != null && this.choosedDriver != null && this.choosedBus != null && this.choosedStop != null && this.choosedType != null
        }
    },
}
</script> 
