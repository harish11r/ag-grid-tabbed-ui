import React, { Component } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const FooterContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100% !important;
  height: 50px !important ;
  background: #3f51b5;
  color: #fff;
`;

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <Typography variant="title">Copy Right @123.com</Typography>
      </FooterContainer>
    );
  }
}

export default Footer;