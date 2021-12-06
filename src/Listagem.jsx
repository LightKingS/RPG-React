import React, { useState, useEffect, useContext } from "react";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [inputValue, setInputValue] = useState();
  const [classes, setClasses] = useState([]);
  const cliente = useContext(ClienteContext);

  const getClasses = async () => {
    const lista = await Conecta.get("classes");

    console.log(lista.data);

    setClasses(lista.data);
  };

  // define o método que será executado após renderizar o componente

  useEffect(() => {
    getClasses();
  }, []);

  function handleOnChange(event) {
    console.log("entrou no handle");
    let filter = [];
    classes.forEach((classe) =>
      classe.name.toLowerCase().startsWith(event.target.value)
        ? filter.push(classe)
        : null
    );
    setClasses(filter);
    setInputValue(event.target.value);
    if (event.target.value === "") {
      getClasses();
    }
  }

  function clean() {
    setInputValue("");
    getClasses();
  }

  const clienteLike = async (id) => {
    let voto = {
      gostou: 1,
      classeId: id,
      userId: cliente.dados.id,
    };

    const config = {
      headers: { Authorization: `Bearer ${cliente.dados.token}` },
    };

    const resposta = await Conecta.post("likes", voto, config);

    if (resposta.data.error == true) {
      alert("Você já avaliou este item");
    } else {
      await getClasses();
      alert("Ok! Obrigado pela sua participação");
    }
  };

  const clienteDislike = async (id) => {
    let voto = {
      userId: cliente.dados.id,
      classeId: id,
      gostou: 0,
    };

    const config = {
      headers: { Authorization: `Bearer ${cliente.dados.token}` },
    };

    const resposta = await Conecta.post("likes", voto, config);

    console.log(`resposta`, resposta);
    console.log(`resposta.data.error`, resposta.data.error);
    if (resposta.data.error == true) {
      console.log("entrou");
      alert("Você já avaliou este item");
    } else {
      await getClasses();
      alert("Ok! Obrigado pela sua participação");
    }
  };

  return (
    <div className="container">
      <div
        className="container"
        style={{
          display: "flex",
          padding: "10px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          onChange={handleOnChange}
          style={{ borderTopLeftRadius: "15px" }}
          value={inputValue}
          placeholder="Pesquise Por Classes"
          className="form-control"
        />
        <button
          type="button"
          style={{ borderBottomRightRadius: "15px" }}
          onClick={clean}
          className="btn btn-primary ml-3"
        >
          Limpar
        </button>
      </div>
      <div className="row">
        {classes.map((classe, index) => (
          <ItemLista
            picture={classe.picture}
            name={classe.name}
            strength={classe.strength}
            dexterity={classe.dexterity}
            vitality={classe.vitality}
            inteligence={classe.inteligence}
            likes={classe.likes}
            dislikes={classe.dislikes}
            likeClick={() => clienteLike(classe.id)}
            dislikeClick={() => clienteDislike(classe.id)}
            key={classe.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Listagem;
