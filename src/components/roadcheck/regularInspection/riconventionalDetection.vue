<template>
  <div>
    <h1>路面平整度检测</h1>

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
            label="检测人员编号"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.worker_code}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="IRI"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.iri}}</span>
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
                @click="handleEdit(scope.$index, scope.row)">路面平整度检测</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>



    <el-dialog
      title="路面平整度记录表"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="40%">

      <el-form ref="addRst" :model="rst" label-width="80px" :rules="rules">
        <el-form-item label="检测日期">
          <el-input :disabled="true" v-model="rst.check_date"></el-input>
        </el-form-item>
        <el-form-item label="检测人员" prop="worker_name">
          <el-input v-model="rst.worker_name"></el-input>
        </el-form-item>
        <el-form-item label="IRI" prop="IRI">
          <el-input v-model="rst.IRI"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="rst.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="onSubmitC1R('addRst')" :loading="loadingDialog">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        name: "pavementDamage",
        dialogVisible : false,
        loadingDialog: false,
        search: '',
        table_index: undefined,
        table_row: undefined,
        rst: {
          surface_code: '',
          regular_code: '',
          worker_code: '',
          road_code: '',
          road_name: '',
          check_date: '',
          IRI: '',
          remark: '',
          worker_name: ''
        },
        rules : {
          worker_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          IRI: [{required: true, message: '内容不能为空', trigger: 'blur'}],
        }
      }
    },
    mounted:function () {
      this.loadTableData(); //初始化数据
    },
    methods: {
      loadTableData(){
        var _this = this;
        this.getRequest("/rc/ri/cd").then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.tableData = data.tabledate;
          }
        });
      },
      filterTag(value, row) {
        return row.whether === value;
      },
      handleEdit(index, row) {  //添加巡逻信息弹窗
        var _this = this;
        _this.table_index = index;
        _this.table_row = row;
        var MyDate = new Date();
        _this.rst.check_date = this.formattingDate(MyDate.toLocaleDateString());
        this.rst.surface_code = this.tableData[this.table_index].surface_code;
        this.rst.regular_code = this.tableData[this.table_index].regular_code;
        _this.dialogVisible = true;
      },
      onSubmitC1R(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.rst.check_date = new Date(this.formattingDate(this.rst.check_date));
            this.rst.road_code = parseInt(this.tableData[this.table_index].road_code);
            this.rst.road_name = this.tableData[this.table_index].road_name;
            this.rst.worker_code = this.tableData[this.table_index].worker_code;
            this.postRequest('/rc/dp/cr/updateRST', this.rst).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
                this.empRst();
                this.dialogVisible = false;
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }else if (resp && (resp.status == 504 || resp.status == 404)) {
                this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
              }else {
                this.$message.error({message: '未知错误'});
              }
            });
          } else {
            return false;
          }
        });
      },
      formattingDate(date){
        date= new Date(Date.parse(date));
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+m+'-'+d;
      },
      empRst() {
        rst = {
          surface_code: '',
          regular_code: '',
          worker_code: '',
          road_code: '',
          road_name: '',
          check_date: '',
          IRI: '',
          remark: '',
          worker_name: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
