import { useState, useEffect } from "react";
import { Box, Collapse, Grid, MenuItem, TextField } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";
// import {
//   catchErrors,
//   notifyErrorHandler,
//   resolveErrorMsg,
// } from "../../../../middleware/catchErrors";


const defaultLocation = {
  address: "",
  state_id: 0,
  country_id: 0,
};
export default function AutoFillAddress({addressUpdate,isDisabled,showAllowedCountries}) {
    const [doReload, setDoReload] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);
  const [location, setLocation] = useState(defaultLocation);
  const [geocode, setGeocode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [stateId, setStateId] = useState(0);
  const [address, setAddress] = useState({});

  useEffect(() => {
    const { country_id, state_id } = location;

    const country = countryList.find(
      (country) => country?.value === country_id
    )?.shortName;
    const state = stateList.find((state) => state?.value === state_id)?.text;

    addressUpdate && addressUpdate({ ...location, address, country, state });
  }, [location]);

  useEffect(() => {
    const { postcode, city, country_id, state_id } = location;
    if (postcode && city && country_id && state_id) {
      return isDisabled(false);
    }
    isDisabled(true);
  }, [location]);

  const autoCompleteAddresses = (address) => {
    setLocation((prev) => ({ ...prev, address }));
    setAddress(address);
    setDoReload((prev) => !prev);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setGeocode({ lat: latLng?.lat, lng: latLng?.lng }))
      .catch((error) => console.error("Error", error));
  };

  const fetchCountryHandler = async () => {
    setLoadingCountries(true);
    try {
      const url = `${baseUrl}/self-services/countries?page=0&size=250`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const { content } = response.data;
        const list = content.filter((country) => {
          if (showAllowedCountries) {
            return country.enabled;
          }
          return country;
        });
        const allowedCountries = list.map((obj) => {
          return {
            key: obj.code,
            value: obj.id,
            text: obj.name,
            code: obj.code,
            shortName: obj.shortName,
            flag: obj.shortName.toLowerCase(),
          };
        });

        setCountryList(allowedCountries);
      }
    } catch (error) {
        console.log(error.message)
    //   catchErrors(error, setError);
    //   notifyErrorHandler({
    //     type: "error",
    //     title: "Error Fetching Countries",
    //     msg: error,
    //     duration: 5000,
    //   });
      setLoading(false);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchStateHandler = async () => {
    setLoadingStates(true);
    try {
      if (location?.country_id) {
        const url = `${baseUrl}/self-services/countries/${location?.country_id}/states`;
        const response = await axios.get(url);

        if (response.status === 200) {
          const content = response.data;

          const availableStates = content.map((obj) => {
            return {
              key: obj.id,
              value: obj.id,
              text: obj.name,
            };
          });

          setStateList(availableStates);
        }
      }
    } catch (error) {
      catchErrors(error, setError);
      notifyErrorHandler({
        type: "error",
        title: "Error Fetching States",
        msg: error,
        duration: 5000,
      });
      setLoading(false);
    } finally {
      setLoadingStates(false);
    }
  };

  const updateAddress = async ({ lat, lng }) => {
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      //   const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=pN6ifTcZxNybSd5W0fk5ahHTS00IDykz&radius=100`;
      //   const url = `http://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&lang=en-US&apiKey=FIUPGtEoydm6WfeWkv9mSsce4U_SZxhz8MsWOulHenk`;
      const { data } = await axios.get(url);

      const { country, state, suburb, city, postcode, town } = data?.address;

      const countryContruc = countryList?.find((elem) =>
        elem?.text?.includes(country)
      );

      const newState = stateList?.find(
        (elem) => elem?.text === state || elem?.text?.includes(state)
      );

      setStateId(state);

      setLocation((prevState) => ({
        ...(prevState),
        country_id: countryContruc?.value,
        // state_id: newState?.value,
        country: countryContruc?.shortName ?? "",
        state: state ?? "",
        city: suburb ?? city ?? town ?? "",
        postcode: postcode ?? "",
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
      let getError = resolveErrorMsg(error);
      setError(true);
    //   notifyErrorHandler({
    //     type: "error",
    //     title: getError?.errorMsg,
    //     msg: error,
    //     duration: 5000,
    //   });
    }
  };

  // -------- Hooks ----------- //
  useEffect(() => {
    geocode?.lat && updateAddress(geocode);
  }, [geocode]);

  useEffect(() => {
    fetchCountryHandler();
  }, []);

  useEffect(() => {
    fetchStateHandler();
  }, [location?.country_id]);

  useEffect(() => {
    const newState = stateList.find((elem) => elem.text === stateId)?.value;
    setLocation((prevState) => ({
      ...prevState,
      state_id: newState,
    }));
  }, [stateList, stateId, geocode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <PlacesAutocomplete
        value={location.address}
        onChange={autoCompleteAddresses}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ position: "relative" }}>
            <TextField
              {...getInputProps({
                placeholder: "123 Johnson street...",
                label: "Address (Not P.O. Box)",
                name: "address",
              })}
            />
            {suggestions.length ? (
              <div className="suggestions-box">
                {loading && <div>Loading...</div>}
                {suggestions?.map((suggestion) => {
                  return (
                    <div
                      className="suggestion-item"
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, {})}
                    >
                      {suggestion?.description?.length > 60
                        ? suggestion?.description?.substring(0, 60) + "..."
                        : suggestion?.description}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </PlacesAutocomplete>
      <Collapse
        sx={{ mt: location.state || error ? "24px" : "" }}
        in={location.state || error}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Country"
              select
              value={location.country_id}
              onChange={handleChange}
              name="country_id"
            >
              {countryList?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              select
              value={location.state_id}
              onChange={handleChange}
              name="state_id"
            >
              {stateList?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              value={location.city}
              onChange={handleChange}
              name="city"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postcode"
              value={location.postcode}
              onChange={handleChange}
              name="postcode"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  )

}