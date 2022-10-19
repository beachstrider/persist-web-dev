import moment from "moment"

const xlsxAdapt = (data) => {
  data.projectInformation.forEach(el => {
    if(el.Key === "Project Start Date") {
      if(el.Value === undefined) el.Value = ''
    }

    if(el.Key === "Project End Date") {
      if(el.Value === undefined) el.Value = ''
    }

    if(el.Value instanceof Date) el.Value = moment(el.Value).format('MM/DD/YYYY')
  })

  data.conditionDetails.forEach(ele1 => {
    Object.keys(ele1).forEach(ele2 => {
      if(ele1[ele2] instanceof Date) ele1[ele2] = moment(ele1[ele2]).format('MM/DD/YYYY')
    })
  })
  

  return data
}

export default xlsxAdapt