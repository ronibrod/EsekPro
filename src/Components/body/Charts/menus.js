import _range from 'lodash/range';

const menus = {
  subjectMenu: {
    label: 'נושא',
    isMultiple: false,
    options: {
      allProducts: 'כל המוצרים',
      byProduct: 'לפי מוצר',
      byCategory: 'לפי קטגוריה',
    },
  },
  XAxisGroupsMenu: {
    label: 'קבוצות ציר ה - X',
    isMultiple: false,
    options: {
      bySequence: 'רצף זמן (כל יום)',
      byCertain: 'זמן מסויים (רק ימי חמישי)',
      byPeriod: 'פרק זמן (ימי השבוע)',
    },
  },
  XAxisSequenceTimeMenu: {
    label: 'יחסי זמן ציר ה - X',
    isMultiple: false,
    options: {
      hourly: 'שעתי',
      daily: 'יומי',
      monthly: 'חודשי',
      yearly: 'שנתי',
    },
  },
  XAxisCertainTimeMenu: {
    label: 'יחסי זמן ציר ה - X',
    isMultiple: false,
    options: {
      hour: 'שעות',
      day: 'ימים',
      month: 'חודשים',
    },
  },
  XAxisPeriodTimeMenu: {
    label: 'פרק זמן ציר ה - X',
    isMultiple: true,
    options: {
      hours: [..._range(1, 24), 0],
      days: _range(1, 8),
      months: _range(1, 13),
    },
  },
  YAxisMenu: {
    label: 'ציר ה - Y',
    isMultiple: false,
    options: {
      amountOfSales: 'כמות מחירות',
      comparedTo: 'ביחס ל...',
    },
  },
};

export default menus;
