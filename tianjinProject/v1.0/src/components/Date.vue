<template>
    <div class="top">
        <h1>{{title}}</h1>
        <h2><span>{{date}}</span><span>{{week}}</span><span>{{time}}</span></h2>
        <!-- <a v-if="!isIndex" href="javascript:;"></a> -->
        <router-link v-if="!isIndex" to="/"></router-link>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: ['title', 'isIndex'],
    data() {
        return {
            time: moment(new Date()).format('HH:mm:ss'),
        }
    },
    computed: {
        week() {
            const mday = new Date().getDay()
            const weekData = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            return weekData[mday]
        },
        date() {
            const date = new Date()
            return moment(date).format("YYYY年DD月MM日")
        }
    },
    mounted() {
        let _this = this
        this.timer = setInterval(() => {
            _this.time = moment(new Date()).format('HH:mm:ss')
        }, 1000)
    },
}
</script>
<style type="text/css">
.top { width: 100%; height: 315px;float: left; }
.top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.top h2 span { margin-right: 20px; }
.top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%;
display: block; margin: 50px; }
</style>