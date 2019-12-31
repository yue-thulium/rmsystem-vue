<template>
  <div>
    <h1>I类道路检测</h1>
    <el-row>

    </el-row>
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
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>道路等级: {{ scope.row.road_class }}</p>
                <p>路面等级: {{ scope.row.pavement_class }}</p>
                <p>养护等级: {{ scope.row.yanghu_class }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.road_name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路起点"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.road_begin}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路终点"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.road_end}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路状态"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_state}}</span>
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
              <el-button
                size="mini"
                type="warning"
                @click="handleAdd(scope.$index, scope.row)">添加预警</el-button>
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                :loading="loadingDelete"
                :disabled="scope.row.road_prevent"
                @click="handleDelete(scope.$index, scope.row)">取消预警</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>


    <el-form ref="addDfn" :rules="rules" :model="dfn" label-width="80px">
      <div>
        <el-dialog title="设施损害通知单"
                   :visible.sync="dialogTableVisible"
                   width="70%"
                   :close-on-click-modal="false"
                   :destroy-on-close = 'true'>
          <el-row>
            <el-col :span="8"><div>
              <el-form-item label="通知单号：" label-width="100px">
                <el-input v-model.number="dfn.notice_code" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="16"><div>
              <el-form-item label="设施名称：" label-width="100px" prop="facilities_name">
                <el-input v-model="dfn.facilities_name"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-form-item label="整修时间：" label-width="100px" prop="repair_time">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="dfn.repair_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
              <el-form-item label="损坏部位：" label-width="100px" prop="damage_position">
                <el-input v-model="dfn.damage_position"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-form-item label="损坏原因：" label-width="100px">
            <el-input type="textarea" v-model="dfn.damage_reason"></el-input>
          </el-form-item>
          <el-form-item label="处理意见：" label-width="100px">
            <el-input type="textarea" v-model="dfn.opinions"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="技术员：" label-width="100px" align="center" prop="technical_person_name">
                <el-input v-model="dfn.technical_person_name"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
              <el-form-item label="巡视员：" label-width="100px" align="center" prop="check_person_name">
                <el-input v-model="dfn.check_person_name"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="班长：" label-width="100px" align="center" prop="monitor">
                <el-input v-model="dfn.monitor"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
              <el-form-item label="时间：" label-width="100px" align="center">
                <el-date-picker :disabled="true" type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="dfn.notice_date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-form-item>
            <el-button :plain="true" type="primary" @click="onSubmitC1R('addDfn')" :loading="loadingDialog">立即创建</el-button>
            <el-button @click="cl">取消</el-button>
          </el-form-item>
        </el-dialog>
      </div>
    </el-form>





    <el-drawer :visible.sync="drawer"
               :with-header="false"
               size="30%"
               :destroy-on-close = 'true'>

      <div class="toptop">
        <el-form ref="addRp" :model="rp" label-width="200px" :rules="rules">
          <el-form-item label="巡查人员：" label-width="110px" align="center" prop="woker_code_name">
            <el-input v-model="rp.woker_code_name"></el-input>
          </el-form-item>
          <el-form-item label="损害类型：" label-width="110px" align="center" prop="d_type">
