import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { useState } from "react"

export default function Signin() {
  const [message, setMessage] = useState(null)

  const handleReset = ({ email }) => {
    console.log(email)
    sendPasswordResetEmail(getAuth(), email)
      .then((res) => {
        console.log('res', res)
        setMessage({
          success: true,
          value: "We've sent an email that contains a link to reset your password."
        })
      })
      .catch((err) => {
        console.error('err', err)
        setMessage({
          success: false,
          value: 'There is no such email, please make sure the spelling it correct.'
        })
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-24 w-auto"
          src="/logo-min.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>

        {message &&
          <div className={`mt-4 rounded-md bg-${message.success ? 'green' : 'red'}-50 p-4`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {message.success ? 
                  <CheckCircleIcon className={`h-5 w-5 text-green-400`} aria-hidden="true" />
                : 
                  <XCircleIcon className={`h-5 w-5 text-red-400`} aria-hidden="true" />
                }
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium text-${message.success ? 'green' : 'red'}-800`}>{message.value}</h3>
              </div>
            </div>
          </div>
        }

      </div>

      {(!message || !message.success) &&
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {
              e.preventDefault()
              handleReset({ email: e.target.email.value })
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <a href="#">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      }

    </div>
  )
}
