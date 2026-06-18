import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filter} onChange={(event) => props.setFilter(event.target.value)} />
    </div>
  )
}

const Country = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>capital {props.capital}</p>
      <p>area {props.area}</p>
      <h3>languages:</h3>
      <ul>
        {props.languages.map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={props.flag} alt="flag" width="100" />
    </div>
  )
}

const CountryList = (props) => {
  if (props.countries.length === 0) {
    return (
      <p>No matches, specify another filter</p>
    )
  } else if (props.countries.length === 1) {
    const country = props.countries[0]
    return (
      <Country
        name={country.name.common}
        capital={country.capital ? country.capital[0] : 'none'}
        area={country.area}
        languages={Object.values(country.languages)}
        flag={country.flags.png}
      />
    )
  } else if (props.countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  return (
    <div>
      {props.countries.map((country) =>
        <p key={country.name.common}>
          {country.name.common} <button onClick={() => props.setFilter(country.name.common)}>show</button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  if (countries === null) {
    return null
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <CountryList countries={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App