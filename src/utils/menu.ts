export type MenuItem = {
    title: string
    desc: string
    price: number
    image: string
    isNew?: boolean
    dealItems?: DealItem[] // Add dealItems for deals
    sizes?: PizzaSize[] // Add sizes for pizzas
}

export type PizzaSize = {
    name: string
    price: number
    description?: string
}

export type DealItem = {
    type: "burger" | "pizza" | "drink" | "fries" | "nuggets" | "wings" | "dip"
    quantity: number
    size?: string
    isDefault?: boolean
    defaultItem?: string
    burgerType?: "chicken" | "beef" | "any" // Add burger type specification
}

export const menuData: Record<string, MenuItem[]> = {
    ChickenBurger: [
        {
            title: "Chicken Burger",
            desc: "A delicious chicken burger with lettuce, tomato, and mayo.",
            price: 5.99,
            image: "/assets/burgers/chicken.jpeg",
            isNew: true,
        },
        {
            title: "Spicy Chicken Burger",
            desc: "A spicy version of our classic chicken burger.",
            price: 6.49,
            image: "/assets/burgers/chicken (1).webp",
        },
        {
            title: "BBQ Chicken Burger",
            desc: "A BBQ chicken burger with crispy onion rings.",
            price: 6.99,
            image: "/assets/burgers/chicken (2).jpeg",
        },
        {
            title: "Grilled Chicken Burger",
            desc: "A grilled chicken burger with avocado and chipotle mayo.",
            price: 7.49,
            image: "/assets/burgers/chicken (2).webp",
        },
        {
            title: "Teriyaki Chicken Burger",
            desc: "A teriyaki chicken burger with pineapple and sesame sauce.",
            price: 6.99,
            image: "/assets/burgers/chicken (3).webp",
        },
        {
            title: "Buffalo Chicken Burger",
            desc: "A buffalo chicken burger with blue cheese dressing.",
            price: 7.49,
            image: "/assets/burgers/chicken (3).jpeg",
        },
        {
            title: "Chicken Caesar Burger",
            desc: "A chicken burger with Caesar dressing and romaine lettuce.",
            price: 7.99,
            image: "/assets/burgers/chicken.jpeg",
        },
    ],
    BeefBurger: [
        {
            title: "Classic Beef Burger",
            desc: "A classic beef burger with lettuce, tomato, and onion.",
            price: 5.99,
            image: "/assets/burgers/beef (1).webp",
            isNew: true,
        },
        {
            title: "Double Beef Cheeseburger",
            desc: "A Double Patty Beef cheeseburger with melted cheese and pickles.",
            price: 8.99,
            image: "/assets/burgers/beef (2).jpeg",
        },
        {
            title: "Bacon Burger",
            desc: "A bacon burger with crispy bacon and BBQ sauce.",
            price: 6.99,
            image: "/assets/burgers/beef (3).jpeg",
        },
        {
            title: "Mushroom Swiss Burger",
            desc: "A mushroom Swiss burger with sautéed mushrooms and Swiss cheese.",
            price: 7.49,
            image: "/assets/burgers/beef.jpeg",
        },
        {
            title: "Butcher Beef",
            desc: "A BBQ beef burger with onion rings and BBQ sauce.",
            price: 7.99,
            image: "/assets/burgers/beef.jpeg",
        },
        {
            title: "Spicy Jalapeño Burger",
            desc: "A spicy jalapeño burger with pepper jack cheese.",
            price: 7.49,
            image: "/assets/burgers/beef.jpeg",
        },
    ],
    Pizza: [
        {
            title: "Margherita Pizza",
            desc: "A classic Margherita pizza with fresh basil and mozzarella.",
            price: 8.99, // Small size base price
            image: "/assets/pizza/pizza1.jpeg",
            isNew: true,
            sizes: [
                { name: "Small", price: 8.99, description: "8 inch" },
                { name: "Medium", price: 12.99, description: "12 inch" },
                { name: "Large", price: 16.99, description: "16 inch" },
            ],
        },
        {
            title: "Pepperoni Pizza",
            desc: "A pepperoni pizza with spicy pepperoni and mozzarella cheese.",
            price: 9.49,
            image: "/assets/pizza/pizza4.jpeg",
            sizes: [
                { name: "Small", price: 9.49, description: "8 inch" },
                { name: "Medium", price: 13.49, description: "12 inch" },
                { name: "Large", price: 17.49, description: "16 inch" },
            ],
        },
        {
            title: "BBQ Chicken Pizza",
            desc: "A BBQ chicken pizza with grilled chicken and BBQ sauce.",
            price: 10.99,
            image: "/assets/pizza/pizza1.jpeg",
            sizes: [
                { name: "Small", price: 10.99, description: "8 inch" },
                { name: "Medium", price: 14.99, description: "12 inch" },
                { name: "Large", price: 18.99, description: "16 inch" },
            ],
        },
        {
            title: "Veggie Pizza",
            desc: "A veggie pizza with bell peppers, onions, and olives.",
            price: 9.99,
            image: "/assets/pizza/pizza4.jpeg",
            sizes: [
                { name: "Small", price: 9.99, description: "8 inch" },
                { name: "Medium", price: 13.99, description: "12 inch" },
                { name: "Large", price: 17.99, description: "16 inch" },
            ],
        },
        {
            title: "Hawaiian Pizza",
            desc: "A Hawaiian pizza with ham and pineapple.",
            price: 10.49,
            image: "/assets/pizza/pizza2.jpeg",
            sizes: [
                { name: "Small", price: 10.49, description: "8 inch" },
                { name: "Medium", price: 14.49, description: "12 inch" },
                { name: "Large", price: 18.49, description: "16 inch" },
            ],
        },
        {
            title: "Meat Lovers Pizza",
            desc: "A meat lovers pizza with pepperoni, sausage, and bacon.",
            price: 11.49,
            image: "/assets/pizza/pizza3.jpeg",
            sizes: [
                { name: "Small", price: 11.49, description: "8 inch" },
                { name: "Medium", price: 15.49, description: "12 inch" },
                { name: "Large", price: 19.49, description: "16 inch" },
            ],
        },
        {
            title: "Buffalo Chicken Pizza",
            desc: "A buffalo chicken pizza with spicy buffalo sauce and blue cheese.",
            price: 10.99,
            image: "/assets/pizza/pizza1.jpeg",
            sizes: [
                { name: "Small", price: 10.99, description: "8 inch" },
                { name: "Medium", price: 14.99, description: "12 inch" },
                { name: "Large", price: 18.99, description: "16 inch" },
            ],
        },
    ],
    Deals: [
        {
            title: "Classic Combo Meal",
            desc: "1 Chicken Burger, Crispy Fries & 500ml Drink – a perfect all-in-one meal.",
            price: 9.49,
            image: "/assets/deals/deal1.jpeg",
            isNew: true,
            dealItems: [
                { type: "burger", quantity: 1, isDefault: false, burgerType: "chicken" },
                { type: "fries", quantity: 1, isDefault: true, defaultItem: "French Fries" },
                { type: "drink", quantity: 1, size: "500ml", isDefault: false },
            ],
        },
        {
            title: "Family Feast Box",
            desc: "2 Large Pizzas, 10 Nuggets, 2 Fries & 1.5L Drink – enough for the whole family.",
            price: 27.99,
            image: "/assets/deals/deal2.jpeg",
            dealItems: [
                { type: "pizza", quantity: 2, size: "Large", isDefault: false },
                { type: "nuggets", quantity: 10, isDefault: true, defaultItem: "Chicken Nuggets" },
                { type: "fries", quantity: 2, isDefault: true, defaultItem: "French Fries" },
                { type: "drink", quantity: 1, size: "1.5L", isDefault: false },
            ],
        },
        {
            title: "Double Trouble Burger Deal",
            desc: "2 Beef Burgers, 2 Fries, 2 Drinks – made for sharing or serious hunger.",
            price: 18.99,
            image: "/assets/deals/deal3.jpeg",
            dealItems: [
                { type: "burger", quantity: 2, isDefault: false, burgerType: "beef" },
                { type: "fries", quantity: 2, isDefault: true, defaultItem: "French Fries" },
                { type: "drink", quantity: 2, isDefault: false },
            ],
        },
        {
            title: "Spicy Lover's Pack",
            desc: "Spicy Chicken Burger, Jalapeño Fries, Spicy Mayo Dip & 500ml Drink.",
            price: 11.49,
            image: "/assets/deals/deal4.jpeg",
            dealItems: [
                { type: "burger", quantity: 1, isDefault: false, burgerType: "chicken" },
                { type: "fries", quantity: 1, isDefault: true, defaultItem: "Jalapeño Fries" },
                { type: "dip", quantity: 1, isDefault: false },
                { type: "drink", quantity: 1, size: "500ml", isDefault: false },
            ],
        },
        {
            title: "Pizza Party Deal",
            desc: "1 Medium Pepperoni Pizza, 6 Wings & Garlic Dip – ideal for movie night.",
            price: 15.99,
            image: "/assets/deals/deal5.jpeg",
            dealItems: [
                { type: "pizza", quantity: 1, size: "Medium", isDefault: false },
                { type: "wings", quantity: 6, isDefault: true, defaultItem: "Chicken Wings" },
                { type: "dip", quantity: 1, isDefault: false },
            ],
        },
        {
            title: "Snack Attack Box",
            desc: "6 Nuggets, Small Fries, Dips Sampler & 500ml Drink – perfect for a quick bite.",
            price: 8.49,
            image: "/assets/deals/deal6.jpeg",
            dealItems: [
                { type: "nuggets", quantity: 6, isDefault: true, defaultItem: "Chicken Nuggets" },
                { type: "fries", quantity: 1, size: "Small", isDefault: true, defaultItem: "French Fries" },
                { type: "dip", quantity: 1, isDefault: false },
                { type: "drink", quantity: 1, size: "500ml", isDefault: false },
            ],
        },
    ],
}

