import { useEffect, useState } from "react"
import Filter from "../components/Filter"
import Table from "../components/Table"
import { getTags } from "../utils/api"

const COLUMNS = [
    {name: "ID", value: "id", sortable: true},
    {name: "Nom", value: "name", sortable: true},
    {name: "Date de création", value: "createdAt", sortable: true},
    {name: "Date de modification", value: "updatedAt", sortable: true},
    {name: "Actions", value: "actions", sortable: false},
]

function Tags() {

    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({pagination: {}})
    const [params, setParams] = useState([])

    const getData = async (searchBy, query, sortBy, sort, page, pageSize) => {
        setParams([searchBy, query, sortBy, sort])
        let result = await getTags(searchBy, query, sortBy, sort, page, pageSize)
        setTags(result.data);
        setMeta(result.meta)
    }

    useEffect( () => {
        getData()
    }, [])

    return (
        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight">Tags</h2>
                </div>

                <Filter 
                    values={[{name: "ID", value: "id"}, {name: "Nom", value: "name"}]}
                    columns={COLUMNS}
                    onChange={getData}
                />


                <Table 
                    columns={COLUMNS}
                    data={tags}
                    total={meta.pagination.total}
                    page={meta.pagination.page}
                    pageCount={meta.pagination.pageCount}
                    pageSize={meta.pagination.pageSize}
                    onChange={(page) => getData(params[0], params[1], params[2], params[3], page)}
                />
            </div>
        </div>

    )

}

export default Tags