<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Api } from '@/assets/http'
const keyId: string = ''
const msgList = ref([
  {
    my: false,
    msg: '您好,我是xxxxx机器人,请问有什么问题可以帮助您?'
  }
])
const msgCount = ref<string>('')
const msg = ref<string>("")
const sendComplete = ref<boolean>(false)
onMounted(() => {
  msgList.value = JSON.parse(localStorage.getItem('BotRes') as string)
})
const senfMsg = async () => {
  //为空return 不执行
  if (!msg.value.trim()) {
    return false;
  }
  //请求中......
  sendComplete.value = true
  let chatHistory = JSON.parse(localStorage.getItem('BotRes') as string)
  //本地数据持久化  添加聊天记录到localStorage中
  chatHistory.push({
    msg: msg.value.trim(),
    my: true
  })

  msgList.value.push({
    msg: msg.value.trim(),
    my: true
  })

  localStorage.setItem('BotRes', JSON.stringify(chatHistory))

  //post报文格式
  msgCount.value += ('YOU:' + msg.value.trim() + '\n')
  //用对象包裹请求数据
  let options = {
    msgCount: msgCount.value,
    key: keyId
  }
  //发送给 chart gpt服务器 -- post
  let res = await Api.getBotRes(options)
  // console.log(res) 
  //切割返回回来的字符串
  // let text = (<any>res).data.choices[0].text.replace("openai:", "").replace("openai：", "").replace(/^\n|\n$/g, "")
    let text = (<any>res).data.choices[0].text.replace(/\n/g, "<br/>")
  // console.log(text)


  //客户端页面渲染Bot的回答
  msgList.value.push({
    msg: text,
    my: false
  })

  chatHistory.push({
    msg: text,
    my: false
  })
  localStorage.setItem('BotRes', JSON.stringify(chatHistory))
  //拼接上下文等待下次发送
  msgCount.value += (text + "\n")
  //清空输入框里的值                 
  msg.value = ""
  //请求状态结束
  sendComplete.value = false
}

</script>
<template>
  <h1>Chart Gpt AI 连接试验</h1>
  <!-- 用来获取消息体高度 -->
  <div class="chat-box">
    <div class="chat-container" v-for="(item, index) in msgList">
      <!-- 机器人消息盒子 -->
      <div class="bot-msg" v-if="!item.my">
        <div class="response">
          <img class="auto-img" src="../assets/头像.jpg" alt="">
          <span class="bot-res" v-html="item.msg"></span>
        </div>
      </div>
      <!-- 用户消息盒子 -->
      <div class="my-msg" v-if="item.my">
        <div class="request">
          <span class="my-res" v-html="item.msg"></span>
        </div>
        <img class="auto-img" src="../assets/touxian.jpeg" alt="">
      </div>
    </div>
  </div>
  <!-- 发送消息的盒子 -->
  <div class="send-msg">
    <input type="text" v-model="msg">
    <van-button v-if="!sendComplete" @click="senfMsg" type="primary">发送</van-button>
    <van-button v-else loading type="success" loading-text="加载中..." />
  </div>
</template>

<style scoped>
h1 {
  padding: 20px;
}

.chat-box {
  width: 1280px;
  min-height: 600px;
  background-color: rgb(53, 54, 58);
  border-radius: 15px;
  overflow: auto;
}

.chat-container {
  display: flex;
  flex-direction: column;
}



.auto-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.bot-msg,
.my-msg {
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
}


.response,
.request {
  display: flex;
}

.my-msg {
  display: flex;
  justify-content: flex-end;
}

.bot-res {
  position: relative;
  max-width: 500px;
  padding: 15px;
  border-radius: 15px;
  background-color: black;
  display: inline-block;
  margin-left: 15px;
}

.bot-res::after {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  border: 8px solid;
  border-color: transparent black transparent transparent;
}

.my-res {
  position: relative;
  min-width: 100px;
  padding: 15px;
  border-radius: 15px;
  background-color: black;
  display: inline-block;
  margin-right: 15px;
}

.my-res::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  border: 8px solid;
  border-color: transparent transparent transparent black;
}

.send-msg {
  padding: 10px;
  display: flex;
  align-items: center;
}

input {
  width: 600px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 15px;
  background-color: rgb(53, 54, 58);
  color: #EBEBEBA3;
  text-indent: 1.5em;
  margin-right: 10px;
}

/* 
 button {
  width: 60px;
  height: 50px;
  margin-left: 10px;
  border-radius: 15px;
  background-color: rgb(53,54,58);
  color: #EBEBEBA3;
  border: none;
 } */

.loading {
  background-color: tomato;
}
</style>
