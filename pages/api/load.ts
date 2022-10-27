import { fstat } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from 'fs';

export default async function Load(req: NextApiRequest, res: NextApiResponse) {
    const example = await import('./../../json/sampleData.json');
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/sampleData.json', 'utf-8');
  return res.status(200).json(example);
}
