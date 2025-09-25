import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { templateId, userData } = req.body;
    // In a real application, you would use templateId and userData to generate the report.
    // For now, we'll just return them.
    res.status(200).json({ message: 'Report generation initiated', templateId, userData });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}