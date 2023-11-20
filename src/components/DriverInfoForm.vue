<template>
    <v-card elevation="0" max-width="500" class="mx-auto">
        <v-card-title class="py-5 font-weight-black">输入新司机的信息</v-card-title>
        <v-card-text>你好，请按照相关要求填写司机信息</v-card-text>
        <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">姓名</div>
            <v-form validate-on="submit lazy" @submit.prevent="submit">
                <v-text-field density="compact" v-model="name" :rules="nameRules" :counter="10" label="姓名" hint="姓名在10个字符以内"
                    required variant="outlined">
                </v-text-field>
                <div class="text-subtitle-2 font-weight-black mb-1">工号</div>
                <v-text-field v-model="did" density="compact" :counter="10" label="司机工号" hint="工号为5-10个数字" required
                    :rules="didRules" height="10" variant="outlined">
                </v-text-field>
                <v-row>
                    <v-col>
                        <div class="text-subtitle-2 font-weight-black mb-1">性别</div>
                        <v-btn-toggle density="compact" v-model="gender" color="primary" label="test" class="mb-4 text-none"
                            madatory>
                            <v-btn value="male">男</v-btn>
                            <v-btn value="female">女</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col>
                        <div class="text-subtitle-2 font-weight-black mb-1">出生年份</div>
                        <VueDatePicker v-model="year" year-picker locale="zh-cn" modelHeight="255" />
                    </v-col>
                </v-row>
                <v-btn :disabled="loading" :loading="loading" block class="text-none mb-4" color="indigo-darken-3"
                    size="x-large" variant="flat" @click="loading = !loading">
                    Verify and continue
                </v-btn>
            </v-form>
        </v-card-text>

    </v-card>
</template>
  
<script>
export default {
    data() {
        return {
            gender: "female",
            did: '',
            name: '',
            nameRules: [
                value => {
                    if (value) return true
                    return '需要填写姓名'
                },
                value => {
                    if (value?.length <= 10) return true
                    return '名字必须少于十个字'
                }
            ],
            didRules: [
                value => {
                    if (value) return true
                    return '请填写司机工号'
                },
                value => {
                    if (/^\d{5,10}$/.test(value)) return true
                    return '请填写有效工号(5-10位数字)'
                }
            ],
            year: new Date().getFullYear(),
        }
    },
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
                    if (userName === 'johnleider')
                        return resolve('User name already taken. Please try another one.')

                    return resolve(true)
                }, 1000)
            })
        },
    },
}
</script> 
