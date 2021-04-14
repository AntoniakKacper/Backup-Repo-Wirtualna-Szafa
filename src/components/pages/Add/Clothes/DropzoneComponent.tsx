import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Download } from "@styled-icons/boxicons-regular/Download";
import { Times } from "@styled-icons/fa-solid/Times";
import { CustomInput } from "./CustomInput";
import Badge from "@material-ui/core/Badge";

interface DropzoneComponentProps {}

const DropzoneContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DropzoneInput = styled.div<{
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 250px;
  min-width: 250px;
  cursor: pointer;
  border: 4px dashed
    ${({ isDragActive, isDragAccept, isDragReject }) =>
      isDragActive
        ? (isDragAccept && `#11f519`) || (isDragReject && `#eb4034`)
        : `#b1b1b1`};

  border-radius: 20px;
  margin-bottom: 30px;

  & > p {
    text-align: center;
    width: 200px;
    color: #b1b1b1;
    font-size: 14px;
  }
`;

const Icon = styled(Download)`
  height: 50px;
  color: #b1b1b1;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;

  background: #e0e0e0;
  box-shadow: 12px 12px 24px #d7d7d7, -12px -12px 24px #e9e9e9;
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const DeleteButton = styled(Times)`
  color: red;
  height: 20px;
  margin-top: -15px;
  margin-right: -15px;

  &&:hover {
    cursor: pointer;
  }
`;

interface Image extends File {
  preview?: string;
}

export const DropzoneComponent: React.FC<DropzoneComponentProps> = () => {
  const [image, setImage] = useState<Image>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: "image/png, image/jpg, image/jpeg",
    multiple: false,
    maxFiles: 1,
  });

  return (
    <DropzoneContainer>
      <DropzoneInput
        {...getRootProps()}
        isDragAccept={isDragAccept}
        isDragReject={isDragReject}
        isDragActive={isDragActive}
      >
        <Icon />
        <input {...getInputProps()} />

        {image !== undefined ? (
          <p>Click here or drop to change file!</p>
        ) : (
          <p>Click here or drop a file to upload!</p>
        )}
      </DropzoneInput>

      {image !== undefined && (
        <Badge
          badgeContent={<DeleteButton onClick={() => setImage(undefined)} />}
          overlap="circle"
        >
          <PreviewImage src={image.preview} alt={image.name}></PreviewImage>
        </Badge>
      )}
      <SelectContainer>
        <CustomInput name="Category" />
        <CustomInput name="Weather" />
      </SelectContainer>
    </DropzoneContainer>
  );
};
