import { useEffect, useState } from "react"
import Alert from "../components/Alert"
import Filter from "../components/Filter"
import DocumentFormModal from "../components/DocumentFormModal"
import Table from "../components/Table"
import { addDocument, deleteDocument, getDocuments, getTags, updateDocument } from "../utils/api"

const COLUMNS = [
    {name: "ID", value: "id", sortable: true},
    {name: "Nom", value: "name", sortable: true},
    {name: "Tags", value: "tags", sortable: false},
    {name: "Date de création", value: "createdAt", sortable: true, is_date: true},
    {name: "Date de modification", value: "updatedAt", sortable: true, is_date: true},
    {name: "Actions", value: "actions", sortable: false, is_action: true},
]

function Documents() {
    const [Documents, setDocuments] = useState([])
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({pagination: {}})
    const [params, setParams] = useState([])

    const [formStatus, setFormStatus] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    const [alert, setAlert] = useState({})

    // to be used in add document form
    const getTagsData = async () => {
        let result = await getTags(null, null, null, null, null, 1000)
        setTags(result.data);
    }

    const getData = async (searchBy, query, sortBy, sort, page, pageSize) => {
        try {
            setAlert(undefined)
            setParams([searchBy, query, sortBy, sort, page])
            let result = await getDocuments(searchBy, query, sortBy, sort, page, pageSize)
            // format document
            result.data = result.data.map(x => {
                if (x.attributes.tags.data) {
                    x.tags = x.attributes.tags.data.map(y => {
                        return y.attributes && y.attributes.name
                    }).join(",")
                }
                return x;
            })
            
            setDocuments(result.data);
            setMeta(result.meta)
        } catch (error) {
            console.log('-------error', error);
            setAlert({type: "error", message: "Cannot fetch data"})
        }
    }

    const deleteData = async (id) => {
        try {
            setAlert(undefined)
            let result = await deleteDocument(id);
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully deleted"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot delete item"})
        }

    }

    const addData = async (name, tags) => {
        try {
            setAlert(undefined)
            tags = tags.map(x => x.id)
            let result = await addDocument({name, tags});
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully created"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot create item"})
        }
    }

    const updateData = async (id, name, tags) => {
        try {
            setAlert(undefined)
            tags = tags.map(x => x.id)
            let result = await updateDocument(id, {name, tags});
            getData(params[0], params[1], params[2], params[3], params[4])
            setFormStatus(false)
            setAlert({type: "success", message: "Successfully updated"})
        } catch (error) {
            setAlert({type: "error", message: "Cannot update item"})
        }
    }

    useEffect( () => {
        getData()
        getTagsData()
    }, [])

    return (
        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight">Documents</h2>
                </div>

                <Filter 
                    values={[{name: "ID", value: "id"}, {name: "Nom", value: "name"}, {name: "Tags", value: "tags"}]}
                    columns={COLUMNS.filter(x => x.sortable)}
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
                    data={Documents}
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
                    itemName={"Document"}
                />

                {
                    formStatus && (
                        <DocumentFormModal 
                            onSubmit={(name, tags) => {
                                if (selectedItem && selectedItem.id) { // update
                                    updateData(selectedItem.id, name, tags)
                                } else { // create
                                    addData(name, tags)
                                }
                            }}
                            closeForm={() => setFormStatus(false)}
                            item={selectedItem}
                            tags={tags}
                        />
                    )
                }

            </div>
        </div>

    )

}

export default Documents