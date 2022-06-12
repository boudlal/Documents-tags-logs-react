import { useEffect, useState } from "react"
import Alert from "../components/Alert"
import Filter from "../components/Filter"
import FormModal from "../components/FormModal"
import Table from "../components/Table"
import { getLogs } from "../utils/api"

const COLUMNS = [
    {name: "ID", value: "id", sortable: true},
    {name: "Entity Name", value: "entityName", sortable: true},
    {name: "Action", value: "action", sortable: true},
    {name: "Date de log", value: "loggedAt", sortable: true},
]

function Logs() {
    const [logs, setLogs] = useState([])
    const [meta, setMeta] = useState({pagination: {}})
    const [params, setParams] = useState([])

    const [formStatus, setFormStatus] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    const [alert, setAlert] = useState({})

    const getData = async (searchBy, query, sortBy, sort, page, pageSize) => {
        try {
            setAlert(undefined)
            setParams([searchBy, query, sortBy, sort, page])
            let result = await getLogs(searchBy, query, sortBy, sort, page, pageSize)
            setLogs(result.data);
            setMeta(result.meta)
        } catch (error) {
            setAlert({type: "error", message: "Cannot fetch data"})
        }
    }


    useEffect( () => {
        getData()
    }, [])

    return (
        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight">Logs</h2>
                </div>

                <Filter 
                    values={[{name: "Nom de l’entité", value: "entityName"}, {name: "Action", value: "action"}]}
                    columns={COLUMNS}
                    onChange={getData}
                />

                {
                    alert && alert.type && (
                        <Alert 
                            alert={alert}
                            hideAlert={() => setAlert(undefined)}
                        />
                    )
                }


                <Table 
                    columns={COLUMNS}
                    data={logs}
                    total={meta.pagination.total}
                    page={meta.pagination.page}
                    pageCount={meta.pagination.pageCount}
                    pageSize={meta.pagination.pageSize}
                    onChange={(page) => getData(params[0], params[1], params[2], params[3], page)}
                    // onDelete={(id) => deleteData(id)}
                    onEdit={(item) => {
                        setSelectedItem(item)
                        setFormStatus(true)
                    }}
                    openForm={() => {
                        setSelectedItem(undefined)
                        setFormStatus(true)
                    }}
                    canCreate={false}
                />


            </div>
        </div>

    )

}

export default Logs