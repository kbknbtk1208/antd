import { FC, useEffect, useState } from "react";
import { Address } from "./regionSearch";
import { Button, Flex, Select, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

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

  const InScrollingDisplay = (
    <Flex
      gap={10}
      style={{
        position: "fixed",
        top: "0px",
        width: "100%",
        zIndex: 10,
        backgroundColor: "#ffffff",
      }}
    >
      <Space>
        <SearchOutlined />
        <Typography.Text>{selectedSearchParams.region.name}</Typography.Text>
      </Space>
      <Space>
        <SearchOutlined />
        <Typography.Text>{selectedSearchParams.itemName}</Typography.Text>
      </Space>
    </Flex>
  );

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
      setScrollY(window.scrollY);
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

  return (
    <motion.div
      animate={{
        height: isScrolling ? "45px" : "fit-content",
      }}
      transition={{ duration: 0.3 }}
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
        animate={{ width: isScrolling ? "30%" : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Select
          open={false}
          onClick={onClickRegionalSearchSelect}
          options={regionOption}
          value={selectedSearchParams.region.id}
          style={{ width: "100%" }}
        />
      </motion.div>
      <motion.div
        animate={{
          width: isScrolling ? "30%" : "100%",
          x: isScrolling ? "110%" : "0",
          y: isScrolling ? "-100%" : "0",
          paddingTop: isScrolling ? "0" : "16px",
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Select
          open={false}
          onClick={onClickItemNameSearchSelect}
          value={selectedSearchParams.itemName}
          style={{ width: "100%" }}
        />
      </motion.div>
      <motion.div
        animate={{
          width: isScrolling ? "30%" : "100%",
          x: isScrolling ? "220%" : "0",
          y: isScrolling ? "-200%" : "0",
          paddingTop: isScrolling ? "0" : "16px",
        }}
        transition={{ duration: 0.3 }}
      >
        <Select style={{ width: "100%" }} />
      </motion.div>
      <motion.div
        animate={{ opacity: isScrolling ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {!isScrolling && (
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
        )}
      </motion.div>
    </motion.div>
  );
};
