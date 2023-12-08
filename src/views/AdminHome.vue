<template>
  <br>



  <div class="font-weight-bold text-center mt-10 mb-8" style="font-size:40px;margin-top: 400px;">
    <v-img src="@/assets/logo-large.png" height="50px" class="mb-5"></v-img>

    <p :class="$vuetify.display.smAndUp ? 'headline' : 'text-h5 font-weight-bold'">
      欢迎使用公交管理系统
    </p>
  </div>

  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-img src="@/assets/HongKongCompressed.jpg" height="200px" cover></v-img>
          <v-card-title>
            Modern Architecture
          </v-card-title>
          <v-card-subtitle>
            Go + Vue.js + MySQL 的技术栈
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show1 = !show1"></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show1">
              <v-divider></v-divider>
              <v-card-text>
                后端服务器采用Go语言和阿里云MySQL构建，前端界面采用Vue+Vuetify构建，快速构建一个现代应用。
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-img src="@/assets/plane-compressed.png" height="200px" cover></v-img>
          <v-card-title>
            User Friendly
          </v-card-title>

          <v-card-subtitle>
            用户友好的界面
          </v-card-subtitle>

          <v-card-actions>


            <v-spacer></v-spacer>

            <v-btn :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show2 = !show2"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show2">
              <v-divider></v-divider>

              <v-card-text>
                界面简单易操作，涉及到相互关联的数据的时候以勾选为主，减少用户输入时的失误。
                直观的饼图饼图有助于数据感知分析。
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>

        <v-card class="mx-auto" max-width="344">
          <v-img src="@/assets/ForbiddenCityCompressed.jpg" height="200px" cover></v-img>

          <v-card-title>
            Security
          </v-card-title>

          <v-card-subtitle>
            完整的用户登录设计
          </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :icon="show3 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show3 = !show3"></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show3">
              <v-divider></v-divider>
              <v-card-text>
                在完整的用户登录功能的基础上，还具备用户会话保持的功能，在一定时间内用户无需重新登录。
                后台进行一系列数据完整性检查，降低人为原因造成的数据不一致的风险。
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
  <dashboard-footer></dashboard-footer>
</template>
  
<script >
import DashboardFooter from '@/layouts/admin/DashboardFooter.vue';
export default {
  components: { DashboardFooter },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
    }
  }
}
</script>
  