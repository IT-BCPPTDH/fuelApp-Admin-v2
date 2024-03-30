export const menuArrayData = [
    {
        name: 'Coal Hauling',
        desc: 'Data Collector for Coal Hauling Entry',
        link: '/coalhauling',
        access: ['MHA', 'MED', 'MOD']
    },
    {
        name: 'Time Entry (Non FMS)',
        desc: 'List Time Entry All Date',
        link: '/time-entry-from-collector',
        access: ['MED', 'MOD']
    },
    // {
    //     name: 'Time Entry (FMS)',
    //     desc: 'Data Time Entry from Satnet DB',
    //     link: '/time-entry-from-fms',
    //     access: ['MED', 'MOD', 'Dispatch']
    // },
    {
        name: 'Breakdown',
        desc: 'Data Collector for Unit Breakdown',
        link: '/breakdown',
        access: ['MED', 'MOD', 'Dispatch']
    },
    // {
    //     name: 'Weather',
    //     desc: 'Data Collector for Weather Delay',
    //     link: '/weather',
    //     access: ['MED', 'MOD', 'Dispatch']
    // },
    // {
    //     name: 'Hours Meter',
    //     desc: 'Data Setup Hours Meter Unit per shift',
    //     link: '/hour-meter',
    //     access: ['MED', 'MOD', 'Dispatch']
    // },
    // {
    //     name: 'Fleet Unit',
    //     desc: 'Data Setup Fleet Unit per shift',
    //     link: '/fleet-unit',
    //     access: ['MED', 'MOD', 'Dispatch']
    // },
    // {
    //     name: 'Mine Plan',
    //     desc: 'Data Collector for Mine Planning Activity',
    //     link: '/mine-plan',
    //     access: ['MED', 'MOD', 'Dispatch']
    // },

    // {
    //     name: 'Distance',
    //     desc: 'Template Data Entry for Distance',
    //     link: '/distance',
    //     access: ['MED', 'MOD', 'Dispatch']
    // }
]

export const formArrayData = [
    {
        name: 'Form Coal Hauling',
        desc: 'Data Collector Coal Hauling',
        link: '/coalhauling-dataentry-form',
        access: ['MHA', 'MED', 'MOD']
    },
    {
        name: 'Form Time Entry - Unit Support',
        desc: 'Data Collector Time Entry for Unit Support',
        link: '/time-entry-support-form',
        access: ['MED', 'MOD']
    },
    {
        name: 'Form Time Entry - Unit Digger',
        desc: 'Data Collector Time Entry for Unit Digger',
        link: '/time-entry-digger-form',
        access: ['MED', 'MOD']
    },
    {
        name: 'Form Time Entry - Unit Hauler',
        desc: 'Data Collector Time Entry for Unit Hauler',
        link: '/time-entry-hauler-form',
        access: ['MED', 'MOD']
    }
]

export const menuTabsTimeEntry = [
    { label: 'Time Entry Support', value: 'time-entry-support-form' },
    { label: 'Time Entry Digger', value: 'time-entry-digger-form' },
    { label: 'Time Entry Hauler', value: 'time-entry-hauler-form' }
]