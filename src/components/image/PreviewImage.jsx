/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const PreviewImage = ({ formik, preview, setPreview, imageFiles }) => {
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");

  useEffect(() => {
    if (imageFiles) {
      const pickerFiles = [];

      Array.from(imageFiles).forEach((file, index) => {
        pickerFiles.push({
          key: "new",
          index: index,
          value: URL.createObjectURL(file),
        });
      });

      setPreview(pickerFiles);
    }
  }, [imageFiles, setPreview]);

  const handleDeleteClick = (item) => {
    const updatedPreview = preview.filter((_, i) => i !== item.index);
    setPreview(updatedPreview);

    if (item?.index > -1) {
      if (imageFiles && item.key === "new") {
        const fileList = Array.from(imageFiles);
        fileList.splice(item.index, 1);
        formik.setFieldValue("image", fileList);
      }
    }
  };

  return (
    <ImageList
      sx={{ width: "80%", height: "60%", overflow: "inherit" }}
      cols={3}
      rowHeight={isMobile ? 80 : isTab ? 160 : 220}
      gap={8}
    >
      {preview.map((item, index) => (
        <ImageListItem key={index}>
          <IconButton
            sx={{
              position: "absolute",
              left: "87%",
              "@media screen and (max-width: 920px)": {
                left: "77%",
              },
              "@media screen and (max-width: 480px)": {
                left: "60%",
              },
              top: "-2%",
            }}
            onClick={() => handleDeleteClick(item)}
          >
            <Tooltip title="DELETE">
              <HighlightOffOutlinedIcon
                sx={{
                  color: "#002147",
                  "&:hover": {
                    color: "red",
                    fontSize: "1.5rem",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              />
            </Tooltip>
          </IconButton>
          <img
            src={item.value}
            alt="This image is not available"
            loading="lazy"
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              borderRadius: isMobile ? "6px" : "12px",
              boxShadow: "2px 2px 4px hsl(0, 0%, 30%)",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

PreviewImage.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  preview: PropTypes.array.isRequired,
  setPreview: PropTypes.func.isRequired,
  imageFiles: PropTypes.array.isRequired,
};

export default PreviewImage;
