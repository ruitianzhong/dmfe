<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-pencil" rounded color="transparent" variant="flat"
                density="compact"></v-btn>
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
                <v-btn type="submit" :disabled="loading" :loading="loading" block class="text-none mb-4"
                    color="indigo-darken-3" size="x-large" variant="flat">
                    确认
                </v-btn>
                

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
    props: ['line_id'],
    data() {
        return {
            dialog: false,

            colors: [
                'teal-lighten-3',
                'pink',
                'red-lighten-2',
                'purple-lighten-2',
                'green-lighten-1',
                'indigo-lighten-2',
            ],
            stopItems: [
                {
                    stop_id: '省政府'
                },
                {
                    stop_id: '省体育馆'
                },
                {
                    stop_id: '小寨'
                },
                {
                    stop_id: '国际机场'
                },
                {
                    stop_id: '北客站'
                },
                {
                    stop_id: '西安南站',
                },
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
        }
    },

}
</script>
