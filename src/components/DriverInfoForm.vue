<template>
    <v-card elevation="0" max-width="500" class="mx-auto mt-2" scrollable>
        <v-card-title class="py-5 font-weight-black">输入新司机的信息</v-card-title>
        <v-card-text>你好，请按照相关要求填写司机信息</v-card-text>
        <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">姓名</div>
            <v-form validate-on="submit lazy" @submit.prevent="submit">
                <v-text-field density="compact" v-model="name" :rules="nameRules" :counter="15" label="姓名" hint="姓名在15个字符以内"
                    required variant="outlined">
                </v-text-field>
                <div class="text-subtitle-2 font-weight-black mb-1">工号</div>
                <v-text-field v-model="driver_id" density="compact" :counter="10" label="司机工号" hint="工号为5-10个数字" required
                    :rules="didRules" height="10" variant="outlined">
                </v-text-field>
                <div class="text-subtitle-2 font-weight-black mb-1">车队编号</div>
                <v-combobox density="compact" variant="outlined" :items="fleetsItems" v-model="choosedFleet"
                    :hide-no-data="false">
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
                <v-btn type="submit" :disabled="shouldDisabled" :loading="loading" block class="text-none mb-4"
                    color="indigo-darken-3" size="x-large" variant="flat" @click="submitDriverInfo()">
                    确认
                </v-btn>
                <v-alert :type="reply.type" closable v-model="alert" :title="reply.title" variant="outlined"
                    :text="reply.msg" @click:close="alert = false" density="compact">
                </v-alert>
            </v-form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import { getAllFleet, addDriver } from '@/api/api'
export default {
    data() {
        return {
            dialog: false,
            gender: "female",
            driver_id: '',
            name: '',
            loading: false,
            alert: false,
            nameRules: [
                value => {
                    if (value) return true
                    return '需要填写姓名'
                },
                value => {
                    if (value?.length <= 15) return true
                    return '名字不多于十五个字符'
                },

            ],
            didRules: [
                value => {
                    if (value) return true
                    return '请填写司机工号'
                },
                value => {
                    if (/^\d{5,10}$/.test(value)) return true
                    return '请填写有效工号(5-10位数字)'
                },
            ],
            year: new Date().getFullYear(),
            msg: undefined,
            reply: {

            },
            fleetsItems: [],
            choosedFleet: null,
        }
    },

    mounted() {
        this.fetchFleetInfo();

    },
    methods: {


        async fetchFleetInfo() {
            try {
                this.loading = true;

                const { data } = await getAllFleet()
                var arr = data.fleet_ids;
                for (var i = 0; i < arr.length; i++) {
                    var e = {
                        fleet_id: arr[i],
                        title: arr[i],
                    }
                    this.fleetsItems.push(e)
                }
                console.log(data)
            } catch (err) {
                console.log(err);
            }
            this.loading = false;


        },
        async submitDriverInfo() {
            var param = {
                year: this.year,
                fleet_id: this.choosedFleet.fleet_id,
                name: this.name,
                driver_id: this.driver_id,
                gender: this.gender,
            }
            try {
                const { data } = await addDriver(param)
                if (data.code == "200") {
                    this.reply.type = "success"
                    this.reply.title = "添加成功"
                    this.reply.msg = "司机 " + this.name + " 已经录入"
                } else {
                    this.reply.type = "error"
                    this.reply.title = "添加失败"
                    this.reply.msg = data.msg
                }
                this.alert = true
            } catch (err) {
                console.log(err)
            }

        }
    },
    computed: {
        shouldDisabled() {
            if (this.year != null && this.name != '' && this.gender != '' && this.driver_id != '' && this.choosedFleet != null) {
                return false;
            }
            return true;
        }
    }
}
</script> 
