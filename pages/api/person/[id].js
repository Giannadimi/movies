export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
      const res = await client.query('SELECT * FROM person WHERE id=$1', [id]);
      console.log(res.rows.id)
      
    }
       
    if (req.method === 'PUT') {
      const statement = await db.prepare('UPDATE person set username=?, email=?, where id=?');
      
      const result = await statement.run(
        req.body.username, 
        req.body.email,
        req.body.password, 
        req.query.id
        );
     result.finalize();
    }

    res.status(200).json({ message })
  }
  