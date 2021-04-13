import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Download } from "@styled-icons/boxicons-regular/Download";
import { CustomInput } from "./CustomInput";

interface DropzoneComponentProps {}

const DropzoneContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DropzoneInput = styled.div<{
  isDragActive: boolean;
  isDragReject: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 250px;
  min-width: 250px;
  cursor: pointer;
  border: 4px dashed #b1b1b1;
  border-radius: 20px;

  & > p {
    text-align: center;
    width: 200px;
    color: #b1b1b1;
    font-size: 14px;
  }
`;

const Icon = styled(Download)<{ isDragActive: boolean }>`
  height: 80px;
  color: #b1b1b1;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-top: 20px;
  background: #e0e0e0;
  box-shadow: 12px 12px 24px #d7d7d7, -12px -12px 24px #e9e9e9;
`;

interface Image extends File {
  preview?: string;
}

export const DropzoneComponent: React.FC<DropzoneComponentProps> = ({}) => {
  const [image, setImage] = useState<Image>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file) => {
      setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/png, image/gif",
    multiple: false,
    maxFiles: 1,
  });

  return (
    <DropzoneContainer>
      <DropzoneInput
        {...getRootProps()}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
      >
        <Icon isDragActive={isDragActive} />
        <input {...getInputProps()} />

        {image !== undefined ? (
          <p>Click here or drop to change file!</p>
        ) : (
          <p>Click here or drop a file to upload!</p>
        )}
      </DropzoneInput>

      {image !== undefined && (
        <PreviewImage src={image.preview} alt={image.name}></PreviewImage>
      )}
      <CustomInput />
      <CustomInput />
    </DropzoneContainer>
  );
};
