const xlsxValidation = (data) => {
  if(data.projectInformation.length < 1) return false
  
  if(!data.projectInformation.some(el => el.key === 'Project ID')) return false
  if(!data.projectInformation.some(el => el.key === 'Project Name')) return false
  if(!data.projectInformation.some(el => el.key === 'Client ID')) return false
  if(!data.projectInformation.some(el => el.key === 'Project Start Date')) return false
  if(!data.projectInformation.some(el => el.key === 'Project End Date')) return false
  if(!data.projectInformation.some(el => el.key === 'Status')) return false
  if(!data.projectInformation.some(el => el.key === 'Stage')) return false
  if(!data.projectInformation.some(el => el.key === 'Drug Image Link')) return false
  if(!data.projectInformation.some(el => el.key === 'Notes')) return false
  
  if(data.conditionDetails.length < 1) return false

  let flagForCond = true
  data.conditionDetails.forEach(row => {
    if(!row.cells.some(cell => cell.key === "Condition ID")) flagForCond = false
    if(!row.cells.some(cell => cell.key === "Drug Loading %")) flagForCond = false
    if(!row.cells.some(cell => cell.key === "Encapsulation %")) flagForCond = false
  })

  if(!flagForCond) return false

  return true
}

export default xlsxValidation