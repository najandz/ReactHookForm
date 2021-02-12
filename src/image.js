import React, { useCallback } from "react";
import "./styles.css";
import { useDropzone } from "react-dropzone";

export const ImageInput = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    props.input.onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png"
  });
  return (
    <div {...getRootProps()} style={{ border: "1px solid red" }}>
      <input {...getInputProps()} {...props} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {props.input.value
        ? props.input.value.map((file) => {
            return <div>{file.path}</div>;
          })
        : null}
    </div>
  );
};
