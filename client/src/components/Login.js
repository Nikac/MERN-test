import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../environment";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
`;

const StyledInput = styled.input`
  height: 20px;
`;

const StyledBtn = styled.button`
  background-color: white;
  margin-top: 10px;
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
`;

const ErrorMSg = styled.p`
  color: red;
`;

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    const res = await axios.post(`${baseUrl}/login`, {
      email: data.email,
      password: data.password
    });
    localStorage.setItem("token", JSON.stringify(res.data));
    history.push("/home");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <label>E-mail</label>
      <StyledInput
        name="email"
        ref={register({
          required: true,
          maxLength: 100,
          minLength: 6,
          pattern: emailRegex
        })}
      />
      {errors.email && errors.email.type === "required" && (
        <ErrorMSg>E-mail is required</ErrorMSg>
      )}
      {errors.email && errors.email.type === "minLength" && (
        <ErrorMSg>Should have minimum 6 charather length.</ErrorMSg>
      )}
      {errors.email && errors.email.type === "maxLength" && (
        <ErrorMSg>Should have maximum 100 charather length.</ErrorMSg>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <ErrorMSg>E-mail is invalid.</ErrorMSg>
      )}

      <label>Password</label>
      <StyledInput
        name="password"
        ref={register({ required: true, maxLength: 100, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && (
        <ErrorMSg>Password is required.</ErrorMSg>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <ErrorMSg>Should have minimum 6 charather length.</ErrorMSg>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <ErrorMSg>Should have maximum 100 charather length.</ErrorMSg>
      )}
      <StyledBtn type="submit">Login</StyledBtn>
    </StyledForm>
  );
};

export default Login;
