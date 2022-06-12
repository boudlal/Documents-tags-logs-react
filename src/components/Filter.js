import { useState } from "react";


const SORT_OPTIONS = [{name: "ASC", value: "asc"}, {name: "DESC", value: "desc"}]

function Filter({
    values = [],
    columns = [],
    onChange = () => {}
}) {

    const [searchBy, setSearchBy] = useState(undefined)
    const [query, setQuery] = useState(undefined)
    const [sortBy, setSortBy] = useState("id")
    const [sort, setSort] = useState("asc")

    return (
        <div
            className=""
        >
            <div className="flex flex-wrap -mx-3 mb-8 mt-8">

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Filtrez Par
                    </label>
                <div className="relative">
                    <select 
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                        onChange={(e) => {
                            console.log('---e.target.value', e.target.value);
                            setSearchBy(e.target.value)
                        }}
                    >
                        {
                            values.map(x => (
                                <option value={x.value}>{x.name}</option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Valeur
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="..." 
                    onChange={(e) => {
                        console.log('---e.target.value', e.target.value);
                        setQuery(e.target.value)
                    }}
                    />
                </div>

            </div>


            <div className="flex flex-wrap -mx-3 mb-8">

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Sortez Par
                    </label>
                    <div className="relative">
                        <select 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                            onChange={(e) => {
                                console.log('---e.target.value', e.target.value);
                                setSortBy(e.target.value)
                            }}
                        >
                            {
                                columns.filter(x => x.sortable).map(x => (
                                    <option value={x.value}>{x.name}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Ordre
                </label>
                    <div className="relative">
                        <select 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                            onChange={(e) => {
                                console.log('---e.target.value', e.target.value);
                                setSort(e.target.value)
                            }}
                        >
                            {
                                SORT_OPTIONS.map(x => (
                                    <option value={x.value}>{x.name}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap -mx-3 mb-2">

                <div className="w-full flex items-end md:w-1/4 px-3 mb-6 md:mb-0">
                    <button 
                        className=" appearance-none appearance-none block   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onChange(searchBy, query, sortBy, sort)}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>

    )
    
}


export default Filter