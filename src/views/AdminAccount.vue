<template>
    <div class="d-flex flex-column">
        <v-list-item class="mt-10 mb-5" width="500" :prepend-avatar="avatar" :title="name" subtitle="管理员账户" lines="two"
            density="comfortable">
            <template v-slot:title><span style="font-weight: 600;">{{ name }} <span class="text-subtitle"
                        style="font-weight: 10;">({{ user_id }})</span></span></template>
            <template v-slot:prepend>
                <v-avatar size="50">
                    <v-img :src="avatar" alt="John"></v-img>
                </v-avatar>
            </template>
        </v-list-item>
        <h2 class="ml-4" style="text-align: left;font-weight: 500;">修改密码</h2>
        <v-divider class="ml-3 mt-2 mr-6"></v-divider>
        <div class="mt-5 ml-5" style="width: 400px;">
            <p class="mb-2 ">原密码</p>
            <v-text-field v-model="oldPassword" variant="outlined" color="blue" bg-color="white"
                density="compact"></v-text-field>
            <p class="mb-2 ">原密码</p>
            <v-text-field v-model="newPassword" :disabled="oldPassword == ''" variant="outlined" color="blue"
                bg-color="white" density="compact"></v-text-field>
            <p class="mb-2">确认密码</p>
            <v-text-field v-model="confirmPassword" :disabled="newPassword == ''" variant="outlined" color="blue"
                density="compact"></v-text-field>

        </div>
        <div class="ml-5 mt-3"> <v-btn :loading="passwordLoading" width="100" color="green" height="35" slim
                variant="outlined" density="comfortable" text="更新密码"
                :disabled="this.newPassword == '' || this.oldPassword == '' || this.confirmPassword == ''"
                @click="submitNewPassword()">

            </v-btn>
            <v-alert class="mt-3 mb-3" width="400" density="compact" v-model="alert" @click:close="alert = false" closable variant="outlined" :type="type"
                :text="msg"></v-alert>
        </div>


    </div>
</template>

<script>
import { getUserInfoByCookie, updateUserPassword } from '@/api/api';
export default {
    data() {
        return {
            newPassword: '',
            oldPassword: '',
            confirmPassword: '',
            name: 'abc',
            user_id: '',
            avatar: '',
            passwordLoading: false,
            type: '',
            msg: '',
            alert: false,
        }
    },
    mounted() {
        this.fetchUserInfo()
    },
    methods: {
        async fetchUserInfo() {
            try {
                const { data } = await getUserInfoByCookie()
                this.name = data.name
                this.user_id = data.id
                this.avatar = "https://api.multiavatar.com/" + data.id + ".png"
            } catch (error) {
                console.log(error)
            }
        },
        async submitNewPassword() {
            this.passwordLoading = true

            try {
                const param = {
                    new_password: this.newPassword,
                    original_password: this.oldPassword,
                    confirmed_password: this.confirmPassword,
                }
                const { data } = await updateUserPassword(param)
                if (data.code == "200") {
                    this.msg = "成功修改密码"
                    this.type = "success"
                } else {
                    this.msg = data.msg
                    this.type = "error"
                }
                this.alert = true
            } catch (err) {
                console.log(err)

            } finally {
                this.passwordLoading = false
            }

        }
    }
}
</script>