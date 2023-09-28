'use client';

import { useContext, useState, useEffect } from 'react';
import { RestaurantContext } from '@/context';
import { localizeNumber } from '@/helpers';
import CheckBox from '@/components/CheckBox';

interface struckItem {
  orders: {
    quantity: number;
    name: string;
    total: number;
  }[]
  sum: number;
}

export default function OrderMenu() {
  const { menuItems, orderItems, clearTableOrder, globalReset } = useContext(RestaurantContext)
  const [ table, setTable ] = useState<number>(0)
  const [ tablesVisible, setTableVisible ] = useState<boolean>(false)
  const [ struckVisible, setStruckVisible ] = useState<boolean>(false)
  const [ struck, setStruck] = useState<struckItem | null>() 

  const tables = Array.from(new Set(orderItems.map(o => o.tableId)))

  const menuMap = new Map()
  menuItems.forEach(menu => {
    menuMap.set(menu.id, {name: menu.name, price: menu.price});
  });

  const ordersByTable = (table: number) => {
    let sum = 0
    const tableOrders = orderItems
    .filter(o => o.tableId == table)
    .map(o => {
      const menu = menuMap.get(o.menuId)
      const total = menu.price * o.quantity
      sum += total
      return {
        name: menu.name,
        quantity: o.quantity,
        total: total
      } 
    })

    setStruck({
      orders: tableOrders,
      sum: sum
    })
  }

  const handleSelectTable = (table: number) => {
    setTable(table)
    setTableVisible(prev => !prev)
  }

  const printStruck = () => {
    ordersByTable(table)
    setStruckVisible(true)
  }

  const clearTable = () => {
    clearTableOrder(table)
    setStruckVisible(false)
    setTable(0)
  }

  useEffect(() => {
    if (globalReset) {
      setStruckVisible(false)
      setStruck(null)
      setTable(0)
    }
  }, [globalReset])

  return (
    <section className="space-y-2">
      <div className="space-y-1 w-full">
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Meja</span>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <div
              className="space-y-1 w-[180px]"
              onBlurCapture={() => {
                setTimeout(() => {
                  setTableVisible(false)
                }, 200)
              }}
            >
              <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground" onClick={() => setTableVisible(prev => !prev)}>
                <span style= {{ pointerEvents: "none" }}>{ table || 'Nomor Meja'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <div className="z-10 bg-background divide-y divide-gray-100 rounded-md relative">
                { tablesVisible && tables.length > 0 &&
                  <div className="w-full p-1 bg-background text-sm text-gray-700 dark:text-gray-200 shadow-md absolute top-1">
                    { tables && tables.map((t) => {
                      return (
                        <button key={`table-${t}`} type="button" className="inline-flex items-center space-x-3 w-full px-3 py-2 text-muted-foreground hover:bg-gray-100"
                        onClick={() => handleSelectTable(t)}
                        >
                          <CheckBox checked={ table == t}/>
                          <div className="inline-flex items-center">{t}</div>
                        </button>
                      )
                    })}
                  </div>
                }
              </div>

            </div>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              disabled={!table}
              onClick={printStruck}
            >
              Print struk</button>
          </div>

          {/* clear table */}
          { table > 0 &&
            <button
              className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
              onClick={() => clearTable()}
            >Kosongkan Meja</button>
          }
        </div>
      </div>
   
      { struckVisible &&
        <table className="w-full caption-bottom text-sm">
          <caption className="mt-4 text-sm text-muted-foreground">Terima kasih sudah makan di <b>Restoran</b></caption>
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 align-middle font-medium text-muted-foreground :pr-0 text-right w-[120px]">Jumlah</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground :pr-0">Menu</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground :pr-0 w-[100px]">Harga</th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            { struck && struck?.orders?.map((s, _) => {
              return (
                <tr key={`table-${table}-order-${_}`} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle :pr-0 font-medium text-right">{s?.quantity}</td>
                  <td className="p-4 align-middle :pr-0">{s?.name}</td>
                  <td className="p-4 align-middle :pr-0 text-right">{localizeNumber(s?.total)}</td>
                </tr>
              )
            })}
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="h-12 px-4 align-middle font-bold text-right text-lg text-muted-foreground :pr-0 w-[100px]">Sub Total</td>
              <td colSpan={2} className="h-12 px-4 align-middle font-bold text-lg text-right text-muted-foreground :pr-0 w-[100px]">{localizeNumber(struck?.sum || 0)}</td>
            </tr>
          </tbody>
        </table>
      }
      {/* </div> */}
    </section>
  )
}