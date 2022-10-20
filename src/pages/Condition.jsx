import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Link, useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "config/firebase"

export default function Default() {
  const { userId, projectId, conditionId } = useParams()
  const [condition, setCondition] = useState()

  const fetch = async () => {
    const docRef = doc(db, "projects", projectId)
    const docSnap = await getDoc(docRef)
    console.log('docSnap', docSnap.data() )
    const _condition = docSnap.data().conditionDetails.find(row => row.cells[0].value.toString() === conditionId)
    setCondition(_condition.cells)
  }
  
  useEffect(() => {
    fetch()
    return () => {
      
    };
  }, [])
  
  console.log('===condition', condition)

  return (
    <Layout title="Condition Details">
      { condition ? (
        <>
          <div className="mx-3 mt-6 border border-gray-200 overflow-hidden sm:rounded-lg">
            <div className="px-2 py-3 sm:px-6">
              <h3 className="text-md leading-6 font-medium text-gray-900">Condition Details</h3>
            </div>
            <div className="grid grid-cols-2 border-gray-200 px-4 py-5 border-t">
              <div>
                {
                  condition.map((el, key) => (
                    <div key={key} className="grid grid-cols-2 mb-3">
                      <div className="text-sm font-medium text-gray-500">{el.key}</div>
                      <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">{el.value}</div>
                    </div>

                  ))
                }
              </div>
              <div className=""></div>
            </div>
          </div>
        </>
      ) : ''}
    </Layout>
  )
}
