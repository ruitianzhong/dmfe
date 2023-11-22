<template>
    <v-img class="mt-10 mb-3" height="50" src="@/assets/logo-large.png" />
    <h2 class="text-center">登录</h2>
    <v-card rounded  variant="text" max-width="350" class="mx-auto  mt-1
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
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: vm => ({
        loading: false,
        userIdRules: [value => vm.checkApi(value)],
        userPasswordRules: [value => vm.checkPassword(value)],
        timeout: null,
        userId: '',
        password: '',
    }),

    methods: {
        async submit(event) {
            this.loading = true

            const results = await event

            this.loading = false

            alert(JSON.stringify(results, null, 2))
        },
        async checkApi(userName) {
            return new Promise(resolve => {
                clearTimeout(this.timeout)

                this.timeout = setTimeout(() => {
                    if (!userName) return resolve('Please enter a user name.')
                    if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

                    return resolve(true)
                }, 1000)
            })
        },
        checkPassword(password) {
            if (password != '') return true
            return '请输入密码'
        }
    },
}
</script>