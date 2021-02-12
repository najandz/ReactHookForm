import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";

function App() {
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

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

          <input
            name="firstName"
            placeholder="bill"
            ref={register({ required: true })}
            className={errors.firstName ? "error" : "valid"}
          />
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
            <option value="" disabled selected>
              Select your language
            </option>
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
          <div style={{ color: "white", display: "inline-flex", gap: "1rem" }}>
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
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
