import { useAppSelector, selectTags } from "../../redux";
import { useBlogPostTags } from "../../hooks";
import { TabsHeader, Tab } from "@material-tailwind/react";

export default function BlogPostTags() {
  useBlogPostTags();
  const tags = useAppSelector(selectTags);
  return (
    <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90">
      <Tab value="trends">Trends</Tab>
      {tags.map((tag) => (
        <Tab key={tag._id} value={tag.name}>
          {tag.name}
        </Tab>
      ))}
    </TabsHeader>
  );
}
