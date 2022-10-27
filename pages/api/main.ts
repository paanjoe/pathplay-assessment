import type { NextApiRequest, NextApiResponse } from "next";

export default async function fakeText(req: NextApiRequest, res: NextApiResponse) {
  const resFakeText = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
  const data = await resFakeText.json();
  return res.status(200).json(data);
}
