import {
  kindOfTransport,
  homes,
  kindOfTransportWithoutSettings
} from "~/constants/types";

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

const getMachineType = (type) => {
  if (type === 'water transport') {
    return 'водный транспорт'
  }

  if (['bikes', 'chinese bikes'].includes(type)) {
    return 'мото марки'
  }

  if (['machines', 'chinese machines'].includes(type)) {
    return 'а/м'
  }

  return ''
}

const getMachinePhrase = (value) => {
  const isWithoutSettings = kindOfTransportWithoutSettings.includes(value.type)
  const machineSettings = value.machineSettings === 'не указывать' || isWithoutSettings
    ? ''
    : ` ${value.machineSettings}`
  const machineName = value.value.split('<--')[0]

  return ` ${getMachineType(value.type)} ${machineName}${machineSettings}`
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
  const number = value.number > '' ? ` №${value.number}` : ''

  return ` дом${number} ${value.value}${garageSettings}`
}

const getFlatsPhrase = (value) => {
  const garageSettings = value.garageSettings === 'не указывать'
    ? ''
    : getGaragesCount(value)
  const number = value.number > '' ? ` №${value.number}` : ''

  return ` квартиру${number}${garageSettings}`
}

const getFirstPhraseForPrice = (process, price) => {
  if (process === 'sell') {
    return ' Цена'
  }

  if (process === 'buy' && price === '0') {
    return ' Цена'
  }

  return ' Бюджет'
}

const getPricePhrase = (value, process) => {
  const firstPhrase = getFirstPhraseForPrice(process, value.value)
  const lastPhrase = firstPhrase === ' Бюджет' ? ' свободный' : ' договорная'
  const price = value.value !== '' ? `: ${value.value}` : ''
  const correctLastPhrase = value.value > '0' ? `${numberWithSpaces(price)}$` : lastPhrase

  return `${firstPhrase}${correctLastPhrase}`
}

const getPhrase = (value, process) => {
  if (kindOfTransport.includes(value.type)) {
    return getMachinePhrase(value)
  }
  if (value.type === 'homes') {
    return getHomesPhrase(value)
  }
  if (value.type === 'flats') {
    return getFlatsPhrase(value)
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

const getAdditionalPaymentPhrase = (count) => {
  if (count === '0') {
    return ' договорная'
  }

  return `: ${numberWithSpaces(count)}$`
}

const getAdditionalPayment = (value) => {
  if (value.additionalPayment === '') {
    return ''
  }

  return `. Доплата${getAdditionalPaymentPhrase(value.additionalPayment)}`
}

const getAdditionalPhrase = (value) => {
  if (value.process === 'exchange') {
    return getAdditionalPayment(value)
  }

  return ''
}

const getBargain = (process, bargain, price) => {
  console.log({
    process,
    bargain,
    price
  })
  if (process === 'sell' && bargain && price > '0') {
    return '. Возможен торг'
  }

  return ''
}


const getMarketPhrase = (value) => {
  const type = getType(value.process)
  const getFirstWords = getPhrase(value.firstValue, value.process)
  const getSecondWords = getPhrase(value.secondValue, value.process)
  const article = getArticle(value.process)
  const additionalPhrase = getAdditionalPhrase(value)
  const bargain = getBargain(value.process, value.bargain, value.secondValue.value)

  return `${type}${getFirstWords}${article}${getSecondWords}${additionalPhrase}${bargain}.`
}

const getMeetingPhrase = (value) => {
  return `${value.variable} для ${value.answer}. О себе: при встрече`
}

const getSearchPeoplePhrase = (value) => {
  return `${value.variable} ${value.name}. ${value.answer}`
}


const getPeoplePhrase = (value) => {
  if (value.type === 'Знакомства') {
    return getMeetingPhrase(value)
  }
  if (value.type === 'Поиск людей') {
    return getSearchPeoplePhrase(value)
  }
  return ''
}

export const start = (value, type) => {
  if (type === 'market') {
    return getMarketPhrase(value)
  }
  if (type === 'people') {
    return getPeoplePhrase(value)
  }

  return ''
}
