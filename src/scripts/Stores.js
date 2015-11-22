import Fluxxor from 'fluxxor'
import Constants from './Constants'

var WeekStore = Fluxxor.createStore({
  initialize() {
    var defaultWeek = {
      days: [ [], [], [], [], [], [], [] ],
      week: 0,
      year: 0
    }
    this.currentWeek = Object.assign({}, defaultWeek)
    this.activeWeek = Object.assign({}, defaultWeek)

    this.bindActions(
        Constants.GET_WEEK, this.onGetWeek,
        Constants.GET_CURRENT_WEEK, this.onGetCurrentWeek
    );
  },

  onGetWeek(week) {
    this.activeWeek = week
    this.emit('change')
  },

  onGetCurrentWeek(week) {
    this.currentWeek = week
    this.activeWeek = week
    this.emit('change')
  }

})

export default {
  WeekStore: new WeekStore()
}