import { useEffect, useState } from 'react'
import { DownloadIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore"
import { db } from "config/firebase"
import * as xlsx from 'xlsx'

export default function Default() {
  const { userId, projectId } = useParams()
  const [project, setProject] = useState()

  const fetchProject = async () => {
    const docRef = doc(db, "projects", projectId)
    const docSnap = await getDoc(docRef)
    setProject(docSnap.data())
  }

  const handleDownload = (data) => {
    const wb = xlsx.utils.book_new()

    const ws_projectInformation = xlsx.utils.json_to_sheet(
      data.projectInformation,
      {
        header: ["key", "value"],
        skipHeader: true
      }
    )
    xlsx.utils.book_append_sheet(wb, ws_projectInformation, "Project Information")

    const ws_conditionDetails = xlsx.utils.json_to_sheet(
      data.conditionDetails.map(row => {
        const res = {}
        row.cells.map(cell => {
          res[cell.key] = cell.value
          return false
        })
        return res
      }),
      {
        header: data.conditionDetails[0].cells.map(el => el.key),
      }
    )
    xlsx.utils.book_append_sheet(wb, ws_conditionDetails, "Condition Details")

    xlsx.writeFileXLSX(wb, project.projectInformation.find(el => el.key === "Project ID").value + '.xlsx')
  }

  useEffect(() => {
    fetchProject()
    return () => {

    };
  }, []);

  console.log(project)

  return (
    <Layout title="Project Details">
      {project ? (
        <>
          <div className="mx-3 mt-6 border border-gray-200 overflow-hidden sm:rounded-lg">
            <div className="px-2 py-3 sm:px-6">
              <h3 className="text-md leading-6 font-medium text-gray-900">Project Details</h3>
            </div>
            <div className="grid grid-cols-2 border-gray-200 px-4 py-5 border-t gap-6">
              <div>
                {project.projectInformation.map((el, key) => (
                  <div key={key} className="grid grid-cols-3 mb-3">
                    <div className="text-sm font-medium text-gray-500">{el.key}</div>
                    <div className="col-span-2 mt-1 flex text-sm text-gray-900 sm:mt-0 truncate">{el.value}</div>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center mt-4 px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleDownload(project)}
                >
                  <DownloadIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  <div className='text-left'>
                    <div>Download Data (.XLSX)</div>
                    <div className="text-xs text-gray-500">Download existing data in a EXCEL file</div>
                  </div>
                </button>
              </div>
              <div className="">
                <div className="w-80 h-60 bg-black" style={{ background: `url('${project.projectInformation[7].value}')` }} />
              </div>
            </div>
          </div>


          <div className="mx-3 mt-6 mb-6 border border-gray-200 overflow-hidden sm:rounded-lg">
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
                          <Link to={`/${userId}/${projectId}/${condition.cells[0].value}`} className="truncate text-indigo-700 hover:text-gray-600">
                            {condition.cells[0].value}
                          </Link>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {condition.cells[1].value}
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {condition.cells[2].value}
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
