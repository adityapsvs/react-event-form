import React from "react"
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete"

export default class LocationSearchInput extends React.Component {
  handleChange = address => {
    this.props.handleChange(address)
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        this.props.handleChange(results[0].formatted_address)
      })
      .catch(error => console.error("Error", error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="form-group">
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "form-control"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}
