import React from 'react'
import Fluxxor from 'fluxxor'
import Controls from './Controls'
import Table from './Table'

var Calendar = React.createClass({
  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('WeekStore')
  ],

  getStateFromFlux: function() {
    var weekStore = this.getFlux().store('WeekStore');

    return {
      currentWeek: weekStore.currentWeek,
      activeWeek: weekStore.activeWeek
    }
  },

  componentDidMount() {
    this.getFlux().actions.Weeks.getCurrentWeek()
  },

  handleWeekChange(week) {
    this.getFlux().actions.Weeks.getWeek(week, this.state.activeWeek.year)
  },

  handleYearChange(year) {
    this.getFlux().actions.Weeks.getWeek(this.state.activeWeek.week, year)
  },

  render() {
    var blockName = 'calendar'
    var { week, year } = this.state.activeWeek

    console.log('calendar render', this.state)

    return (
        <div className={blockName}>

          <Controls
              week={week}
              year={year}
              onWeekChange={this.handleWeekChange}
              onYearChange={this.handleYearChange} />

          <Table week={this.state.activeWeek} />

        </div>
    );
  }
});

export default Calendar