export async function generateReport(templateId: string, userData: any) {
  const response = await fetch('/api/reports/generateReport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ templateId, userData }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate report');
  }

  return response.json();
}