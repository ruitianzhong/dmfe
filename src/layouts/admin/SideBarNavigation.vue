<template>
    <v-layout>
        <v-navigation-drawer permanent absolute>
            <v-list color="transparent" flat>
                <v-list-item :prepend-avatar="avatar" :title="name" :subtitle="'账号 ' + user_id" lines="two"
                    append-icon="mdi-bus-side">
                </v-list-item>

            </v-list>
            <v-divider></v-divider>
            <v-list :lines="false" density="default" nav>
                <v-list-item value="home" prepend-icon="mdi-home-city" title="首页" active-color="green"
                    to="/admin/home"></v-list-item>
                <v-list-item value="account" prepend-icon="mdi-account" title="账户" active-color="green"
                    to="/admin/account"></v-list-item>
                <v-list-group vaule="driver-management">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="司机管理" prepend-icon="mdi-account-details"></v-list-item>
                    </template>
                    <v-list-item v-for="([title, icon, value], i) in driver_management" :key="i" :title="title"
                        :prepend-icon="icon" :value="value" active-color="green" :to="'/admin/' + value">
                    </v-list-item>
                </v-list-group>
                <v-list-group value="data-query">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="数据查询" prepend-icon="mdi-file-search">
                        </v-list-item>
                    </template>
                    <v-list-item v-for="([title, icon, value], i) in data_query" :key="i" :title="title"
                        :prepend-icon="icon" :value="value" active-color="green" :to="'/admin/' + value"></v-list-item>
                </v-list-group>
                <v-list-group value="line-manage">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="线路管理" prepend-icon="mdi-highway"></v-list-item>
                    </template>
                    <v-list-item v-for="([title, icon, value], i) in line_manage" :key="i" :prepend-icon="icon"
                        :title="title" :value="value" active-color="green" :to="value"></v-list-item>

                </v-list-group>
                <!-- <v-list-item title="新增用户" prepend-icon="mdi-account-plus" value="add-user"
                    active-color="green"></v-list-item> -->
                <v-list-item title="车辆管理" value="bus-management" prepend-icon="mdi-bus-multiple" active-color="green"
                    to="/admin/bus-management"></v-list-item>
                <v-list-item title="车队管理" value="fleet-management" prepend-icon="mdi-cog" active-color="green"
                    to="/admin/fleet-management"></v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2 text-center">
                    <v-btn variant="text" :loading="logout_loading" @click="logout()">
                        退出登录
                        <template v-slot:prepend>
                            <v-icon icon="mdi-logout" color="red">
                            </v-icon>
                        </template>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-main scrollable style="min-height: 300px;">
            <div>
                <router-view />

            </div>


        </v-main>
    </v-layout>
</template>

<script>
import { RouterView } from 'vue-router';
import { logout, getUserInfoByCookie } from '@/api/api'
import router from '@/router'
export default {
    data: () => ({
        driver_management: [
            ['录入新司机信息', 'mdi-plus-outline', 'add-driver-info'],
            ['更新司机信息', 'mdi-update', 'update-driver'],
            // ['删除司机', 'mdi-delete', 'delete-driver'],
            ['录入违章信息', 'mdi-alert-octagon', 'add-violation'],
        ],
        user_id: '',
        data_query: [
            ['司机信息', 'mdi-information', 'driver-detail'],
            ['违章统计', 'mdi-numeric', 'violation-statistic']
        ],
        line_manage: [
            ['管理站点', 'mdi-bus-stop', 'manage-bus-stop'],
            ['线路修改', 'mdi-road-variant', 'manage-line'],
        ],
        logout_loading: false,
        name: '',
        avatar: '',
    }),
    components: { RouterView },

    created() {

    },
    methods: {
        async logout() {

            this.logout_loading = true;
            try {
                const { data } = await logout()
                if (data.code == "200") {
                    this.logout_loading = false;
                    router.push({ path: '/' });
                }

            } catch (err) {
                console.log(err)
            }
            this.logout_loading = false;
        },
        async fetchUserInfo() {
            try {
                const { data } = await getUserInfoByCookie()
                this.name = data.name
                this.user_id = data.id
                this.avatar = "https://api.multiavatar.com/" + data.id + ".png"
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.fetchUserInfo()
    }
}
</script>

