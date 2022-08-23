import { Link } from "react-router-dom";

function ConfirmSignUp() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            Lify App
          </h2>
          <div className="bg-white py-3 rounded text-center">
            <h1 className="text-2xl font-bold">We Emailed You!</h1>
            <div className="flex flex-col mt-4">
              <span>Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive</span>
              <span className="font-bold"></span>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300"
                placeholder="Enter your Code"
              />
            </div>
            <div>
              <Link to="/signin" className="my-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                Confirm
              </Link>
              {/* <button className="my-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                Confirm
              </button> */}
            </div>
            <div>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-800 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                Resend Code
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmSignUp;