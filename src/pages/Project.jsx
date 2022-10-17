import { useEffect, useState } from 'react'
import { DownloadIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link, useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "config/firebase"
import moment from "moment"

export default function Default() {
  const { projectId } = useParams()
  const [project, setProject] = useState()
  
  const fetchProject = async () => {
    const docRef = doc(db, "projects", projectId)
    const docSnap = await getDoc(docRef)
    setProject(docSnap.data())
  }

  useEffect(() => {
    fetchProject()
    return () => {
      
    };
  }, []);

  console.log(project)
  return (
    <Layout>
      { project ? (
        <>
          <div className="mx-3 mt-6 border border-gray-200 overflow-hidden sm:rounded-lg">
            <div className="px-2 py-3 sm:px-6">
              <h3 className="text-md leading-6 font-medium text-gray-900">Project Details</h3>
            </div>
            <div className="grid grid-cols-2 px-6 border-gray-200 px-4 py-5 border-t">
              <div>
                <div className="grid grid-cols-2 mb-3">
                  <div className="text-sm font-medium text-gray-500">Project Number</div>
                  <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">{project.projectInformation[1].Value}</div>
                </div>
                <div className="grid grid-cols-2 mb-3">
                  <div className="text-sm font-medium text-gray-500">Start Date</div>
                  <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">{moment(project.projectInformation[3].Value.toDate()).format('MM/DD/YYYY')}</div>
                </div>
                <div className="grid grid-cols-2 mb-3">
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">{project.projectInformation[5].Value}</div>
                </div>
                <div className="grid grid-cols-2 mb-3">
                  <div className="text-sm font-medium text-gray-500">API</div>
                  <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">{project.projectInformation[6].Value}</div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center mt-4 px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <DownloadIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  <div className='text-left'>
                    <div>Download Data (.CSV)</div>
                    <div className="text-xs text-gray-500">Download existing data in a CSV file</div>
                  </div>
                </button>
              </div>
              <div className="">
                <img src={project.projectInformation[7].Value} alt="" />
              </div>
            </div>
          </div>


          <div className="mx-3 mt-6 border border-gray-200 overflow-hidden sm:rounded-lg">
            <div className="px-2 py-3 sm:px-6">
              <h3 className="text-md leading-6 font-medium text-gray-900">Project Data</h3>
            </div>
            <div className="border-gray-200 px-4 py-5 sm:p-0">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span className="">Condition ID</span>
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loading %
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Encapsulation Efficiency %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {project.conditionDetails.map((condition, key) => (
                      <tr key={key}>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-ingido-900">
                          <Link to={`/projects/${projectId}/${condition["Condition ID"]}`} className="truncate text-indigo-700 hover:text-gray-600">
                            {condition["Condition ID"]}
                          </Link>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {condition["Drug Loading %"]}
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {condition["Encapsulation %"]}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : ''}
    </Layout>
  ) 
}
