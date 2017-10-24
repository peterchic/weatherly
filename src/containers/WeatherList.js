import React, {Component} from 'react'
import {connect} from 'react-redux'
import Chart from '../components/chart'
import GoogleMap from '../components/GoogleMap'

class WeatherList extends Component {
  renderWeather(cityData){
        const name = cityData.city.name
        // const temp = cityData.list.map(weather => weather.main.temp)
        const temp = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273)
    const pressure = cityData.list.map(weather => weather.main.pressure)
    const humidity = cityData.list.map(weather => weather.main.humidity)
    const sky = cityData.list.map(weather => weather.weather.main)
    const { lon, lat } = cityData.city.coord

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat}/></td>
        <td> <Chart data={temp} color="#B1FED9" units="C"/></td>
        {/* <td> <Chart data={pressure} color="green" units="hPa"/></td> */}
        <td> <Chart data={humidity} color="#EAEEA6" units="%"/></td>
      </tr>
    )
  }

  render() {
    return (
      <div className="table-responsive">

      <table className="table table-inverse">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (C)</th>
            {/* <th>Pressure (hPa)</th> */}
            <th>Humidity (%)</th>
          </tr>
        </thead>
      <tbody>
        {this.props.weather.map(this.renderWeather)}
      </tbody>
      </table>
    </div>
    )
  }
}

function mapStateToProps({weather}){ // { weather } => mapStateToProps(state) const weather = state.weather
  return { weather } // { weather } ===  {weather: weather}
}

export default connect(mapStateToProps)(WeatherList)
//we're exporting the connected version of WeatherList
