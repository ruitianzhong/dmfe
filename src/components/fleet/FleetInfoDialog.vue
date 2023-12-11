<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn color="transparent" rounded v-bind="props" icon="mdi-pencil" density="compact" variant="flat"> </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">车队{{ fleet_id }} 的信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1">修改车队队长</div>
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
                <v-btn :loading="loading" type="submit" block class="mt-5 mb-5 " text="确认"
                    :disabled="this.choosedDriver == null" color="indigo-darken-3" size="x-large"
                    @click="setNewFleetCaptain()"></v-btn>
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
import { getFleetMembers, setFleetCaptain } from '@/api/api';
export default {
    props: ['fleet_id'],
    data() {
        return {
            dialog: false,
            year: '1990',
            gender: '男',
            fleet_leader: 'Alice',
            start: null,
            end: null,
            date: null,
            choosedDriver: null,
            loading: false,
            violation_headers: [
                {
                    title: '工号',
                    key: 'driver_id',
                    align: 'start',
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'end'
                }
            ],
            violation_items: [
                {
                    driver_id: '123',
                    name: 'Amy'
                },
                {
                    driver_id: '23',
                    name: 'Mike',
                }
            ],
            driverItems: [],
            msg: '',
            type: '',
            alert: false,
        }
    },
    onMounted() {
    },
    methods: {
        async fetchAvailableDriverForFleetCaptain() {
            const param = "fleet_id=" + this.fleet_id;
            try {
                this.driverItems = []
                const { data } = await getFleetMembers(param)
                const members = data.fleet_members
                for (var i = 0; i < members.length; i++) {
                    var e = {
                        name: members[i].name,
                        driver_id: members[i].driver_id,
                        title: members[i].name,
                        props: {
                            subtitle: "工号 " + members[i].driver_id
                        }
                    }
                    this.driverItems.push(e)
                }
                if (data.has_captain == true) {
                    this.choosedDriver = {
                        title: data.captain.name,
                        driver_id: data.captain.driver_id,
                        name: data.captain.name,
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
        async setNewFleetCaptain() {
            const param = {
                fleet_id: this.fleet_id,
                driver_id: this.choosedDriver.driver_id
            }
            this.loading = true
            try {
                const { data } = await setFleetCaptain(param)
                if (data.code == "200") {
                    this.type = "success"
                    this.msg = "车队" + this.fleet_id + "的队长已经变更为" + this.choosedDriver.name
                } else {
                    this.type = "error"
                    this.msg = data.msg
                }
                this.alert = true
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false;
            }
        }
    },
    watch: {
        dialog(nv) {
            if (nv == true) {
                this.fetchAvailableDriverForFleetCaptain()
            } else {
                this.alert = false;
                this.$emit('refresh')
            }
        }
    }

}
</script>
  