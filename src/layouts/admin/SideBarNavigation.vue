<template>
    <v-layout>
        <v-navigation-drawer permanant absolute>
            <v-list color="transparent" flat>
                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" title="Ruitian Zhong"
                    :subtitle="'账号 ' + admin_id" lines="two" append-icon="mdi-bus-side">
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
                <v-list-item title="新增用户" prepend-icon="mdi-account-plus" value="add-user"
                    active-color="green"></v-list-item>
                <v-list-item title="车辆管理" value="bus-management" prepend-icon="mdi-bus-multiple"
                    active-color="green" to="/admin/bus-management"></v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2 text-center">
                    <v-btn variant="text">
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

export default {
    data: () => ({
        driver_management: [
            ['录入新司机信息', 'mdi-plus-outline', 'add-driver-info'],
            ['更新司机信息', 'mdi-update', 'update-driver'],
            ['删除司机', 'mdi-delete', 'delete-driver'],
            ['录入违章信息', 'mdi-alert-octagon', 'add-violation'],
        ],
        admin_id: '709221876',
        data_query: [
            ['司机信息', 'mdi-information', 'driver-detail'],
            ['违章统计', 'mdi-numeric', 'violation-statistic']
        ],
        line_manage: [
            ['管理站点', 'mdi-bus-stop', 'manage-bus-stop'],
            ['线路修改', 'mdi-road-variant', 'manage-line'],
        ],
    }),
    components: { RouterView },

    created() {

    }
}
</script>

