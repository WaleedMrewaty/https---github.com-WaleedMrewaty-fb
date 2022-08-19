import facebookApi from "@api/facebook";
import IgPostForm from "@components/PostForm/components/IgPostForm/IgPostForm";
import { IPage } from "@interfaces/facebook";
import { showError } from "@libs/react.toastify";
import { useAppSelector } from "@redux/hooks";
import FbUserInfoSelectors from "@redux/slices/FbUserInfo/FbUserInfoSelectors";
import { useCallback, useEffect, useState } from "react";
import FbPostForm from "./components/FbPostForm/FbPostForm";

const PostForm = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [currentPage, setCurrentPage] = useState<IPage | null>(null);

  const userInfo = useAppSelector(FbUserInfoSelectors.FbUserInfoSelect);

  const handleGetPages = useCallback(async () => {
    try {
      const { data } = await facebookApi.getFbPages(
        userInfo.userID,
        userInfo.accessToken
      );
      setPages(data);
    } catch (error: any) {
      showError(error.message);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.accessToken && !pages.length) {
      handleGetPages();
    }
  }, [handleGetPages, pages.length, userInfo.accessToken]);

  return (
    <>
      <FbPostForm
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      {currentPage ? (
        <IgPostForm
          accessToken={userInfo.accessToken}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
};

export default PostForm;
