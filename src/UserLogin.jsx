import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Conecta from "./Conecta";
import { useHistory } from "react-router-dom";
import { ClienteContext } from "./ClienteContext";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cliente = useContext(ClienteContext);
  let history = useHistory();

  const onSubmit = async (data) => {
    //alert(JSON.stringify(data));

    const login = await Conecta.post("auth", data);
    
    if (login.data.userId) {
      cliente.setDados({
        id: login.data.userId,
        email: login.data.email,
        token: login.data.token,
      });
      history.push("/");
    } else {
      alert("Erro: Login Inválido");
    }

    console.log(login.data);
  };

  return (
    <div className="row mt-4">
      <div className="col-md-5 col-sm-8 col-11 mx-auto">
        <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h3 mb-4 font-weight-normal">
            Faça Login para avaliar as classes
          </h1>
          <label for="inputEmail" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            required
            autofocus
            {...register("email")}
          />
          <label for="inputPassword" className="sr-only">
            Senha
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control mt-2"
            placeholder="Senha"
            required
            {...register("password")}
          />
          <button
            className="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
          >
            Sign in
          </button>
          <p className="mt-2 mb-3 text-muted">&copy; 2021-2021</p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
