import './CalendarIcon.css';

export default function(props: any){
    const expenseDate = new Date(props.ymd)

    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DIC'
    ]
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
    const month = months[expenseDate.getMonth()]
    const day = days[expenseDate.getDay()]
    return (
        <time dateTime={props.ymd} className="icon">
            <em>{day}</em>
            <strong>{month}</strong>
            <span>{expenseDate.getDate()+1}</span>
        </time>
    )
}