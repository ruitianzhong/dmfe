<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-plus-thick" text="新增" rounded color="#07C160" variant="flat"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">添加新的站点</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-card rounded variant="text" max-width="350" class="mx-auto  mt-1 rounded-lg" scrollable>
                    <v-card-text>
                        <v-form validate-on="submit lazy" @submit.prevent="submit">
                            <p class="mb-2">新站点名称</p>
                            <v-text-field v-model="stop_id" variant="outlined" color="blue" bg-color="white"
                                :rules="userIdRules" density="compact"></v-text-field>
                            <v-btn :loading="loading" type="submit" block class="mt-2" text="确认" color="#008000"
                                density="default" :disabled="stop_id == ''"></v-btn>
                            <v-alert v-model="alert" variant="outlined" class="mt-5 mb-3" :type="reply.type"
                                :text="reply.msg"></v-alert>
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
import { addStop } from '@/api/api'

export default {
    data() {
        return {
            alert: false,
            reply: {
                type: '',
                msg: '',
            },
            dialog: false,
            stop_id: '',
            loading: false,
        }
    },
    methods: {
        async submit() {
            this.loading = true
            const param = {
                stop_id: this.stop_id
            }
            try {
                const { data } = await addStop(param)
                if (data.code == '200') {
                    this.reply.type = "success"
                    this.reply.msg = "成功添加车辆 " + param.stop_id
                } else {
                    this.reply.type = "error"
                    this.reply.msg = "站点" + param.stop_id + "已经存在"
                }
                this.alert = true
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }
        }
    },
    watch: {
        dialog(newValue) {
            if (!newValue) {
                this.loading = false
                this.alert = false
                this.$emit('refresh')
            }
        }
    }

}
</script>
  