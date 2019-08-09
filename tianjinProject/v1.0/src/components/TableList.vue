<template>
  <div>
    <ul v-if="showType">
      <li
        :class="{this: enterpriseType == index}"
        v-for="(type, index) in enterpriseHeaders"
        :key="index"
        @click="getEnterpriseData(index)"
      >{{type}}</li>
    </ul>
    <table>
      <tbody>
        <tr v-for="(data,index) in enterpriseData" :key="index">
          <td>{{(index+1)+data.compName}}</td>
          <td>
            <span>
              <i :style="{width: (data.num/max*100)+'%'}"></i>
            </span>
          </td>
          <td>{{data.num}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { compare } from "../../tool/index.js";
export default {
  props: ["showType", "url"],
  data() {
    return {
      enterpriseHeaders: ["业务量", "实名量", "面单量", "电商量"],
      enterpriseType: 0,
      enterpriseData: [],
      max: 0
    };
  },
  created() {
    this.getEnterpriseData(this.enterpriseType);
  },
  methods: {
    getEnterpriseData(index) {
      this.enterpriseType = index;

      let params = { requestid: "xcadadas" };
      this.$axios
        .post(this.url, params)
        .then(res => {
          let data = res.data;
          if (data.success == true) {
            this.enterpriseData = data.rows[this.enterpriseType].slice(0,8);
            this.max = this.enterpriseData[0].num*1.2;
          }
        })
        .catch(err => {
          console.log(err);
        });

      // this.$axios.get(this.url,{
      //     params: {
      //         type: this.enterpriseType,
      //     }
      // }).then(res => {
      //     let data = res.data
      //     if (data.code == '0') {
      //         this.enterpriseData = []
      //         data.data.sort(compare('number')).forEach(item => {
      //             this.enterpriseData.push(item)
      //         })
      //     }
      // }).catch(err => {
      //     console.log(err)
      // })
    }
  }
};
</script>
<style scoped>
table tr {
  height: 33px;
}
table {
  width: 100%;
  height: 79%;
  margin-top: 10px;
  float: left;
}
table td {
  font-size: 14px;
  color: #fff;
}
table tr td:last-child {
  color: #62bb82;
}
table tr td:nth-child(1),
table tr td:nth-child(3) {
  width: 20%;
  text-align: center;
}
table tr td span {
  width: 100%;
  height: 12px;
  background: #161a3c;
  display: block;
  border-radius: 6px;
  overflow: hidden;
}
table tr td span i {
  width: 0%;
  background: #62bb82;
  display: block;
  height: 100%;
  border-radius: 0 6px 6px 0;
}
table tr:nth-child(1) td,
table tr:nth-child(2) td,
table tr:nth-child(3) td {
  color: #f19d3a;
}
table tr:nth-child(1) i,
table tr:nth-child(2) i,
table tr:nth-child(3) i {
  background: #f19d3a;
}
ul {
  float: right;
  margin-top: 20px;
}
ul li {
  padding: 5px 8px;
  color: #1f397c;
  float: left;
  font-size: 14px;
  cursor: pointer;
}
ul .this {
  box-shadow: 0px 0px 10px #0085ff;
  color: #fff;
}
</style>