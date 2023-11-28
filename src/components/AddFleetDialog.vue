<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-plus-thick" text="新增" rounded color="#07C160" variant="flat"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">添加新的车队</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1 mt-3">车队号</div>
                <v-form validate-on="submit lazy" @submit.prevent="submit">
                    <v-text-field density="compact" v-model="bus_id" :counter="15" requried variant="outlined">
                    </v-text-field>
                    <div class="text-subtitle-2 font-weight-black mb-1">指定车队队长（车队队长将会转入新建立的车队中）</div>
                    <v-combobox density="compact" variant="outlined" label="选填" :items="driverItems" :hide-no-data="false"
                        v-model="choosedDriver" >
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    暂无数据
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-combobox>


                    <v-btn type="submit" :disabled="loading" :loading="loading" block class="text-none mt-3 mb-4"
                        color="indigo-darken-3" size="x-large" variant="flat">
                        提交
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
            alert: true,
            reply: {
                type: 'success',
                title: 'title',
                msg: 'success!',
            },
            dialog: false,
            bus_id: null,
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
    methods: {
        async submit() {

        }
    }

}
</script>
  