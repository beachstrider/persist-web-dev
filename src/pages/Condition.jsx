import { useState } from 'react'
import { DownloadIcon } from '@heroicons/react/outline'
import {
  ChevronRightIcon,
} from '@heroicons/react/solid'
import Layout from '../components/layout'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Default() {
  const projectData = [
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
    {
      considionId: 2938479283,
      loading: 34,
      encapsulationEfficiency: 43
    },
  ]

  return (
    <Layout>

      <div className="mx-3 mt-6 border border-gray-200 overflow-hidden sm:rounded-lg">
        <div className="px-2 py-3 sm:px-6">
          <h3 className="text-md leading-6 font-medium text-gray-900">Condition Details</h3>
        </div>
        <div className="grid grid-cols-2 px-6 border-gray-200 px-4 py-5 border-t">
          <div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Condition ID</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">302115</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">PLGA Type</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">Sep 10, 2022</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">API</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">API name here</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Solvent 1</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">DCM</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Solvent 2</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">Water</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Param 3</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">XXX</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Param 4</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">XXX</div>
            </div>
            <div className="grid grid-cols-2 mb-3">
              <div className="text-sm font-medium text-gray-500">Param 5</div>
              <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">XXX</div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>



    </Layout>
  )
}
