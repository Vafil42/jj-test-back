/* eslint-disable @typescript-eslint/no-var-requires */
import { Inject, Injectable } from '@nestjs/common';
import { ImgEntity } from './img.entity';

@Injectable()
export class Directory {
    constructor(
        @Inject('IMG_REPOSITORY')
        private imgRepository: typeof ImgEntity,
    ) {}

    fs = require('fs');

    async findAll() {
        const directory_name = 'src';

        // Function to get current filenames
        // in directory
        const filenames = this.fs.readdirSync(directory_name);
        let str = '';
        str += '\nFilenames in directory:';
        filenames.forEach((file) => {
            str += '\nFile:' + ' ' + file;
        });
        return str;
    }

    async newDirectory(oldPath, newPath, filename) {
        this.fs.rename(oldPath + filename, newPath + filename, function (err) {
            if (err) throw err;
            console.log(`${newPath + filename + ' '}/${oldPath + filename}`);
            const img = { filename: filename, directory: newPath + filename };
            return this.imgRepository.create(img);
        });
    }
    async findOne(namefile) {
        return this.imgRepository.findOne({ where: { namefile } });
    }
}
