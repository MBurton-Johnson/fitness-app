export default function createProfile() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Create Profile</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="framework" className="mb-2 font-semibold">Gender</label>
          <select
            id="framework"
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Prefer not to say</option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="age" className="mb-2 font-semibold">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter your age"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="height" className="mb-2 font-semibold">Height</label>
          <input
            id="height"
            type="text"
            placeholder="Enter your height"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="weight" className="mb-2 font-semibold">Weight</label>
          <input
            id="weight"
            type="text"
            placeholder="Enter your weight"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    );
  }
  