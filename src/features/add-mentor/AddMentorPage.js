import Button from '../button/Button';

const AddMentorPage = () => {
  const inputClasses = 'shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const labelClasses = 'w-full md:w-auto';
  const spanClasses = 'block text-gray-700 text-sm font-bold mb-2';

  return (
    <div id="add-mentor-page" className="relative min-h-full w-full flex justify-center items-center bg-lime-600 py-16 px-8">
      <form
        className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 gap-6"
      >
        <div className="flex flex-wrap gap-6">
          <label htmlFor="name" className={labelClasses}>
            <span className={spanClasses}>
              Name
            </span>
            <input
              className={inputClasses}
              id="name"
              type="text"
              placeholder="Name"
              required
            />
          </label>

          <label htmlFor="photo-url" className={labelClasses}>
            <span className={spanClasses}>
              Photo URL
            </span>
            <input
              className={inputClasses}
              id="photo"
              type="text"
              placeholder="Photo URL"
              required
            />
          </label>
        </div>

        <label htmlFor="bio" className={labelClasses}>
          <span className={spanClasses}>
            Bio
          </span>
          <textarea
            className={inputClasses}
            id="bio"
            rows="10"
            placeholder="Enter bio here ..."
            required
          />
        </label>

        <div className="flex items-center justify-between">
          <Button child="Add Mentor" isSubmit />
        </div>
      </form>
    </div>
  );
};

export default AddMentorPage;
