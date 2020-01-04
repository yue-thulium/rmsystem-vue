<template>
    <div>
      <h2>添加道路信息</h2>

      <el-form>
        <el-form ref="addRoad_car_table" :rules="rules" :model="rbt" label-width="80px">
          <el-container>
            <el-header>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路名称" label-width="100px">
                      <el-input v-model="rbt.road_name" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="设计单位" label-width="100px">
                      <el-input v-model="rbt.design_unite" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="路幅宽度范围" label-width="100px">
                      <el-input v-model="rbt.road_width_range"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="所属乡镇" label-width="100px">
                      <el-input v-model="rbt.town" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路编号" label-width="100px">
                      <el-input v-model="rbt.road_code" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="建造单位" label-width="100px">
                      <el-input v-model="rbt.construction_unite" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路长度" label-width="100px">
                      <el-input v-model="rbt.road_length"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="管理分类" label-width="100px">
                      <el-input v-model="rbt.manage_sort" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路走向" label-width="100px">
                      <el-input v-model="rbt.road_trend" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路等级" label-width="100px">
                      <el-input v-model="rbt.road_class" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路面积" label-width="100px">
                      <el-input v-model="rbt.road_area"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="管理单位" label-width="100px">
                      <el-input v-model="rbt.manage_unite" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路起点" label-width="100px">
                      <el-input v-model="rbt.road_begin" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="路面等级" label-width="100px">
                      <el-input v-model="rbt.pavement_class" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="aadt" label-width="100px">
                      <el-input v-model="rbt.aadt"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="养护单位" label-width="100px">
                      <el-input v-model="rbt.maintenance_unite" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="道路终点" label-width="100px">
                      <el-input v-model="rbt.road_end" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="交通量等级" label-width="100px">
                      <el-input v-model="rbt.traffic_class"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="建造年月" label-width="100px">
                      <el-input v-model="rbt.build_date" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-footer>
                <el-form-item>
                  <el-button type="primary" @click="exitForm2()">确认添加</el-button>
                </el-form-item>
              </el-footer>
            </el-header>






          </el-container>

        </el-form>
      </el-form>

    </div>
</template>

<script>
    export default {
      data() {
        return {

          rules : {

          },
          rbt: {
            road_name:'',
            design_unite:'',
            road_width_range:'',
            town:'',
            road_code:'',
            construction_unite:'',
            road_length:'',
            manage_sort:'',
            road_trend:'',
            road_class:'',
            road_area:'',
            manage_unite:'',
            road_begin:'',
            pavement_class:'',
            aadt:'',
            maintenance_unite:'',
            road_end:'',
            traffic_class:'',
            build_date:''
          },
        }
      },
      mounted: function () {

      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
