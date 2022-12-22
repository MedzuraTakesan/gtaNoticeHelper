function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getType = (type) => {
  if (type === 'exchange') {
    return 'Обменяю'
  }
  if (type === 'sell') {
    return 'Продам'
  }
  if (type === 'buy') {
    return 'Куплю'
  }
  return ''
}

const getMachinePhrase = (value) => {
  const machineSettings = value.machineSettings === 'не указывать'
    ? ''
    : ` ${value.machineSettings}`

  return ` а/м ${value.value}${machineSettings}`
}

const getGaragesCount = (value) => {
  if (value.garageSettings === 'не указывать') {
    return ''
  }

  if (value.garageSettings === 'без г.м') {
    return ` ${value.garageSettings}`
  }

  return ` с ${value.garageCounts} ${value.garageSettings}`
}

const getHomesPhrase = (value) => {
  const garageSettings = value.garageSettings === 'не указывать'
    ? ''
    : getGaragesCount(value)

  return ` дом ${value.value}${garageSettings}`
}

const getPricePhrase = (value, process) => {
  const firstPhrase = process === 'buy' ? 'Бюджет' : 'Цена'
  const lastPhrase = process === 'buy' ? ' свободный' : ' договорная'
  const price = value.value !== '' ? `: ${value.value}` : ''
  const correctLastPhrase = price !== '' ? `${numberWithSpaces(price)}$` : lastPhrase

  return `${firstPhrase}${correctLastPhrase}`
}

const getPhrase = (value, process) => {
  if (value.type === 'machines') {
    return getMachinePhrase(value)
  }
  if (value.type === 'homes') {
    return getHomesPhrase(value)
  }
  if (value.type === 'price') {
    return getPricePhrase(value, process)
  }

  return ''
}

const getArticle = (process) => {
  if (process === 'exchange') {
    return ' на'
  }
  return '.'
}

export const start = (value) => {
  const type = getType(value.process)
  const getFirstWords = getPhrase(value.firstValue, value.process)
  const getSecondWords = getPhrase(value.secondValue, value.process)
  const article = getArticle(value.process)

  return `${type}${getFirstWords}${article}${getSecondWords}.`
}
