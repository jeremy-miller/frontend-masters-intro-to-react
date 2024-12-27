import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import usePizzaOfTheDay from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "pepperoni",
  name: "Pepperoni Pizza",
  category: "Classic",
  description: "Mozzarella Cheese, Pepperoni",
  image: "/public/pizzas/pepperoni.webp",
  sizes: { S: 9.75, M: 12.5, L: 15.25 },
};

test("gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

test("calls the API and gives back the pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  // waitFor = continually run expect() until it stops failing
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
