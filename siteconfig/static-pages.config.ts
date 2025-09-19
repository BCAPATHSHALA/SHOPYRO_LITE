/*
 * Site Configuration for Static Pages
 * This file contains all the content for static pages to make them easily editable
 */

export const COMPANY_INFO = {
  name: "Shopyro",
  tagline: "Transform Your Space with Premium Furniture",
  description:
    "Discover our curated collection of modern, sustainable furniture designed to elevate your home and lifestyle.",
  email: "hello@shopyro.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Design Street",
    city: "Agra",
    state: "UP",
    zip: "283204",
    country: "India",
  },
  socialMedia: {
    facebook: "https://facebook.com/shopyro",
    instagram: "https://instagram.com/shopyro",
    twitter: "https://twitter.com/shopyro",
    pinterest: "https://pinterest.com/shopyro",
  },
};

export const ABOUT_PAGE_CONTENT = {
  hero: {
    title: "About Shopyro",
    subtitle: "Crafting Beautiful Spaces Since 2020",
    description:
      "We believe that great furniture should be both beautiful and functional. Our mission is to help you create spaces that reflect your personality and enhance your daily life.",
  },
  story: {
    title: "Our Story",
    content: [
      "Founded in 2025, Shopyro began as a small family business with a simple vision: to make high-quality, sustainable furniture accessible to everyone. What started in a small workshop has grown into a trusted brand serving customers worldwide.",
      "We partner with skilled artisans and sustainable manufacturers to bring you furniture that's not only beautiful but also built to last. Every piece in our collection is carefully selected for its quality, design, and environmental impact.",
      "Today, we're proud to be a leading destination for modern furniture, helping thousands of customers transform their spaces into homes they love.",
    ],
  },
  values: [
    {
      title: "Quality First",
      description:
        "We source only the finest materials and work with skilled craftspeople to ensure every piece meets our high standards.",
      icon: "Shield",
    },
    {
      title: "Sustainable Design",
      description:
        "Environmental responsibility is at the heart of everything we do. We prioritize eco-friendly materials and processes.",
      icon: "Leaf",
    },
    {
      title: "Customer Focused",
      description:
        "Your satisfaction is our priority. We provide exceptional service from selection to delivery and beyond.",
      icon: "Heart",
    },
    {
      title: "Innovation",
      description:
        "We continuously seek new ways to improve our products and services, staying ahead of design trends.",
      icon: "Lightbulb",
    },
  ],
  team: {
    title: "Meet Our Team",
    description:
      "The passionate people behind Shopyro who make it all possible.",
    members: [
      {
        name: "Manoj Nishad",
        role: "Founder & CEO",
        bio: "With over 15 years in furniture design, Manoj leads our vision for beautiful, sustainable furniture.",
        image: "/team/manoj.jpg",
      },
      {
        name: "Amit Nishad",
        role: "Head of Design",
        bio: "Amit brings innovative design concepts to life, ensuring every piece is both functional and beautiful.",
        image: "/team/amit.jpg",
      },
      {
        name: "Rakesh Nishad",
        role: "Customer Experience Director",
        bio: "Rakesh ensures every customer has an exceptional experience from browsing to delivery.",
        image: "/team/rakesh.jpg",
      },
    ],
  },
};

export const CONTACT_PAGE_CONTENT = {
  hero: {
    title: "Get in Touch",
    subtitle: "We'd Love to Hear From You",
    description:
      "Have questions about our products or need help with your order? Our team is here to help.",
  },
  contactMethods: [
    {
      title: "Email Us",
      description:
        "Send us an email and we'll get back to you within 24 hours.",
      value: COMPANY_INFO.email,
      icon: "Mail",
    },
    {
      title: "Call Us",
      description:
        "Speak with our customer service team Monday-Friday, 9AM-6PM EST.",
      value: COMPANY_INFO.phone,
      icon: "Phone",
    },
    {
      title: "Visit Our Showroom",
      description: "See our furniture in person at our flagship location.",
      value: `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state}`,
      icon: "MapPin",
    },
  ],
  hours: {
    title: "Business Hours",
    schedule: [
      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
};

export const FAQ_CONTENT = {
  hero: {
    title: "Frequently Asked Questions",
    subtitle:
      "Find answers to common questions about our products and services",
  },
  categories: [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Large furniture items may require special delivery arrangements.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free standard shipping on all orders over $299. For orders under $299, shipping costs vary based on size and location.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also check your order status by logging into your account.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we ship within the United States and Canada. We're working on expanding to more countries soon.",
        },
      ],
    },
    {
      title: "Products & Quality",
      faqs: [
        {
          question: "What materials do you use?",
          answer:
            "We use high-quality, sustainable materials including solid wood, premium fabrics, and eco-friendly finishes. Each product page includes detailed material information.",
        },
        {
          question: "Are your products eco-friendly?",
          answer:
            "Yes! We prioritize sustainability by using responsibly sourced materials, low-VOC finishes, and working with manufacturers who share our environmental values.",
        },
        {
          question: "Do you offer assembly services?",
          answer:
            "We offer white-glove delivery service which includes assembly and placement in your desired room. This service is available for an additional fee in most areas.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Items must be in original condition with all packaging. Custom or personalized items cannot be returned.",
        },
        {
          question: "How do I return an item?",
          answer:
            "Contact our customer service team to initiate a return. We'll provide you with return instructions and, if applicable, arrange for pickup of large items.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.",
        },
      ],
    },
  ],
};

