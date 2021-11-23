import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background: ${(props) => props.theme.bgc};
  color: ${(props) => props.theme.text};
`;

export default function StyledDiv({ children }) {
  return <Div>{children}</Div>;
}
