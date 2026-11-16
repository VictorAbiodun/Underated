"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type CartItem = { handle: string; title: string; size: string; price: number; image?: string; qty: number };
type CartCtx = { items: CartItem[]; count: number; subtotal: number; open: boolean; setOpen: (o: boolean) => void; add: (i: Omit<CartItem, "qty">) => void; setQty: (handle: string, size: string, qty: number) => void; remove: (handle: string, size: string) => void; clear: () => void };
const Ctx = createContext<CartCtx>(null as unknown as CartCtx);
export const useCart = () => useContext(Ctx);
export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("cart") ?? "[]")); } catch {} }, []);
  const save = (n: CartItem[]) => { setItems(n); try { localStorage.setItem("cart", JSON.stringify(n)); } catch {} };
  const same = (x: CartItem, h: string, s: string) => x.handle === h && x.size === s;
  const add: CartCtx["add"] = (i) => {
    const hit = items.find((x) => same(x, i.handle, i.size));
    save(hit ? items.map((x) => (x === hit ? { ...x, qty: Math.min(10, x.qty + 1) } : x)) : [...items, { ...i, qty: 1 }]);
    setOpen(true);
  };
  const setQty: CartCtx["setQty"] = (h, s, q) => save(q < 1 ? items.filter((x) => !same(x, h, s)) : items.map((x) => (same(x, h, s) ? { ...x, qty: Math.min(10, q) } : x)));
  const remove: CartCtx["remove"] = (h, s) => save(items.filter((x) => !same(x, h, s)));
  return <Ctx.Provider value={{ items, open, setOpen, add, setQty, remove, clear: () => save([]), count: items.reduce((n, i) => n + i.qty, 0), subtotal: items.reduce((n, i) => n + i.qty * i.price, 0) }}>{children}</Ctx.Provider>;
}
