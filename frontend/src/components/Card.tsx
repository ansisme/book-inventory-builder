const Card = ({ book }: any) => {
  return (
    <div
      className=" relative flex flex-col min-h-[180px] w-80 
      overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
    >
      <div className="flex flex-col gap-2 min-h-[120px] p-5 md:gap-3">
        <p className="font-bold text-lg text-black line-clamp-2">
          {book.title}
        </p>
        <p className="text-grey-600">
          <span className="font-semibold">Author:</span> {book.author || ""}
        </p>
        <p className="text-grey-600">
          <span className="font-semibold">Grade Level:</span>{" "}
          {book.gradeLevel || ""}
        </p>
        <div className="text-grey-600">
          <span className="font-semibold">Subject:</span>{" "}
          {book.subject ? (
            <p className="mt-1 inline whitespace-pre-wrap break-words">
              {book.subject}
            </p>
          ) : (
            ""
          )}
        </div>
        <p className="text-grey-600">
          <span className="font-semibold">Series:</span> {book.series || ""}
        </p>
      </div>
    </div>
  )
}

export default Card
