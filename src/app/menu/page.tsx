'use client';

import { useState, ChangeEvent } from 'react';
import { Trash } from '@/components/icons/Icons';
import { Menu } from '@/models';
import { useContext } from 'react';
import { RestaurantContext } from '@/context';
import { randomId, localizeNumber } from "@/helpers";

export default function Menu() {

  const { menuItems, updateMenus } = useContext(RestaurantContext) 
  const [ newMenu, setNewMenu ] = useState<{name: string, price: number}>({ name: '', price: 0})
  
  const handleNewMenu = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMenu({
      ...newMenu,
      [e.target.name]: e.target.value
    })
  }

  const addMenu = () => {
    const checkDuplicate = menuItems.find((m: Menu, _: number) => m.name == newMenu.name)
    if (!checkDuplicate) {
      const existingIds = [...menuItems].map((m: Menu, _: number) => m.id)
      const newId = randomId(existingIds)
      const menu: Menu = {
        id: newId,
        name: newMenu.name,
        price: newMenu.price
      }
      updateMenus(menu, 'add')
      setNewMenu({name: '', price: 0})
    }
  }

  console.log(newMenu.name == '' || newMenu.price == 0)

  return (
    <section className="space-y-4">
      <div className="space-y-2 p-2">
        <div className="space-y-1">
          <span className="text-sm font-medium leading-none">
            Menu Makanan
          </span>
          <div className="flex space-x-2">
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" id="name" name="name" placeholder="Tambahkan disini..." autoComplete="false" value={newMenu.name} onChange={handleNewMenu}/>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  text-right" id="price" name="price" step={100} min={0} placeholder={`Harga ...${localizeNumber(newMenu.price)}`} autoComplete="false" value={newMenu.price} onChange={handleNewMenu}/>
            <button type='button' className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-4 py-2 w-[120px]" onClick={addMenu} disabled={newMenu.name == '' || newMenu.price == 0}>Tambah</button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <caption className="mt-4 text-sm text-muted-foreground">
            Daftar menu restoran Anda
          </caption>
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground :pr-0 w-[100px]">
                ID
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground :pr-0">
                Menu
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground :pr-0">
                Harga
              </th>
              <th className="h-12 px-4 align-middle font-medium text-muted-foreground :pr-0 text-right">
                Hapus?
              </th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            { menuItems.map((m: Menu, _: number) => {
              return (
                <tr key={m.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle :pr-0 font-medium">{ m.id }</td>
                  <td className="p-4 align-middle :pr-0">{ m.name }</td>
                  <td className="p-4 align-middle :pr-0">{ localizeNumber(m.price) }</td>
                  <td className="p-4 align-middle :pr-0 flex justify-end">
                    <button onClick={() => updateMenus(m, 'delete')}>
                      <Trash/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}