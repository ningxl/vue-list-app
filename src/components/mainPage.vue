<template>
  <div class="box">
    <div id="myChart1"></div>
    <div id="myChart2"></div>
    <div class="myTitle">
      <strong>项目技术框架</strong>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      var myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart1.setOption(
        {
          xAxis: {
            type: "category",
            data: [
              "Vue",
              "Vuex",
              "Vue-cli",
              "Vue-router",
              "Element-ui",
              "Axios",
              "echarts"
            ],
            axisLabel: {
              interval: 0,
              rotate: "15"
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar"
            }
          ]
        },
        myChart2.setOption({
          series: [
            {
              type: "pie",
              radius: "55%",
              data: [
                { value: 310, name: "Node.js" },
                { value: 335, name: "Express" },
                { value: 400, name: "Mongodb" }
              ]
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
