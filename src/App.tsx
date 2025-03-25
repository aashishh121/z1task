import { useEffect, useState } from "react";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [cats, setCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey =
    "live_88I66pMCZtFR9e58o3TpwUeAuptJm3yxP1MlTBO4w640xuRDu5KmTGXBBWoOa3r3"; // Move to .env for security in production

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

  const getCatImgs = async (breed = "", isAppend = false) => {
    setLoading(true);
    let url = `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${apiKey}&breed_ids=${breed}`;

    const res = await fetch(url);
    const data = await res.json();

    setCats((prevCats) => (isAppend ? [...prevCats, ...data] : data));
    setLoading(false);
  };

  const handleChange = (e: any) => {
    const breedId = e.target.value;
    setSelectedBreed(breedId);
    getCatImgs(breedId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🐾 Cat Gallery
        </h1>

        <div className="mb-8">
          <label
            htmlFor="filter"
            className="block mb-2 text-gray-700 font-medium"
          >
            Select Breed
          </label>
          <select
            value={selectedBreed}
            onChange={handleChange}
            id="filter"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Breeds</option>
            {breeds.map((breed: any) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-lg text-indigo-600">Loading...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cats.map((cat: any) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                className="w-full h-60 object-cover"
                src={cat.url}
                alt="Cat"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => getCatImgs(selectedBreed, true)}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More Cats"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
