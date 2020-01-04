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
                  @click="handleEdit(scope.$index, scope.row)">路面设施损害通知单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>




      <el-dialog
        title="路面设施损害通知单"
        :visible.sync="dialogVisible"
        :destroy-on-close="true"
        width="60%">
        <el-form ref="addRBT" :model="rdt" label-width="80px" :rules="rules">

          <el-row>
            <el-col :span="8"><div>
              <el-form-item label="检测人员" prop="worker_code_name">
                <el-input v-model="rdt.worker_code_name"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="16"><div>
              <el-form-item label="检测日期">
                <el-input :disabled="true" v-model="rdt.make_date"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>

          <el-row>
            <el-col :span="8"><div>
              <el-form-item label="起止位置">
                <el-input v-model="rdt.begin_end"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="8"><div>
              <el-form-item label="检查总长" prop="length">
                <el-input type="number" v-model="rdt.length"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="8"><div>
              <el-form-item label="检查总宽" prop="width">
                <el-input type="number" v-model="rdt.width"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>

          <el-row>
            <el-col :span="6"><div>
              <el-form-item label="损坏长" prop="d_lenth">
                <el-input type="number" v-model="rdt.d_lenth"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div>
              <el-form-item label="损坏宽" prop="d_width">
                <el-input type="number" v-model="rdt.d_width"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div>
              <el-form-item label="损坏高" prop="d_height">
                <el-input type="number" v-model="rdt.d_height"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div>
              <el-form-item label="损坏类型" prop="damage_type">
                <el-select v-model="rdt.damage_type" placeholder="请选择">
                  <el-option
                    v-for="item in damage_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div></el-col>
          </el-row>

          <el-form-item label="损坏位置及损坏情况描述">
            <el-input type="textarea" :rows="4" v-model="rdt.d_position_description"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="rdt.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :plain="true" type="primary" @click="onSubmitC1R('addRBT')" :loading="loadingDialog">确 定</el-button>
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
        tableData : [],
        search : '',
        table_index : undefined,
        table_row : undefined,
        dialogVisible : false,
        loadingDialog : false,
        rdt : {
          damage_code : '',
          worker_code_name : '',
          make_date : '',
          begin_end : '',
          length : '',
          width : '',
          damage_type : '',
          d_lenth : '',
          d_width : '',
          d_height : '',
          d_position_description : '',
          remark : '',
          d_areas : 0
        },
        rules : {
          worker_code_name : [{required: true, message: '内容不能为空', trigger: 'blur'}],
          length: [{required: true, message: '非空值', trigger: 'blur' }],
          width: [{required: true, message: '非空值', trigger: 'blur' }],
          d_lenth: [{required: true, message: '非空值', trigger: 'blur' }],
          d_width: [{required: true, message: '非空值', trigger: 'blur' }],
          d_height: [{required: true, message: '非空值', trigger: 'blur' }],
          damage_type: [{required: true, message: '非空值', trigger: 'blur' }]
        },
        damage_type: [{
          value: '线裂',
          label: '线裂'
        }, {
          value: '网裂',
          label: '网裂'
        }, {
          value: '龟裂',
          label: '龟裂'
        }, {
          value: '拥包',
          label: '拥包'
        }, {
          value: '车辙',
          label: '车辙'
        }, {
          value: '沉陷',
          label: '沉陷'
        }, {
          value: '翻浆',
          label: '翻浆'
        }, {
          value: '剥落',
          label: '剥落'
        }, {
          value: '坑槽',
          label: '坑槽'
        }, {
          value: '啃边',
          label: '啃边'
        }, {
          value: '路框差',
          label: '路框差'
        }, {
          value: '唧浆',
          label: '唧浆'
        }, {
          value: '泛油',
          label: '泛油'
        }],
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
      formattingDate(date){
        date= new Date(Date.parse(date));
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+m+'-'+d;
      },
      filterTag(value, row) {
        return row.whether === value;
      },
      handleEdit(index, row) {
        this.table_index = index;
        this.table_row = row;
        var MyDate = new Date();
        this.rdt.make_date = this.formattingDate(MyDate.toLocaleDateString());
        this.dialogVisible = true;
      },
      onSubmitC1R(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.rdt.make_date = new Date(this.formattingDate(this.rdt.make_date));
            this.rdt.damage_code = this.tableData[this.table_index].damage_code;
            this.rdt.road_name = this.tableData[this.table_index].road_name;
            this.rdt.length = parseFloat(this.rdt.length);
            this.rdt.width = parseFloat(this.rdt.width);
            this.rdt.d_width = parseFloat(this.rdt.d_width);
            this.rdt.d_lenth = parseFloat(this.rdt.d_lenth);
            this.rdt.d_height = parseFloat(this.rdt.d_height);
            this.rdt.d_areas = this.rdt.d_width * this.rdt.d_lenth;
            this.postRequest('/rc/ri/updateRDT', this.rdt).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
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
            this.empRdt();
            this.dialogVisible = false;
          } else {
            return false;
          }
        });
      },
      empRdt() {
        rdt = {
          damage_code : '',
            worker_code_name : '',
            make_date : '',
            begin_end : '',
            length : '',
            width : '',
            damage_type : '',
            d_lenth : '',
            d_width : '',
            d_height : '',
            d_position_description : '',
            remark : '',
            d_areas : 0
        }
      }
    }
  }
</script>
