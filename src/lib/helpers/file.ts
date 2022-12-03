export const getFileExtension = (filename: string) => {
	var ext = /^.+\.([^.]+)$/.exec(filename);
	return ext == null ? '' : ext[1];
};
