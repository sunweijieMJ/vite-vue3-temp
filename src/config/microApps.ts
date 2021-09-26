const microApps: Array<{
    name: 'common' | 'rights' | 'pim' | 'oms' | 'crm' | 'prom';
    activeRule: string | Array<string>;
    container: string;
    entry: string;
    [key: string]: unknown;
}> = [
    {
        name: 'common',
        activeRule: '/common',
        container: '#micro-app',
        entry: '/micro-app/web-micro-masterdata/',
    },
    {
        name: 'rights',
        activeRule: '/rights',
        container: '#micro-app',
        entry: '/micro-app/web-micro-rights/',
    },
    {
        name: 'pim',
        activeRule: '/pim',
        container: '#micro-app',
        entry: '/micro-app/web-micro-pim/',
    },
    {
        name: 'oms',
        activeRule: ['/orderhub', '/order', '/inventory', '/report'],
        container: '#micro-app',
        entry: '/micro-app/web-micro-oms/',
    },
    {
        name: 'crm',
        activeRule: '/crm',
        container: '#micro-app',
        entry: '/micro-app/web-micro-crm/',
    },
    {
        name: 'prom',
        activeRule: '/promotion',
        container: '#micro-app',
        entry: '/micro-app/web-micro-prom/',
    },
];

export default microApps;
