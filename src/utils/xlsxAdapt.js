import moment from "moment"

const xlsxAdapt = (data) => {
  console.log('input===', data)

  data.projectInformation = data.projectInformation.filter(el => typeof el[0] !== 'undefined')
  data.projectInformation.forEach(el => {
    if(typeof el[0] === 'undefined') el[1] = ''
    if(typeof el[1] === 'undefined') el[1] = ''
    if(el[1] instanceof Date) el[1] = moment(el.Value).format('MM/DD/YYYY')
  })
  
  data.conditionDetails.forEach(ele1 => {
    ele1.forEach(ele2 => {
      if(typeof ele2 === 'undefined') ele2 = ''
      if(ele2 instanceof Date) ele2 = moment(ele2).format('MM/DD/YYYY')
    })    
  })

  let result = { uid: data.uid, projectInformation: [], conditionDetails: [] }

  result.projectInformation = data.projectInformation.map((el) => ({ key: el[0], value: el[1] }))

  for(let i = 1; i < data.conditionDetails.length; i++){
    const cells = data.conditionDetails[i].slice(0, data.conditionDetails[0].length)
    const row = {
      index: i - 1,
      cells: cells.map((el, key) => ({
        key: data.conditionDetails[0][key],
        value: el
      }))
    }
    result.conditionDetails.push(row)
  }
  

  return result
}

export default xlsxAdapt