import { i18n } from '@/plugin';
// 获取i18n对象

export default [
  {
    iconCode: 'iconmenu_basic_select',
    title: i18n.global.t('configMenu.t14'),
    routeName: 'common',
    routePath: '/common',
    children: [
      {
        iconCode: 'iconsecond_menu_masterdata',
        title: i18n.global.t('configMenu.t15'),
        routeName: 'basicmanage',
        routePath: '/common/basicmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t16'),
            routeName: 'channellist',
            routePath: '/common/basicmanage/channellist',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t17'),
            routeName: 'storelist',
            routePath: '/common/basicmanage/storelist',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t18'),
            routeName: 'warehouselist',
            routePath: '/common/basicmanage/warehouselist',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t19'),
            routeName: 'courierlist',
            routePath: '/common/basicmanage/courierlist',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t20'),
            routeName: 'suppliertype',
            routePath: '/common/basicmanage/suppliertype',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t21'),
            routeName: 'suppliermanage',
            routePath: '/common/basicmanage/suppliermanage',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t22'),
            routeName: 'procurementtype',
            routePath: '/common/basicmanage/procurementtype',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t23'),
            routeName: 'procurementreturntype',
            routePath: '/common/basicmanage/procurementreturntype',
            permissions: [],
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_permissions_select',
    title: i18n.global.t('configMenu.t24'),
    routeName: 'rights',
    routePath: '/rights',
    children: [
      {
        iconCode: 'iconsecond_menu_user',
        title: i18n.global.t('configMenu.t25'),
        routeName: 'usermanage',
        routePath: '/rights/usermanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t26'),
            routeName: 'userlist',
            routePath: '/rights/usermanage/userlist',
            permissions: [
              'user_query',
              'user_insert',
              'user_disable',
              'user_update',
              'user_pwd',
              'user_assign_role',
              'user_rest_pwd',
            ],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t27'),
            routeName: 'rolelist',
            routePath: '/rights/usermanage/rolelist',
            permissions: [
              'role_query',
              'role_insert',
              'role_disable',
              'role_update',
              'role_relation_user_jump',
            ],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t28'),
            routeName: 'datasetlist',
            routePath: '/rights/usermanage/datasetlist',
            permissions: [
              'data_group_query',
              'data_group_create',
              'data_group_enable',
              'data_group_update',
              'data_group_relation_user',
            ],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t29'),
            routeName: 'organizationlist',
            routePath: '/rights/usermanage/organizationlist',
            permissions: [],
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t30'),
            routeName: 'menulist',
            routePath: '/rights/usermanage/menulist',
            permissions: [],
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_log',
        title: i18n.global.t('configMenu.t31'),
        routeName: 'logmanage',
        routePath: '/rights/logmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t32'),
            routeName: 'loglist',
            routePath: '/rights/logmanage/loglist',
            permissions: ['auditlog_query'],
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_goods_select',
    title: i18n.global.t('configMenu.t33'),
    routeName: 'pim',
    routePath: '/pim',
    children: [
      {
        tab: false,
        iconCode: '',
        title: i18n.global.t('configMenu.t33'),
        routeName: 'dashboard',
        routePath: '/pim/dashboard',
      },
      {
        iconCode: 'iconsecond_menu_goods',
        title: i18n.global.t('configMenu.t34'),
        routeName: 'productmanage',
        routePath: '/pim/productmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t35'),
            routeName: 'productpublish',
            routePath: '/pim/productmanage/productpublish',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t36'),
            routeName: 'productshelf',
            routePath: '/pim/productmanage/productshelf',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t37'),
            routeName: 'productcreate',
            routePath: '/pim/productmanage/productcreate',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t38'),
            routeName: 'productcombination',
            routePath: '/pim/productmanage/productcombination',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t39'),
            routeName: 'productrecycle',
            routePath: '/pim/productmanage/productrecycle',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t40'),
            routeName: 'productlibrary',
            routePath: '/pim/productmanage/productlibrary',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_brand',
        title: i18n.global.t('configMenu.t41'),
        routeName: 'brandmanage',
        routePath: '/pim/brandmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t42'),
            routeName: 'brandlist',
            routePath: '/pim/brandmanage/brandlist',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_category',
        title: i18n.global.t('configMenu.t43'),
        routeName: 'categorymanage',
        routePath: '/pim/categorymanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t44'),
            routeName: 'virtualcategorylist',
            routePath: '/pim/categorymanage/virtualcategorylist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t45'),
            routeName: 'salescategorylist',
            routePath: '/pim/categorymanage/salescategorylist',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_label',
        title: i18n.global.t('configMenu.t46'),
        routeName: 'labelmanage',
        routePath: '/pim/labelmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t47'),
            routeName: 'labellist',
            routePath: '/pim/labelmanage/labellist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t48'),
            routeName: 'productlabel',
            routePath: '/pim/labelmanage/productlabel',
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_orderhub_select',
    title: i18n.global.t('configMenu.t49'),
    routeName: 'orderhub',
    routePath: '/orderhub',
    children: [
      {
        iconCode: 'iconsecond_menu_store',
        title: i18n.global.t('configMenu.t50'),
        routeName: 'authorizedmanage',
        routePath: '/orderhub/authorizedmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t51'),
            routeName: 'authorizedshop',
            routePath: '/orderhub/authorizedmanage/authorizedshop',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_archives',
        title: i18n.global.t('configMenu.t52'),
        routeName: 'archivesmanage',
        routePath: '/orderhub/archivesmanage',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t53'),
            routeName: 'addressmapping',
            routePath: '/orderhub/archivesmanage/addressmapping',
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_order_select',
    title: i18n.global.t('configMenu.t54'),
    routeName: 'order',
    routePath: '/order',
    children: [
      {
        iconCode: 'iconsecond_menu_archives',
        title: i18n.global.t('configMenu.t55'),
        routeName: 'orderarchives',
        routePath: '/order/orderarchives',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t56'),
            routeName: 'storeconfig',
            routePath: '/order/orderarchives/storeconfig',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t57'),
            routeName: 'productmapping',
            routePath: '/order/orderarchives/productmapping',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t58'),
            routeName: 'recordlabel',
            routePath: '/order/orderarchives/recordlabel',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t59'),
            routeName: 'materialfile',
            routePath: '/order/orderarchives/materialfile',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t60'),
            routeName: 'promotionalgifts',
            routePath: '/order/orderarchives/promotionalgifts',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_b2c',
        title: `B2C${i18n.global.t('configMenu.t61')}`,
        routeName: 'b2c',
        routePath: '/order/b2c',
        children: [
          {
            title: i18n.global.t('configMenu.t62'),
            routeName: 'ordermanage',
            routePath: '/order/b2c/ordermanage',
            children: [
              {
                tab: true,
                title: i18n.global.t('configMenu.t63'),
                routeName: 'abnormalorder',
                routePath: '/order/b2c/ordermanage/abnormalorder',
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t64'),
                routeName: 'ordersearch',
                routePath: '/order/b2c/ordermanage/ordersearch',
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t65'),
                routeName: 'shippingorder',
                routePath: '/order/b2c/ordermanage/shippingorder',
              },
            ],
          },
          {
            title: i18n.global.t('configMenu.t66'),
            routeName: 'aftersalemanage',
            routePath: '/order/b2c/aftersalemanage',
            children: [
              {
                tab: true,
                title: i18n.global.t('configMenu.t67'),
                routeName: 'refundlist',
                routePath: '/order/b2c/aftersalemanage/refundlist',
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t68'),
                routeName: 'returngoods',
                routePath: '/order/b2c/aftersalemanage/returngoods',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_inventory_select',
    title: i18n.global.t('configMenu.t69'),
    routeName: 'inventory',
    routePath: '/inventory',
    children: [
      {
        iconCode: 'iconsecond_menu_archives',
        title: i18n.global.t('configMenu.t52'),
        routeName: 'inventoryarchives',
        routePath: '/inventory/inventoryarchives',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t70'),
            routeName: 'warehouselist',
            routePath: '/inventory/inventoryarchives/warehouselist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t71'),
            routeName: 'warehousemapping',
            routePath: '/inventory/inventoryarchives/warehousemapping',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t72'),
            routeName: 'uploadinventorysettings',
            routePath: '/inventory/inventoryarchives/uploadinventorysettings',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_procurement',
        title: i18n.global.t('configMenu.t73'),
        routeName: 'procurement',
        routePath: '/inventory/procurement',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t74'),
            routeName: 'procurementlist',
            routePath: '/inventory/procurement/procurementlist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t75'),
            routeName: 'purchasereceipt',
            routePath: '/inventory/procurement/purchasereceipt',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t76'),
            routeName: 'procurementoutlist',
            routePath: '/inventory/procurement/procurementoutlist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t77'),
            routeName: 'materialinventory',
            routePath: '/inventory/procurement/materialinventory',
          },
        ],
      },
      {
        iconCode: 'iconsecond-menu-stock',
        title: i18n.global.t('configMenu.t78'),
        routeName: 'stock',
        routePath: '/inventory/stock',
        children: [
          {
            tab: true,
            title: i18n.global.t('configMenu.t79'),
            routeName: 'adjustmentlist',
            routePath: '/inventory/stock/adjustmentlist',
          },
          {
            tab: true,
            title: i18n.global.t('configMenu.t80'),
            routeName: 'processorderlist',
            routePath: '/inventory/stock/processorderlist',
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_externalwarehouse',
        title: i18n.global.t('configMenu.t81'),
        routeName: 'externalwarehouse',
        routePath: '/inventory/externalwarehouse',
        children: [
          {
            title: `${i18n.global.t('configMenu.t82')}WMS`,
            routeName: 'qimenwms',
            routePath: '/inventory/externalwarehouse/qimenwms',
            children: [
              {
                tab: true,
                title: `${i18n.global.t('configMenu.t82')}WMS配置`,
                routeName: 'warehousesetting',
                routePath:
                  '/inventory/externalwarehouse/qimenwms/warehousesetting',
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t84'),
                routeName: 'qimenSyncGoods',
                routePath: '/inventory/externalwarehouse/qimenwms/syncgoods',
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t85'),
                routeName: 'qimenApiLogs',
                routePath: '/inventory/externalwarehouse/qimenwms/apilogs',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    iconCode: 'iconmenu_crm_select',
    title: i18n.global.t('configMenu.t86'),
    routeName: 'crm',
    routePath: '/crm',
    children: [
      {
        tab: true,
        iconCode: 'iconiCONDashboard',
        title: i18n.global.t('configMenu.t87'),
        routeName: 'memberlist',
        routePath: '/crm/memberlist',
        permissions: [],
      },
      {
        iconCode: 'iconiCONDashboard1',
        title: i18n.global.t('configMenu.t88'),
        routeName: 'memberloyalty',
        routePath: '/crm/memberloyalty',
        children: [
          {
            title: i18n.global.t('configMenu.t89'),
            routeName: 'memberlevel',
            routePath: '/crm/memberloyalty/memberlevel',
            children: [
              {
                tab: true,
                title: i18n.global.t('configMenu.t90'),
                routeName: 'levelsetting',
                routePath: '/crm/memberloyalty/memberlevel/levelsetting',
                permissions: [],
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t91'),
                routeName: 'levelliftrules',
                routePath: '/crm/memberloyalty/memberlevel/levelliftrules',
                permissions: [],
              },
            ],
          },
          {
            title: i18n.global.t('configMenu.t92'),
            routeName: 'memberintegral',
            routePath: '/crm/memberloyalty/memberintegral',
            children: [
              {
                tab: true,
                title: i18n.global.t('configMenu.t93'),
                routeName: 'integralbasesetting',
                routePath:
                  '/crm/memberloyalty/memberintegral/integralbasesetting',
                permissions: [],
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t94'),
                routeName: 'tradingbonuspoints',
                routePath:
                  '/crm/memberloyalty/memberintegral/tradingbonuspoints',
                permissions: [],
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t95'),
                routeName: 'interactiveintegraltask',
                routePath:
                  '/crm/memberloyalty/memberintegral/interactiveintegraltask',
                permissions: [],
              },
            ],
          },
        ],
      },
      {
        iconCode: 'iconsecond_menu_member',
        title: i18n.global.t('configMenu.t96'),
        routeName: 'more',
        routePath: '/crm/more',
        children: [
          {
            title: i18n.global.t('configMenu.t97'),
            routeName: 'datamanage',
            routePath: '/crm/more/datamanage',
            children: [
              {
                tab: true,
                title: i18n.global.t('configMenu.t98'),
                routeName: 'metadata',
                routePath: '/crm/more/datamanage/metadata',
                permissions: [],
              },
              {
                tab: true,
                title: i18n.global.t('configMenu.t99'),
                routeName: 'membersystem',
                routePath: '/crm/more/datamanage/membersystem',
                permissions: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
