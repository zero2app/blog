const fs = require('node:fs');
const tmpl = require('nunjucks');

tmpl.configure({ autoescape: true });
let postDir = __dirname + '/posts';
let distDir = __dirname + '/docs';
var indexContent = '';

const getFilenames = dirame => {
    let posts = [];
    let filenames = fs.readdirSync(dirame);
    filenames.forEach(file => {
        posts.push(file);
    });

    return posts;
};

const getFileContent = path => {
    fileData = fs.readFileSync(path);

    return fileData.toString();
};

const putFileContent = (path, content) => {
    fs.writeFileSync(path, content);
};

let postsFilenames = getFilenames(postDir);
let posts = [];

for (let i = 0; i < postsFilenames.length; i++) {
    let postFilename = postsFilenames[i];
    let postFileContent = getFileContent(postDir + '/' + postFilename);
    let pageContent = tmpl.render('layout.html', { content: postFileContent });

    const regexCreated = /"(\d{4}-\d{2}-\d{2})"/;
    const postDateAsString = postFileContent.match(regexCreated)[1];

    const regexTitle = /<h1>(.*)<\/h1>/;
    const postTitle = postFileContent.match(regexTitle)[1];

    putFileContent(distDir + '/' + postFilename, pageContent);

    posts.push({ created: postDateAsString, filename: postFilename, title: postTitle });
}

posts.sort((a, b) => a.created < b.created ? 1 : -1);
for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    indexContent = indexContent + post.created + ' <a href="' + post.filename + '">' + post.title + '</a><br/>\n';
}

let indexPageContent = tmpl.render('layout.html', { content: indexContent });
putFileContent(distDir + '/index.html', indexPageContent);

console.log("Done");
