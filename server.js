const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS staff (email TEXT PRIMARY KEY)");
  db.run("CREATE TABLE IF NOT EXISTS votes (email TEXT PRIMARY KEY, data TEXT)");

  const emails = ['fsogunle@may-baker.com',
'RMaleeq@may-baker.com',
'MOni@may-baker.com',
'takinbiyi@may-baker.com',
'uogazie@may-baker.com',
'MAkanbi@may-baker.com',
'loguejiofor@may-baker.com',
'AOshodi@may-baker.com',
'ENdukwe@may-baker.com',
'Clinic@may-baker.com',
'PObot@may-baker.com',
'POkhademetse@may-baker.com',
'EEberechi@may-baker.com',
'SAduba@may-baker.com',
'cechenini@may-baker.com',
'OAdedayo@may-baker.com',
'Cemeziem@may-baker.com',
'OMajasan@may-baker.com',
'uugoeze@may-baker.com',
'clinicpharma@may-baker.com',
'MOgunji@may-baker.com',
'Danagbado@may-baker.com',
'Jlasisi@may-baker.com',
'Imbeledogu@may-baker.com',
'TOluwasanmi@may-baker.com',
'lmbamalu@may-baker.com',
'AAdebayo@may-baker.com',
'Knwachukwu@may-baker.com',
'koyeniyi@may-baker.com',
'Ahemen@may-baker.com',
'AOgundijo@may-baker.com',
'Sogwu@may-baker.com',
'FObideyi@may-baker.com',
'Omekwunye@may-baker.com',
'Gejike@may-baker.com',
'AOjugbele@may-baker.com',
'iolatunji@may-baker.com',
'Oikhile@may-baker.com',
'Jmonueke@may-baker.com',
'Kedafienene@may-baker.com',
'Gcollins@may-baker.com',
'Cikeotuonye@may-baker.com',
'Aoluwakemi@may-baker.com',
'Bolowookere@may-baker.com',
'Makinbo@may-baker.com',
'BYusuf@may-baker.com',
'Oolowolafe@may-baker.com',
'Kojukwu@may-baker.com',
'Easogwa@may-baker.com',
'POkonkwo@may-baker.com',
'Okasim@may-baker.com',
'AFisayo@may-baker.com',
'Iemuobonuvie@may-baker.com',
'Aisyaku@may-baker.com',
'IJimoh@may-baker.com',
'Mairueghian@may-baker.com',
'Oasomugha@may-baker.com',
'Konyemaechi@may-baker.com',
'Asalami@may-baker.com',
'MEyuro@may-baker.com',
'Joyedara@may-baker.com',
'Iugwueze@may-baker.com',
'jadeoye@may-baker.com',
'camuta@may-baker.com',
'lohioma@may-baker.com',
'pjethro@may-baker.com',
'cnwosu@may-baker.com',
'cokoye@biovaccinesnig.com',
'rbada@may-baker.com',
'onwoye@may-baker.com',
'pugwuoke@may-baker.com',
'jojiebun@may-baker.com',
'okareem@may-baker.com',
'uagukwu@may-baker.com',
'donipe@may-baker.com',
'DIfeduba@may-baker.com',
'iudoaka@may-baker.com',
'bmgbor@may-baker.com',
'jokafor@may-baker.com',
'bchire@may-baker.com',
'Gonosigho@may-baker.com',
'santhony@may-baker.com',
'cnwachukwu@may-baker.com',
'nedeh@may-baker.com',
'bsimeon@may-baker.com',
'Wajadi@may-baker.com',
'cnjoku@may-baker.com',
'aagbeyisanmi@may-baker.com',
'Vokoye@may-baker.com',
'Juba@may-baker.com',
'uenoch@may-baker.com',
'raliyu@may-baker.com',
'ookuru@may-baker.com',
'radeduro@may-baker.com',
'Oadeosun@may-baker.com',
'zabdulganiy@may-baker.com',
'pokpala@may-baker.com',
'oomolewu@may-baker.com',
'Vjacob@may-baker.com',
'tibileke@may-baker.com',
'Silori@may-baker.com',
'Dnyams@may-baker.com',
'AAsuquo@may-baker.com',
'Dekong@may-baker.com',
'Iduonebiyah@may-baker.com',
'mabu@may-baker.com',
'AOdeniyi@may-baker.com',
'Mwonte@may-baker.com',
'Bakra@may-baker.com',
'Wbilma@may-baker.com',
'UMaurice@may-baker.com',
'AOlowoyeye@may-baker.com',
'Pakoma@may-baker.com',
'Eomonluimhen@may-baker.com',
'IOpeyemi@may-baker.com',
'umohammed@may-baker.com',
'skadiri@may-baker.com',
'eetim@may-baker.com',
'colaniyan@may-baker.com',
'pagbolabori@may-baker.com',
'nadibe@may-baker.com',
'gnze@may-baker.com',
'Tnnaemeka@may-baker.com',
'Tayodele@may-baker.com',
'Cmokelifi@may-baker.com',
'pharmacovigilance@may-baker.com',
'dahiogbe@may-baker.com',
'hajiga@may-baker.com',
'iakpanim@may-baker.com',
'TFagbamigbe@may-baker.com',
'Eiheanacho@may-baker.com',
'mraheem@may-baker.com',
'omakinde@may-baker.com',
'Boluwatola@may-baker.com',
'IIbecheozor@may-baker.com',
'iolanrewaju@may-baker.com',
'coshie@may-baker.com',
'dokwechime@may-baker.com',
'jaina@may-baker.com',
'TAdemola@may-baker.com',
'sgokum@may-baker.com',
'Qakinbote@may-baker.com',
'SOluwaseye@may-baker.com',
'ofasan@may-baker.com',
'wlawal@may-baker.com',
'nndu-ewulonu@may-baker.com',
'oasole@may-baker.com',
'Dudeze@may-baker.com',
'jeneh@may-baker.com',
'Idavid@may-baker.com',
'leona4real17@gmail.com',
'paulineoliveonoh@gmail.com',
'mizzmaryc@gmail.com',
'coklarry@gmail.com',
'oyeheloho@gmail.com',
'franlawebele97@gmail.com',
'udeokoyejoan1993@gmail.com',
'akinola.mariam@yahoo.com',
'graceoselayo@gmail.com',
'dolapoolatunbosun5@gmail.com',
'shina.mutiu@gmail.com',
'nicholas.essiet@gmail.com',
'kerkebebako@gmail.com',
'ekuresandra2@gmail.com',
'shamsmau1@gmail.com',
'gbengalives4life@gmail.com',
'smartehilen@gmail.com',
'ulogold3@yahoo.com',
'nonyeudeh@gmail.com',
'ufuokens@gmail.com',
'gabrieloghene45@gmail.com',
'dikibo2kevo@gmail.com',
'chidimmaduabuchi@gmail.com',
'atabehoke@gmail.com',
'veraochonogor@gmail.com',
'onwuachuan15226@gmail.com',
'austinoglamour4u@gmail.com',
'Larababalola07@gmail.com',
'Kemibalogun2018@gmail.com',
'Imohdavid1900@gmail.com',
'Gloriaemmanuel63@gmail.com',
'kehindelawal927@gmail.com',
'owolumisturadamilola@gmail.com',
'wuraolaakinpelu460@gmail.com',
'samogbonna2@gmail.com',
'chiomaonowoh21@gmail.com',
'fatemap1994@gmail.com',
'ajuluchukwuchibuzor@gmail.com',
'idajilimed@gmail.com',
'dakwaiemma84@gmail.com',
'haladualiyu445@gmail.com',
'chinelogoodness1@gmail.com',
'jokeoladipupoforeal@gmail.com',
'elorabaekenechukwu@gmail.com',
'simplysylviaatseye@gmail.com',
'omoseketayo@gmail.com',
'ayanfeoluwa.am56@gmail.com',

];
  const stmt = db.prepare('INSERT OR IGNORE INTO staff(email) VALUES (?)');
  emails.forEach(email => stmt.run(email));
  stmt.finalize();
});

