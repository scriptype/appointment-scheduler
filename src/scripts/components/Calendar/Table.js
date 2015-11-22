import React from 'react'

const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const STATUS_MAP = {
  1: 'future',
  2: 'in-progress',
  3: 'on-hold',
  4: 'failed',
  5: 'elected'
}

const FAKE_WEEK = [
  [
    {
      company: 'National Geographic',
      status: 2,
      hour: 9
    }
  ],
  [],
  [
    {
      company: 'NASA',
      status: 2,
      hour: 10
    },
    {
      company: 'Facebook',
      status: 2,
      hour: 14
    },
    {
      company: 'Twitter',
      status: 4,
      hour: 19
    }
  ],
  [
    {
      company: 'Google',
      status: 3,
      hour: 12
    }
  ],
  [],
  [
    {
      company: 'Hacker News',
      status: 5,
      hour: 8
    },
    {
      company: 'Github',
      status: 1,
      hour: 11
    },
    {
      company: 'Spotify',
      status: 1,
      hour: 16
    }
  ],
  []
]

var Table = React.createClass({
  propTypes: {
    week: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      week: {
        days: [],
        week: 0,
        year: 0
      }
    }
  },

  render() {
    var blockName = 'calendar__table'

    var maxAppointmentCount = FAKE_WEEK
        .map(day => day.length)
        .reduce((memo, curr) => (
            Math.max(memo, curr)
        ) , 0)

    return (
        <table className={blockName}>

          <thead className={`${blockName}__head`}>
            <tr>
              {DAY_NAMES.map(dayName => (
                  <td key={`day-${dayName}`}
                      className={`${blockName}__head-cell`}>

                    <span className={`${blockName}__head-cell-name`}>
                      { dayName }
                    </span>

                    <span className={`${blockName}__head-cell-add-button`}>
                      +
                    </span>
                  </td>
              ))}
            </tr>
          </thead>

          <tbody className={`${blockName}__body`}>

          {new Array(maxAppointmentCount).join(' ').split(' ').map((row, rowIndex) => (

              <tr key={`row-${rowIndex}`}
                  className={`${blockName}__row ${blockName}__row--total-${maxAppointmentCount}`}>

                {FAKE_WEEK.map((day, dayIndex) => (

                    <td key={`day-${rowIndex}-${dayIndex}`}
                        className={`${blockName}__cell`}>

                      {day[rowIndex] && (
                          <div className={`${blockName}__appointment`}>

                          <span className={`
                            ${blockName}__appointment-status
                            ${blockName}__appointment-status--${STATUS_MAP[day[rowIndex].status]}
                            `}>
                          </span>

                          <span className={`${blockName}__appointment-company`}>
                            { day[rowIndex].company }
                          </span>

                          <span className={`${blockName}__appointment-hour`}>
                            { `${('0' + day[rowIndex].hour).slice(-2)}:00` }
                          </span>

                        </div>
                    )}

                    </td>

                ))}

              </tr>

          ))}

          </tbody>
        </table>
    );
  }
});

export default Table