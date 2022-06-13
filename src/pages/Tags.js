import { useEffect, useState } from "react"
import Alert from "../components/Alert"
import Filter from "../components/Filter"
import TagFormModal from "../components/TagFormModal"
import Table from "../components/Table"
import { addTag, deleteTag, getTags, updateTag } from "../utils/api"

const COLUMNS = [
    {name: "ID", value: "id", sortable: true},
    {name: "Nom", value: "name", sortable: true},
    {name: "Date de création",  is_date: true, value: "createdAt", sortable: true},
    {name: "Date de modification",  is_date: true, value: "updatedAt", sortable: true},
    {name: "Actions", value: "actions", sortable: false, is_action: true},
]

function Tags() {
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({pagination: {}})
    const [params, setParams] = useState([])

    const [formStatus, setFormStatus] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    const [alert, setAlert] = useState({})

    const getData = async (searchBy, query, sortBy, sort, page, pageSize) => {
        try {
            setAlert(undefined)
            setParams([searchBy, query, sortBy, sort, page])
            let result = await getTags(searchBy, query, sortBy, sort, page, pageSize)
            setTags(result.data);
            setMeta(result.meta)
        } catch (error) {
            setAlert({type: "error", message: "Cannot fetch data"})
        }
    }

    const deleteData = async (id) => {
        try {
            setAlert(undefined)
            let result = await deleteTag(id);
            console.log('----result', result);
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully deleted"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot delete item"})
        }

    }

    const addData = async (name) => {
        try {
            setAlert(undefined)
            let result = await addTag({name});
            console.log('----result', result);
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully created"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot create item"})
        }
    }

    const updateData = async (id, name) => {
        try {
            setAlert(undefined)
            let result = await updateTag(id, {name});
            console.log('----result', result);
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully updated"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot update item"})
        }
    }

    useEffect( () => {
        getData()
    }, [])

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">Tags</h2>
                </div>

                <Filter 
                    values={[{name: "ID", value: "id"}, {name: "Nom", value: "name"}]}
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
                    data={tags}
                    total={meta.pagination.total}
                    page={meta.pagination.page}
                    pageCount={meta.pagination.pageCount}
                    pageSize={meta.pagination.pageSize}
                    onChange={(page) => getData(params[0], params[1], params[2], params[3], page)}
                    onDelete={(id) => deleteData(id)}
                    onEdit={(item) => {
                        setSelectedItem(item)
                        setFormStatus(true)
                    }}
                    openForm={() => {
                        setSelectedItem(undefined)
                        setFormStatus(true)
                    }}
                    itemName="Tag"
                />

                {
                    formStatus && (
                        <TagFormModal 
                            onSubmit={(value) => {
                                console.log("----", value)
                                if (selectedItem && selectedItem.id) { // update
                                    updateData(selectedItem.id, value)
                                } else { // create
                                    addData(value)
                                }
                            }}
                            closeForm={() => setFormStatus(false)}
                            item={selectedItem}
                        />
                    )
                }

            </div>
        </div>

    )

}

export default Tags