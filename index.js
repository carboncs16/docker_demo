/**
 * Run below commands:
 * docker build -t docker_demo .
 * docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name docker_demo docker_demo
 */
const express = require('express');
const child_process = require('child_process');
const app = express();
const port = 3000;
app.post('/:imageName', (req, res) => {
    const { imageName } = req.params;
    child_process.exec(`curl -XPOST --unix-socket /var/run/docker.sock http://localhost/containers/${imageName}/start`,
    (_, stdout) => res.send(stdout));
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
