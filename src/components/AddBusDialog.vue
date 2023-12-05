<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-plus-thick" text="新增" rounded color="#07C160" variant="flat"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">添加新的车辆</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1">车牌号</div>
                <v-form validate-on="submit lazy" @submit.prevent="submit">
                    <v-text-field density="compact" v-model="bus_id" :counter="15" label="车牌号" :rules="busIdRules" requried
                        variant="outlined">
                    </v-text-field>

                    <div class="text-subtitle-2 font-weight-black mb-1">路线编号</div>
                    <v-combobox label="请选择路线" height="1" density="compact" width="300" variant="outlined" :items="lineItems"
                        :hide-no-data="false" v-model="choosedLine" :rules="lineRules">
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    暂无数据
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-combobox>
                    <v-btn type="submit" :loading="loading" block class="text-none mb-4" color="indigo-darken-3"
                        size="x-large" variant="flat" :disabled="choosedLine == null || bus_id == null">
                        确认
                    </v-btn>
                    <v-alert :type="reply.type" closable v-model="alert" :title="reply.title" variant="outlined"
                             density="compact" @click:close="alert = false" :text="reply.msg">
                    </v-alert>
                </v-form>
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
import { addOneBus, getAllLineInfo } from '@/api/api';
export default {
    data(vm) {
        return {
            alert: false,
            reply: {},
            dialog: false,
            bus_id: null,
            lineItems: [],
            choosedLine: null,
            busIdRules: [value => vm.checkBusId(value)],
            lineRules: [value => vm.checkLineId(value)],
            loading: false,
            needrefresh:false
        }
    },
    methods: {
        async submit(event) {
            this.loading = true
            await event;
            if (this.checkBusId(this.bus_id)!=true || this.checkLineId(this.choosedLine)!=true){
                this.loading = false;
                return
            }
            var id = this.bus_id;
            const req = {
                line_id: this.choosedLine,
                bus_id: this.bus_id,
            }
            
            try {

                const { data } = await addOneBus(req);
            
                if (data.code=='200'){
                    this.reply = {
                        msg: "成功添加车辆 " + id,
                        type: "success"
                    }
                    this.needrefresh = true;

                } else {
                    this.reply = {
                        type: "error",
                        msg: data.msg,
                    }

                }
                this.alert = true;

            } catch (err) {
                console.log(err)
            }
            this.loading = false;
        },
        checkBusId(value) {
            if (value.trim() == '') {
                return '请输入有效车牌号'
            }
            return true
        },

        checkLineId(value) {
            if (value == null) {
                return '请选择车队'
            }
            return true;

        },

        async fetchLineInfo() {

            try {
                const { data } = await getAllLineInfo()
                const arr = data.all_info;
                for (var i = 0; i < arr.length; i++) {
                    this.lineItems.push(arr[i].line_id)
                }
            } catch (err) {
                console.log(err)
            }
        },
    },
    watch: {
        dialog(newValue) {
            if (newValue == true) {
                this.alert = false;
                this.choosedLine = null;
                this.bus_id = null;
                this.needrefresh = false;
                this.fetchLineInfo()
            }else {
                if (this.needrefresh == true) {
                    this.$emit('refresh')
                }
            }
           
        }
    },
    mounted() {
    }

}
</script>
  