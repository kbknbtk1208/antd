"use client";

import { get, post } from "@/networkClient";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps, Image, Button } from "antd";
import { useState } from "react";

const postImage = (body: { filename: string; image: string }) => {
  post("image", body)
    .then(() => {
      console.log("done");
    })
    .catch((e) => {
      console.log(e);
    });
};

const getImages = async (): Promise<
  { id: string; image: Buffer[]; image_str: string }[]
> => {
  return get("image");
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ImagePage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [images, setImages] = useState<{ strSrc: string; id: string }[]>([]);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{ border: 0, background: "none", borderRadius: "9999" }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const submit = () => {
    postImage({ filename: "test", image: imageUrl ?? "" });
  };

  const getAll = () => {
    getImages().then((img) => {
      setImages(img.map((i) => ({ strSrc: i.image_str, id: i.id })));
    });
  };
  return (
    <div>
      <Upload name="avatar" listType="picture-circle" onChange={handleChange}>
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button onClick={submit}>送信</Button>
      <br></br>
      <p>画像一覧</p>
      <Button onClick={getAll}>取得</Button>
      {images.map((img) => {
        console.log(img);

        return <Image src={img.strSrc} key={img.id} alt="a" />;
      })}
    </div>
  );
};

export default ImagePage;
