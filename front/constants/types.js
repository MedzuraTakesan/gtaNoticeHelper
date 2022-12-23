import machines from "./machines";
import bikes from "./bikes";
import chineseMachines from "./chineseMachines";
import chineseBikes from "./chineseBikes";
import waterMachines from "./waterMachines";
import homes from "./homes";

export const kindOfTransportWithSettings = ['machines', 'bikes']
export const kindOfTransportWithoutSettings = [
  'water transport',
  'chinese machines',
  'chinese bikes'
]
export const kindOfTransport = [...kindOfTransportWithoutSettings, ...kindOfTransportWithSettings]


export const kind = {
    machines: machines,
    bikes: bikes,
    'chinese machines': chineseMachines,
    'chinese bikes': chineseBikes,
    'water transport': waterMachines,
    homes: homes,
    price: ''
}


export const process = ['buy', 'sell', 'exchange']
