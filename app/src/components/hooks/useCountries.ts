import countries from "world-countries";
const formattedCountries = countries.map((element) => ({
    value: element.cca2,
    label: element.name.common,
    flag: element.flag,
    latlng: element.latlng,
    region: element.region
}))

const useCountries = () => {
    const getAll = () => formattedCountries;
    const ByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }
    return {
        getAll,
        ByValue
    }
};
export default useCountries;