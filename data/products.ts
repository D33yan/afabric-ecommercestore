export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'Men' | 'Women' | 'Accessories';
    subcategory: string;
    rating: number;
    stock: number;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Classic Denim Jacket",
      description: "Timeless denim jacket with a comfortable fit and durable construction.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      category: "Men",
      subcategory: "Outerwear",
      rating: 4.5,
      stock: 50
    },
    {
      id: 2,
      name: "Floral Summer Dress",
      description: "Light and breezy floral print dress perfect for warm summer days.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
      category: "Women",
      subcategory: "Dresses",
      rating: 4.2,
      stock: 30
    },
    {
      id: 3,
      name: "Leather Messenger Bag",
      description: "Stylish and practical leather messenger bag for everyday use.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
      category: "Accessories",
      subcategory: "Bags",
      rating: 4.7,
      stock: 25
    },
    {
      id: 4,
      name: "Slim Fit Chino Pants",
      description: "Comfortable and versatile slim fit chino pants for a smart casual look.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      category: "Men",
      subcategory: "Pants",
      rating: 4.3,
      stock: 40
    },
    {
      id: 5,
      name: "Oversized Sunglasses",
      description: "Chic oversized sunglasses with UV400 protection for a glamorous look.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "Accessories",
      subcategory: "Eyewear",
      rating: 4.1,
      stock: 60
    },
    {
      id: 6,
      name: "Cotton Polo Shirt",
      description: "Classic cotton polo shirt for a smart and comfortable casual style.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      category: "Men",
      subcategory: "Tops",
      rating: 4.4,
      stock: 55
    },
    {
      id: 7,
      name: "Leather Ankle Boots",
      description: "Stylish leather ankle boots with a comfortable block heel.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Women",
      subcategory: "Shoes",
      rating: 4.6,
      stock: 35
    },
    {
      id: 8,
      name: "Silk Neck Tie",
      description: "Elegant silk neck tie to complete your formal attire.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "Accessories",
      subcategory: "Ties",
      rating: 4.2,
      stock: 70
    },
    {
      id: 9,
      name: "Leather Tote Bag",
      description: "Spacious leather tote bag perfect for work or weekend outings.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
      category: "Accessories",
      subcategory: "Bags",
      rating: 4.5,
      stock: 40
    },
    {
      id: 10,
      name: "Wool Blend Sweater",
      description: "Cozy wool blend sweater for chilly days and nights.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
      category: "Women",
      subcategory: "Tops",
      rating: 4.3,
      stock: 45
    },
    {
      id: 11,
      name: "Leather Belt",
      description: "Classic leather belt with a sleek metal buckle.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1624140716840-4d590d46c4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "Accessories",
      subcategory: "Belts",
      rating: 4.4,
      stock: 80
    },
    {
      id: 12,
      name: "Pleated Midi Skirt",
      description: "Elegant pleated midi skirt for a sophisticated look.",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=864&q=80",
      category: "Women",
      subcategory: "Skirts",
      rating: 4.1,
      stock: 30
    },
    {
      id: 13,
      name: "Slim Fit Dress Shirt",
      description: "Crisp and stylish slim fit dress shirt for formal occasions.",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "Men",
      subcategory: "Shirts",
      rating: 4.5,
      stock: 60
    },
    {
      id: 14,
      name: "Leather Wallet",
      description: "Compact leather wallet with multiple card slots and a coin pocket.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      category: "Accessories",
      subcategory: "Wallets",
      rating: 4.2,
      stock: 75
    },
    {
      id: 15,
      name: "Denim Shorts",
      description: "Comfortable denim shorts perfect for casual summer outings.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "Women",
      subcategory: "Shorts",
      rating: 4.0,
      stock: 50
    },
    {
      id: 16,
      name: "Leather Watch",
      description: "Classic leather strap watch with a minimalist design.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=799&q=80",
      category: "Accessories",
      subcategory: "Watches",
      rating: 4.6,
      stock: 40
    },
    {
      id: 17,
      name: "Knit Beanie",
      description: "Warm and stylish knit beanie for cold weather.",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      category: "Accessories",
      subcategory: "Hats",
      rating: 4.3,
      stock: 100
    },
    {
      id: 18,
      name: "Linen Blazer",
      description: "Lightweight linen blazer for a smart casual summer look.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Men",
      subcategory: "Jackets",
      rating: 4.4,
      stock: 35
    },
    {
      id: 19,
      name: "Crossbody Bag",
      description: "Versatile crossbody bag with adjustable strap.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=757&q=80",
      category: "Accessories",
      subcategory: "Bags",
      rating: 4.2,
      stock: 55
    },
    {
      id: 20,
      name: "Striped T-Shirt",
      description: "Classic striped t-shirt for a timeless casual look.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Men",
      subcategory: "T-Shirts",
      rating: 4.1,
      stock: 70
    }
  ];