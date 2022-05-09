const getVideoURL = (fileObject) => {
	const fileURL = window.URL.createObjectURL(fileObject);
	return fileURL;
}
export default getVideoURL;
