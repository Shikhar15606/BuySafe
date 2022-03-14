import React, { useEffect } from 'react';

import Calendar from 'color-calendar';
import 'color-calendar/dist/css/theme-glass.css';

const CalendarComponent = props => {
  useEffect(() => {
    new Calendar({
      id: '#myCal',
      theme: 'glass',
      weekdayType: 'long-upper',
      primaryColor: '#6366f1',
      headerBackgroundColor: '#6366f1',
      monthDisplayType: 'long',
      calendarSize: 'small',
      layoutModifiers: ['month-left-align'],
      dateChanged: (currentDate, events) => {
        props.onChange(currentDate);
        console.log('date change', currentDate, events);
      },
      monthChanged: (currentDate, events) => {
        props.onChange(currentDate);
        console.log('month change', currentDate, events);
      },
    });
  }, []);

  return (
    <div id='myCal' className='flex flex-1 items-center justify-center'></div>
  );
};

export default CalendarComponent;
