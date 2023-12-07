<template>
    <v-img class="mt-10 mb-3" height="50" src="@/assets/logo-large.png" />
    <h2 class="text-center">登录</h2>
    <v-card rounded variant="text" max-width="350" class="mx-auto  mt-1
 rounded-lg
" scrollable>
        <v-card-text>
            <v-form validate-on="submit lazy" @submit.prevent="submit">
                <p class="mb-2">账号</p>
                <v-text-field v-model="userId" variant="outlined" color="blue" bg-color="white" :rules="userIdRules"
                    density="compact"></v-text-field>
                <p class="mb-2">密码</p>
                <v-text-field v-model="password" type="password" color="blue" bg-color="white" variant="outlined"
                    density="compact" :rules="userPasswordRules"></v-text-field>
                <v-btn :loading="loading" type="submit" block class="mt-2" text="登录" color="#008000"
                    density="default"></v-btn>
                <v-alert v-model="alert" type="error" class="mt-5 md-5" variant="outlined" closable density="comfortable"
                    text="该用户不存在或用户密码错误，请重试"></v-alert>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
import { login, checkIfLogin } from '@/api/api';
import router from '@/router';
export default {
    data: vm => ({
        loading: false,
        userIdRules: [value => vm.checkId(value)],
        userPasswordRules: [value => vm.checkPassword(value)],
        timeout: null,
        userId: '',
        password: '',
        alert: false,
    }),

    methods: {
        async submit(event) {
            this.loading = true
            await event;
            if (this.password == '' || this.userId == '') {
                this.loading = false
                return
            }
            const req = {
                password: this.password,
                username: this.userId,
            };
            const { data } = await login(req);
            if (data.code == "100") {
                this.alert = true;
                this.loading = false;
                return
            }
            router.push({ path: "/admin/home" })
            this.loading = false
            this.alert = false

        },
        checkId(userName) {
            if (!userName) {
                return '请输入用户名'
            }
            return true;
        },
        checkPassword(password) {
            if (password != '') return true
            return '请输入密码'
        },
        async checkIfLogin() {
            try {
                const { data } = await checkIfLogin()
                if (data.code == "200") {
                    router.push("/admin/home")
                    console.log(data.code)
                }
            } catch (err) {
                console.log(err)
            }

        }
    },
    mounted() {
        this.checkIfLogin()
    }
}
</script>