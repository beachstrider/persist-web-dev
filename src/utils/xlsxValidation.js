const xlsxValidation = (data) => {
  console.log('data===', data)

  if(data.projectInformation.length < 1) return false

  if(data.projectInformation[0]["Key"] === undefined) return false
  if(data.projectInformation[0]["Value"] === undefined) return false
  
  if(!data.projectInformation.some(el => el.Key === 'Project ID')) return false
  if(!data.projectInformation.some(el => el.Key === 'Project Name')) return false
  if(!data.projectInformation.some(el => el.Key === 'Client ID')) return false
  if(!data.projectInformation.some(el => el.Key === 'Project Start Date')) return false
  if(!data.projectInformation.some(el => el.Key === 'Project End Date')) return false
  if(!data.projectInformation.some(el => el.Key === 'Status')) return false
  if(!data.projectInformation.some(el => el.Key === 'Stage')) return false
  if(!data.projectInformation.some(el => el.Key === 'Drug Image Link')) return false
  if(!data.projectInformation.some(el => el.Key === 'Notes')) return false
  
  if(data.conditionDetails.length < 1) return false
  
  if(data.conditionDetails[0]["Condition ID"] === undefined) return false
  if(data.conditionDetails[0]["Drug Loading %"] === undefined) return false
  if(data.conditionDetails[0]["Encapsulation %"] === undefined) return false

  return true
}

export default xlsxValidation