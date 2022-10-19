import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db, auth } from 'config/firebase'
import { functions } from 'config/firebase'
import { httpsCallable } from "firebase/functions"

export default function Default() {
  const [users, setUsers] = useState([])

  const fetch = async () => {
    const q = query(collection(db, "users"), where("email", "!=", auth.currentUser.email));

    const querySnapshot = await getDocs(q);
    let _users = []
    querySnapshot.forEach((doc) => {
      _users = [
        ..._users,
        {
          id: doc.id,
          ...doc.data()
        }
      ]
    })
    setUsers(_users)
  }

  const handleDeleteUser = (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser(id)
      .then((result) => {
        fetch()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetch()
    return () => {

    };
  }, [])

  return (
    <Layout loading={!users} title="Users">

      <Link
        type="button"
        className="ml-6 mt-4 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        to={`/users/create`}
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        <span>New</span>
      </Link>
      <div className="flex flex-col p-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Projects
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full border border-gray-400" src={user.avatar} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/${user.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
