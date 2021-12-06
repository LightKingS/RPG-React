import React, { useContext } from 'react'

import "./ItemLista.css";
import { ClienteContext } from "./ClienteContext";

const ItemLista = (props) => {

  const cliente = useContext(ClienteContext);
  console.log(cliente)

  let likeButtons;
  if (cliente.dados.id) {
    likeButtons = (
      <>
        <span className="float-left" onClick={props.likeClick}>
          <i className="far fa-thumbs-up mr-2"></i>
          {props.likes}
        </span>

        <span className="float-right" onClick={props.dislikeClick}>
          <i className="far fa-thumbs-down mr-2"></i>
          {props.dislikes}
        </span>
      </>
    );
  }

  return (
    <div className="card col-sm-3 col-6 mt-2">
      <img
        className="card-img-top"
        src={props.picture}
        alt="Classe em Destaque"
      />

      <div className="card-body">
        <h3 className="card-title">{props.name}</h3>
        <ul className="card-body">
          <li> Strength: { props.strength } </li>
          <li> Vitality: { props.vitality } </li>
          <li> Dexterity: { props.dexterity } </li>
          <li> Inteligence: { props.inteligence } </li>
          {likeButtons}
        </ul>
        <p>
        </p>
      </div>
    </div>
  );
};

export default ItemLista;
