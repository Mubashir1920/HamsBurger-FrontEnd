
// This file contains the data types and categories for the menu items in the application.
// It defines the structure of burger, pizza, and deal items, as well as their categories.
// Each type includes properties such as name, description, price, image, and category.
// The categories array lists all the available categories for menu items.

type burger = {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string; // 'CHICKEN BURGERS' | 'BEEF BURGERS'
};

type pizza = {
    name: string;
    description: string;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    price: number;
    image: string;
    category: string; // 'PIZZA'
};

type GenericItem = {
    name: string;
    description?: string;
    price: number;
    size?: 'SMALL' | 'MEDIUM' | 'LARGE';
    image?: string;
    category: string;
};

type DealItem =
    | { type: 'CHICKEN_BURGER' | 'BEEF_BURGER'; item: burger; quantity: number }
    | { type: 'PIZZA'; item: pizza; quantity: number }
    | {
        type: 'FRIES' | 'COLD_DRINK' | 'NUGGETS' | 'BREAD' | 'CHICKEN_WINGS';
        item: GenericItem;
        quantity: number;
    };

type Deal = {
    id: string;
    name: string;
    description?: string;
    items: DealItem[];
    totalPrice: number;
    image?: string;
    category: 'DEALS';
};

const categories: string[] = ['CHICKEN BURGERS', 'BEEF BURGERS', 'PIZZA', 'DEALS'];


const ChickenBurgers: burger[] = [
    {
        name: "Chicken Burger",
        description: "A delicious chicken burger with lettuce, tomato, and mayo",
        price: 5.99,
        image: "/assets/burgers/chicken.jpeg",
        category: "CHICKEN BURGERS",
    },
    {
        name: "Spicy Chicken Burger",
        description: "A spicy version of our classic chicken burger",
        price: 6.49,
        image: "/assets/burgers/chicken (1).webp",
        category: "CHICKEN BURGERS",
    },
    {
        name: "BBQ Chicken Burger",
        description: "A BBQ chicken burger with crispy onion rings",
        price: 6.99,
        image: "/assets/burgers/chicken (2).jpeg",
        category: "CHICKEN BURGERS",
    },
    {
        name: "Grilled Chicken Burger",
        description: "A grilled chicken burger with avocado and chipotle mayo",
        price: 7.49,
        image: "/assets/burgers/chicken (2).webp",
        category: "CHICKEN BURGERS",
    },
    {
        name: "Teriyaki Chicken Burger",
        description: "A teriyaki chicken burger with pineapple and sesame sauce",
        price: 6.99,
        image: "/assets/burgers/chicken (3).webp",
        category: "CHICKEN BURGERS",
    },
    {
        name: "Buffalo Chicken Burger",
        description: "A buffalo chicken burger with blue cheese dressing",
        price: 7.49,
        image: "/assets/burgers/chicken (3).jpeg",
        category: "CHICKEN BURGERS",
    },
    {
        name: "Chicken Caesar Burger",
        description: "A chicken burger with Caesar dressing and romaine lettuce",
        price: 7.99,
        image: "/assets/burgers/chicken.jpeg",
        category: "CHICKEN BURGERS",
    },
];

const BeefBurgers: burger[] = [
    {
        name: "Classic Beef Burger",
        description: "A classic beef burger with lettuce, tomato, and onion.",
        price: 5.99,
        image: "/assets/burgers/beef (1).webp",
        category: "BEEF BURGERS",
    },
    {
        name: "Double Beef Cheeseburger",
        description: "A Double Patty Beef cheeseburger with melted cheese and pickles.",
        price: 8.99,
        image: "/assets/burgers/beef (2).jpeg",
        category: "BEEF BURGERS",
    },
    {
        name: "Bacon Burger",
        description: "A bacon burger with crispy bacon and BBQ sauce.",
        price: 6.99,
        image: "/assets/burgers/beef (3).jpeg",
        category: "BEEF BURGERS",
    },
    {
        name: "Mushroom Swiss Burger",
        description: "A mushroom Swiss burger with sautéed mushrooms and Swiss cheese.",
        price: 7.49,
        image: "/assets/burgers/beef.jpeg",
        category: "BEEF BURGERS",
    },
    {
        name: "Butcher Beef",
        description: "A BBQ beef burger with onion rings and BBQ sauce.",
        price: 7.99,
        image: "/assets/burgers/beef.jpeg",
        category: "BEEF BURGERS",
    },
    {
        name: "Spicy Jalapeño Burger",
        description: "A spicy jalapeño burger with pepper jack cheese.",
        price: 7.49,
        image: "/assets/burgers/beef.jpeg",
        category: "BEEF BURGERS",
    },
];

