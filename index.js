const fs = require('fs');
const { Transform } = require('stream');
const text = 'Want to integrate random text generation into your own projects? 11122 No problem.\n';

const createReadStream = (path, encoding) => fs.createReadStream(path, { encoding });
const createWriteStream = (path, chunk, encoding) => fs.createWriteStream(path, { encoding, flags: 'a' }).end(chunk);
const getNewData = (chunk) => {
    return {
        chunk: `${chunk.toString().match(/\d+/g).join('')}`,
        date: `${new Date()}`,
        name: 'Anton Loginov'
    };
};

const createFile = () => {
    for(let i = 0; i < 1000; i++) {
        fs.appendFile('newFile.txt', text, error => {
            if (error) {
                return error;
            }
        });
    }
};

const transformTextToUpperCase = () => {
    return new Transform({
        encoding: 'utf8',
        transform(chunk, encoding, callback) {
            const data = chunk.toString().toUpperCase();
            callback(null, data)
        }
    });
};

const removeNumbers = () => {
    const createNewWriteStream = fs.createWriteStream('./deleteNumbers.txt', {encoding: 'utf8', flags: 'a' });
    
    return new Transform({
        encoding: 'utf8',
        transform(chunk, encoding, callback) {
            createNewWriteStream.write(
                JSON.stringify(getNewData(chunk))
            )
            const data = chunk.toString().replace(/\d/g, '');
            console.log(data);
            callback(null, data)
        }
    });
};

const transformTextToCapitalize = () => {
    return new Transform({
        encoding: 'utf8',
        transform(chunk, encoding, callback) {
            const data = chunk.toString().split(/\.[ \n]+/g).map(word => `${word.charAt(0).toUpperCase()} ${word.slice(1)}`).join('. ')
            callback(null, data)
        }
    });
};

createFile();
createReadStream('./newFile.txt', 'utf8');
createWriteStream('./newFile.txt', 'test string \n', 'utf8');
fs.createReadStream('./newFile.txt').pipe(removeNumbers()).pipe(transformTextToCapitalize()).pipe(transformTextToUpperCase());