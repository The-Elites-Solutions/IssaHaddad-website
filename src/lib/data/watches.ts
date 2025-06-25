import type {JewelryProduct} from "@/types/index";

export const watchesData: JewelryProduct[] = [
    {
        id: 'watch-001',
        name: 'Royal Chronograph',
        category: 'watch',
        subcategory: 'chronograph',
        brand: 'Luxuria Swiss',
        description: 'A masterpiece of horological engineering featuring a precise Swiss movement, rose gold case, and sapphire crystal. This timepiece represents the pinnacle of luxury watchmaking.',
        specifications: {
            material: '18k Rose Gold',
            weight: '180g',
            dimensions: '42mm diameter, 12mm thickness',
            movement: 'Swiss Automatic, 42-hour power reserve',
            waterResistance: '100m',
            warranty: '5 years international warranty'
        },
        model3D: {
            path: '/models/watch-chronograph.glb',
            scale: [1, 1, 1],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        images: [
            {
                url: '/images/watches/royal-chronograph-main.jpg',
                alt: 'Royal Chronograph main view',
                type: 'main',
                order: 1
            }
        ],
        price: {
            currency: 'USD',
            showPrice: false,
            inquiryOnly: true
        },
        availability: 'in-stock',
        featured: true,
        newArrival: false,
        bestSeller: true,
        certifications: ['Swiss Made', 'COSC Certified'],
        tags: ['luxury', 'swiss', 'chronograph', 'rose-gold'],
        whatsappInquiry: '+1234567890'
    },
    {
        id: 'watch-002',
        name: 'Diamond Elegance',
        category: 'watch',
        subcategory: 'dress',
        brand: 'Luxuria Collection',
        description: 'An exquisite dress watch adorned with carefully selected diamonds, featuring a mother-of-pearl dial and Swiss quartz movement for unmatched precision.',
        specifications: {
            material: '18k White Gold with Diamonds',
            weight: '95g',
            dimensions: '32mm diameter, 8mm thickness',
            movement: 'Swiss Quartz',
            waterResistance: '30m',
            warranty: '3 years international warranty'
        },
        model3D: {
            path: '/models/watch-diamond.glb',
            scale: [0.9, 0.9, 0.9],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        images: [
            {
                url: '/images/watches/diamond-elegance-main.jpg',
                alt: 'Diamond Elegance main view',
                type: 'main',
                order: 1
            }
        ],
        price: {
            currency: 'USD',
            showPrice: false,
            inquiryOnly: true
        },
        availability: 'made-to-order',
        featured: true,
        newArrival: true,
        bestSeller: false,
        certifications: ['Swiss Made', 'Diamond Certified'],
        tags: ['luxury', 'diamonds', 'dress-watch', 'white-gold'],
        whatsappInquiry: '+1234567890'
    },
    {
        id: 'watch-003',
        name: 'Heritage Automatic',
        category: 'watch',
        subcategory: 'automatic',
        brand: 'Luxuria Heritage',
        description: 'A tribute to classical watchmaking with modern refinements. Features an exhibition caseback showcasing the intricate automatic movement.',
        specifications: {
            material: '18k Yellow Gold',
            weight: '165g',
            dimensions: '40mm diameter, 11mm thickness',
            movement: 'Swiss Automatic, 38-hour power reserve',
            waterResistance: '50m',
            warranty: '5 years international warranty'
        },
        model3D: {
            path: '/models/watch-heritage.glb',
            scale: [1.1, 1.1, 1.1],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        images: [
            {
                url: '/images/watches/heritage-automatic-main.jpg',
                alt: 'Heritage Automatic main view',
                type: 'main',
                order: 1
            }
        ],
        price: {
            currency: 'USD',
            showPrice: false,
            inquiryOnly: true
        },
        availability: 'in-stock',
        featured: false,
        newArrival: false,
        bestSeller: true,
        certifications: ['Swiss Made'],
        tags: ['luxury', 'automatic', 'heritage', 'yellow-gold'],
        whatsappInquiry: '+1234567890'
    },
    {
        id: 'watch-004',
        name: 'Sports Titanium Pro',
        category: 'watch',
        subcategory: 'sports',
        brand: 'Luxuria Sport',
        description: 'Built for performance with a lightweight titanium case and advanced complications. Perfect for the modern adventurer who demands both style and functionality.',
        specifications: {
            material: 'Grade 5 Titanium',
            weight: '78g',
            dimensions: '44mm diameter, 13mm thickness',
            movement: 'Swiss Automatic with GMT function',
            waterResistance: '300m',
            warranty: '3 years international warranty'
        },
        model3D: {
            path: '/models/watch-titanium.glb',
            scale: [1.2, 1.2, 1.2],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        images: [
            {
                url: '/images/watches/titanium-pro-main.jpg',
                alt: 'Sports Titanium Pro main view',
                type: 'main',
                order: 1
            }
        ],
        price: {
            currency: 'USD',
            showPrice: false,
            inquiryOnly: true
        },
        availability: 'in-stock',
        featured: false,
        newArrival: true,
        bestSeller: false,
        certifications: ['Swiss Made', 'ISO 6425'],
        tags: ['sports', 'titanium', 'diver', 'gmt'],
        whatsappInquiry: '+1234567890'
    },
    {
        id: 'watch-005',
        name: 'Moonphase Masterpiece',
        category: 'watch',
        subcategory: 'complication',
        brand: 'Luxuria Complications',
        description: 'A horological marvel featuring a precise moonphase complication, dual time zones, and an annual calendar. Each component meticulously crafted by master watchmakers.',
        specifications: {
            material: '18k Rose Gold with Platinum Accents',
            weight: '195g',
            dimensions: '41mm diameter, 14mm thickness',
            movement: 'Swiss Manual Wind, 72-hour power reserve',
            waterResistance: '30m',
            warranty: '5 years international warranty'
        },
        model3D: {
            path: '/models/watch-moonphase.glb',
            scale: [1, 1, 1],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        images: [
            {
                url: '/images/watches/moonphase-main.jpg',
                alt: 'Moonphase Masterpiece main view',
                type: 'main',
                order: 1
            }
        ],
        price: {
            currency: 'USD',
            showPrice: false,
            inquiryOnly: true
        },
        availability: 'made-to-order',
        featured: true,
        newArrival: false,
        bestSeller: false,
        certifications: ['Swiss Made', 'Geneva Seal'],
        tags: ['complications', 'moonphase', 'rose-gold', 'limited-edition'],
        whatsappInquiry: '+1234567890'
    }
]
