import StarRating from "./StarsReview"

const ClientReview = (props) => {
    const {name, review, rating} = props
    return(
        <div >
            <div className="flex mb-4 relative justify-between mt-2">
              {name}{" "}
              <span className="">
                <StarRating rating={rating} />
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 dark:text-gray-400">
                {review && `Komentar: ${review}`}
              </p>
            </div>
          </div>
    )
}

export default ClientReview