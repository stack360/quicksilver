let apiHost = '';
console.log('----HOST = --------'+process.env.API_HOST)
if (process.env.API_HOST != 'CURRENT') {
  apiHost = process.env.API_HOST || 'http://api.qs.prod';
}
export  const config = {
    googleMapApiKey:"AIzaSyDdhoxBbe1J_aUjbaPBOebCiH49SJSnFIk",
    apiHost: apiHost
}
