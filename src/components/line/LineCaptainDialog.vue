<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-pencil" rounded color="transparent" variant="flat" density="compact"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">线路 {{ line_id }} 的路长信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1">修改路队长</div>
                <v-combobox density="compact" variant="outlined" :items="driverItems" :hide-no-data="false"
                    v-model="choosedDriver">
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                暂无数据
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                </v-combobox>
                <v-btn type="submit" :disabled="this.choosedDriver == null" :loading="loading" block class="text-none mb-4"
                    color="indigo-darken-3" size="x-large" variant="flat" @click="submitNewCaptain()">
                    确认
                </v-btn>
                <v-alert :type="type" :text="msg" v-model="alert" closable @click:close="alert = false"
                    variant="outlined"></v-alert>

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
import { getDriverCaptainByLineId, setLineCaptain } from '@/api/api'
export default {
    props: ['line_id'],
    data() {
        return {
            dialog: false,
            chooseLoading: false,
            driverItems: [],
            choosedDriver: null,
            alert: false,
            type: '',
            msg: '',
            loading: false
        }
    },
    methods: {
        async fetchAvailableDriver() {
            const param = "line_id=" + this.line_id;
            try {
                this.chooseLoading = true
                const { data } = await getDriverCaptainByLineId(param)
                var members = data.members
                this.driverItems = []
                for (var i = 0; i < members.length; i++) {
                    var e = {
                        title: members[i].name,
                        driver_id: members[i].driver_id,
                        props: {
                            subtitle: "工号 " + members[i].driver_id
                        }
                    }
                    this.driverItems.push(e)
                }
                if (data.has_captain == true) {
                    this.choosedDriver = {
                        title: data.captain.name,
                        driver_id: data.captain.driver_id
                    }
                }
            }
            catch (err) {
                console.log(err)
            } finally {
                this.chooseLoading = false
            }
        },
        async submitNewCaptain() {
            const param = {
                line_id: this.line_id,
                driver_id: this.choosedDriver.driver_id
            }
            try {
                this.loading = true
                const { data } = await setLineCaptain(param)
                if (data.code == "200") {
                    this.msg = "成功将路线" + param.line_id + "的队长修改为" + this.choosedDriver.title
                    this.type = "success"
                } else {
                    this.msg = data.msg
                    this.type = "error"
                }
                this.alert = true
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }
        },

    },
    watch: {
        dialog(nv) {
            if (nv == true) {
                this.fetchAvailableDriver()
            } else {
                this.$emit("refresh")
                this.alert = false
            }
        }
    }

}
</script>
