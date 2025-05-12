const express = require('express');
const generatePDF = require('./generate');
const app = express();

app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const pdfBuffer = await generatePDF(req.body);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=unit-summary.pdf',
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong generating the PDF');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
