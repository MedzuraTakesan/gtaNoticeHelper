import machines from "./machines";
import bikes from "./bikes";
import chineseMachines from "./chineseMachines";
import chineseBikes from "./chineseBikes";
import waterMachines from "./waterMachines";
import homeses from "./homes";

export const kindOfTransportWithSettings = [
  'machines',
  'chinese machines',
  'chinese bikes',
  'bikes'
]
export const kindOfTransportWithoutSettings = [
  'water transport'
]
export const kindOfTransport = [...kindOfTransportWithoutSettings, ...kindOfTransportWithSettings]


export const kind = {
    machines: machines,
    bikes: bikes,
    'chinese machines': chineseMachines,
    'chinese bikes': chineseBikes,
    'water transport': waterMachines,
    homes: homeses,
    flats: homeses,
    price: ''
}

export const homes = ['homes', 'flats']

export const process = ['buy', 'sell', 'exchange']
