import { useDebugValue, useEffect, useState } from "react";

export function usePizzaOfTheDay() {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  // hint to dev tools about state
  useDebugValue(
    pizzaOfTheDay ? `${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}` : "loading",
  );

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
}
