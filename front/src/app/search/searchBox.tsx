import { FC, useEffect, useState } from "react";
import { Address } from "./regionSearch";
import { Button, ConfigProvider, Input, Select } from "antd";
import { motion } from "framer-motion";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

type Props = {
  selectedSearchParams: {
    region: Address;
    itemName: string;
  };
  onClickRegionalSearchSelect: () => void;
  onClickItemNameSearchSelect: () => void;
};

export const SearchBox: FC<Props> = ({
  selectedSearchParams,
  onClickItemNameSearchSelect,
  onClickRegionalSearchSelect,
}) => {
  const regionOption = [
    {
      label: selectedSearchParams.region.name,
      value: selectedSearchParams.region.id,
    },
  ];

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    const handleScrollEnd = () => {
      console.log("end");
      //   setIsScrolling(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scrollend", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  const styles = {
    selectBoxWidth: isScrolling ? "30%" : "100%",
    paddingTop: isScrolling ? "0" : "16px",
    animateDuration: 0.3,
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#e5e7eb",
            hoverBorderColor: "#e5e7eb",
          },
        },
      }}
    >
      <motion.div
        animate={{
          height: isScrolling ? "45px" : "fit-content",
        }}
        transition={{ duration: styles.animateDuration }}
        style={{
          position: "fixed",
          top: "0px",
          width: "100%",
          zIndex: 10,
          backgroundColor: "#ffffff",
          gap: isScrolling ? "10px" : "16px",
          justifyContent: "center",
          padding: "5px 10px",
        }}
      >
        <motion.div
          animate={{ width: styles.selectBoxWidth }}
          transition={{ duration: styles.animateDuration }}
        >
          <Input
            prefix={<SearchOutlined />}
            suffix={<DownOutlined />}
            onFocus={(e) => e.target.blur()}
            onClick={onClickRegionalSearchSelect}
            value={selectedSearchParams.region.name}
            style={{ width: "100%" }}
          />
        </motion.div>

        <motion.div
          animate={{
            width: styles.selectBoxWidth,
            x: isScrolling ? "110%" : "0",
            y: isScrolling ? "-100%" : "0",
            paddingTop: styles.paddingTop,
          }}
          transition={{ duration: styles.animateDuration }}
        >
          <Input
            prefix={<SearchOutlined />}
            suffix={<DownOutlined />}
            onFocus={(e) => e.target.blur()}
            onClick={onClickItemNameSearchSelect}
            value={selectedSearchParams.itemName}
            style={{ width: "100%" }}
          />
        </motion.div>

        <motion.div
          animate={{
            width: styles.selectBoxWidth,
            x: isScrolling ? "220%" : "0",
            y: isScrolling ? "-200%" : "0",
            paddingTop: styles.paddingTop,
          }}
          transition={{ duration: styles.animateDuration }}
        >
          <Input
            onFocus={(e) => e.target.blur()}
            prefix={<SearchOutlined />}
            suffix={<DownOutlined />}
            style={{ width: "100%" }}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: isScrolling ? 0 : 1,
            y: isScrolling ? "-100px" : "0",
          }}
          transition={{ duration: styles.animateDuration - 0.1 }}
        >
          <Button
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: "100%",
              marginTop: "16px",
            }}
          >
            検索
          </Button>
        </motion.div>
      </motion.div>
    </ConfigProvider>
  );
};
