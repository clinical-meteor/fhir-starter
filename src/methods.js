

function generateDateQuery(chainPrefix, start_date, end_date){
  let dateQuery = '';

  if(chainPrefix){
    dateQuery = chainPrefix;
  }
  if(start_date){
    dateQuery = dateQuery + 'date=gt' + start_date
  }
  if(start_date && end_date){
    dateQuery = dateQuery + '&';
  }
  if(chainPrefix){
    dateQuery = dateQuery + chainPrefix;
  }

  if(end_date){
    dateQuery = dateQuery + 'date=lt' + end_date
  }
  if(start_date || end_date){
    dateQuery = dateQuery;
  }

  return dateQuery;
}


export default { generateDateQuery };