<!--            <el-input v-model="rp.d_type"></el-input>-->
            <el-select v-model="rp.d_type" placeholder="请选择">
              <el-option
                v-for="item in d_type"
                :key="item.cement_type"
                :label="item.cement_type"
                :value="item.cement_type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置及描述：" label-width="110px">
            <el-input type="textarea" v-model="rp.d_position_description"></el-input>
          </el-form-item>
          <el-form-item label="巡查日期：" label-width="110px" align="center">
            <el-date-picker :disabled="true" type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="rp.patrol_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="管理单位：" label-width="110px">
            <el-input v-model="rp.manage_unite"></el-input>
          </el-form-item>
          <el-form-item label="备注：" label-width="110px">
            <el-input type="textarea" v-model="rp.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitC2R('addRp')">提交</el-button>
            <el-button @click="dalycheck">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        d_type : [],
        search: '',
        table_index: undefined,
        table_row: undefined,
        dialogTableVisible: false,
        drawer: false,
        dfn: {
          road_code: '',
          notice_code: '',
          facilities_name: '',
          repair_time: '',
          damage_position: '',
          damage_reason: '',
          opinions: '',
          technical_person_name: '',
          check_person_name: '',
          monitor: '',
          notice_date: ''
        },
        loadingDialog: false,
        loadingDraw: false,
        loadingDelete : false,
        rp: {
          patrol_code: '',
          road_code: '',
          woker_code_name: '',
          patrol_date: '',
          d_type: '',
          d_position_description: '',
          remark: '',
          manage_unite: ''
        },
        rules: {
          facilities_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          repair_time: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
          damage_position: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          opinions: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          technical_person_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          check_person_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          monitor: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          woker_code_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          d_type : [{required: true, message: '内容不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted:function () {
      this.loadTableData(); //初始化数据
    },
    methods: {
      handleEdit(index, row) {  //添加巡逻信息抽屉显示
        var _this = this;
        _this.table_index = index;
        _this.table_row = row;
        var MyDate = new Date();
        _this.rp.patrol_date = this.formattingDate(MyDate.toLocaleDateString());
        this.rp.patrol_code = parseInt((MyDate.getFullYear()%1000) + "" + (MyDate.getMonth()+1) + "" +  MyDate.getDate() + "" + MyDate.getHours() + "" + MyDate.getMinutes());
        _this.drawer = true;
        console.log(index, row);
      },
      handleDelete(index, row) {  //删除道路预警信息
        this.table_index = index;
        this.table_row = row;
        var id = this.tableData[this.table_index].road_code;
        var _this = this;
        _this.loadingDelete = true;
        this.$confirm('此操作将移除对当前道路预警, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          _this.loadingDelete = false;
          this.postRequest('/rc/dp/cr/deleteDFN', {
            id,
          }).then(resp=> {
            _this.loadingDelete = false;
            if (resp && resp.status == 200) {
              this.loadTableData();
              this.$message({
                message: '预警已解除',
                type: 'success'
              });
            }else if (resp && (resp.status == 504 || resp.status == 404)) {
              this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
            }else {
              this.$message.error({message: '未知错误'});
            }
          });
        }).catch(() => {
        });
      },
      handleAdd(index, row){  //添加道路预警弹窗显示
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var MyDate = new Date();
        this.dfn.notice_date = new Date(this.formattingDate(MyDate.toLocaleDateString()));
        this.dfn.notice_code = parseInt((MyDate.getFullYear()%1000) + "" + (MyDate.getMonth()+1) + "" +  MyDate.getDate() + "" + MyDate.getHours() + "" + MyDate.getMinutes());
        this.dialogTableVisible = true;
      },
      cl(){
        this.dialogTableVisible = false;
      },
      dalycheck(){
        this.drawer = false;
      },
      loadTableData(){
        var _this = this;
        this.getRequest("/rc/dp/c1r").then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.tableData = data.tableData;
            _this.d_type = data.d_type;
          }
        });
      },
      filterTag(value, row) {
        return row.whether === value;
      },
      onSubmitC1R(form) {  //添加预警方法
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.dfn.road_code = this.tableData[this.table_index].road_code;
            this.dfn.repair_time = new Date(this.formattingDate(this.dfn.repair_time));
            console.log(this.dfn);
            this.postRequest('/rc/dp/cr/addDFN', this.dfn).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
                this.$message({
                  message: '添加预警成功',
                  type: 'success'
                });
              }else if (resp && (resp.status == 504 || resp.status == 404)) {
                this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
              }else {
                this.$message.error({message: '未知错误'});
              }
            });
            this.empDfn();
            this.dialogTableVisible = false;
          } else {
            return false;
          }
        });
      },
      onSubmitC2R(form) {  //添加巡逻方法
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.rp.road_code = this.tableData[this.table_index].road_code;
            this.rp.patrol_date = new Date(this.formattingDate(this.rp.patrol_date));
            console.log(this.rp);
            this.postRequest('/rc/dp/cr/addPR', this.rp).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
                this.$message({
                  message: '本次巡查完毕',
                  type: 'success'
                });
              }else if (resp && (resp.status == 504 || resp.status == 404)) {
                this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
              }else {
                this.$message.error({message: '未知错误'});
              }
            });
            this.drawer = false;
            this.empRp();
          } else {
            return false;
          }
        });
      },
      empDfn() {
        this.dfn = {
          road_code: '',
          notice_code: '',
          facilities_name: '',
          repair_time: '',
          damage_position: '',
          damage_reason: '',
          opinions: '',
          technical_person_name: '',
          check_person_name: '',
          monitor: '',
          notice_date: ''
        }
      },
      empRp() {
        this.rp = {
          road_code: '',
            woker_code_name: '',
            patrol_date: '',
            d_type: '',
            d_position_description: '',
            remark: '',
            manage_unite: ''
        }
      },
      formattingDate(date){
        date= new Date(Date.parse(date));
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+m+'-'+d;
      }
    }
  }
</script>

<style>
  .toptop {
    position:fixed;
    top: 130px;
    margin-right: -40px;
  }
</style>
