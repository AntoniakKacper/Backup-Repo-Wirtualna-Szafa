import Badge from "@material-ui/core/Badge";
import { Download } from "@styled-icons/boxicons-regular/Download";
import { Times } from "@styled-icons/fa-solid/Times";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { storage } from "../../../../../database/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  padding: 30px;
  width: 100%;

  cursor: pointer;
  border: 4px dashed
    ${({ isDragActive, isDragAccept, isDragReject }) =>
      isDragActive
        ? (isDragAccept && `#11f519`) || (isDragReject && `#eb4034`)
        : `#b1b1b1`};

  border-radius: 20px;
  margin-bottom: 20px;
  & > p {
    text-align: center;
    width: 200px;
    color: #b1b1b1;
    font-size: 14px;
  }
`;

const Icon = styled(Download)`
  height: 45px;
  color: #b1b1b1;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;

  background: #e0e0e0;
  box-shadow: 12px 12px 24px #d7d7d7, -12px -12px 24px #e9e9e9;
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

const StyledProgress = styled(CircularProgress)`
  margin-bottom: 20px;
`;

interface Image extends File {
  preview?: string;
}

interface DropzoneComponentProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  setFieldValue,
}) => {
  const [image, setImage] = useState<Image>();
  const [loading, setLoading] = useState(false);

  const getImageDownloadUrl = async (image: Image) => {
    const url = await storage
      .ref("ClothImages")
      .child(image.name)
      .getDownloadURL();
    setFieldValue("imageUrl", url);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (image !== undefined) {
      await storage.ref(`ClothImages/${image.name}`).put(image);
      getImageDownloadUrl(image);
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    });
  };

  useEffect(() => {
    image && handleUpload();
  }, [image]);

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
    disabled: loading,
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

      {image !== undefined &&
        (loading ? (
          <StyledProgress color="secondary" />
        ) : (
          <Badge
            badgeContent={<DeleteButton onClick={() => setImage(undefined)} />}
            overlap="circle"
          >
            <PreviewImage src={image.preview} alt={image.name}></PreviewImage>
          </Badge>
        ))}
    </DropzoneContainer>
  );
};
