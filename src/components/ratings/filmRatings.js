import { useId, Fragment, useState, useEffect, useCallback } from "react";
import ratings from "./filmRatings.module.scss";
import expanded from "./../result/results-expanded.module.scss";
import form from "./../form/form.module.scss";
export const Ratings = ({ rating, expandedResult }) => {
  let starClass = `${ratings.star}`;
  let starClassFilled = `${ratings.starFilled}`;

  if (expandedResult) {
    starClass = `${expanded.star}`;
    starClassFilled = `${expanded.starFilled}`;
  } else {
    starClass = `${ratings.star}`;
    starClassFilled = `${ratings.starFilled}`;
  }

  const max_rating = 5;
  const stars = Array.from({ length: max_rating }, (_, index) => (
    <span
      key={index}
      className={`${starClass} ${index < rating ? `${starClassFilled}` : ""}`}
    >
      ★
    </span>
  ));

  return (
    <div className={`${ratings.starList}`}>
      {stars}
      <span className={ratings.textRating}>
        ({rating}/{max_rating})
      </span>
    </div>
  );
};
export const SetRating = ({ setRating, max = 5, children, ...props }) => {
  const id = useId();
  const [rating, setLocalRating] = useState(null);

  const handleRatingChange = (value) => {
    setLocalRating(value);
    setRating(value);
  };

  const handleReset = useCallback(() => {
    setLocalRating(null);
    setRating(null);
  }, [setRating]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.setRatingReset = handleReset;
    }
  }, [handleReset]);

  return (
    <>
      <label className={form.form_label}>Rating:</label>
      <fieldset id={id} {...props} className={ratings.starRatings}>
        <input
          name={id}
          value="0"
          type="radio"
          id={`${id}0`}
          checked={rating === 0}
          onChange={() => handleRatingChange(0)}
        />
        <label htmlFor={`${id}0`}>
          <span className={ratings.hideVisual}>0 Stars</span>
        </label>

        {Array.from({ length: max }).map((_, i) => (
          <Fragment key={`${id}${i}`}>
            <input
              name={id}
              value={i + 1}
              type="radio"
              id={`${id}${i + 1}`}
              checked={rating === i + 1}
              onChange={() => handleRatingChange(i + 1)}
            />
            <label htmlFor={`${id}${i + 1}`}>
              <span className={ratings.hideVisual}>
                {i + 1} Star{i === 0 ? "" : "s"}
              </span>
              <span
                aria-hidden="true"
                className={`${ratings.star} ${
                  rating !== null && i < rating ? ratings.selected : ""
                }`}
              >
                {children || "★"}
              </span>
            </label>
          </Fragment>
        ))}
      </fieldset>
    </>
  );
};
