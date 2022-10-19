import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { useNavigate } from 'react-router-dom'
import { functions } from 'config/firebase'
import { httpsCallable } from "firebase/functions";

export default function Default() {
  const [error, setError] = useState(false)
  
  const navigate = useNavigate()

  const create = async (user) => {
    const createUser = httpsCallable(functions, 'createUser')
    createUser(user)
      .then((result) => {
        navigate('/users')
      })
      .catch((error) => {
        console.log(error)
        setError(error.message)
      })
  }
  return (
    <Layout title="Create User">
      <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {
        e.preventDefault()
        create({ displayName: e.target.name.value, email: e.target.email.value, password: e.target.password.value, emailVerified: true })
      }}>
        <div className="w-full max-w-sm mx-auto pt-60">
          {error &&
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          }
          <div className="mt-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="johndoe@example.com"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>

        </div>
      </form>
    </Layout>
  )
}
