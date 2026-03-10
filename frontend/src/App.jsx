import { useEffect, useState } from "react";
import axios from "axios";
import FlavorCard from "./components/FlavorCard";

function App() {

  const [flavors, setFlavors] = useState([]);

  useEffect(() => {

    const fetchFlavors = async () => {
      const res = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(res.data);
    };

    fetchFlavors();

  }, []);

  return (
    <div className="bg-pink-50 min-h-screen p-10">

      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        ScoopCraft Flavors 🍦
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">

        {flavors.map((flavor) => (
          <FlavorCard key={flavor._id} flavor={flavor} />
        ))}

      </div>

    </div>
  );
}

export default App;