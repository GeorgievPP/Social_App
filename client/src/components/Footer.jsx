import React from "react";
import { FooterStyled, FooterTextStyled, FooterTextAStyled } from "./styled";

function Footer() {
  return (
    <FooterStyled>
      <FooterTextStyled>
        &copy; UNTITLED. ALL RIGHTS RESERVED. | PHOTOS BY
        <FooterTextAStyled>John Snow</FooterTextAStyled> | DESIGN BY
        <FooterTextAStyled>TEMPLATED</FooterTextAStyled>
      </FooterTextStyled>
    </FooterStyled>
  );
}

export default Footer;