export type ExtraItem = {
    title: string
    desc?: string
    price: number
    image: string
    options?: string[]
}

export const Extras: ExtraItem[] = [
    {
        title: "French Fries",
        desc: "Crispy golden fries.",
        price: 2.99,
        image: "/assets/extras/1.png",
    },
    {
        title: "Jalapeño Fries",
        desc: "Spicy jalapeño seasoned fries.",
        price: 3.49,
        image: "/assets/extras/1.png",
    },
    {
        title: "Chicken Nuggets",
        desc: "Crispy chicken nuggets.",
        price: 4.49,
        image: "/assets/extras/2.png",
    },
    {
        title: "Chicken Wings",
        desc: "Crispy chicken wings.",
        price: 5.99,
        image: "/assets/extras/2.png",
    },
    {
        title: "Pepsi",
        price: 2.49,
        image: "/assets/extras/3.png",
        options: ["500ml", "1.5 Lit."],
    },
    {
        title: "NextCola",
        price: 2.49,
        image: "/assets/extras/4.png",
        options: ["500ml", "1.5 Lit."],
    },
    {
        title: "7UP",
        price: 2.49,
        image: "/assets/extras/5.png",
        options: ["500ml", "1.5 Lit."],
    },
    {
        title: "Dips",
        desc: "Choice of dips.",
        price: 0.99,
        image: "/assets/extras/6.png",
        options: ["Garlic Mayo", "Spicy Mayo", "Honey Mustard", "BBQ Sauce", "Ranch", "Cheese Dip"],
    },
]

