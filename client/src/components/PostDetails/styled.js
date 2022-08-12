import { Paper, Card, styled } from "@mui/material";

export const StyledPaper = styled(Paper)({
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "1rem",
});

export const PostCardStyled = styled("div")({
  display: "flex",
  width: "100%",
});

export const ImageSectionStyled = styled("div")({
  marginLeft: "20px",
});

export const ImageMediaStyled = styled("img")({
  borderRadius: "20px",
  objectFit: "cover",
  width: "640px",
  maxHeight: "426px",
});

export const SectionDetailsStyled = styled("div")({
  borderRadius: "20px",
  margin: "10px",
  flex: 1,
});

export const RecommendedPostsStyled = styled("div")({
  display: "flex",
});

export const SingleRecommendedPostStyled = styled("div")({
  margin: "20px",
  cursor: "pointer",
});

export const LoadingPaperStyled = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
});

export const ImageStyled = styled("img")({
  width: "200px",
  height: "133px",
  borderRadius: "15px"
})

// COMMENT SECTION
export const CommentOuterDivStyled = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  height: "311px",

});

export const CommentInnerDivStyled = styled("div")({
  height: "300px",
  width: "60%",
  overflowY: "auto",
  marginRight: "30px",
});

