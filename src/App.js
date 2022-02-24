import { useState } from "react";
import axios from "axios";

const App = () => {
  const [continent, setContinent] = useState("");
  const [countries, setCountries] = useState([]);

  return (
    <>
      <div className="mx-20 mt-10 w-80">
        <label>Select Continent</label>
        <select
          className="bg-gray-50 border border-gray-500 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onChange={async (e) => {
            setContinent(e.target.value);
            await axios
              .get(`https://restcountries.com/v3.1/region/${e.target.value}`)
              .then((res) => {
                console.log(res.data);
                setCountries(res.data.map((c) => c));
              });
          }}
        >
          <option className="hidden">-- Continent --</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </div>

      <section className="mx-20 mt-10 grid grid-cols-3 gap-4 md:grid-rows-6">
        {continent.length !== 0 &&
          countries.map((c) => (
            <div className="w-full h-full" key={c.area}>
              <div className="overflow-hidden rounded-lg shadow-lg w-full">
                <img
                  className="w-full h-full object-cover"
                  src={c.flags.svg}
                  alt={`Flag of ${c.name.common}`}
                />
                <h1 className="text-center text-lg p-10">{c.name.common}</h1>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default App;
