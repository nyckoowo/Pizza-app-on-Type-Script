//Types

type Pizza= {
    id: number,
    name: string,
    price: number,
}
 type Order= {
    id: number,
    pizza: Pizza,
    status: "completed"| "ordered"
 }

 //Variables

let cashInRegister = 100
let nextOrderId = 1
let orderQueue: Order[] = []
let nextPizzaId = 1
const menu: Pizza[] = [
    {id: nextPizzaId++, name: "Margherita", price: 8 },
    {id: nextPizzaId++, name: "Pepperoni", price: 10 },
    {id: nextPizzaId++, name: "Hawaiian", price: 10 },
    {id: nextPizzaId++, name: "Veggie", price: 9 },
];

//Functions

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza = {id: nextPizzaId++, ...pizzaObj}
    menu.push(newPizza)
    return newPizza
}

function placeOrder(pizzaName:string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza){
        console.error(`${pizzaName} not found in the menu`)
        return 
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: Number): Order | string {
    let order = orderQueue.find(order => order.id === orderId)
    if(order){
    order.status = "completed"
    return order
}  return "Order not found"}

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === 'string') {
        return menu.find(pizza => pizza.name.toLowerCase === identifier.toLowerCase);
    } else if(typeof identifier === 'number'){
    return menu.find(pizza => pizza.id === identifier);
    } else {
        throw new TypeError("This pizza has not been found");
    }
}

addNewPizza({  name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })


placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)