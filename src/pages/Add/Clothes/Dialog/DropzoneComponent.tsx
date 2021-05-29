import Badge from "@material-ui/core/Badge";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "database/firebase";
import {
  DropzoneContainer,
  DropzoneInput,
  Icon,
  PreviewImage,
  DeleteButton,
  StyledProgress,
} from "../styles/DropzoneComponentStyles";

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
