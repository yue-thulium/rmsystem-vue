<template>
    <div>
      <h2>添加用户</h2>

      <el-form :model="register" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="register.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="register.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-input v-model="register.role"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input type="password" v-model="register.checkpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认码" prop="code">
          <el-input type="password" v-model="register.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loadingDialog">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      data() {
        var validatepassword = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.register.checkpassword !== '') {
              this.$refs.ruleForm.validateField('checkpassword');
            }
            callback();
          }
        };
        var validatepassword2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.register.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          register : {
            username : '',
            password : '',
            checkpassword : '',
            name : '',
            role : '',
            code : ''
          },
          loadingDialog : false,
          options: [{
            value: '数据库管理员',
            label: '数据库管理员'
          }, {
            value: '系统管理员',
            label: '系统管理员'
          }, {
            value: '用户',
            label: '用户'
          }],
          rules: {
            password: [{required:true, validator: validatepassword, trigger: 'blur' }],
            checkpassword: [{required:true, validator: validatepassword2, trigger: 'blur' }],
            username: [{required: true, message: '内容不能为空', trigger: 'blur'}],
            name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
            role: [{required: true, message: '内容不能为空', trigger: 'blur'}],
            code: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          }
        }
      },
      mounted:function () {

      },
      methods : {
        submitForm(form) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              this.loadingDialog = true;
              this.postRequest('/config/doRegister', this.register).then(resp=> {
                this.loadingDialog = false;
                if (resp && resp.status == 200) {
                  this.empRegister();
                  this.$message({
                    message: resp.data,
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        empRegister() {
          this.register = {
            username: '',
            passwordWORD: '',
            checkpassword: '',
            name: '',
            role: '',
            code: ''
          }
        }
      }
    }
</script>

<style scoped>

</style>
