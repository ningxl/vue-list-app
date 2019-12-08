<template>
  <div>
    <div class="box">
      <div class="tborder">
        <div class="left">账单列表</div>
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
        <el-table-column label="日期" min-width="10" align="center" :sortable="'custom'" prop="time"></el-table-column>
        <el-table-column label="类型" min-width="10" align="center" prop="type"></el-table-column>
        <el-table-column label="金额" min-width="10" align="center" prop="cost"></el-table-column>
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

      <el-dialog title="新增账单" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
          <el-form-item label="日期" :label-width="formLabelWidth" prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time"></el-date-picker>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="form.type" placeholder="请选择支出类型">
              <el-option label="饮食" value="饮食"></el-option>
              <el-option label="生活" value="生活"></el-option>
              <el-option label="娱乐" value="娱乐"></el-option>
              <el-option label="医疗" value="医疗"></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth" prop="cost">
            <el-input v-model="form.cost" autocomplete="off"></el-input>
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

      <el-dialog title="编辑账单" :visible.sync="dialogEditFormVisible">
        <el-form :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="日期" :label-width="formLabelWidth" prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.time"></el-date-picker>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="editForm.type" placeholder="请选择支出类型">
              <el-option label="饮食" value="饮食"></el-option>
              <el-option label="生活" value="生活"></el-option>
              <el-option label="娱乐" value="娱乐"></el-option>
              <el-option label="医疗" value="医疗"></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth" prop="cost">
            <el-input v-model="editForm.cost" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细描述" :label-width="formLabelWidth">
            <el-input v-model="editForm.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editData('editForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
     var checkCost = (rule, value, callback) => {
       value = parseFloat(value);
       console.log(value);
        if (!value) {
          return callback(new Error('请输入大于0的数字'));
        }
        setTimeout(() => {
          if (Number.isNaN(value)) {
            callback(new Error('请输入大于0的数字'));
          } else {
            if (value <= 0) {
              callback(new Error('请输入大于0的数字'));
            } else {
              callback();
            }
          }
        }, 0);
      };
    return {
      tableData: [],
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      form: {
        time: "",
        type: "",
        cost: "",
        detail: ""
      },
      editForm: {
        time: "",
        type: "",
        cost: "",
        detail: ""
      },
      editIndex: 0,
      editRows: [],
      formLabelWidth: "120px",
      rules: {
        time: [{ required: true, message: "请输入日期", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        cost: [{ required: true, validator: checkCost, trigger: 'blur' }],
      }
    };
  },
  methods: {
    handleEdit(index, row, rows) {
      this.dialogEditFormVisible = true;
      this.editForm.time = row.time;
      this.editForm.type = row.type;
      this.editForm.cost = row.cost;
      this.editForm.detail = row.detail;
      this.editIndex = index;
      this.editRows = rows;
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
      this.updateModel();
    },
    editData(formName) {
      console.log(typeof(this.editForm.time));
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.editRows.splice(this.editIndex, 1));
      this.tableData.push({
        time: typeof(this.editForm.time)=='string'?this.editForm.time:this.editForm.time.Format("yyyy-MM-dd"),
        type: this.editForm.type,
        cost: parseFloat(this.editForm.cost),
        detail: this.editForm.detail
      });
      this.updateModel();
      this.dialogEditFormVisible = false;
              }
      });
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
            time: this.form.time.Format("yyyy-MM-dd"),
            type: this.form.type,
            cost: parseFloat(this.form.cost),
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
          (a, b) => {            if(b[fieldName] > a[fieldName])
            return 1;
            else if(b[fieldName] < a[fieldName])
            return -1;
            else
            return 0;}
        );
      }
      //按照升序排序
      else {
        this.tableData = this.tableData.sort(
          (a, b) =>{
            if(b[fieldName] < a[fieldName])
            return 1;
            else if(b[fieldName] > a[fieldName])
            return -1;
            else
            return 0;
          }
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
.tborder {
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
