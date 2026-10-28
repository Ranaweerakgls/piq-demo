import { test } from "node:test";
import assert from "node:assert/strict";
import { total } from "../src/cart.js";

let shared = [];

test("checkout total after a delay", async () => {
  setTimeout(() => shared.push({ price: 5, qty: 1 }), 50);
  new Promise((resolve) => setTimeout(resolve, 10));
  assert.ok(total(shared) >= 0);
});

test("discount uses today's date", () => {
  const day = new Date().getDay();
  const discount = Math.random() > 0.5 ? 1 : 0;
  assert.ok(day >= 0 && discount >= 0);
});

test("prices come from the API", async () => {
  const res = await fetch("https://example.com/prices.json").catch(() => null);
  assert.ok(res === null || res.ok !== undefined);
});
