import { useState } from "react";
import Conecta from "./Conecta";



const Pesq = () => {
  const [inputValue, setInputValue] = useState();
  const [classes, setClasses] = useState([])

  const getClasses = async () => {
    const lista = await Conecta.get("classes")
    setClasses(lista.data)
  }

    function handleOnChange(event) {
        let filter = []
        classes.forEach((classe) => classe.name.toLowerCase().startsWith(event.target.value) ? filter.push(classe) : null)
        setClasses(filter)
        setInputValue(event.target.value)
        if (event.target.value === '') {
        getClasses();
        }
    }

    function clean() {
        setInputValue('')
        getClasses();
    }

    return (
        <div className="container" style={{ display: "flex", padding: "10px", margin: "auto", alignItems: "center" }}>
            <input type="text" onChange={handleOnChange} style={{ borderTopLeftRadius: "15px" }} value={inputValue} placeholder="Pesquise Por Classes" className="form-control" />
            <button type="button" style={{ borderBottomRightRadius: "15px"}} onClick={clean} className="btn btn-primary ml-3">
                Limpar
            </button>

        </div>

    )
}
export default Pesq;