<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading"  border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="页面名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="展示名称" align="center">
          <template slot-scope="scope">{{scope.row.showName}}</template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">{{scope.row.password}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>

        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="allShow"
              disabled
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleSelect(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑页面':'添加页面'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="page"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="页面名称：" required=true>
          <el-input v-model="page.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="page.password"  type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="展示名称：">
          <el-input v-model="page.showName" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {createTalkUserPage, deletePage, getTalkUserPage, updatePage} from "@/api/talk";
  import {getUserName, setUserName} from "@/utils/auth";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null,
    name:''
  };
  // 默认的页面，以及结构
  const defaultPage = {
    id: null,
    name: null,
    password: null,
    showName: "一句话"
  };
  export default {
    name: 'adminList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        page: Object.assign({}, defaultPage),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds:[],
        allRoleList:[],
        allocAdminId:null,
        allShow:1
      }
    },
    created() {
      console.log(this.$route.params.manager);
      this.listQuery.name = this.$route.params.manager;
      this.getList();
      // this.getAllRoleList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      notDevelopMessageTips(){
        this.$message({
          message: '没有开发呢，小兄弟',
          type: 'error'
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.page = Object.assign({},defaultPage);
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      handleDelete(index, row) {
        // this.notDevelopMessageTips();
        this.$confirm('是否要删除该页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePage({name:getUserName()},{id:row.id,name:row.name}).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.page = Object.assign({},row);
      },
      handleSelect(index, row) {
        this.$router.push({path: '/cms/content/'+row.name})
      },
      handleDialogConfirm() {
        if (this.isEdit) {
          updatePage({name:this.listQuery.name},this.page).then(response => {
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          }).catch(error => {
            this.$message({
              message: '编辑失败！',
              type: 'error'
            });
            this.dialogVisible =false;
            this.getList();
          })
          return ;// 退出
        }
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            this.notDevelopMessageTips();
            // todo
          } else {
            createTalkUserPage({name:this.listQuery.name},this.page).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            }).catch(error => {
              this.$message({
                message: '添加失败！',
                type: 'error'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      }
      ,
      handleSelectRole(index,row){
        this.allocAdminId = row.id;
        this.allocDialogVisible = true;
        this.getRoleListByAdmin(row.id);
      },
      getList() {
        this.listLoading = true;
        getTalkUserPage(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;

        });
      },
      getAllRoleList() {
        fetchAllRoleList().then(response => {
          this.allRoleList = response.data;
        });
      },
      getRoleListByAdmin(adminId) {
        getRoleByAdmin(adminId).then(response => {
          let allocRoleList = response.data;
          this.allocRoleIds=[];
          if(allocRoleList!=null&&allocRoleList.length>0){
            for(let i=0;i<allocRoleList.length;i++){
              this.allocRoleIds.push(allocRoleList[i].id);
            }
          }
        });
      }
    }
  }
</script>
<style></style>


