import { createRef, useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore"
import { auth, db } from 'config/firebase'
import moment from "moment"

export default function Default() {
  const create = (user) => {
    console.log('user', user)
  }
  return (
    <Layout title="Create User">
      <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {
            e.preventDefault()
            create({name: e.target.name.value, email: e.target.email.value, password: e.target.password.value })
          }}>
        <div className="w-full max-w-xs mx-auto pt-60">
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
