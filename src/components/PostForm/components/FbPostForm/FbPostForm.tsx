/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormTextField from "@components/FormTextField/FormTextField";
import { Autocomplete, Box, TextField } from "@mui/material";
import LoadingButton from "@components/LoadingButton/LoadingButton";
import { IMediaFbid, IPage } from "@interfaces/facebook";
import { showError, showSuccess } from "@libs/react.toastify";
import facebookApi from "@api/facebook";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import ImageForm from "../ImageForm/ImageForm";
import ImagesList from "../ImagesList/ImagesList";

type TFbFormInputs = {
  message: string;
  page: IPage;
  link: string;
};

export interface IImage {
  id: string;
  url: string;
  message: string;
}
export interface IImageID {
  id: string;
  deleteId: string;
}
const initialState: TFbFormInputs = {
  message: "",
  page: { id: "", name: "", access_token: "" },
  link: "",
};

const fbFormSchema = Yup.object({
  message: Yup.string(),
  page: Yup.object({
    id: Yup.string().required(),
    name: Yup.string().required(),
    access_token: Yup.string().required(),
  }).required(),
  link: Yup.string().url(),
});

interface IFbPostFormProps {
  currentPage: IPage | null;
  setCurrentPage: (newValue: IPage | null) => void;
  pages: IPage[];
}

const FbPostForm: FC<IFbPostFormProps> = ({
  currentPage,
  setCurrentPage,
  pages,
}) => {
  const [images, setImages] = useState<IImage[]>([]);
  const [imagesId, setImagesId] = useState<IImageID[]>([]);
  const [submittingAddImage, setSubmittingAddImage] = useState(false);
  const isDisabled = !currentPage;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFbFormInputs>({
    defaultValues: initialState,
    resolver: yupResolver(fbFormSchema),
  });

  const handleAddImage = async (image: IImage) => {
    if (currentPage) {
      const payload = {
        access_token: currentPage.access_token,
        message: image.message ? image.message : null,
        url: image.url,
        published: false,
      };
      try {
        const { id } = await facebookApi.getImageId(currentPage.id, payload);
        const imageId = { id: id, deleteId: image.id };
        setImagesId((p) => [...p, imageId]);
        setImages((p) => [...p, image]);
        setSubmittingAddImage(false);
        showSuccess("image has been added successfully");
      } catch (error: any) {
        setSubmittingAddImage(false);
        showError(error.message);
      }
    }
  };

  const handlePublish = async (
    pageId: string,
    payload: {
      access_token: string;
      message: string | null;
      published: boolean | null;
      attached_media: IMediaFbid[] | null;
      link: string | null;
    }
  ) => {
    try {
      await facebookApi.fbPublishContent(pageId, payload);
      showSuccess("Post has been published");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const getImagesArray = (imagesID: IImageID[]) => {
    const array: IMediaFbid[] = [];
    imagesID.forEach((imageID) => {
      const object = {
        media_fbid: imageID.id,
      };
      array.push(object);
    });
    return array;
  };

  const onSubmit: SubmitHandler<TFbFormInputs> = (data: TFbFormInputs) => {
    if (imagesId.length === 0 && !data.message && !data.link) {
      return showError("You must input one data at least");
    }
    if (data.link && imagesId.length !== 0) {
      return showError("you can`t publish images with link");
    }
    const payload = {
      access_token: data.page.access_token,
      message: data.message ? data.message : null,
      attached_media: imagesId.length !== 0 ? getImagesArray(imagesId) : null,
      link: data.link ? data.link : null,
      published: true,
    };

    return handlePublish(data.page.id, payload);
  };

  const handleDeleteImage = (wantedToDeleteId: string) => {
    setImagesId((p) =>
      p.filter((image) => image.deleteId !== wantedToDeleteId)
    );
    setImages((p) => p.filter((image) => image.id !== wantedToDeleteId));
    showSuccess("Delete image Done");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: "24px" }}>
        <FacebookLogin />
        <Box display="flex" my={2} justifyContent="space-between">
          <Box width="33.3%">
            {" "}
            <FormTextField
              name="message"
              size="small"
              label="Post"
              multiline
              control={control}
              disabled={isDisabled}
            />
          </Box>

          <FormTextField
            name="link"
            disabled={isDisabled}
            label="link"
            control={control}
            sx={{ width: "100%" }}
          />
          <Box width="33.3%">
            <Controller
              name="page"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id || true
                  }
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                    setCurrentPage(newValue);
                  }}
                  value={field.value as IPage}
                  options={pages}
                  disabled={!pages}
                  sx={{ mb: 3 }}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pages"
                      error={!!fieldState.error?.message}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
            <LoadingButton
              text="Publish on facebook"
              isSubmating={isSubmitting}
              disabled={isDisabled}
              sx={{ py: 1, width: "100%" }}
            />
          </Box>
        </Box>
      </form>
      <Box display="flex">
        <Box width="25%">
          <ImageForm
            handleAddImage={handleAddImage}
            isDisabled={isDisabled}
            submittingAddImage={submittingAddImage}
            setSubmittingAddImage={setSubmittingAddImage}
          />
        </Box>
        <Box width="75%">
          <ImagesList images={images} handleCloseImg={handleDeleteImage} />
        </Box>
      </Box>
    </div>
  );
};

export default FbPostForm;
