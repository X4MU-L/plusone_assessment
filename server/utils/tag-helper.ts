import { Tag, TagType } from "../models";

export async function createTags(tags: string[]): Promise<string[]> {
  return await Promise.all(
    tags.map(async (tagName) => {
      let tag = await Tag.findOne({ name: tagName.toLowerCase() });
      if (!tag) {
        tag = new Tag({ name: tagName.toLowerCase() });
        await tag.save();
      }
      return tag._id as string;
    })
  );
}

export async function getTags(): Promise<TagType[]> {
  return await Tag.find();
}
