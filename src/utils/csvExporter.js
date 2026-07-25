/** Converts an array of lead objects into a downloadable CSV file */
export const exportLeadsToCSV = (leads = []) => {
  if (!leads.length) return;

  const headers = ['ID', 'Name', 'Email', 'Budget', 'Status', 'Message', 'Created At'];
  const rows = leads.map((lead) => [
    lead._id,
    `"${(lead.name || '').replace(/"/g, '""')}"`,
    `"${(lead.email || '').replace(/"/g, '""')}"`,
    `"${(lead.budget || '').replace(/"/g, '""')}"`,
    lead.status,
    `"${(lead.message || '').replace(/"/g, '""')}"`,
    new Date(lead.createdAt).toISOString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `leaddesk_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
