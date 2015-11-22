import React from 'react'

var Controls = React.createClass({
  propTypes: {
    week: React.PropTypes.number,
    year: React.PropTypes.number,
    onWeekChange: React.PropTypes.func,
    onYearChange: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      week: 0,
      year: 0,
      onWeekChange: new Function(),
      onYearChange: new Function()
    }
  },

  onWeekChange(event) {
    var newWeek = event.target.value
    this.props.onWeekChange(+newWeek)
  },

  onYearChange(event) {
    var newYear = event.target.value
    this.props.onYearChange(+newYear)
  },

  render() {
    var blockName = 'calendar__controls'

    return (
        <div className={blockName}>

            <label className={`${blockName}-label`}>
              week
              <input className={`${blockName}-input`}
                     type='number'
                     value={this.props.week}
                     min={1}
                     max={54}
                     onChange={this.onWeekChange} />
            </label>

            of

            <label className={`${blockName}-label`}>
              <input className={`${blockName}-input`}
                     type='number'
                     value={this.props.year}
                     onChange={this.onYearChange} />
            </label>

        </div>
    );
  }
});

export default Controls