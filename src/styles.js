import styled from "styled-components";

export const Dropzone = styled.label`
  display: flex;
  align-items: center;
  height: 180px;
  max-height: 180px;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  color: #707070;
  border: 1px dashed #bdbdbd;
  font-size: 14px;
  padding: 1rem;
  cursor: pointer;
  p {
    margin: 0;
  }
  input {
    display: none;
  }
`;

export const Input = styled.input`
  width: 80%;
  height: 40px;
  border: 1px solid #bdbdbd;
  padding: 0 20px;
  margin: 15px 0;
`;

export const ErrorMessage = styled.span`
  display: block;
  color: red;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  background: white !important;
  border: 0;
  padding: 10px !important;
`;

export const SelectedFileContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  background: gray;
  width: 100%;
`;

export const SelectedFile = styled.span`
  font-size: 1rem;
  background: gray;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;
