"use client";

import { get, post } from "@/networkClient";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  GetProp,
  Upload,
  UploadProps,
  Image,
  Button,
  Carousel,
  Flex,
  ConfigProvider,
  Skeleton,
  Space,
  message,
  NotificationArgsProps,
  notification,
  Typography,
  Alert,
} from "antd";
import { ReactNode, useEffect, useState } from "react";

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

  useEffect(() => {
    getAll();
  }, []);

  const Container = (children: ReactNode) => {
    return (
      <div>
        <Flex
          justify="center"
          align="center"
          style={{
            backgroundColor: "#666666",
            padding: "30px",
          }}
        >
          {children}
        </Flex>
      </div>
    );
  };

  const [api, contextHolder] = notification.useNotification();

  type NotificationPlacement = NotificationArgsProps["placement"];
  const openNotification = (placement: NotificationPlacement) => {
    notification.open({
      message: (
        <Flex align="center" justify="center" style={{ width: "100%" }}>
          <Typography.Text style={{ color: "#ffffff" }}>
            {`Notification ${placement}`}
          </Typography.Text>
        </Flex>
      ),
      style: {
        display: "flex",
        height: "40px",
        backgroundColor: "#111111",
        justifyContent: "center",
        alignContent: "center",
        padding: "0",
      },
      placement,
      duration: null,
    });
  };

  const [showNotify, setShowNotify] = useState(false);
  const onClickToastButton = () => {
    notification.destroy();
    openNotification("bottom");
    // setShowNotify(true);
  };

  const destroy = () => {};

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
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              dotHeight: "10px",
              dotWidth: "10px",
              dotActiveWidth: "10px",
            },
          },
        }}
      >
        <Carousel arrows>
          {images.length === 0 &&
            Container(
              <Skeleton.Image
                active
                style={{ height: "300px", width: "200px" }}
              />
            )}
          {images.map((img) => {
            console.log(img);

            return Container(
              <Image
                // preview={false}
                src={img.strSrc}
                alt="a"
                height={"300px"}
              />
            );
          })}
        </Carousel>
      </ConfigProvider>
      <Space>
        <Button onClick={onClickToastButton}>クリック</Button>
        <Button onClick={destroy}>削除</Button>
      </Space>

      {showNotify && (
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="success"
          closable
          banner
          onClose={() => null}
        />
      )}
    </div>
  );
};

export default ImagePage;
