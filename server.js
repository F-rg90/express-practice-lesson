const express =require('express');
const app = express();
const fs = require('fs');

app.engine('hypatia', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(err)
    }

    const rendered = content.toString()
    .replace('#title#', `<title>${options.title}</title`)
    .replace('#message#', '<h1>' + options.message + '<h1>')
    .replace('#content#','<div>' + options.content + '</div>')

  return callback(null, rendered)
  })
})
app.set('views', './views')
app.set('view engine', 'hypatia')

//root route
  app.get('/', (req, res) => {
    res.render('template', { title: 'Hey', message: 'Rick Ross!', content: 'The most underated Rapper in the game'})
})

app.get('/about-me', (req, res) => {
  res.render('template', {title: 'hey', message: 'Rick Ross!', content: 'The most udnerrated Rapper in the game'})
})

app.get('/another-one', (req, res) => {
  res.render('template', {title: 'we the best', message: 'Dj khalid', content: 'We the best!'})
})

app.get('/neet', (req, res) => {
  res.send('I am Neet and i code awesome')
})

app.get('/santos', (req, res) => {
  res.redirect('/neet')
})

app.get('*', (req, res) => {
  res.status(404).render('template', { title:'404', message: 'You played yourself', content:
""})
})


app.listen(3000, () =>
  console.log('hello i am listening on port 80'))
