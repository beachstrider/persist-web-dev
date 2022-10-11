import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import {
  ChevronRightIcon,
} from '@heroicons/react/solid'
import Layout from '../components/layout/'
const projects = [
  {
    id: 1,
    name: 'JA91-20221009',
    startDate: 'Sep 10, 2022',
    status: 'In Progress',
    stage: 'Feasibility'
  },
  {
    id: 2,
    name: 'JAXX-20XXXXX',
    startDate: 'Sep 11, 2022',
    status: 'In Queue',
    stage: 'In Vitro Release & Loading Optimization'
  },
  // More projects...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Default() {
  return (
    <Layout>
      {/* projects */}
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          <div className='text-left'>
            <div>Start A New Project</div>
            <div className="text-xs text-gray-500">Submit project details & we will follow-up via email</div>
          </div>
        </button>

      </div>

      {/* Projects list (only on smallest breakpoint) */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
        </div>
        <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
          {projects.map((project) => (
            <li key={project.id}>
              <a href="#" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                <span className="flex items-center truncate space-x-3">
                  <span
                    className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                    aria-hidden="true"
                  />
                  <span className="font-medium truncate text-sm leading-6">
                    {project.title} <span className="truncate font-normal text-gray-500">in {project.team}</span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className="hidden mt-8 sm:block">
        <div className="px-8 py-3">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Current Projects</h2>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Project Name</span>
                </th>
                <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={'bg-pink-600 flex-shrink-0 w-2.5 h-2.5 rounded-full'}
                        aria-hidden="true"
                      />
                      <a href="/projects/1" className="truncate hover:text-gray-600">
                        <span>
                          {project.name}
                        </span>
                      </a>
                    </div>
                  </td>
                  
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.startDate}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.status}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {project.stage}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
