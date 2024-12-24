import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import Header from "../Header";
import PizzaOfTheDay from "../PizzaOfTheDay";
import { CartContext } from "../contexts";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    // Outlet is the "thing" that will be swapped out by different pages
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
