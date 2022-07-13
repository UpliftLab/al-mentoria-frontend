const SigninForm = () => (
  <div className="w-full max-w-xs">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label htmlFor="email" className="block mb-5">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </span>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
        />
        <small className="text-red-500 text-xs italic">
          Please choose a Email.
        </small>
      </label>

      <label htmlFor="password" className="block mb-5">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </span>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="******************"
        />
        <small className="text-red-500 text-xs italic">
          Please choose a password.
        </small>
      </label>

      <div className="flex items-center justify-between">
        <button
          className="bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-lime-500 hover:text-lime-600"
          href="/blah"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
);

export default SigninForm;
