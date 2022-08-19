import { Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { themeVariable } from "theme/themevariable";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HashLoader } from "react-spinners";
import FormTextField from "@components/FormTextField/FormTextField";
import { IImage } from "../FbPostForm/FbPostForm";
import { v4 as uuid } from "uuid";

type TImageInputs = {
  id: string;
  message: string;
  url: string;
};

const initialState: TImageInputs = {
  id: "",
  message: "",
  url: "",
};

const imageFormSchema = Yup.object({
  message: Yup.string(),
  url: Yup.string().url().required(),
});

interface IImageFormProps {
  isDisabled: boolean;
  handleAddImage: (image: IImage) => void;
  setSubmittingAddImage: (isSubmitting: boolean) => void;
  submittingAddImage: boolean;
}

const ImageForm: FC<IImageFormProps> = ({
  isDisabled,
  handleAddImage,
  setSubmittingAddImage,
  submittingAddImage,
}) => {
  const { control, handleSubmit } = useForm<TImageInputs>({
    defaultValues: initialState,
    resolver: yupResolver(imageFormSchema),
  });

  const onSubmit: SubmitHandler<TImageInputs> = (data: TImageInputs) => {
    setSubmittingAddImage(true);
    data.id = uuid();
    handleAddImage(data);
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" mb={3}>
          <FormTextField
            name="url"
            control={control}
            size="small"
            label="image url"
            disabled={isDisabled}
          />
          <IconButton
            disabled={isDisabled || submittingAddImage}
            sx={{ height: "40px", color: themeVariable.primary }}
            type="submit"
          >
            {submittingAddImage ? (
              <HashLoader color="#808080" size={24} />
            ) : (
              <AddIcon />
            )}
          </IconButton>
        </Box>
      </form>
    </div>
  );
};

export default ImageForm;
