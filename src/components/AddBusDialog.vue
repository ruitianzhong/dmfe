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
                    <v-text-field density="compact" v-model="bus_id" :counter="15" label="车牌号" requried variant="outlined">
                    </v-text-field>
                    <div class="text-subtitle-2 font-weight-black mb-1">车队编号</div>
                    <v-combobox label="请选择车队" height="1" density="compact" width="300" variant="outlined"
                        :items="fleetItems" :hide-no-data="false" v-model="choosedFleet" multiple>
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    暂无数据
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-combobox>
                    <div class="text-subtitle-2 font-weight-black mb-1">车队编号</div>
                    <v-combobox label="请选择车队" height="1" density="compact" width="300" variant="outlined"
                        :items="fleetItems" :hide-no-data="false" v-model="choosedFleet" multiple>
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
                    <v-alert :type="reply.type" closable v-if="alert" :title="reply.title" variant="outlined"
                        :text="reply.msg" density="compact" @click:close="alert = false">
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
export default {
    data() {
        return {
            dialog: false,
            bus_id: null,

        }
    },
    methods: {
        async submit() {

        }
    }

}
</script>
  