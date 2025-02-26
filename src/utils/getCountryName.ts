import { countries } from 'country-data';

const getCountryName = ( countryCode: string ) => {
  const country = countries[countryCode];
  return country ? country.name : "Unknown";
};

export default getCountryName;