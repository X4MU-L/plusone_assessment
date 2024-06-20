import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import { TagType } from "../../redux";
import { formatDate } from "../../utils/utils";

interface BlogPostCardProps {
  imgUrl?: string | null;
  tags: TagType[];
  title: string;
  content: string;
  author: { name: string; imgUrl?: string | null };
  date: string;
}

export function BlogPostCard({
  imgUrl,
  tags,
  title,
  content,
  author,
  date,
}: BlogPostCardProps) {
  return (
    <Card shadow={true} className="grid">
      <CardHeader>
        <img
          width={768}
          height={768}
          src={imgUrl ?? "/image/blogs/blog6.svg"}
          alt={title}
          className="h-full w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6 grid">
        <div className="flex gap-1">
          {tags.map((tag) => (
            <Typography
              variant="small"
              className="px-2 flex items-center !font-medium text-blue-600 capitalize bg-blue-100/40 h-7 rounded-md"
              as="span"
            >
              {tag.name}
            </Typography>
          ))}
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <Typography
              as="a"
              href="#"
              variant="h5"
              color="blue-gray"
              className="mb-2 normal-case transition-colors hover:text-gray-900"
            >
              {title}
            </Typography>
            <Typography className="mb-6 font-normal !text-gray-500 line-clamp-3">
              {content}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Avatar
              size="md"
              variant="circular"
              src={author.imgUrl ?? "/image/avatar3.jpg"}
              alt={author.name}
            />
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-0.5 !font-medium"
              >
                {author.name}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs !text-gray-500 font-normal"
              >
                {formatDate(date)}
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;
