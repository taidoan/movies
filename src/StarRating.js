import { useId, Fragment, useState } from "react";
import starRating from "./styles/components/starRatings.module.scss";

const StarRating = ({ max = 5, children, ...props }) => {
  const id = useId();
  const [rating, setRating] = useState("");
  const handleRatingChange = (value) => {
    setRating(value);
  };
  console.log(rating);
  return (
    <>
      <label htmlFor={id}>Rating</label>
      <fieldset id={id} {...props} className={starRating.starRatings}>
        <input
          name={id}
          value="0"
          type="radio"
          id={`${id}0`}
          checked={rating === 0}
          onChange={() => handleRatingChange(0)}
        />
        <label htmlFor={`${id}0`}>
          <span className={starRating.hideVisual}>0 Stars</span>
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
              <span className={starRating.hideVisual}>
                {i + 1} Star{i === 0 ? "" : "s"}
              </span>
              <span aria-hidden="true" className={starRating.star}>
                {children || "★"}
              </span>
            </label>
          </Fragment>
        ))}
      </fieldset>
    </>
  );
};

export default StarRating;
