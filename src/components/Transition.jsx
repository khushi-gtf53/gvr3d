export default function Transition({ scene, setScene }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      <button
        onClick={() => setScene(1)}
        className={`px-4 py-2 rounded-lg ${
          scene === 1 ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Scene 1
      </button>
      <button
        onClick={() => setScene(2)}
        className={`px-4 py-2 rounded-lg ${
          scene === 2 ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Scene 2
      </button>
    </div>
  );
}
