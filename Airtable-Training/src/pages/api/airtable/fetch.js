export default async function handler(req, res) {
    const response = await fetch(`https://api.airtable.com/v0/appdEb0HqEsnCFqDB/table`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });
    // console.log(response);
    const data = await response.json();
    console.log(data.records[0].fields.Document);
    res.status(200).json(data.records);
  }
  