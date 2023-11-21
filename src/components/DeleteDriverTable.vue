<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="搜索" single-line flat
        hide-details variant="solo-filled"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-delete-alert" text="删除" color="red" rounded></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table v-model:search="search" :loading="loading" select-strategy="single" :items="items" items-per-page="10"
      items-per-page-text="每页显示记录数量" :headers="headers" show-select :item-value="item => `${item.did}`" v-model="selected"
      loading-text="数据加载中,请稍等">

    </v-data-table>
    <v-snackbar v-model="snackbar">
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
      placeholder
    </v-snackbar>
  </v-card>
</template>
  
<script>
export default {
  data() {
    return {
      loading: true,
      search: '',
      items: [
        {
          did: '00001',
          name: 'Alice',
          gender: '女',
          year: '1972',
        },
        {
          did: '00002',
          name: 'Bob',
          gender: '男',
          year: '1980'
        },
        {
          did: '00003',
          name: 'Cindy',
          gender: '女',
          year: '1971'
        },

      ],
      headers: [
        {
          title: '工号',
          key: 'did',
          align: 'start',
        },
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '性别',
          key: 'gender'
        },
        {
          title: '出生年份',
          key: 'year',
          align: 'end'
        },

      ],
      selected: [],
      snackBarTimeout: 20000,
      snackbar: true,

    }
  },
}
</script>
