import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:1337/api",
});

export const getTags = async (searchBy, query, sortBy = "id", sort = "asc", page = 1, pageSize = 50) => {    
    try {
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

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const deleteTag = async (id) => {    
    try {
        let response = await api.delete("/tags/"+id);

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const addTag = async (data) => {    
    try {
        let response = await api.post("/tags", {data});

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const updateTag = async (id, data) => {    
    try {
        let response = await api.put("/tags/"+id, {data});

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}



export const getLogs = async (searchBy, query, sortBy = "id", sort = "asc", page = 1, pageSize = 50) => {    
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

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const getDocuments = async (searchBy, query, sortBy = "id", sort = "asc", page = 1, pageSize = 50) => {    
    try {
        // console.log('---searchBy', query, searchBy, sort, sortBy, page, pageSize);
        let params = {}
        if (searchBy && query) {
            if (searchBy == "tags") {
                params = {
                    [`filters\[tags\][name][$containsi]`] : query
                }
            } else {
                params = {
                    [`filters[${[searchBy]}][$containsi]`]: query,
                }
            }

            // http://localhost:1337/api/documents?filters\[tags\][name][$containsi]=ad

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

        params = {
            ...params,
            populate: "tags"
        }
        
        let response = await api.get("/documents", {
            params
        });

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const deleteDocument = async (id) => {    
    try {
        let response = await api.delete("/documents/"+id);

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const addDocument = async (data) => {    
    try {
        let response = await api.post("/documents", {data});

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}

export const updateDocument = async (id, data) => {    
    try {
        let response = await api.put("/documents/"+id, {data});

        return response.data
    } catch (error) {
        console.log('---error', error);
        throw error
    }
}
