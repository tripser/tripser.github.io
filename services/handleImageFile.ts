export const handleImageFile = async (image: File, name?: string, path?: string, isSplash?: boolean) => {
  const formData = new FormData() as any;
  formData.append('image', image);
  if (name) formData.append('name', name);
  if (path) formData.append('path', path);
  if (isSplash) formData.append('isSplash', isSplash.toString());

  // path must contain /articles|content|maps

  try {
    const response = await fetch('/api/createImageFile', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('An error occurred while creating the image.');
    }

    const data = await response.json();
    console.log(data.message);
    return data.filePath;
  } catch (err) {
    console.error(err);
    console.log('An error occurred while creating the image.');
  }
};
