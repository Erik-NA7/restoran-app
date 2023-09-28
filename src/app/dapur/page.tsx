'use client';

import { useContext } from 'react';
import { RestaurantContext } from '@/context';

export default function OrderMenu() {
  const { menuItems, orderItems, tables } = useContext(RestaurantContext)

  const menuMap = new Map()
  menuItems.forEach(menu => {
    menuMap.set(menu.id, menu.name);
  });

  const ordersByTable = tables.map(t => {
    const tableOrders = orderItems
    .filter(o => o.tableId == t.id)
    .map(o => {
      const menu = menuMap.get(o.menuId)
      return {
        name: menu,
        quantity: o.quantity
      } 
    })

    return {
      tableId: t.id,
      orders: tableOrders
    }
  })

  return (
    <section>
      <div className="flex">
        { ordersByTable && ordersByTable.map((g, _) => {
          return (
            <div key={`table-${g.tableId}`} className="w-1/3 space-y-4">
              <h3 className="font-semibold text-xl leading-none">Meja {g.tableId}</h3>
              { g.orders && g.orders.map(( d, _) => 
                <div key={`table-order-${_}`} className="space-y-1">
                  <div className="flex text-sm text-muted-foreground">
                    <div className="w-[30px]">{d?.quantity} x</div>
                    <div className="w-full">{d?.name}</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}