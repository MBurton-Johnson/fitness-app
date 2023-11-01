export default function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle any potential errors here
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4">Are you sure you want to delete your account?</h2>
        <div className="flex justify-center">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

