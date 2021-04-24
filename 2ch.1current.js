const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');

const exposes = zigbeeHerdsmanConverters.exposes;
const ea = exposes.access;
const e = exposes.presets;
const fz = zigbeeHerdsmanConverters.fromZigbeeConverters;
const tz = zigbeeHerdsmanConverters.toZigbeeConverters;

const ptvo_switch = zigbeeHerdsmanConverters.findByDevice({modelID: 'ptvo.switch'});

fz.legacy = require('zigbee-herdsman-converters/lib/legacy').fromZigbee

const device = {
    zigbeeModel: ['2ch.1current'],
    model: '2ch.1current',
    vendor: 'Custom devices (DiY)',
    description: '[2 channel relay: first channel with current measurements](https://ptvo.info/zigbee-configurable-firmware-features/)',
    fromZigbee: [fz.ignore_basic_report, fz.ptvo_switch_analog_input, fz.on_off, fz.ptvo_multistate_action, fz.legacy.ptvo_switch_buttons,],
    toZigbee: [tz.ptvo_switch_analog_input, tz.on_off, tz.ptvo_switch_trigger,],
    exposes: [
      /* e.action(['single', 'double', 'tripple', 'hold']']).withAccess(ea.STATE_SET), - related to tz.ptvo_switch_uart*/
      e.current().withAccess(ea.STATE_SET).withEndpoint('l1'),
      e.switch().withEndpoint('l2'),
      e.switch().withEndpoint('l5'),
      e.temperature().withEndpoint('l8')
    ],
    meta: {
        multiEndpoint: true,        
    },
    endpoint: (device) => {
        return {
            l1: 1, l2: 2, l5: 5, l8: 8, action: 1
        };
    }    
};

module.exports = device;
