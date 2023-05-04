import Vue from 'vue'

function currencyToIconClass (value) {
  let className = ''
  switch (value) {
    case 'RUB':
      className = 'fas fa-ruble-sign'
      break
    case 'USD':
      className = 'fas fa-dollar-sign'
      break
    case 'EUR':
      className = 'fas fa-euro-sign'
      break
    case 'UAH':
      className = 'fas fa-hryvnia'
      break
    case 'BTC':
      className = 'fab fa-bitcoin'
      break
    case 'DOGE':
      className = 'fab fa-dochub'
      break
  }

  return className
}

function divideByHundred (value) {
  return (value / 100)
}

export default function registerFilters () {
  Vue.filter('currencyToIconClass', currencyToIconClass)
  Vue.filter('divideByHundred', divideByHundred)
}
