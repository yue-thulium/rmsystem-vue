<template>
    <div>
      <h2>道路年报</h2>

      <el-row>
        <div class="grid-content bg-purple-light">
          <el-table
            :data="tableData.filter(data => !search || data.road_name.toLowerCase().includes(search.toLowerCase()))"
            :stripe="true"
            style="width: 100%"
            max-height="540">
            <el-table-column
              align="center"
              width="350">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <span>{{ scope.row.road_name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="评价综合指数PQI"
              width="350">
              <template slot-scope="scope">
                <span>{{ scope.row.evaluation_index}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="平整度RQI"
              width="310">
              <template slot-scope="scope">
                <span>{{ scope.row.planeness}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="破损状况"
              width="300">
              <template slot-scope="scope">
                <span>{{ scope.row.damage_condition}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData : [],
          search : '',
        }
      },
      mounted: function () {
        this.loadTableData(); //初始化数据
      },
      methods: {
        loadTableData(){
          var _this = this;
          this.getRequest("/road/getfacilities_yearly_report").then(resp =>{
            if (resp && resp.status == 200){
              var data = resp.data;
              _this.tableData = data.tabledata;
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>