export const PRIVACY_POLICY_CONTENT = {
  lastUpdated: "September 1, 2025",
  sections: [
    {
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
        "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, and pages visited.",
        "We may collect information from third parties, such as social media platforms, if you choose to connect your accounts.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To process and fulfill your orders",
        "To communicate with you about your account and orders",
        "To improve our website and services",
        "To send you marketing communications (with your consent)",
        "To comply with legal obligations",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with service providers who help us operate our business.",
        "We may disclose information when required by law or to protect our rights.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information.",
        "We use SSL encryption for all transactions and sensitive data transmission.",
        "We regularly review and update our security practices.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt out of marketing communications at any time.",
        "You can request a copy of the personal information we have about you.",
      ],
    },
  ],
};

export const TERMS_CONDITIONS_CONTENT = {
  lastUpdated: "September 1, 2025",
  sections: [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
      ],
    },
    {
      title: "Products and Services",
      content: [
        "All products are subject to availability and we reserve the right to discontinue any product at any time.",
        "We strive to display product colors and images as accurately as possible, but cannot guarantee that your device's display will accurately reflect the actual product colors.",
        "Prices are subject to change without notice.",
      ],
    },
    {
      title: "Orders and Payment",
      content: [
        "All orders are subject to acceptance and availability.",
        "We reserve the right to refuse or cancel any order for any reason.",
        "Payment must be received before products are shipped.",
        "We accept major credit cards and other payment methods as displayed at checkout.",
      ],
    },
    {
      title: "Shipping and Delivery",
      content: [
        "Shipping times are estimates and not guaranteed.",
        "Risk of loss and title for products pass to you upon delivery to the carrier.",
        "We are not responsible for delays caused by shipping carriers or circumstances beyond our control.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "Our liability is limited to the maximum extent permitted by law.",
        "We are not liable for any indirect, incidental, or consequential damages.",
        "Our total liability shall not exceed the amount paid for the product or service.",
      ],
    },
  ],
};

export const RETURN_POLICY_CONTENT = {
  hero: {
    title: "Return Policy",
    subtitle: "Easy returns within 30 days",
    description:
      "We want you to love your purchase. If you're not completely satisfied, we're here to help.",
  },
  policy: {
    timeframe: "30 days",
    conditions: [
      "Items must be in original condition",
      "All original packaging must be included",
      "Items must be free from damage, stains, or odors",
      "Custom or personalized items cannot be returned",
      "Sale items are final sale unless defective",
    ],
  },
  process: {
    title: "How to Return an Item",
    steps: [
      {
        step: 1,
        title: "Contact Us",
        description:
          "Email us at returns@shopyro.com or call our customer service team to initiate your return.",
      },
      {
        step: 2,
        title: "Get Return Authorization",
        description:
          "We'll provide you with a return authorization number and detailed instructions.",
      },
      {
        step: 3,
        title: "Package Your Item",
        description:
          "Carefully package your item in its original packaging with all accessories included.",
      },
      {
        step: 4,
        title: "Ship It Back",
        description:
          "Use the prepaid return label we provide or arrange your own shipping (costs may apply).",
      },
      {
        step: 5,
        title: "Get Your Refund",
        description:
          "Once we receive and inspect your return, we'll process your refund within 5-7 business days.",
      },
    ],
  },
  exceptions: {
    title: "Return Exceptions",
    items: [
      "Custom or made-to-order furniture",
      "Personalized or engraved items",
      "Items damaged by normal wear and tear",
      "Items returned after 30 days",
      "Items without original packaging",
    ],
  },
};

export const REFUND_POLICY_CONTENT = {
  hero: {
    title: "Refund Policy",
    subtitle: "Clear and fair refund terms",
    description:
      "Understanding our refund process and what to expect when returning items.",
  },
  sections: [
    {
      title: "Refund Timeframe",
      content: [
        "Refunds are processed within 5-7 business days after we receive your returned item.",
        "The refund will be credited to your original payment method.",
        "Bank processing times may vary and can take an additional 3-5 business days to appear in your account.",
      ],
    },
    {
      title: "Refund Amount",
      content: [
        "You will receive a full refund of the item price if returned in original condition.",
        "Original shipping costs are non-refundable unless the item was defective or we made an error.",
        "Return shipping costs are the customer's responsibility unless the item was defective.",
      ],
    },
    {
      title: "Partial Refunds",
      content: [
        "Items returned with missing parts or accessories may receive a partial refund.",
        "Items showing signs of use beyond normal inspection may receive a partial refund.",
        "Items returned without original packaging may be subject to a restocking fee.",
      ],
    },
    {
      title: "Exchanges",
      content: [
        "We offer exchanges for defective items or if we sent the wrong item.",
        "Size or color exchanges are subject to availability and may require additional payment.",
        "Contact customer service to arrange an exchange before returning your item.",
      ],
    },
    {
      title: "Damaged Items",
      content: [
        "If you receive a damaged item, contact us immediately with photos of the damage.",
        "We will arrange for pickup and provide a full refund or replacement at no cost to you.",
        "Do not return damaged items without first contacting customer service.",
      ],
    },
  ],
};
