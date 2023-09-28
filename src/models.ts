export interface Menu {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  tableId: number;
  menuId: number;
  quantity: number;
}

export interface Table {
  id: number;
  name: string;
}