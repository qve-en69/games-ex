<template>
  <div class="donate">
    <div class="donate-wrapper">
      <div class="donate-title">Я отправил <span>@N0d</span></div>
      <div class="donate-content">
        <div class="donate-sum">
          <span><img src="https://via.placeholder.com/26" alt=""></span>{{ message.connectData.amount }} XRP
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MessageTransfer',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.donate {
  color: #fff;
  font-weight: 200;
  margin: 10px 0 -5px 5px;
  display: flex;
  position: relative;
  background: radial-gradient(89.45% 956.47% at 13.46% 90%, #BE984E 0%, #433D2A 100%);
  border-radius: 15px;
  width: 327px;
  height: 100px;

  &-wrapper {
    border-radius: 15px;
    padding: 10px 13px;
    width: 327px;
    position: relative;
    background-image: url("../../../../assets/images/bg-donate-chat-money.png");
    background-repeat: no-repeat;
    background-position: 80% 75%;
    margin: -5x 0px 0px 0px;
  }

  &-title {
    margin-left: 7px;

    span {
      font-weight: 700;
      color: yellow;
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  &-sum {
    background: #484129;
    border-radius: 15px;
    width: 100%;
    font-weight: 700;
    padding: 12px 0 12px 10px;

    span {
      margin-right: 8px;
    }
  }
}

</style>
