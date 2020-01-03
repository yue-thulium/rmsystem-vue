<template>
  <div>
    <h1>水泥路及沥青路检测</h1>

    <el-row>
      <div class="grid-content bg-purple-light">
        <el-table
          :data="tableData.filter(data => !search || data.road_name.toLowerCase().includes(search.toLowerCase()))"
          :stripe="true"
          style="width: 100%"
          max-height="540">
          <el-table-column
            align="center"
            label="道路名称"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路起点"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_begin}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路终点"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_end}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="养护等级"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.yanghu_class}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="scope.row.addPr"
                @click="handleShuiNi(scope.$index, scope.row)">水泥路面检测</el-button>
              <el-button
                size="mini"
                :disabled="scope.row.addPr"
                @click="handleLiQing(scope.$index, scope.row)">沥青路面检测</el-button>
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
    mounted:function () {
      this.loadTableData(); //初始化数据
    },
    methods : {
      loadTableData(){
        var _this = this;
        this.getRequest("/rc/dp/c1r").then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.tableData = data.tableData;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
