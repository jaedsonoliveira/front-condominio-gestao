const baseUrl = 'https://api.b7web.com.br/devcond/api/admin';
const request = async (method, endpoint, params, token = null) =>{// criando a requisição para a API 
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;
    switch(method){// fazendo a verificação no metodo
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl +=`?${queryString}`; // concatenando a url com a requisição via get
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);// converte valores em javascript para uma String  JSON
        break;
    }
    let headers = {'Content-Type': 'application/json'}
    if(token){ // se existir um token no parametro
        headers.Authorization = `Bearer ${token}`;
    }
    let req = await fetch(fullUrl, {method, headers, body});// fazendo a requisição da API
    let json = await req.json();// fazendo a requisição da API
    return json; // retornando o resultado
}
export default () => {
    return {
        getToken : () =>{
            return localStorage.getItem('token'); //pegando token do usuario por localStorage
        },
        validateToken:async ()=>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/validate', {}, token);
            return json;
        },

        //LOGIN
        login : async(email, password) => {
            let json = await request('post', '/auth/login', {email, password});
            return json;
        },
        logout : async() => {
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/logout', {}, token);
            localStorage.removeItem('token');
            
            return json;
        },

        //AVISOS
        getWall:async()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/walls', {}, token); 
            return json;
        },

        updateWall:async (id, data) => {
            let token = localStorage.getItem('token');
            let json = await request('put', `/wall/${id}`, data, token);
            return json;
        },

        addWall: async (data) =>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/walls', data, token);
            return json;
        }, 

        removeWall: async (id)=>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/wall/${id}`, {}, token);
            return json;
        },

        //Documentos
        getDocuments:async()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/docs', {}, token);
            return json;
        },
        addDocument: async (data) => {
            let token = localStorage.getItem('token');
            let formData = new FormData();
            formData.append('title', data.title);
            if(data.file){
                formData.append('file', data.file);
            }
            let req = await fetch(`${baseUrl}/docs`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            let json = await req.json();
            return json;
        },
        updateDocument: async(id,data)=>{
            let token = localStorage.getItem('token');
            let formData = new FormData();
            formData.append('title', data.title);
            if(data.file){
                formData.append('file', data.file);
            }
            let req = await fetch(`${baseUrl}/doc/${id}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            let json = await req.json();
            return json;
        },
        removeDocument: async(id) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/doc/${id}`, {}, token);
            return json;
        },
        //RESERVAS
        getReservations: async ()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/reservations', {}, token);
            return json;
        },
        getUnits:async ()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/units', {}, token);
            return json;
        },
        getAreas:async ()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/areas', {}, token);
            return json;
        },
        addReservation: async(data)=>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/reservations', data, token);
            return json;
        },
        updateReservation: async (id,data)=>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/reservation/${id}`, data, token);
            return json;
        },
        removeReservation: async(id)=>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/reservation/${id}`, {}, token);
            return json;
        },
        //OCORRENCIAS
        getWarnings: async()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/warnings', {}, token);
            return json;
        },
        updateWarning: async(id) =>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/warning/${id}`, {}, token);
            return json;
        },
        //ACHADOS E PERDIDOS
        getFoundAndLost: async()=>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/foundandlost', {}, token);
            return json;
        },
        updateFoundAndLost: async(id) =>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/foundandlost/${id}`, {}, token);
            return json;
        },
        //USuarios
        getUsers: async () =>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/users', {}, token);
            return json;
        },
        removeUser: async (id) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/user/${id}`, {}, token);
            return json;
        },
        addUser: async (data) =>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/users', data, token);
            return json;
        },
        updateUser: async (id, data) =>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/user/${id}`, data, token);
            return json;
        },
        //Areas comuns
        removeArea: async (id) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/area/${id}`, {}, token);
            return json;
        },
        addArea: async(data) => {
            let token = localStorage.getItem('token');
            let formData = new FormData();
            for(let i in data){
                formData.append(i, data[i]);
            }
            let req = await fetch(`${baseUrl}/areas`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            let json = await req.json();
            return json;
        },
        updateArea: async(id,data) => {
            let token = localStorage.getItem('token');
            let formData = new FormData();
            for(let i in data){
                formData.append(i, data[i]);
            }
            let req = await fetch(`${baseUrl}/area/${id}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            let json = await req.json();
            return json;
        },

        updateAreaAllowed: async(id) => {
            let token = localStorage.getItem('token');
            let json = await request('put', `/area/${id}/allowed`, {}, token);
            return json;
        },
        seachUser: async (query) =>{
            let token = localStorage.getItem('token');
            let json = await request('get', '/users/search', {q: query}, token);
            return json;
        },
        addUnit: async (data) =>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/units', data, token);
            return json;
        },
        updateUnit: async (id,data) =>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/unit/${id}`, data, token);
            return json;
        },
        removeUnit: async (id) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/unit/${id}`, {}, token);
            return json;
        },
    };
}