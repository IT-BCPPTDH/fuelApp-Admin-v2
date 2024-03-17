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
    {
        name: 'Time Entry (FMS)',
        desc: 'Data Time Entry from Satnet DB',
        link: '/time-entry-from-fms',
        access: ['MED', 'MOD', 'Dispatch']
    },
    {
        name: 'Monitoring Breakdown',
        desc: 'Data Collector for Monitoring BD',
        link: '/monitoring-breakdown',
        access: ['MED', 'MOD', 'Dispatch']
    },
    // {
    //   name: 'Coal Hauling Admin',
    //   desc: 'Data Collector for Coal Hauling Entry Admin',
    //   link: '/coalhauling-admin'
    // },

    // {
    //     name: 'Data Mine Plan',
    //     desc: 'Data Collector for Mine Planning Activity',
    //     link: '/mineplan'
    // },

    // {
    //     name: 'Data Distance',
    //     desc: 'Template Data Entry for Distance',
    //     link: '/distance-data-entry'
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