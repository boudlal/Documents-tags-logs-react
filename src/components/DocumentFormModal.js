import { useEffect, useState } from "react";
import Dropdown from "./DropDown";
import Multiselect from "./MultiSelect";



function FormModal({
    item = {name: null, tags: [], id: null},
    tags = [],
    onSubmit = () => {},
    closeForm = () => {},
}) {
    
    const [name, setName] = useState(null);
    const [selectedItems, setSelected] = useState([]);


    useEffect(() => {
        if (item.attributes && item.attributes.name) {
            setName(item.attributes.name)
        }
        console.log('----item', item);
        if (item && typeof item.tags == "string") {
            let tagsArr = item.tags.split(",");
            console.log('---tagsArr', tagsArr, tags);
            let arr = []
            for (let i = 0; i < tagsArr.length; i++) {
                let index = tags.findIndex(x => x.attributes.name == tagsArr[i]);
                console.log('---index;', index);
                if (index > -1) {
                    arr.push(tags[index])
                }
            }
            console.log('-----arr', arr);
            setSelected(arr)
        }

        console.log('-----item', item);
    }, [item])

    const submit = (e) => {
        e.preventDefault()
        if (name) {
            console.log('---inside');
            onSubmit(name, selectedItems)
        }
    }

    return (
        <div
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={closeForm}
                >
                    <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                    </svg>
                </button>
                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Ajoutez un document
                    </h3>
                    <form class="space-y-6">
                        <div>
                            <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                name="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Document xyz"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                required
                            />
                        </div>

                        <div>
                            <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Tags
                            </label>
                            <Multiselect 
                                options={tags}
                                selectedItems={selectedItems}
                                selectItem={(item) => {
                                    if (selectedItems.findIndex(x => x.id == item.id) == -1) {
                                        setSelected(selectedItems.concat(item));
                                    }
                                }}
                                removeItem={(item) => {
                                    const filtered = selectedItems.filter((e) => e.id !== item.id);
                                    setSelected(filtered);
                                }}
                            />
                        </div>

                        <button
                            // type="submit"
                            class={`${name ? "opacity-100" : "opacity-50" } w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                            onSubmit={(e) => submit(e)}
                            onClick={(e) => submit(e)}
                            disabled={!name}
                        >
                            Save
                        </button>
                    </form>
                </div>
                </div>
            </div>
        </div>


    )
}



export default FormModal;