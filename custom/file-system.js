
const syncModule = require('../fs/sync');
const asyncModule = require('../fs/async');

exports.writeFileSync = syncModule.writeFileSync;
exports.readFileSync = syncModule.readFileSync;
exports.updateFileSync = syncModule.updateFileSync;
exports.clearFileSync = syncModule.clearFileSync;
exports.cleanFileSync = syncModule.cleanFileSync;
exports.copyFileSync = syncModule.copyFileSync;
exports.createFolderSync = syncModule.createFolderSync;
exports.deleteFolderSync = syncModule.deleteFolderSync;
exports.getAllFilesSync = syncModule.getAllFilesSync;
exports.cleanProjectSync = syncModule.cleanProjectSync;

exports.writeFileAsync = asyncModule.writeFileAsync;
exports.readFileAsync = asyncModule.readFileAsync;
exports.updateFileAsync = asyncModule.updateFileAsync;
exports.clearFileAsync = asyncModule.clearFileAsync;
exports.cleanFileAsync = asyncModule.cleanFileAsync;
exports.copyFileAsync = asyncModule.copyFileAsync;
exports.createFolderAsync = asyncModule.createFolderAsync;
exports.deleteFolderAsync = asyncModule.deleteFolderAsync;
exports.getAllFilesAsync = asyncModule.getAllFilesAsync;
exports.cleanProjectAsync = asyncModule.cleanProjectAsync;