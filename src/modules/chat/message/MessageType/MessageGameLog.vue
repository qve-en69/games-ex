<template>
  <div class="statistic">
    <div class="statistic-wrapper">
      <div class="statistic-title">Мне сегодня повезло!</div>
      <div class="statistic-content">
        <div class="statistic-game-num">
          <div class="statistic-game-num-text">
            <i class="fas fa-dice-six"></i>
            <p>Game ID: #1377</p>
          </div>
          <i class="pi pi-chevron-right"></i>
        </div>
        <div class="statistic-info">
          <div class="statistic-koef">
            <div class="statistic-koef-title">Коэффицент</div>
            <div class="statistic-koef-content">1.69 X</div>
          </div>
          <div class="statistic-profit">
            <div class="statistic-profit-title">Прибыль</div>
            <div class="statistic-profit-content"><span><img src="https://via.placeholder.com/20" alt=""></span>+49.02456</div>
          </div>
        </div>
      </div>
      <div class="statistic-likes">
        <i class="fas fa-heart"></i>
        <span>3</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MessageGameLog',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.statistic {
  color: #fff;
  font-weight: 200;
  margin: 10px 0 -5px 5px;

  &-wrapper {
    background: #292E3D;
    border-radius: 15px;
    padding: 15px 23px 15px 23px;
    max-width: 327px;
  }

  &-content {
    background: #404657;
    border-radius: 15px;
    margin-top: 10px;
    padding: 8px;
  }

  &-game-num {
    display: flex;
    justify-content: space-between;
    background: #20232E;
    border-radius: 15px;
    padding: 14px;
    max-height: 49px;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      background: #292E3D;
    }

    &-text {
      display: flex;
    }
  }

  &-info {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    text-align: center;
  }

  &-koef {

    &-title {
      font-size: 14px;
    }

    &-content {
      background: #20232E;
      border-radius: 15px;
      padding: 14px 0;
      width: 129px;
      font-weight: 700;
    }
  }

  &-profit {

    &-title {
      font-size: 14px;
    }

    &-content {
      background: #20232E;
      border-radius: 15px;
      padding: 14px 0;
      width: 129px;
      color: #9EFF00;

      span {
        margin-right: 8px;
      }
    }
  }

  &-likes {
    display: flex;
    margin: 10px 0 -5px 20px;
  }
}

.fa-dice-six {
  font-size: 22px;
  color: #969696;
  margin-right: 12px;
}

.pi-chevron-right {
  color: #969696;
  font-size: 20px;
  margin-right: -10px;
}

.fa-heart {
  color: #DC3F3F;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}

</style>
