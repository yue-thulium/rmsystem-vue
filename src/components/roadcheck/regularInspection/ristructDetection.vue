<template>
    <div>
      <h1>设施路面损坏</h1>

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
              label="损坏类型"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.damage_type}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="备注"
              width="350">
              <template slot-scope="scope">
                <span>{{ scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="check"
              label="是否需要检测"
              width="180"
              :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <span>{{ scope.row.ifneed}}</span>
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
                  @click="handleEdit(scope.$index, scope.row)">巡查记录</el-button>
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
      }
    },
    mounted:function () {
      this.loadTableData(); //初始化数据
    },
    methods: {
      loadTableData(){
        var _this = this;
        this.getRequest("/rc/ri/rdt").then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.tableData = data.tabledata;
          }
        });
      },
      filterTag(value, row) {
        return row.whether === value;
      },
    }
  }
</script>
