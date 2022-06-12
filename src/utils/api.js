import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:1337/api",
});

export const getTags = async (searchBy, query, sortBy = "id", sort = "asc", page = 1, pageSize = 5) => {    
    try {
        // console.log('---searchBy', query, searchBy, sort, sortBy, page, pageSize);
        let params = {}
        if (searchBy && query) {
            params = {
                [`filters[${[searchBy]}][$containsi]`]: query
            }
        }

        if (sort && sortBy) {
            params = {
                ...params,
                "sort[0]": `${sortBy}:${sort}`
            }
        }

        if (page && pageSize) {
            params = {
                ...params,
                "pagination[page]": page,
                "pagination[pageSize]": pageSize
            }
        }
        
        let response = await api.get("/tags", {
            params
        });

        console.log('----response', response);
        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const deleteTag = async (id) => {    
    try {
        let response = await api.delete("/tags/"+id);

        console.log('----response', response);
        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const addTag = async (data) => {    
    try {
        let response = await api.post("/tags", {data});

        console.log('----response', response);
        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const updateTag = async (id, data) => {    
    try {
        let response = await api.put("/tags/"+id, {data});

        console.log('----response', response);
        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}



export const getLogs = async (searchBy, query, sortBy = "id", sort = "asc", page = 1, pageSize = 5) => {    
    try {
        // console.log('---searchBy', query, searchBy, sort, sortBy, page, pageSize);
        let params = {}
        if (searchBy && query) {
            params = {
                [`filters[${[searchBy]}][$containsi]`]: query
            }
        }

        if (sort && sortBy) {
            params = {
                ...params,
                "sort[0]": `${sortBy}:${sort}`
            }
        }

        if (page && pageSize) {
            params = {
                ...params,
                "pagination[page]": page,
                "pagination[pageSize]": pageSize
            }
        }
        
        let response = await api.get("/logs", {
            params
        });

        console.log('----response', response);
        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