app.post('/api/vote', (req, res) => {
  const { email, votes } = req.body;
  if (!email || !votes) return res.status(400).json({ success: false, message: 'Email and votes are required.' });

  db.get('SELECT * FROM staff WHERE email = ?', [email], (err, staffRow) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error.' });
    if (!staffRow) return res.status(401).json({ success: false, message: 'Unauthorized email.' });

    db.get('SELECT * FROM votes WHERE email = ?', [email], (err, voteRow) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error.' });
      if (voteRow) return res.json({ success: false, message: 'You have already voted.' });

      db.run('INSERT INTO votes(email, data) VALUES (?, ?)', [email, JSON.stringify(votes)], err => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to save vote.' });
        return res.json({ success: true, message: 'Vote submitted successfully!' });
      });
    });
  });
});

app.get('/admin/delete-votes', async (req, res) => {
  const { secret } = req.body;

  // ✅ Replace this with your own strong secret
  // if (secret !== 'admin123') {
  //   return res.status(401).send({ message: 'Unauthorized: Invalid secret key' });
  // }

  try {
    await db.run('DELETE FROM votes');
    res.send({ message: 'All votes deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete votes' });
  }
});


app.get('/admin/votes', (req, res) => {
  db.all('SELECT email, data FROM votes', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch votes.' });
    
    const result = rows.map(row => ({
      email: row.email,
      votes: JSON.parse(row.data)
    }));

    res.json(result); // You can render this on a frontend page if needed
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/results', (req, res) => {
  db.all('SELECT data FROM votes', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch results.' });

    const results = {};
    rows.forEach(({ data }) => {
      const vote = JSON.parse(data);
      for (const [position, candidate] of Object.entries(vote)) {
        if (!results[position]) results[position] = {};
        results[position][candidate] = (results[position][candidate] || 0) + 1;
      }
    });

    res.json(results);
  });
});

// Download votes as CSV
app.get('/download-results', (req, res) => {
  db.all('SELECT * FROM votes', [], (err, rows) => {
    if (err) return res.status(500).send('Error fetching data');

    if (!rows.length) return res.status(404).send('No votes found');

    const csv = [
      Object.keys(rows[0]).join(','), // headers
      ...rows.map(row => Object.values(row).join(','))
    ].join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('voting_results.csv');
    res.send(csv);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});