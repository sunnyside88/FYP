import axios from "axios";

const apiUrl = "http://fast-shore-47363.herokuapp.com/api/products/";

export const importFile = async (data, setProgress, setShowProgress, userToken) => {
  try {
    const res = await axios({
      method: "post",
      url: apiUrl + "upload",
      data: data,
      headers: { userToken: `${userToken}` },
      onUploadProgress: function (progressEvent) {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        if (totalLength !== null) {
          setShowProgress(true);
          setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
        }
      },
    });
  } catch (err) {
    throw err;
    console.log(err);
  }
};
