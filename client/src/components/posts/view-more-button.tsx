import { Button } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
type ViewMoreButtonProps = {
  page: number;
  refetch: (page: number) => Promise<void>;
  isFetching: boolean;
  isDisabled: boolean;
};
export default function ViewMoreButton({
  page,
  refetch,
  isFetching,
  isDisabled,
}: ViewMoreButtonProps) {
  return (
    <Button
      onClick={() => refetch(page)}
      disabled={isFetching || isDisabled}
      color={isFetching ? "gray" : "blue"}
      variant="text"
      size="lg"
      className="flex items-center gap-2 mt-24 bg-gray-200 hover:bg-gray-300 relative  hover:text-gray-900 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
    >
      <ArrowSmallDownIcon className="h-5 w-5 font-bold hover:bg-gray-300  hover:text-gray-900" />
      VIEW MORE
    </Button>
  );
}
