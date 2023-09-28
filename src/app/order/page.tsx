'use client';

import { useState, useContext } from 'react';
import { RestaurantContext } from '@/context';
import { Menu, Order, Table } from "@/models";
import { randomId } from '@/helpers';
import { ChevronDown } from '@/components/icons/Icons';
import CheckBox from '@/components/CheckBox';
import ResetFlash from '@/components/FlashMessage/ResetFlash';

export default function Order() {
  const { menuItems, orderItems, tables, updateOrders } = useContext(RestaurantContext)
  const [ menuVisible, setMenuVisible ] = useState<boolean>(false)
  const [ quantityVisible, setQuantityVisible ] = useState<boolean>(false)

  const [ table, setTable ] = useState<Table>({ id: 0, name: ''})
  const [ selectedMenu, setSelectedMenu ] = useState<number>(0)
  const [ quantity, setQuantity ] = useState<number>(0)

  const orderIsValid = table.id > 0 && selectedMenu > 0 && quantity > 0

  const getMenuName = (id: number) => {
    return menuItems.find((m, _) => m.id == id)?.name
  }

  const addOrder = () => {
    const existingIds = [...orderItems].map((o, _) => o.id)
    const newId = randomId(existingIds)
    const newOrder: Order = {
      id: newId,
      tableId: table.id,
      quantity: quantity,
      menuId: selectedMenu
    }
    updateOrders(newOrder, 'add')
    setSelectedMenu(0)
    setTable({ id: 0, name: ''})
    setQuantity(0)
  }

  const handleSelectMenu = ( menu: Menu) => {
    setSelectedMenu(menu.id)
    setMenuVisible(false)
  }

  const handleSelectQuantity = ( q: number) => {
    setQuantity(q)
    setQuantityVisible(prev => !prev)
  }

  return (
    <section className="space-y-3">
      {/* Table list */}
      <div className="flex border rounded-md">
        { tables && tables.map((t, _) => {
          return (
            <div key={t.id} className={`flex-1 p-2 text-center hover:bg-muted cursor-pointer transition-colors ${ table.id == t.id ? 'bg-black text-white' : 'bg-white text-foreground'}  text-sm h-[60px] flex items-center justify-center border-x`} onClick={() => setTable(t)}>
              {t.name}
            </div>
          )
        })}
      </div>  
      {/* Table list end */}

      <div className="flex space-x-2">
        {/* Menu */}
        <div
          className="space-y-2 w-full"
          onBlurCapture={() => {
            setTimeout(() => {
              setMenuVisible(false)
            }, 200)
          }}
        >
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Menu</span>
          <button
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground"
            onClick={() => setMenuVisible(prev => !prev)}>
            <span style= {{ pointerEvents: "none" }}>{ getMenuName(selectedMenu) || 'Pilih Menu'}</span>
            <ChevronDown/>
          </button>

          {/* Menu list */}
          { menuVisible && menuItems.length > 0 &&
            <div className="z-10 bg-background divide-y divide-gray-100 rounded-md relative">
              <div className="w-full p-1 bg-background text-sm text-gray-700 dark:text-gray-200 shadow-md absolute top-0">
                { menuItems && menuItems.map((m, _) => {
                  return (
                    <button key={m.id+m.name} type="button" className="inline-flex items-center space-x-3 w-full px-2 py-2 text-muted-foreground hover:bg-gray-100" onClick={() => handleSelectMenu(m)}>
                      <CheckBox checked={selectedMenu == m.id}/>
                      <div className="inline-flex items-center">{m.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          }
          {/* Menu List end */}
        </div>
        {/* Menu end */}

        {/* Quantity */}
        <div
          className="space-y-2"
          onBlurCapture={() => {
            setTimeout(() => {
              setQuantityVisible(false)
            }, 200)
          }}
        >
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jumlah</span>
          <button
            className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[140px] text-muted-foreground"
            onClick={() => setQuantityVisible(prev => !prev)}
          >
            <span style= {{ pointerEvents: "none" }}>{ quantity || 'Kuantitas'}</span>
            <ChevronDown/>
          </button>
          { quantityVisible &&
            <div className="z-10 bg-background divide-y divide-gray-100 rounded-md relative">
              <div className="w-full p-1 bg-background text-sm text-gray-700 dark:text-gray-200 shadow-md absolute top-0">
                { [1,2,3].map((q, _) => {
                  return (
                    <button key={`quantity-${q}`} type="button" className="inline-flex items-center space-x-3 w-full px-2 py-2 text-muted-foreground hover:bg-gray-100" onClick={() => handleSelectQuantity(q)}>
                      <CheckBox checked={quantity == q}/>
                      <div className="inline-flex items-center">        
                        {q}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          }
          <div className="text-right">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[100px]"
              disabled={!orderIsValid}
              onClick={addOrder}
            >
              Tambah
            </button>
          </div>
        </div>
        {/* Quantity end */}
      </div>
    </section>
  )
}