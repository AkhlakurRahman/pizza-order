import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((acc, singleOrder) => {
    const orderedPizza = pizzas.find((pizza) => pizza.id === singleOrder.id);

    return acc + calculatePizzaPrice(orderedPizza.price, singleOrder.size);
  }, 0);
}
