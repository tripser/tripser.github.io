export const handleImageFile = async (image: File, slug?: string, isSplash?: boolean) => {
  const formData = new FormData() as any;
  formData.append('image', image);
  if (slug) formData.append('slug', slug);
  if (isSplash) formData.append('isSplash', isSplash.toString());

  // slug must contain /articles|content|maps

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
