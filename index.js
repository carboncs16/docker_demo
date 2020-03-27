/**
 * Run below commands:
 * docker build -t docker_demo .
 * docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name docker_demo docker_demo
 */
const express = require('express');
const child_process = require('child_process');
const app = express();
const Docker = require('dockerode');
const docker = Docker({socketPath: '/var/run/docker.sock'});
const port = 3000;
app.post('/:imageName', (req, res) => {
    const { imageName } = req.params;
    let container = docker.getContainer(imageName);
    container.start((err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
