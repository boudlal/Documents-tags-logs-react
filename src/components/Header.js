
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Header({

}) {
    const history = useHistory();
    const [refresh, setRefresh] = useState(new Date().getTime())


    const navigate = (path) => {
        history.push(path)
        setTimeout(()=> {

            setRefresh(new Date().getTime())

        }, 1000)
    }

    return (
<header>
  <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
    <div class="px-6 m-auto md:w-1/2 w-full flex flex-wrap items-center justify-between">
      <div class="navbar-collapse collapse grow items-center justify-center flex" id="navbarSupportedContentY">
        <ul class="navbar-nav mr-auto flex flex-row m-auto">

          <li class="nav-item" onClick={() => navigate("/documents")}>
            <a class={`nav-link block pr-2 font-extrabold px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Documents</a>
          </li>
          
          <li class="nav-item" onClick={() => navigate("/tags")}>
            <a class={`nav-link block pr-2 font-extrabold px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Tags</a>
          </li>
          <li class="nav-item" onClick={() => navigate("/logs")}>
            <a class={`nav-link block pr-2 font-extrabold px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Logs</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>



</header>
        
    )
}


export default Header