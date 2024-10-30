const ProfitFakeData = {
  generalSettings: {
    tax: {
      he: 'מע"מ',
      normal: 17,
    },
    paymentFees: {
      he: 'עמלות תשלום',
      percent: 0.4,
    },
  },
  generalExpenses: {
    rent: {
      he: 'שכירות',
      period: 'monthly',
      cost: 12000,
    },
    insurance: {
      he: 'ביטוחים',
      period: 'yearly',
      cost: 1000,
    },
    advertising: {
      he: 'פרסום',
      period: 'monthly',
      cost: 4000,
    },
    electricity: {
      he: 'חשמל',
      period: 'monthly',
      cost: 5000,
    },
    water: {
      he: 'מים',
      period: 'monthly',
      cost: 1300,
    },
    officeExpenses: {
      he: 'הוצאות משרדיות',
      period: 'monthly',
      cost: 400,
    },
    tutalSalary: {
      he: 'כלל המשכרות',
      period: 'monthly',
      cost: 40000,
    },
    employeeBenefits: {
      he: 'הטבות לעובדים',
      period: 'yearly',
      cost: 6000,
    },
  },
  equipments: [
    {
      name: 'warehouse',
      he: 'מחסן',
      cost: 0,
      yearlyCare: 24000,
    },
    {
      name: 'refrigerator',
      he: 'מקרר',
      cost: 14000,
      yearlyCare: 600,
    },
    {
      name: 'oven',
      he: 'תנור',
      cost: 17000,
      yearlyCare: 1200,
    },
    {
      name: 'coffeeMachine',
      he: 'מכונת קפה',
      cost: 40000,
      yearlyCare: 3000,
    },
  ],
  ingredients: [
    {
      name: 'milk',
      he: 'חלב',
      cost: 5.8,
      otherCosts: 0,
      failurePercentage: 0,
      uses: [
        {
          equipment: 'refrigerator',
          timePercentage: 100,
          areaPercentage: 20,
        },
      ],
    },
    {
      name: 'offeeBeans',
      he: 'פולי קפה',
      cost: 108,
      otherCosts: 0,
      failurePercentage: 0,
      uses: [
        {
          equipment: 'warehouse',
          timePercentage: 100,
          areaPercentage: 5,
        },
      ],
    },
  ],
  products: [
    {
      name: 'espresso',
      he: 'אספרסו',
      cost: 1.2,
      tax: 'normal',
      extraWorkers: 0,
      extraStorage: 0,
      preparationTime: 1,
      ingredients: [
        {
          name: 'milk',
          quantity: 0.1,
        },
        {
          name: 'offeeBeans',
          quantity: 0.01,
        },
      ],
      uses: [
        {
          equipment: 'coffeeMachine',
          useTime: 0.5,
          canUseInSameTime: 4,
        },
      ],
      comments: '',
      failurePercentage: 0,
    },
  ],
};

export default ProfitFakeData;
