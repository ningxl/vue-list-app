<template>
  <div class="box">
    <div id="myChart1"></div>
    <div id="myChart2"></div>
    <div class="myTitle">
      <strong>本月账单展示图</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: '',
      tableData: [],
      xAxisData1:[],
      seriesData1:[0,0,0,0,0],
      seriesData2:[
                { value: 0, name: "饮食" },
                { value: 0, name: "医疗" },
                { value: 0, name: "生活" },
                { value: 0, name: "娱乐" },
                { value: 0, name: "其它" }
              ]
    };
  },
  created: function() {
    this.axios
      .get("getData")
      .then(response => {
        this.tableData = response.data;
            var y = parseInt((new Date()).Format("yyyy"));
    var m = parseInt((new Date()).Format("MM"));
    for(var i = 4; i >= 0; i--){
      var yy = m >= i ? y : y - 1;
      var mm = m >= i ? m - i : m + 12 - i; 
      if(mm >= 10)
      this.xAxisData1[i] = yy+"-"+mm;
      else
      this.xAxisData1[i] = yy+"-0"+mm;
    };
    for(var key in this.tableData){
      for(var i = 0; i < 5; i++)
      if(this.tableData[key].time.substring(0,7) == this.xAxisData1[i])
      this.seriesData1[i] += this.tableData[key].cost;
      if(this.tableData[key].time.substring(0,7) == this.xAxisData1[0])
      for(var i = 0; i < 5; i++)
      if(this.tableData[key].type == this.seriesData2[i].name)
      this.seriesData2[i].value += this.tableData[key].cost;
    };
    this.drawLine();
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {
    
  },
  methods: {
    drawLine() {
      var myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      var myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart1.setOption(
        {
          xAxis: {
            type: "category",
            data: this.xAxisData1,
            axisLabel: {
              interval: 0,
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.seriesData1,
              type: "bar"
            }
          ]
        },
        myChart2.setOption({
          series: [
            {
              type: "pie",
              radius: "55%",
              data: this.seriesData2
            }
          ]
        })
      );
    }
  }
};
</script>

<style>
#myChart1,
#myChart2 {
  width: 50%;
  height: 500px;
  display: inline-box;
  float: left;
}
.box {
  background-color: white;
  height: 540px;
}
.myTitle {
  text-align: center;
}
</style>
