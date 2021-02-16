import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { ValidatePassword } from "./passwordStrength";

import "./styles.css";
import * as S from "./styles";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitedString, setSubmitedString] = useState("");

  const { register, errors, watch, handleSubmit, setValue } = useForm({
    mode: "onBlur",
    defaultValues: {
      password: ""
    }
  });
  const password = watch("password");
  const passwordStrength = useMemo(() => ValidatePassword(password), [
    password
  ]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept
  } = useDropzone({
    multiple: false,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (files) => {
      setValue("file", files);
    }
  });

  useEffect(() => {
    register({ name: "file" }, { required: true });
  }, [register]);

  useEffect(() => {
    setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  const onSubmit = useCallback((data) => {
    alert(JSON.stringify(data));
    setSubmitedString(JSON.stringify(data));
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <div>
          <label htmlFor="firstName">
            First Name:
            {errors.firstName && (
              <span className="spanError">First Name is required</span>
            )}
          </label>
          <div
            className={`div ${errors.firstName ? "error" : ""} ${
              !errors.firstName ? "valid" : ""
            }`}
          >
            <input
              name="firstName"
              placeholder="bill"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName">
            Last Name:
            {errors.lastName && (
              <span className="spanError">Last Name is required</span>
            )}
          </label>

          <input
            name="lastName"
            placeholder="luo"
            ref={register({ required: true })}
          />
        </div>

        <div>
          <label htmlFor="trackingOrder">
            Tracking Order:
            {/* use role="alert" to announce the error message */}
            {errors.trackingOrder && errors.trackingOrder.type === "required" && (
              <span role="alert" className="spanError">
                Tracking Order is required
              </span>
            )}
            {errors.trackingOrder && errors.trackingOrder.type === "maxLength" && (
              <span role="alert" className="spanError">
                Max length exceeded
              </span>
            )}
          </label>

          <input
            name="trackingOrder"
            placeholder="eg: 1234567"
            ref={register({ required: true, maxLength: 7 })}
          />
        </div>
        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email:
            {errors.email && errors.email.type === "required" && (
              <span role="alert" className="spanError">
                Email is required.
              </span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span role="alert" className="spanError">
                Email is not valid.
              </span>
            )}
          </label>
          <input
            name="email"
            aria-invalid={errors.email ? "true" : "false"}
            ref={register({
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
            type="email"
            placeholder="example@mail.com"
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:
            {errors.password && (
              <span role="alert" className="spanError">
                {errors.password.message}
              </span>
            )}
          </label>

          <input
            name="password"
            type="password"
            ref={register({
              required: "Password is required",
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,15}$/,
                message: "Follow the password structure."
              }
            })}
          />
          <PasswordStrengthIndicator passwordStrength={passwordStrength} />
        </div>
        <div>
          <>
            <label htmlFor="file">
              Certification or proof of employment document:
              {errors.file && (
                <span role="alert" className="spanError">
                  This is required
                </span>
              )}
            </label>
            <S.Dropzone
              isDragAccept={isDragAccept}
              {...getRootProps({ onClick: (e) => e.preventDefault() })}
            >
              <p>Drag 'n' drop file here, or click to select file</p>
              {/* <Controller
                as={<input />}
                type="file"
                name="file"
                control={control}
                {...getInputProps()}
              /> */}
              <input
                type="file"
                name="file"
                // onChange={e => changeFile(e)}
                {...getInputProps()}
              />
              <S.SelectedFileContainer>
                <S.SelectedFile onClick={() => setSelectedFile(null)}>
                  {selectedFile ? selectedFile.path : "no file attached"}
                </S.SelectedFile>
              </S.SelectedFileContainer>
              <div style={{ textAlign: " center" }}>
                <p>Valid extensions are: jpg, jpeg, tif, tiff, png, pdf.</p>
                <p>Maximum size is: 5 Mb.</p>
              </div>
            </S.Dropzone>
          </>
        </div>
        <div>
          <label htmlFor="language" className="form_label">
            Language:
            {errors.language && (
              <span className="spanError"> {errors.language.message}</span>
            )}
          </label>
          <select
            name="language"
            ref={register({
              required: "select one option"
            })}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div>
          <label htmlFor="acceptedPolicy">
            Accept Terms & Conditions:
            {errors.acceptedPolicy && (
              <span className="spanError">This is required</span>
            )}
          </label>
          <input
            name="acceptedPolicy"
            type="checkbox"
            ref={register({ required: true })}
          />
        </div>
        <div>
          <label htmlFor="User">
            Type of User:
            {errors.User && <span className="spanError">This is required</span>}
          </label>
          <div
            style={{
              color: "white",
              display: "inline-flex",
              gap: "1rem",
              alignItems: "center"
            }}
          >
            <input
              name="User"
              type="radio"
              value="Pro"
              ref={register({ required: true })}
            />{" "}
            Pro Industry
            <input
              name="User"
              type="radio"
              value="Staff"
              ref={register({ required: true })}
            />{" "}
            Staff
          </div>
        </div>
        <input type="submit" />
      </form>
      <p style={{ marginTop: "30px" }}>{submitedString}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
