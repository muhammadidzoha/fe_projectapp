import { Link } from "react-router-dom";

const SingleBlog = ({ blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <div
      className="wow fadeInUp hover:shadow-main-two dark:hover:shadow-main-gray-dark group relative overflow-hidden rounded-sm bg-white shadow-main-one duration-300 dark:bg-main-dark"
      data-wow-delay=".1s"
    >
      <Link to="/blog-details" className="relative block aspect-[37/22] w-full">
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-main-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {tags[0]}
        </span>
        <img src={image} alt="blog" />
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            to="/blog-details"
            className="mb-4 block text-xl font-bold text-black hover:text-main-primary dark:text-white dark:hover:text-main-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-main-body-color border-opacity-10 pb-6 text-base font-medium text-main-body-color dark:border-white dark:border-opacity-10">
          {paragraph}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-main-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <img src={author.image} alt="author" className="object-cover" />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-main-dark dark:text-white">
                By {author.name}
              </h4>
              <p className="text-xs text-main-body-color">
                {author.designation}
              </p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-main-dark dark:text-white">
              Date
            </h4>
            <p className="text-xs text-main-body-color">{publishDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
