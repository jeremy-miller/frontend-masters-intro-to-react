import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import Pizza from "./Pizza";
import { CartContext } from "./contexts";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }

  // derivative states - values calculated using above states, so don't need useState() here
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []); // not tracking any dependencies (empty array), so only runs once on page load

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // prevent form from being submitted
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={(event) => setPizzaType(event.target.value)}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    id="pizza-s"
                    type="radio"
                    name="pizza-size"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={(event) => setPizzaSize(event.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    id="pizza-m"
                    type="radio"
                    name="pizza-size"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={(event) => setPizzaSize(event.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    id="pizza-l"
                    type="radio"
                    name="pizza-size"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={(event) => setPizzaSize(event.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
