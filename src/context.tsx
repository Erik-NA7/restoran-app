import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Menu, Order, Table } from '@/models';

export interface contextType {
  menuItems: Menu[];
  updateMenus: (menu: Menu, action: string) => void;
  orderItems: Order[];
  tables: Table[];
  updateOrders: (order: Order, action: string) => void;
  clearTableOrder: (table: number) => void;
  resetData: () => void;
  globalReset: boolean
}

const defaultState = {
  menuItems: [],
  updateMenus: () => {},
  orderItems: [],
  tables: [
    { id: 1, name: 'Meja 1'},
    { id: 2, name: 'Meja 2'},
    { id: 3, name: 'Meja 3'}
  ],
  updateOrders: () => {},
  clearTableOrder: () => {},
  resetData: () => {},
  globalReset: false 
}

export const RestaurantContext = createContext<contextType>(defaultState);

export default function ContextProvider({ children,}: {children: ReactNode}) {
  const [ menuItems, setMenuItems ] = useState<Menu[]>([])
  const [ orderItems, setOrderItems ] = useState<Order[]>([]) 
  const [ globalReset, setGlobalReset ] = useState<boolean>(false)
  const tables = defaultState.tables
  
  const resetData = () => {
    localStorage.clear()
    setMenuItems([])
    setOrderItems([])
    setGlobalReset(true)
  }

  const updateMenus = (menu: Menu, action: string) => {
    const methods = {
      'add': () => {
        return [...menuItems, menu]
      },
      'delete': () => {
        return menuItems.filter((m: Menu, _:number) => m.id != menu.id)
      }
    }

    const newMenuItems =
      action == 'add' ? methods.add() :
      action == 'delete' ? methods.delete() :menuItems
    localStorage.setItem('menus', JSON.stringify(newMenuItems))
    setMenuItems(newMenuItems)
  }

  const updateOrders = (newOrder: Order) => {
    const newOrderItems = [...orderItems, newOrder]
    localStorage.setItem('orders', JSON.stringify(newOrderItems))
    setOrderItems(newOrderItems)
  }

  const clearTableOrder = (table: number) => {
    const newOrderItems = orderItems.filter(o => o.tableId != table)
    localStorage.setItem('orders', JSON.stringify(newOrderItems))
    setOrderItems(newOrderItems)
  }

  useEffect(() => {
    const initialMenus = localStorage.getItem('menus')
    const initialOrders = localStorage.getItem('orders')
    const listMenu = initialMenus ? JSON.parse(initialMenus) : []
    const listOrder = initialOrders ? JSON.parse(initialOrders) : []
    setMenuItems(listMenu)  
    setOrderItems(listOrder)
    setGlobalReset(false)
  }, [])

  return (
    <RestaurantContext.Provider value={{ menuItems, updateMenus, orderItems, tables, updateOrders, clearTableOrder, resetData, globalReset }}>
      { children }
    </RestaurantContext.Provider>
  )
}