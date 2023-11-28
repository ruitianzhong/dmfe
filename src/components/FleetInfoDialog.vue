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
                <v-btn :loading="loading" type="submit" block class="mt-2 mb-10" text="确认" color="indigo-darken-3" ></v-btn>
                <v-divider></v-divider>
                <div class="text-subtitle-2 font-weight-black mb-1 mt-5">车队司机</div>
                <v-data-table :items="violation_items" items-per-page="5" items-per-page-text="每页显示记录数量"
                    :headers="violation_headers" hover :item-value="item => `${item.time}`" loading-text="数据加载中,请稍等">
                </v-data-table>

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
            driverItems: [
                {
                    name: 'Alice',
                    did: '00000',
                    title: "Alice",
                    props: {
                        subtitle: "工号 00000",

                    }
                },
                {
                    name: 'Bob',
                    did: '00001',
                    title: 'Bob',
                    props: {
                        subtitle: "工号 00001",
                    }
                },
                {
                    name: 'Cindy',
                    did: '00002',
                    title: 'Cindy',
                    props: {
                        subtitle: "工号 00002"
                    }
                }
            ],
            choosedDriver: null,
        }
    },
    onMounted() {
    }

}
</script>
  