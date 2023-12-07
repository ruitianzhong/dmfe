<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-plus-thick" text="新增" rounded color="#07C160" variant="flat"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">添加新的路线</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
                <v-card rounded variant="text" max-width="350" class="mx-auto  mt-1
 rounded-lg
" scrollable>
                    <v-card-text>
                        <p class="mb-2">新路线名称</p>
                        <v-text-field v-model="line_id" variant="outlined" color="blue" bg-color="white"
                            :rules="userIdRules" density="compact"></v-text-field>
                        <p class="mb-2">选择车队</p>
                        <v-combobox height="1" density="compact" width="300" variant="outlined" :items="fleetItems"
                            :hide-no-data="false" v-model="choosedFleet">
                            <template v-slot:no-data>
                                <v-list-item>
                                    <v-list-item-title>
                                        暂无数据
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-combobox>
                        <p class="mb-2">新路线的站点</p>
                        <v-combobox v-model="choosedStops" v-model:search="search" :hide-no-data="false"
                            :items="stopIdItems" hide-selected hint="请按照路线的站点顺序选择" density="compact" multiple
                            persistent-hint small-chips variant="outlined">
                            <template v-slot:no-data>
                                <v-list-item>
                                    <v-list-item-title>
                                        没有更多站点了
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-combobox>
                        <v-btn :loading="loading" type="submit" block class="mt-2 mb-5" text="确认" color="#008000"
                            density="default" :disabled="submitDisabled" @click="submit"></v-btn>
                        <v-alert v-model="alert" closable variant="outlined" :type="reply.type" :text="reply.msg"></v-alert>

                    </v-card-text>
                </v-card>
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
import { getAllStops, getAllFleet, addLine } from '@/api/api';
export default {
    data() {
        return {
            alert: false,
            reply: {
                type: 'success',
                title: 'title',
                msg: 'success!',
            },
            dialog: false,
            bus_id: null,
            stopIdItems: [],
            choosedStops: [],
            line_id: '',
            choosedFleet: null,
            fleetItems: [],
            loading: false
        }

    },
    methods: {
        async submit() {
            const param = {
                line_id: this.line_id,
                fleet_id: this.choosedFleet,
                stop_ids: this.choosedStops,
            }
            const s = JSON.stringify(param)
            this.loading = true
            try {
                const { data } = await addLine(s)
                if (data.code == "200") {
                    this.reply.type = "success"
                    this.reply.msg = "成功录入新线路 " + param.line_id
                } else {
                    this.reply.type = "error"
                    this.reply.msg = data.msg

                }
                this.alert = true
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }
        },
        async fetchAllStop() {
            try {
                const { data } = await getAllStops()
                this.stopIdItems = data.stop_ids;
            } catch (err) {
                console.log(err)
            }

        },
        async fetchAllFleet() {
            try {
                const { data } = await getAllFleet()
                this.fleetItems = data.fleet_ids

            } catch (err) {
                console.log(err)
            }
        }
    },
    watch: {
        dialog(nv) {
            if (nv == true) {
                this.fetchAllStop()
                this.fetchAllFleet()
            } else {
                this.choosedStops = []
                this.line_id = ''
                this.choosedFleet = null
                this.alert = false
                this.$emit('refresh')
            }

        }
    },
    computed: {
        submitDisabled() {
            if (this.choosedStops != null && this.choosedStops.length != 0 && this.line_id != '' && this.choosedFleet != null) {
                return false
            }
            return true
        }
    }
}
</script>
  