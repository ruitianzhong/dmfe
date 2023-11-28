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
                <v-card rounded variant="text" max-width="350" class="mx-auto  mt-1
 rounded-lg
" scrollable>
                    <v-card-text>
                        <v-form validate-on="submit lazy" @submit.prevent="submit">
                            <p class="mb-2">新站点名称</p>
                            <v-text-field v-model="userId" variant="outlined" color="blue" bg-color="white"
                                :rules="userIdRules" density="compact"></v-text-field>
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
        }
    },
    methods: {
        async submit() {

        }
    }

}
</script>
  