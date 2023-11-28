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

                        <v-form validate-on="submit lazy" @submit.prevent="submit">
                            <p class="mb-2">新路线名称</p>
                            <v-text-field v-model="userId" variant="outlined" color="blue" bg-color="white"
                                :rules="userIdRules" density="compact"></v-text-field>
                            <p class="mb-2">选择车队</p>
                            <v-combobox height="1" density="compact" width="300" variant="outlined" :items="fleetItems"
                                :hide-no-data="false" v-model="choosedFleet" multiple>
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-title>
                                            暂无数据
                                        </v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-combobox>
                            <p class="mb-2">新路线的站点</p>
                            <v-combobox v-model="model" v-model:search="search" :hide-no-data="false" :items="stopIdItems"
                                hide-selected hint="请按照路线的站点顺序选择" density="compact" multiple persistent-hint small-chips>
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-title>
                                            没有更多站点了
                                        </v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-combobox>
                            <v-btn :loading="loading" type="submit" block class="mt-2" text="确认" color="#008000"
                                density="default"></v-btn>
                        </v-form>
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
export default {
    data() {
        return {
            alert: true,
            reply: {
                type: 'success',
                title: 'title',
                msg: 'success!',
            },
            dialog: false,
            bus_id: null,
            stopIdItems: [
                '丈八一路',
                '省人民政府',
                '省体育馆',
                '钟楼',
                '南稍门',
                '兴庆宫',
                '大唐芙蓉园',
                '北客站'
            ],
            model: [],
        }

    },
    methods: {
        async submit() {

        }
    }

}
</script>
  