// Available dip options for deal selections
export const dipOptions = ["Garlic Mayo", "Spicy Mayo", "Honey Mustard", "BBQ Sauce", "Ranch", "Cheese Dip"]

// Helper function to get item options based on type and burger type
export const getItemOptions = (type: string, burgerType?: "chicken" | "beef" | "any") => {
    switch (type) {
        case "burger":
            if (burgerType === "chicken") {
                return menuData.ChickenBurger || []
            } else if (burgerType === "beef") {
                return menuData.BeefBurger || []
            } else {
                // Default to all burgers if no specific type
                return [...(menuData.ChickenBurger || []), ...(menuData.BeefBurger || [])]
            }
        case "pizza":
            return menuData.Pizza || []
        case "drink":
            return Extras.filter(
                (extra) =>
                    extra.title.toLowerCase().includes("pepsi") ||
                    extra.title.toLowerCase().includes("cola") ||
                    extra.title.toLowerCase().includes("7up"),
            )
        case "dip":
            // Return dip options as menu items for deal selection
            return dipOptions.map((option) => ({
                title: option,
                desc: `${option} dip`,
                price: 0.99,
                image: "/assets/extras/6.png",
            }))
        case "fries":
            return Extras.filter((extra) => extra.title.toLowerCase().includes("fries"))
        case "nuggets":
            return Extras.filter((extra) => extra.title.toLowerCase().includes("nuggets"))
        case "wings":
            return Extras.filter((extra) => extra.title.toLowerCase().includes("wings"))
        default:
            return []
    }
}
