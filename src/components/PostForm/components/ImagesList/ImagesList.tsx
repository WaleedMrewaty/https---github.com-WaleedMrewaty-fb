/* eslint-disable @next/next/no-img-element */
import { List, ListItem, ListItemText } from "@mui/material";
import React, { FC } from "react";
import { themeVariable } from "theme/themevariable";
import CloseIcon from "@mui/icons-material/Close";
import { IImage } from "../FbPostForm/FbPostForm";

interface IImagesListProps {
  images: IImage[];
  handleCloseImg: (id: string) => void;
}

const ImagesList: FC<IImagesListProps> = ({ images, handleCloseImg }) => {
  const handleClose = (id: string) => {
    handleCloseImg(id);
  };
  return (
    <div>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {images.length === 0 && (
          <ListItem alignItems="flex-start">No Images</ListItem>
        )}
        {images?.map((image) => (
          <>
            <ListItem
              key={image.id}
              alignItems="flex-start"
              sx={{
                backgroundColor: themeVariable.dimmedWhite,
                borderRadius: "20px",
                marginInline: "10px",
                marginY: "10px",
                width: "260px",
                padding: "14px",
              }}
            >
              <img
                alt="image"
                src={image.url}
                style={{
                  width: "100px",
                  height: "100px",
                  display: "block",
                  marginInlineEnd: "10px",
                  borderRadius: "15px",
                }}
              />
              <ListItemText
                primary={image.message ? image.message : "no caption"}
              />
              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleClose(image.id)}
              >
                <CloseIcon fontSize="small" />
              </div>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );
};

export default ImagesList;
