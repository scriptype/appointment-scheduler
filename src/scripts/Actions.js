import Constants from './Constants'
import utils from './utils'

var Actions = {

  Weeks: {

    getWeek(week, year) {
      var appData = utils.getAppData()
      var defaultDays = [ [], [], [], [], [], [], [] ]

      var days = appData[year] ?
          (appData[year][week] || defaultDays) :
          defaultDays

      this.dispatch(Constants.GET_WEEK, { days, week, year })
    },

    getCurrentWeek() {
      var appData = utils.getAppData()
      var defaultDays = [ [], [], [], [], [], [], [] ]

      var week = utils.getCurrentWeek()
      var year = new Date().getFullYear()

      var days = appData[year] ?
          (appData[year][week] || defaultDays) :
          defaultDays

      this.dispatch(Constants.GET_CURRENT_WEEK, { days, week, year })
    }

  }

}

export default Actions