import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { templateId } = req.query;

  // Mock data - replace with actual data fetching logic
  const mockData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 },
    { label: 'Apr', value: 200 },
    { label: 'May', value: 180 },
  ];

  res.status(200).json(mockData);
}
