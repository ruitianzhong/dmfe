<template>
    <v-app>
        <v-app-bar border flat density="compact">
            <v-app-bar-title>
                <v-icon color="red">mdi-bus</v-icon>
                DMS
            </v-app-bar-title>
            <v-btn size="x-large" target="_blank" href="https://zrt.ink" text="test" variant="text">
                <font size="2" color="black">关于</font>
            </v-btn>
            <v-divider vertical color="black"></v-divider>
            <v-btn density="compact" size="x-large" slim icon="mdi-github" target="_blank"
                href="https://github.com/ruitianzhong"></v-btn>
            <v-btn density="compact" size="x-large" slim icon="mdi-web" target="_blank" href="https://zrt.ink"></v-btn>
        </v-app-bar>
        <v-container class="fill-height" density="compact">
            <v-responsive class="align-center text-center fill-height">

                <v-img height="50" class="mb-5" src="@/assets/logo-large.png" />

                <h1 class="text-h2 font-weight-bold">公交管理系统</h1>
                <br />
                <font class="subtitle " size="4" color="#7F7F7F">简单易用，高效安全的公交司机管理系统</font>
                <div class="py-5" />
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="auto">
                        <v-btn color="#07C160" min-width="200" height="50" max-width="300" width="200" to="/login"
                            size="x-large" variant="flat">
                            <v-icon icon="mdi-login" size="large" start />
                            登录
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="#EDEDED" min-width="200" height="50" max-width="300" position="relative" to="/signup"
                            size="x-large" variant="flat">
                            <v-icon icon="mdi-account-plus" size="large" start />
                            注册
                        </v-btn>
                    </v-col>
                </v-row>
            </v-responsive>
        </v-container>
        <DashboardFooter />
    </v-app>
</template>

<script setup>
import DashboardFooter from '@/layouts/admin/DashboardFooter.vue';
</script>