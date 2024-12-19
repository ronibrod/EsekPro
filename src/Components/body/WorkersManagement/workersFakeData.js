const workersFakeData = [
  {
    user_name: 'David',
    name: 'דוד',
    full_name: 'דוד',
    id_number: '123456789',
    phone_number: '0551231234',
    date_of_birth: '03-09-1998',
    address: 'הרצל 13 רמת גן',
    mail: 'ggg@gmail.com',
    marital_status: 'married',
    children: 1,
    role: 'אחמ"ש',
    date_of_starting_work: new Date('12, 02, 2023'),
    work_status: 'active',
    type_of_position: 'full_time',
    hourly_wage: '70',
    history: [
      {
        date: new Date('12, 02, 2023'),
        role: 'מלצר',
        hourly_wage: '45 + טיפים',
      },
      {
        date: new Date('11, 01, 2024'),
        role: 'אחמ"ש',
        hourly_wage: '70',
      },
    ],
    created_at: new Date('12, 02, 2023'),
    shifts: [
      {
        year: 2023,
        months: [
          {
            month_name: 'April',
            month_num: 4,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
          {
            month_name: 'May',
            month_num: 5,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
        ],
      },
      {
        year: 2024,
        months: [
          {
            month_name: 'April',
            month_num: 4,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
          {
            month_name: 'May',
            month_num: 5,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
        ],
      },
    ],
    work_grade: 9.2,
    left_sick_days: 0,
    entitled_sick_days: 0,
    left_days_off: 0,
    entitled_days_off: 0,
    general_note: null,
    note_history: null,
  },
  {
    user_name: 'Roey',
    name: 'רועי',
    full_name: 'רועי אדם',
    id_number: '123456788',
    phone_number: '0551231233',
    date_of_birth: '10-04-2005',
    address: 'לח"י 45 תל אביב',
    mail: 'roey@gmail.com',
    marital_status: 'single',
    children: null,
    role: 'מלצר',
    date_of_starting_work: new Date('10, 04, 2023'),
    work_status: 'active',
    type_of_position: 'part_time',
    hourly_wage: '45 + טיפים',
    history: [
      {
        date: new Date('10, 04, 2023'),
        type_of_position: 'full_time',
        hourly_wage: '40 + טיפים',
      },
      {
        date: new Date('04, 07, 2024'),
        type_of_position: 'part_time',
      },
      {
        date: new Date('07, 04, 2024'),
        hourly_wage: '45 + טיפים',
      },
    ],
    created_at: new Date('10, 04, 2023'),
    shifts: [
      {
        year: 2023,
        months: [
          {
            month_name: 'April',
            month_num: 4,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
          {
            month_name: 'May',
            month_num: 5,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
        ],
      },
      {
        year: 2024,
        months: [
          {
            month_name: 'April',
            month_num: 4,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
          {
            month_name: 'May',
            month_num: 5,
            shifts: [
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
              {
                start: new Date('12, 02, 2023'),
                end: new Date('12, 02, 2023'),
              },
            ],
          },
        ],
      },
    ],
    work_grade: 7.5,
    left_sick_days: 0,
    entitled_sick_days: 0,
    left_days_off: 0,
    entitled_days_off: 0,
    general_note: 'לא עובד בימי ראשון',
    note_history: [
      {
        date: '10-04-2023',
        commenter: 'user_name',
        note: 'עובד טוב!!!',
      },
      {
        date: '01-04-2023',
        commenter: 'user_name',
        note: 'התלוננו עליו שהוא ...',
      },
      {
        date: '10-04-2023',
        commenter: 'דוד',
        note: 'הוא רב עם עידו באמצע המשמרת',
      },
    ],
  },
];

export default workersFakeData;

'January February March April May June July August September October November December'
