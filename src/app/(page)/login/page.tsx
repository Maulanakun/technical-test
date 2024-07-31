import ClientInputError from "@/components/clientInputError";
import { handleSubmit } from "./action";

export default function Login() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-md p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
        <form action={handleSubmit}>
          <div className="mb-4 text-red-500 font-bold text-center">
            <ClientInputError />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              name="email"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-white text-sm">
          No account?
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
