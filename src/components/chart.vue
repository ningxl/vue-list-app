<template>
  <div>
    <div class="box">
      <div class="mianheader">
        <div class="left">事件列表</div>
        <div class="right">
          <el-button size="small" type="primary" @click="dialogFormVisible = true">+新增</el-button>
        </div>
      </div>
      <el-table
        height="400"
        @sort-change="changeTableSort"
        :data="tableData"
        :header-cell-style="{lineHeight:'40px'}"
      >
        <el-table-column
          label="优先级"
          min-width="10"
          align="center"
          :sortable="'custom'"
          prop="priority"
        ></el-table-column>
        <el-table-column label="名称" min-width="10" align="center" prop="name"></el-table-column>
        <el-table-column label="详细描述" min-width="30" align="center" prop="detail"></el-table-column>
        <el-table-column align="center" min-width="10" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row, tableData)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, tableData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增事件" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
          <el-form-item label="优先级" :label-width="formLabelWidth" prop="priority">
            <el-select v-model="form.priority" placeholder="请选择优先级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细描述" :label-width="formLabelWidth">
            <el-input v-model="form.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addData('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑事件" :visible.sync="dialogEditFormVisible">
        <el-form :model="form">
          <el-form-item label="优先级" :label-width="formLabelWidth">
            <el-select v-model="editForm.priority" placeholder="请选择优先级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细描述" :label-width="formLabelWidth">
            <el-input v-model="editForm.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEditFormVisible = false, editData()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      form: {
        priority: "",
        name: "",
        detail: ""
      },
      editForm: {
        priority: "",
        name: "",
        detail: ""
      },
      editIndex: 0,
      editRows: [],
      formLabelWidth: "120px",
      rules: {
        priority: [{ required: true, message: "请输入优先级", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleEdit(index, row, rows) {
      this.dialogEditFormVisible = true;
      this.editForm.priority = row.priority;
      this.editForm.name = row.name;
      this.editForm.detail = row.detail;
      this.editIndex = index;
      this.editRows = rows;
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
      this.updateModel();
    },
    editData() {
      console.log(this.editRows.splice(this.editIndex, 1));

      this.tableData.push({
        priority: this.editForm.priority,
        name: this.editForm.name,
        detail: this.editForm.detail
      });
      this.updateModel();
    },
    updateModel() {
      this.axios.post("setData", this.tableData).then(res => {
        this.axios
          .get("getData")
          .then(response => {
            this.tableData = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push({
            priority: this.form.priority,
            name: this.form.name,
            detail: this.form.detail
          });
          this.updateModel();
          this.dialogFormVisible = false;
        }
      });
    },
    changeTableSort(column) {
      //获取字段名称和排序类型
      var fieldName = column.prop;
      var sortingType = column.order;

      //按照降序排序
      if (sortingType == "descending") {
        this.tableData = this.tableData.sort(
          (a, b) => b[fieldName] - a[fieldName]
        );
      }
      //按照升序排序
      else {
        this.tableData = this.tableData.sort(
          (a, b) => a[fieldName] - b[fieldName]
        );
      }
    }
  },
  created: function() {
    this.axios
      .get("getData")
      .then(response => {
        this.tableData = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
.box {
  background-color: white;
  height: 540px;
}
.el-table {
  width: auto;
  margin: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.mianheader {
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-top: 8px solid rgb(149, 213, 191);
  padding-left: 30px;
  padding-right: 30px;
}
.left {
  float: left;
  height: 50px;
  line-height: 50px;
}
.right {
  float: right;
  height: 50px;
  line-height: 50px;
}
</style>
