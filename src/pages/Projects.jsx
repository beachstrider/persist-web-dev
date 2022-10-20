import { createRef, useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link, useParams } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore"
import { db } from 'config/firebase'
import { UploadIcon } from "@heroicons/react/solid"
import { useRecoilValue } from "recoil"
import { authUserAtom } from "store"
import xlsxValidation from "utils/xlsxValidation"
import xlsxAdapt from "utils/xlsxAdapt"

export default function Default() {
  const fileInputRef = createRef()
  const [projects, setProjects] = useState([])
  const { userId } = useParams()
  const user = useRecoilValue(authUserAtom)

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(e.target.files[0])
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array", cellDates: true });
        const project = xlsxAdapt({
          uid: userId,
          projectInformation: xlsx.utils.sheet_to_json(workbook.Sheets["Project Information"], {header: 1}),
          conditionDetails: xlsx.utils.sheet_to_json(workbook.Sheets["Condition Details"], {header: 1})
        })

        console.log('output===', project)
        if(!xlsxValidation(project)) return alert('Wrong sheet type')

        try {

          await setDoc(doc(db, "projects", project.projectInformation.find(el => el.key === "Project ID").value), project)
        } catch (error) {
          console.error(error)
          alert('Wrong sheet type')
        }
        await fetchProjects()
      }
    }
  }

  const fetchProjects = async () => {
    const q = query(collection(db, "projects"), where("uid", "==", userId));
  
    const querySnapshot = await getDocs(q);
    let _projects = []
    querySnapshot.forEach((doc) => {
      _projects = [
        ..._projects,
        {
          id: doc.id,
          ...doc.data()
        }
      ]
    })
    setProjects(_projects)
  }

  useEffect(() => {
    fetchProjects()
    return () => {
      
    };
  }, []);

  console.log('projects===', projects)

  return (
    <Layout loading={!projects} title="Projects">
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
        {user.role === 'admin' &&
          <button
            type="button"
            className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              fileInputRef.current.value = null
              fileInputRef.current.click()
            }}
          >
            <UploadIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            <div className='text-left'>
              <div>Upload Sheet</div>
              <div className="text-xs text-gray-500">Upload XLSX file that contains a new project information</div>
            </div>
          </button>
        }

        <input
          ref={fileInputRef}
          type="file"
          className="absolute hidden"
          accept=".xlsx"
          onChange={handleUploadFile}
        />

      </div>

      <div className="hidden mt-8 sm:block">
        <div className="px-8 py-3">
          <h2 className="text-gray-500 text-xs font-medium uppercase ">Current Projects</h2>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="lg:pl-2">Project Name</span>
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Start Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  End Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Stage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {projects.map((project, key) => (
                <tr key={key}>
                  <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={'bg-pink-600 flex-shrink-0 w-2.5 h-2.5 rounded-full'}
                        aria-hidden="true"
                      />
                      <Link to={`/${userId}/${project.id}`} className="truncate hover:text-gray-600">
                        <span>
                          {project.projectInformation[1].value}
                        </span>
                      </Link>
                    </div>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.projectInformation[3].value}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.projectInformation[4].value}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.projectInformation[5].value}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {project.projectInformation[6].value}
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
