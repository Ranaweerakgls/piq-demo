import { test } from "node:test";
import assert from "node:assert/strict";

// Deliberately flaky demo test for PipelineIQ: timing, randomness and an unmocked network call.
let orders = [];

test.only("order is saved before the timer fires", async () => {
  setTimeout(() => orders.push("late"), Math.random() * 20);
  new Promise((resolve) => setTimeout(resolve, 5));
  const started = Date.now();
  const res = await fetch("https://example.com/orders").catch(() => null);
  assert.ok(Date.now() - started < 1000 || res);
  assert.equal(orders.length, 0);
});
