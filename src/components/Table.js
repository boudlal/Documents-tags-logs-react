
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import { useState } from 'react'




function Table({
    columns = [],
    data = [],
    total = 0,
    page = 0,
    pageCount = 0,
    pageSize = 0,
    onChange = () => {}
}) {



    return (
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        {
                            columns.map(x => (
                                <th
                                    class="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    // onClick={x.sortable ? () => handleSort(x.value) : undefined}
                                >
                                    {x.name}
                                    {/* {
                                        x.sortable && x.value == sortBy && (
                                                sort == "asc" ? <ArrowUpIcon className='w-2'/> :  <ArrowDownIcon className='w-2'/>                                            
                                        )
                                    } */}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(x => (
                            <tr>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {x.id}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{x.attributes && x.attributes.Name}</p>
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
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span class="relative">edit</span>
                                    </span>
                                </td>
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