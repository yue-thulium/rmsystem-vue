<template>
    <div>
      <h2>道路巡查表</h2>

      <el-row>
        <div class="grid-content bg-purple-light">
          <el-table
            :data="tableData.filter(data => !search || data.road_name.toLowerCase().includes(search.toLowerCase()))"
            :stripe="true"
            style="width: 100%"
            max-height="530">
            <el-table-column
              align="center"
              width="200">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <span>{{ scope.row.road_code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="巡查日期"
              width="300">
              <template slot-scope="scope">
                <span>{{ scope.row.patrol_date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="损坏类型"
              width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.d_type}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="损坏位置及情况描述"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.d_position_description}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="管理单位"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.manage_unite}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="备注"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.remark}}</span>
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
          this.getRequest("/rc/rm/route").then(resp =>{
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
