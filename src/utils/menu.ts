export type MenuItem = {
    title: string;
    desc: string;
    price: number;
    image: string;
    isNew?: boolean;
}

export const menuData: Record<string, MenuItem[]> = {
    ChickenBurger: [
        {
            title: "Chicken Burger",
            desc: "A delicious chicken burger with lettuce, tomato, and mayo.",
            price: 5.99,
            image: "/assets/burgers/chicken.jpeg",
            isNew: true
        },
        {
            title: "Spicy Chicken Burger",
            desc: "A spicy version of our classic chicken burger.",
            price: 6.49,
            image: "/assets/burgers/chicken (1).webp"
        },
        {
            title: "BBQ Chicken Burger",
            desc: "A BBQ chicken burger with crispy onion rings.",
            price: 6.99,
            image: "/assets/burgers/chicken (2).jpeg"
        },
        {
            title: "Grilled Chicken Burger",
            desc: "A grilled chicken burger with avocado and chipotle mayo.",
            price: 7.49,
            image: "/assets/burgers/chicken (2).webp"
        },
        {
            title: "Teriyaki Chicken Burger",
            desc: "A teriyaki chicken burger with pineapple and sesame sauce.",
            price: 6.99,
            image: "/assets/burgers/chicken (3).webp"
        },
        {
            title: "Buffalo Chicken Burger",
            desc: "A buffalo chicken burger with blue cheese dressing.",
            price: 7.49,
            image: "/assets/burgers/chicken (3).jpeg"
        },
        {
            title: "Chicken Caesar Burger",
            desc: "A chicken burger with Caesar dressing and romaine lettuce.",
            price: 7.99,
            image: "/assets/burgers/chicken.jpeg"
        }
    ],
    BeefBurger: [
        {
            title: "Classic Beef Burger",
            desc: "A classic beef burger with lettuce, tomato, and onion.",
            price: 5.99,
            image: "/assets/burgers/beef (1).webp",
            isNew: true
        },
        {
            title: "Double Beef Cheeseburger",
            desc: "A Double Patty Beef cheeseburger with melted cheese and pickles.",
            price: 8.99,
            image: "/assets/burgers/beef (2).jpeg"
        },
        {
            title: "Bacon Burger",
            desc: "A bacon burger with crispy bacon and BBQ sauce.",
            price: 6.99,
            image: "/assets/burgers/beef (3).jpeg"
        },
        {
            title: "Mushroom Swiss Burger",
            desc: "A mushroom Swiss burger with sautéed mushrooms and Swiss cheese.",
            price: 7.49,
            image: "/assets/burgers/beef.jpeg"
        },
        {
            title: "Butcher Beef",
            desc: "A BBQ beef burger with onion rings and BBQ sauce.",
            price: 7.99,
            image: "/assets/burgers/beef.jpeg"
        },
        {
            title: "Spicy Jalapeño Burger",
            desc: "A spicy jalapeño burger with pepper jack cheese.",
            price: 7.49,
            image: "/assets/burgers/beef.jpeg"
        },
    ],
    Pizza: [
        {
            title: "Margherita Pizza",
            desc: "A classic Margherita pizza with fresh basil and mozzarella.",
            price: 8.99,
            image: "/assets/pizza/pizza1.jpeg",
            isNew: true
        },
        {
            title: "Pepperoni Pizza",
            desc: "A pepperoni pizza with spicy pepperoni and mozzarella cheese.",
            price: 9.49,
            image: "/assets/pizza/pizza4.jpeg"
        },
        {
            title: "BBQ Chicken Pizza",
            desc: "A BBQ chicken pizza with grilled chicken and BBQ sauce.",
            price: 10.99,
            image: "/assets/pizza/pizza1.jpeg"
        },
        {
            title: "Veggie Pizza",
            desc: "A veggie pizza with bell peppers, onions, and olives.",
            price: 9.99,
            image: "/assets/pizza/pizza4.jpeg"
        },
        {
            title: "Hawaiian Pizza",
            desc: "A Hawaiian pizza with ham and pineapple.",
            price: 10.49,
            image: "/assets/pizza/pizza2.jpeg"
        },
        {
            title: "Meat Lovers Pizza",
            desc: "A meat lovers pizza with pepperoni, sausage, and bacon.",
            price: 11.49,
            image: "/assets/pizza/pizza3.jpeg"
        },
        {
            title: "Buffalo Chicken Pizza",
            desc: "A buffalo chicken pizza with spicy buffalo sauce and blue cheese.",
            price: 10.99,
            image: "/assets/pizza/pizza1.jpeg"
        }
    ]
};

export type ExtraItem = {
    title: string;
    desc?: string;
    price: number;
    image: string;
    options?: string[];
}

export const Extras: ExtraItem[] = [
    {
        title: "French Fries",
        desc: "Crispy golden fries.",
        price: 2.99,
        image: "/assets/extras/1.png"
    },
    {
        title: "Chicken Nuggets",
        desc: "Crispy chicken nuggets.",
        price: 4.49,
        image: "/assets/extras/2.png"
    },
    {
        title: "Pepsi",
        price: 2.49,
        image: "/assets/extras/3.png",
        options: ["500ml", "1.5 Lit."]
    },
    {
        title: "NextCola",
        price: 2.49,
        image: "/assets/extras/4.png",
        options: ["500ml", "1.5 Lit."]
    },
    {
        title: "7UP",
        price: 2.49,
        image: "/assets/extras/5.png",
        options: ["500ml", "1.5 Lit."]
    },
    {
        title: "Dips",
        desc: "Choice of dips.",
        price: 0.99,
        image: "/assets/extras/6.png",
        options: ["Garlic Mayo", "Spicy Mayo", "Honey Mustard", "BBQ Sauce", "Ranch", "Cheese Dip"]
    }
];
