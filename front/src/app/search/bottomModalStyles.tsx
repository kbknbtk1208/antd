import styled from "styled-components";

export const Container = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px;
  z-index: 100;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${(props) => (props.show ? "0" : "100%")});
  border: 1px solid #000;
  height: 95vh;
`;
