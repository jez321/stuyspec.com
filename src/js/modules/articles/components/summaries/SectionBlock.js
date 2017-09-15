import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../../media/selectors";
import { getArticlesWithContributors } from "../../selectors";
import Dateline from "../Dateline";
import Byline from "../Byline";

const styles = {
  SectionBlock: {
    marginBottom: "24px",
  },
  article: {
    borderBottom: "solid 1px #ddd",
    paddingBottom: "12px",
    marginBottom: "10px",
  },
  bigTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.22",
    marginBottom: "7px",
  },
  smallTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.25",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
    "&:hover":{color: "#000",textDecoration: "none"},
    "&:focus":{color: "#000",textDecoration: "none"}
  },
  figure: {
    float: "right",
    margin: "0",
    width: "62px",
    "& img": {
      width: "100%",
    },
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.29",
    marginBottom: "13px",
  },
  Byline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: "3px",
    "& p": {
      margin: "0",
      display: "inline",
      "& a": {
        color: "#888",
        "&:hover": {
          color: "#888",
        },
      },
    },
  },
  Dateline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    margin: 0,
    "& p": {
      color: "#000",
      margin: 0,
      display: "inline",
    },
  },
};

const SectionBlock = ({ classes, articles, section, media }) => {
  const articleArray = Object.values(
    Object.filter(articles, article => article.sectionId === section.id)
  );
  const bigArticle = articleArray[0];
  const nextThreeArticles = articleArray.slice(1, 4);
  return (
    <div className={classes.SectionBlock}>
      <Link to={section.permalink} className={classes.sectionLabel}>{section.name}</Link>
      <div className={classes.article}>
        <Link
          to={`${section.permalink}/${bigArticle.slug}`}
          className={classes.bigTitle}
        >
          {bigArticle.title}
        </Link>
        <p className={classes.preview}>
          Motivational speaker and personal Trainer Carlos Bernal visited
          Stuyvesant on May 26, 2017, at the request of Stuyvesant Amnesty
          International.
        </p>
        <Byline classes={classes} contributors={bigArticle.contributors} />
        <Dateline classes={classes} article={bigArticle} />
      </div>
      {nextThreeArticles.map(article => {
        const featuredMedia = Object.values(media).find(mediaObject => {
          return mediaObject.isFeatured && mediaObject.articleId === article.id;
        });
        return (
          <div className={classes.article} key={article.id}>
            {featuredMedia && (
              <figure className={classes.figure}>
                <img src={featuredMedia.url} />
              </figure>
            )}
            <Link
              to={`${section.permalink}/${article.slug}`}
              className={classes.smallTitle}
            >
              {article.title}
            </Link>
            <Byline classes={classes} contributors={article.contributors} />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state),
  articles: getArticlesWithContributors(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionBlock));
