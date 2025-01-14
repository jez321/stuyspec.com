import React from "react";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { Byline, Dateline, Outquote } from "../";

const styles = {
  LeftColumn: {
    // adds to the 7px in Col = 14px
    paddingRight: "7px !important",
    "& > div": {
      borderBottom: "1px solid #ddd",
      marginBottom: "14px",
      paddingBottom: "14px !important",
    },
  },
  figure: {
    margin: "0 0 13px 0",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  primaryArticle: {
    borderBottom: "1px solid #ddd",
  },
  primaryTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: 1.13,
    marginBottom: "6px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "7px",
    textTransform: "uppercase",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    marginBottom: "10px",
  },
  articleTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: 1.22,
    marginBottom: "4px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  "@media (max-width: 767px)": {
    LeftColumn: {
      paddingRight: "0 !important",
    },
    figure: {
      "& img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
    primaryTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "30px",
    },
    articleTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "30px",
    },
  },
};

const LeftColumn = ({ classes, articles }) => {
  if (articles.length !== 3) {
    // TODO: Better way to handle this
    return <Col xsHidden sm={3} md={3} lg={3} className={classes.LeftColumn} />;
  }
  const [primaryArticle, secondaryArticle, outquoteArticle] = articles;
  const primarySection = primaryArticle.section;
  const secondarySection = secondaryArticle.section;
  const outquoteSection = outquoteArticle.section;
  return (
    <Col xsHidden sm={3} md={3} lg={3} className={classes.LeftColumn}>
      {/* Column xsHidden because the mobile UI would repeat too many articles */}
      <div className={classes.primaryArticle}>
        {primaryArticle.media.length > 0 && (
          <div>
            <Link to={`${primarySection.permalink}/${primaryArticle.slug}`}>
              <figure className={classes.figure}>
                <img src={primaryArticle.media[0].attachment_url} />
              </figure>
            </Link>
          </div>
        )}
        <Link
          to={`${primarySection.permalink}/${primaryArticle.slug}`}
          className={classes.primaryTitle}
        >
          {primaryArticle.title}
        </Link>
        <Link to={primarySection.permalink} className={classes.sectionLabel}>
          {primarySection.name}
        </Link>
        <p className={classes.preview}>{primaryArticle.preview}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline timestamp={primaryArticle.created_at} />
      </div>

      <div className={classes.secondaryArticle}>
        {secondaryArticle.media.length > 0 && (
          <div>
            <Link to={`${secondarySection.permalink}/${secondaryArticle.slug}`}>
              <figure className={classes.figure}>
                <img src={secondaryArticle.media[0].attachment_url} />
              </figure>
            </Link>
          </div>
        )}
        <Link to={secondarySection.permalink} className={classes.sectionLabel}>
          {secondarySection.name}
        </Link>
        <Link
          to={`${secondarySection.permalink}/${secondaryArticle.slug}`}
          className={classes.articleTitle}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.preview}>{secondaryArticle.preview}</p>
        <div className={classes.bylineContainer}>
          <Byline contributors={secondaryArticle.contributors} />
        </div>
        <Dateline timestamp={secondaryArticle.created_at} />
      </div>

      <div className={classes.outquoteArticle}>
        {outquoteArticle.media.length > 0 && (
          <div>
            <Link to={`${outquoteSection.permalink}/${outquoteArticle.slug}`}>
              <figure className={classes.figure}>
                <img src={outquoteArticle.media[0].attachment_rl} />
              </figure>
            </Link>
          </div>
        )}
        <Link to={outquoteSection.permalink} className={classes.sectionLabel}>
          {outquoteSection.name}
        </Link>
        <Link
          to={`${outquoteSection.permalink}/${outquoteArticle.slug}`}
          className={classes.articleTitle}
        >
          {outquoteArticle.title}
        </Link>
        <Outquote quote={outquoteArticle.outquotes[0].text} />
        <p className={classes.preview}>{outquoteArticle.preview}</p>
        <div className={classes.bylineContainer}>
          <Byline contributors={outquoteArticle.contributors} />
        </div>
        <Dateline timestamp={outquoteArticle.created_at} />
      </div>
    </Col>
  );
};

export default injectSheet(styles)(LeftColumn);
