import { useEffect, useState } from "react";

function App() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey =
    "live_88I66pMCZtFR9e58o3TpwUeAuptJm3yxP1MlTBO4w640xuRDu5KmTGXBBWoOa3r3"; // we can store this api key in env file

  useEffect(() => {
    fetchCatBreeds();
    getCatImgs();
  }, []);

  const fetchCatBreeds = async () => {
    const res = await fetch(
      `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`
    );
    const data = await res.json();
    setBreeds(data);
  };

  const getCatImgs = async (breed = "", append = false) => {
    setLoading(true);
    let url = `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${apiKey}`;
    if (breed) {
      url += `&breed_ids=${breed}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setCats((prevCats) => (append ? [...prevCats, ...data] : data));
    setLoading(false);
  };

  const handleChange = (e: any) => {
    const breedId = e.target.value;
    setSelectedBreed(breedId);
    getCatImgs(breedId);
  };
  return (
    <>
      <div className="p-10">
        <div className="p-5 border mb-3">
          <label className="mr-10" htmlFor="filter">
            Select Breeds
          </label>
          <select value={selectedBreed} onChange={handleChange} id="filter">
            <option value="" id="filter">
              All Breeds
            </option>
            {breeds.map((breed: any) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p>Loading...</p>}
        <div className="flex flex-col gap-5">
          {cats.map((cat: any) => (
            <div key={cat.id} className="">
              <img
                width={200}
                height={200}
                src={cat.url}
                alt="Cat"
                id="catImg"
              />
            </div>
          ))}
        </div>

        <div className="">
          <button
            onClick={() => getCatImgs(selectedBreed, true)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
