<template>
    <div>
      <h2>添加道路信息</h2>

      <el-form>
        <el-form ref="addRoad_car_table" :rules="rules" :model="road_car_table" label-width="80px">

        </el-form>
      </el-form>

    </div>
</template>

<script>
    export default {
      data() {
        return {
          road_car_table: {
            pavement_type: '',
            pavement_thickness: '',
            grassroots_thickness: '',
            grassroots_type: '',
            lanes: '',
            direction: '',
            motorway_width_range: '',
            r_m_w_r: '',
            l_m_w_r: '',
            lane_areas: '',
            lateral_rock_type: '',
            lateral_rock_length: '',
            flat_rock_type: '',
            flat_rock_length: ''
          },
          rules : {

          }
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
