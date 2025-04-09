export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
    const { name, email} = req.body;
    const taskStatus = true;
    const response = await fetch(`https://api.airtable.com/v0/appdEb0HqEsnCFqDB/table`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          "Task Status": taskStatus,
        },
      }),
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  