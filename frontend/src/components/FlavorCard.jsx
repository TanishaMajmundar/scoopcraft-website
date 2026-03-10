function FlavorCard({ flavor }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-60 text-center">

      <div className="h-32 flex items-center justify-center bg-pink-100 rounded-lg">
        🍦
      </div>

      <h2 className="text-xl font-semibold mt-3">
        {flavor.name}
      </h2>

      <p className="text-pink-600 font-bold">
        ₹{flavor.price}
      </p>

      <button className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg">
        Add
      </button>

    </div>
  );
}

export default FlavorCard;