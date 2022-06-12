
import moment from 'moment'
import { useState } from 'react'




function Table({
    itemName = "",
    columns = [],
    data = [],
    total = 0,
    page = 0,
    pageCount = 0,
    pageSize = 0,
    canCreate = true,
    onChange = () => {},
    onDelete = () => {},
    onEdit = () => {},
    openForm = () => {}
}) {



    return (
        <div class="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        
        {
            canCreate && (
                <button 
                    className="float-right mb-5 appearance-none appearance-none block   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openForm()}
                >
                    Ajoutez un {itemName}
                </button>
            )
        }

        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        {
                            columns.map(x => (
                                <th
                                    class="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {x.name}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(x => (
                            <tr>
                                {
                                    columns.map(c => {
                                        if (c.is_action) {
                                            return (
                                                <td class="flex justify-around px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button 
                                                        className=" appearance-none appearance-none block   bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                                        onClick={() => onEdit(x)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className=" appearance-none appearance-none block   bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                        onClick={() => onDelete(x.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    
                                                </td>
                                            )

                                        } else if (c.is_date) {
                                            return (
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        { moment(x[c.value] || x.attributes[c.value]).format("YYYY-MM-DD HH:MM:SS") }
                                                    </p>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {x[c.value] || x.attributes[c.value]}
                                                    </p>
                                                </td>
                                            )
                                        }

                                    })
                                }

                                {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{x.attributes && x.attributes.name}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {x.attributes && x.attributes.createdAt}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {x.attributes && x.attributes.updatedAt}
                                    </p>
                                </td>
                                <td class="flex justify-around px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button 
                                        className=" appearance-none appearance-none block   bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => onEdit(x)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className=" appearance-none appearance-none block   bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => onDelete(x.id)}
                                    >
                                        Delete
                                    </button>
                                    
                                </td> */}
                            </tr>
                        ))
                    }


                </tbody>
            </table>
            <div
                class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span class="text-xs xs:text-sm text-gray-900">
                    Showing {total == 0 ? 0 : page * pageSize - pageSize + 1} to {page * pageSize > total ? total : page * pageSize} of {total} Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    {
                        page > 1 && (
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                onClick={() => onChange(page - 1)}            
                            >
                                Prev
                            </button>
                        )
                    }

                    {
                        page < pageCount && (
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                onClick={() => onChange(page + 1)}        
                            >
                                Next
                            </button>
                        )
                    }

                </div>
            </div>
        </div>
    </div>
    )
    
}


export default Table