const allDeals: Deal[] = [
    {
        id: "deal1",
        name: "Classic Combo Meal",
        description: "1 Chicken Burger, Crispy Fries & 500ml Drink – a perfect all-in-one meal.",
        totalPrice: 9.49,
        image: "/assets/deals/deal1.jpeg",
        category: "DEALS",
        items: [
            {
                type: "CHICKEN_BURGER",
                quantity: 1,
                item: {
                    name: "Classic Chicken Burger",
                    description: "Grilled chicken patty with lettuce and mayo.",
                    price: 5.49,
                    image: "/assets/burgers/chicken1.jpg",
                    category: "CHICKEN BURGERS"
                }
            },
            {
                type: "FRIES",
                quantity: 1,
                item: {
                    name: "French Fries",
                    price: 2.00,
                    category: "FRIES"
                }
            },
            {
                type: "COLD_DRINK",
                quantity: 1,
                item: {
                    name: "500ml Drink",
                    price: 1.50,
                    size: "MEDIUM",
                    category: "COLD_DRINK"
                }
            }
        ]
    },
    {
        id: "deal2",
        name: "Family Feast Box",
        description: "2 Large Pizzas, 10 Nuggets, 2 Fries & 1.5L Drink – enough for the whole family.",
        totalPrice: 27.99,
        image: "/assets/deals/deal2.jpeg",
        category: "DEALS",
        items: [
            {
                type: "PIZZA",
                quantity: 2,
                item: {
                    name: "Large Pepperoni Pizza",
                    description: "Pepperoni and cheese loaded pizza.",
                    price: 9.99,
                    image: "/assets/pizzas/pizza1.jpg",
                    size: "LARGE",
                    category: "PIZZA"
                }
            },
            {
                type: "NUGGETS",
                quantity: 10,
                item: {
                    name: "Chicken Nuggets",
                    price: 5.00,
                    category: "NUGGETS"
                }
            },
            {
                type: "FRIES",
                quantity: 2,
                item: {
                    name: "French Fries",
                    price: 2.00,
                    category: "FRIES"
                }
            },
            {
                type: "COLD_DRINK",
                quantity: 1,
                item: {
                    name: "1.5L Drink",
                    price: 3.00,
                    size: "LARGE",
                    category: "COLD_DRINK"
                }
            }
        ]
    },
    {
        id: "deal3",
        name: "Double Trouble Burger Deal",
        description: "2 Beef Burgers, 2 Fries, 2 Drinks – made for sharing or serious hunger.",
        totalPrice: 18.99,
        image: "/assets/deals/deal3.jpeg",
        category: "DEALS",
        items: [
            {
                type: "BEEF_BURGER",
                quantity: 2,
                item: {
                    name: "Classic Beef Burger",
                    description: "Juicy beef patty with cheese and pickles.",
                    price: 6.99,
                    image: "/assets/burgers/beef1.jpg",
                    category: "BEEF BURGERS"
                }
            },
            {
                type: "FRIES",
                quantity: 2,
                item: {
                    name: "French Fries",
                    price: 2.00,
                    category: "FRIES"
                }
            },
            {
                type: "COLD_DRINK",
                quantity: 2,
                item: {
                    name: "500ml Drink",
                    price: 1.50,
                    size: "MEDIUM",
                    category: "COLD_DRINK"
                }
            }
        ]
    },
    {
        id: "deal4",
        name: "Spicy Lover's Pack",
        description: "Spicy Chicken Burger, Jalapeño Fries, Spicy Mayo Dip & 500ml Drink.",
        totalPrice: 11.49,
        image: "/assets/deals/deal4.jpeg",
        category: "DEALS",
        items: [
            {
                type: "CHICKEN_BURGER",
                quantity: 1,
                item: {
                    name: "Spicy Chicken Burger",
                    description: "Fiery grilled chicken with jalapeños.",
                    price: 6.49,
                    image: "/assets/burgers/spicychicken.jpg",
                    category: "CHICKEN BURGERS"
                }
            },
            {
                type: "FRIES",
                quantity: 1,
                item: {
                    name: "Jalapeño Fries",
                    price: 2.50,
                    category: "FRIES"
                }
            },
            {
                type: "BREAD",
                quantity: 1,
                item: {
                    name: "Spicy Mayo Dip",
                    price: 0.99,
                    category: "BREAD"
                }
            },
            {
                type: "COLD_DRINK",
                quantity: 1,
                item: {
                    name: "500ml Drink",
                    price: 1.50,
                    size: "MEDIUM",
                    category: "COLD_DRINK"
                }
            }
        ]
    },
    {
        id: "deal5",
        name: "Pizza Party Deal",
        description: "1 Medium Pepperoni Pizza, 6 Wings & Garlic Dip – ideal for movie night.",
        totalPrice: 15.99,
        image: "/assets/deals/deal5.jpeg",
        category: "DEALS",
        items: [
            {
                type: "PIZZA",
                quantity: 1,
                item: {
                    name: "Medium Pepperoni Pizza",
                    description: "Cheesy goodness topped with pepperoni.",
                    price: 7.99,
                    image: "/assets/pizzas/pizza2.jpg",
                    size: "MEDIUM",
                    category: "PIZZA"
                }
            },
            {
                type: "CHICKEN_WINGS",
                quantity: 6,
                item: {
                    name: "Chicken Wings",
                    price: 5.00,
                    category: "CHICKEN_WINGS"
                }
            },
            {
                type: "BREAD",
                quantity: 1,
                item: {
                    name: "Garlic Dip",
                    price: 1.00,
                    category: "BREAD"
                }
            }
        ]
    },
    {
        id: "deal6",
        name: "Snack Attack Box",
        description: "6 Nuggets, Small Fries, Dips Sampler & 500ml Drink – perfect for a quick bite.",
        totalPrice: 8.49,
        image: "/assets/deals/deal6.jpeg",
        category: "DEALS",
        items: [
            {
                type: "NUGGETS",
                quantity: 6,
                item: {
                    name: "Chicken Nuggets",
                    price: 4.00,
                    category: "NUGGETS"
                }
            },
            {
                type: "FRIES",
                quantity: 1,
                item: {
                    name: "Small French Fries",
                    price: 1.50,
                    size: "SMALL",
                    category: "FRIES"
                }
            },
            {
                type: "BREAD",
                quantity: 1,
                item: {
                    name: "Dips Sampler",
                    price: 1.00,
                    category: "BREAD"
                }
            },
            {
                type: "COLD_DRINK",
                quantity: 1,
                item: {
                    name: "500ml Drink",
                    price: 1.50,
                    size: "MEDIUM",
                    category: "COLD_DRINK"
                }
            }
        ]
    }
];
