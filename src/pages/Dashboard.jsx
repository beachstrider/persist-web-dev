import { createRef, useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import Layout from '../components/layout'
import { Link, useNavigate } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore"
import { auth, db } from 'config/firebase'
import moment from "moment"

export default function Default() {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('====', auth.currentUser)
    navigate(`/${auth.currentUser.uid}`)
  }, [])
  return (
    <Layout title="Dashboard">
      
    </Layout>
  )
}
