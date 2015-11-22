var utils = {

  getAppData() {
    if (!localStorage) {
      throw new Error('This app works with localStorage')
    }

    if (!localStorage.getItem('HR')) {
      localStorage.setItem('HR', '{}')
    }

    return JSON.parse(localStorage.getItem('HR'))
  },

  nthWeekOfYear(timestamp) {
    var date = new Date(timestamp)
    var previousMonthsCount = date.getMonth()
    var dayOfMonth = date.getDate()
    var daysPerMonth = 365 / 12
    return Math.floor(((previousMonthsCount * daysPerMonth) + dayOfMonth) / 7)
  },

  getCurrentWeek() {
    return this.nthWeekOfYear(new Date().getTime())
  }

}

export default utils