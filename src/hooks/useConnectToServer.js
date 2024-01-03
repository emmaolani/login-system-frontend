

export async function useConnectToServer(user, url, status, method) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.withCredentials = true
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true') 
        
       
        xhr.onload = function () {
          if (this.status === status) {
            let mess = JSON.parse(xhr.responseText)
            resolve(mess.message)
          }else {
            let mess = JSON.parse(xhr.responseText)
            reject({
              status: this.status,
              statusText: mess.message
            })
          }
        }
        if (method === 'GET'){
          xhr.send()
        }else{
          xhr.send(JSON.stringify(user))
        }
      })  
}
