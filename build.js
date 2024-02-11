const fs = require('node:fs');
const path = require('node:path');
const tmpl = require('nunjucks');
const matter = require('gray-matter');
const markdownit = require('markdown-it');
const md = markdownit()

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
    let fileBasenameWithoutExt = path.basename(postDir + '/' + postFilename, '.md');

    let postMatter = matter(postFileContent);
    let postFileMdContent = md.render(postMatter.content);

    const postDate = postMatter.data.created;
    const postDateAsString = postDate.toLocaleDateString('de-de', { year: "numeric", month: "short", day: "numeric" })
    const postTitle = postMatter.data.title;

    let postContent = tmpl.render('post.html', { content: postFileMdContent, created: postDateAsString, title: postTitle });
    let pageContent = tmpl.render('layout.html', { content: postContent });

    putFileContent(distDir + '/' + fileBasenameWithoutExt + '.html', pageContent);

    posts.push({ created: postDate, createdAsString: postDateAsString, filename: fileBasenameWithoutExt + '.html', title: postTitle });
}

posts.sort((a, b) => a.created < b.created ? 1 : -1);
for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    indexContent = indexContent + post.createdAsString + ' <a href="' + post.filename + '">' + post.title + '</a><br/>\n';
}

let indexPageContent = tmpl.render('layout.html', { content: indexContent });
putFileContent(distDir + '/index.html', indexPageContent);

console.log("Done");
