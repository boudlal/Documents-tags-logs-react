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
    }
}