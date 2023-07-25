import { NextApiRequest, NextApiResponse } from 'next';

const handleCors = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    // Pre-flight request. Reply successfully:
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, Accept',
    );
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 204;
    res.end();
    return true;
  }

  // If it's not an OPTIONS request, return false.
  return false;
};

export default handleCors;

// Add this line to fix the issue
export {};
