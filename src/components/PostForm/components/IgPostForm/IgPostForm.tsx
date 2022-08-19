import facebookApi from "@api/facebook";
import { FC, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormTextField from "@components/FormTextField/FormTextField";
import { Box } from "@mui/material";
import LoadingButton from "@components/LoadingButton/LoadingButton";
import { showError, showSuccess } from "@libs/react.toastify";
import { IPage } from "@interfaces/facebook";
import ImageForm from "../ImageForm/ImageForm";
import { IImage, IImageID } from "../FbPostForm/FbPostForm";
import ImagesList from "../ImagesList/ImagesList";

type TIgFormInputs = {
  caption: string;
};

const initialState: TIgFormInputs = {
  caption: "",
};

const IgFormSchema = Yup.object({
  caption: Yup.string(),
});

interface IIgProps {
  currentPage: IPage;
  accessToken: string;
}

const IgPostForm: FC<IIgProps> = ({ currentPage, accessToken }) => {
  const [igId, setIgId] = useState("");
  const [submittingAddImage, setSubmittingAddImage] = useState(false);
  const [images, setImages] = useState<IImage[]>([]);
  const [imagesId, setImagesId] = useState<IImageID[]>([]);

  const isDisabled = !currentPage;

  // getting Ig User ID
  const handleGetIgId = useCallback(async () => {
    try {
      const { instagram_business_account } = await facebookApi.getIgId(
        currentPage.id,
        accessToken
      );
      setIgId(instagram_business_account.id);
    } catch (error: any) {
      showError(error.message);
    }
  }, [currentPage.id, accessToken]);

  useEffect(() => {
    if (currentPage.id && !igId) {
      handleGetIgId();
    }
  }, [igId, handleGetIgId, currentPage?.id]);
  // *****************
  // Form
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TIgFormInputs>({
    defaultValues: initialState,
    resolver: yupResolver(IgFormSchema),
  });
  // *****************
  // Handle Functions
  const handlePublish = async (id: string) => {
    try {
      const payload = {
        access_token: currentPage.access_token,
        creation_id: id,
      };
      await facebookApi.PublishIgMediaContainer(igId, payload);
      showSuccess("Post has been published successfully");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const handleCreateMediaContainer = async (payload: {
    access_token: string;
    media_type: string;
    children: string[];
    caption: string | null;
  }) => {
    try {
      const { id: creation_id } = await facebookApi.IgMediaContainer(
        igId,
        payload
      );
      handlePublish(creation_id);
    } catch (error: any) {
      showError(error.message);
    }
  };

  const handleCreateSingleMediaContainer = async (payload: {
    access_token: string;
    caption: string | null;
    image_url: string;
  }) => {
    try {
      const { id: creation_id } = await facebookApi.IgMedia(igId, payload);
      handlePublish(creation_id);
    } catch (error: any) {
      showError(error.message);
    }
  };

  const handleAddImage = async (image: IImage) => {
    if (currentPage) {
      const payload = {
        access_token: currentPage.access_token,
        image_url: image.url,
        is_carousel_item: true,
      };
      try {
        const { id } = await facebookApi.IgMedia(igId, payload);
        const imageId = { id: id, deleteId: image.id };
        setImagesId((p) => [...p, imageId]);
        setImages((p) => [...p, image]);
        setSubmittingAddImage(false);
        showSuccess("image has been added successfully");
      } catch (error: any) {
        showError(error.message);
        setSubmittingAddImage(false);
      }
    }
  };
  const handleDeleteImage = (wantedToDeleteId: string) => {
    setImagesId((p) =>
      p.filter((image) => image.deleteId !== wantedToDeleteId)
    );
    setImages((p) => p.filter((image) => image.id !== wantedToDeleteId));
    showSuccess("Delete image Done");
  };

  const getImagesArray = (imagesID: IImageID[]) => {
    const array: string[] = [];
    imagesID.forEach((imageID) => {
      array.push(imageID.id);
    });
    return array;
  };

  const onSubmit: SubmitHandler<TIgFormInputs> = (data: TIgFormInputs) => {
    if (imagesId.length === 0) {
      return showError("You must input one data at least");
    }
    if (imagesId.length >= 2) {
      const payload = {
        access_token: currentPage.access_token,
        media_type: "CAROUSEL",
        children: getImagesArray(imagesId),
        caption: data.caption ? data.caption : null,
      };
      return handleCreateMediaContainer(payload);
    } else {
      const payload = {
        access_token: currentPage.access_token,
        caption: data.caption ? data.caption : null,
        image_url: images[0].url,
      };
      return handleCreateSingleMediaContainer(payload);
    }
  };

  return (
    <div>
      <Box my={5} sx={{ display: "flex", gap: 2, position: "relative" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "25%" }}>
          <FormTextField
            name="caption"
            disabled={isDisabled}
            size="small"
            label="Caption"
            multiline
            control={control}
          />
          <LoadingButton
            text="Publish on Instagram"
            isSubmating={isSubmitting}
            disabled={isDisabled}
            sx={{ py: 1, my: 1, width: "100%" }}
          />
        </form>
        <Box display="flex" sx={{ width: "75%" }}>
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
      </Box>
    </div>
  );
};

export default IgPostForm;
